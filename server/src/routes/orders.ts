import { Router } from 'express';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { prisma } from '../db.js';
import { asyncHandler, HttpError } from '../middleware/error.js';
import { optionalAuth, requireAdmin } from '../middleware/auth.js';
import { sendSms, smsTemplates } from '../lib/sms.js';
import { env } from '../env.js';

export const router = Router();

const checkoutSchema = z.object({
  customerName: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
  paymentMethod: z.enum(['moncash', 'natcash', 'cash', 'card']),
  items: z
    .array(
      z.object({
        productId: z.number().int().positive(),
        quantity: z.number().int().positive(),
        // 'gros' = acheté au conditionnement (prix bulkPrice), 'detail' par défaut
        variant: z.enum(['gros', 'detail']).default('detail'),
      })
    )
    .min(1),
});

// POST /api/orders — checkout the cart
router.post(
  '/',
  optionalAuth,
  asyncHandler(async (req, res) => {
    const body = checkoutSchema.parse(req.body);

    // Neon's pooler can be slow to wake from idle, so give the transaction
    // more room than Prisma's 5s default before it gets rolled back.
    const order = await prisma.$transaction(async (tx) => {
      const ids = body.items.map((i) => i.productId);
      const products = await tx.product.findMany({ where: { id: { in: ids }, active: true } });
      const byId = new Map(products.map((p) => [p.id, p]));

      let total = 0;
      const itemsData = body.items.map((item) => {
        const product = byId.get(item.productId);
        if (!product) throw new HttpError(400, `Produit ${item.productId} introuvable`);
        if (product.stock < item.quantity)
          throw new HttpError(409, `Stock insuffisant pour "${product.name}"`);

        const isGros = item.variant === 'gros';
        if (isGros && (product.bulkPrice == null || product.bulkUnit == null))
          throw new HttpError(400, `"${product.name}" n'est pas disponible en gros`);

        // Snapshot du prix et du libellé au moment de l'achat.
        const unitPrice = isGros ? product.bulkPrice! : product.price;
        const name = isGros ? `${product.name} (${product.bulkUnit})` : product.name;
        total += unitPrice * item.quantity;
        return { productId: product.id, name, price: unitPrice, quantity: item.quantity };
      });

      for (const item of body.items) {
        await tx.product.update({ where: { id: item.productId }, data: { stock: { decrement: item.quantity } } });
      }

      return tx.order.create({
        data: {
          userId: req.user?.sub,
          customerName: body.customerName,
          phone: body.phone,
          address: body.address,
          paymentMethod: body.paymentMethod,
          total,
          items: { create: itemsData },
        },
        include: { items: true },
      });
    }, { timeout: 15000, maxWait: 10000 });

    // SMS: confirm to customer + alert admin (fire-and-forget)
    sendSms(order.phone, smsTemplates.orderReceived(order.id, order.total)).catch(() => {});
    if (env.adminPhone) {
      sendSms(
        env.adminPhone,
        smsTemplates.newOrderAdmin(order.customerName, order.phone, order.total, order.items.length)
      ).catch(() => {});
    }

    res.status(201).json(order);
  })
);

// GET /api/orders/my-orders?phone=xxx — customer order history (no auth required)
router.get(
  '/my-orders',
  asyncHandler(async (req, res) => {
    const phone = z.string().min(1).parse(req.query.phone);
    const orders = await prisma.order.findMany({
      where: { phone },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  })
);

// GET /api/orders (admin) — list all orders
router.get(
  '/',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const status = req.query.status as string | undefined;
    const where: Prisma.OrderWhereInput = {};
    if (status && status !== 'all') where.status = status as Prisma.EnumOrderStatusFilter['equals'];

    const orders = await prisma.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  })
);

// GET /api/orders/:id — single order (public — customer can look up their own order by ID)
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    });
    if (!order) throw new HttpError(404, 'Commande introuvable');
    res.json(order);
  })
);

// PATCH /api/orders/:id/status (admin)
const statusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled']),
});

router.patch(
  '/:id/status',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { status } = statusSchema.parse(req.body);

    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
      include: { items: true },
    });

    // SMS customer on meaningful status changes
    if (['confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'].includes(status)) {
      sendSms(order.phone, smsTemplates.statusChanged(order.id, status)).catch(() => {});
    }

    res.json(order);
  })
);
