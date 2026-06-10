import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db.js';
import { asyncHandler, HttpError } from '../middleware/error.js';
import { optionalAuth, requireAdmin } from '../middleware/auth.js';

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
      })
    )
    .min(1),
});

// POST /api/orders — checkout the cart
// Prices and stock are validated server-side; never trust client-sent prices.
router.post(
  '/',
  optionalAuth,
  asyncHandler(async (req, res) => {
    const body = checkoutSchema.parse(req.body);

    const order = await prisma.$transaction(async (tx) => {
      const ids = body.items.map((i) => i.productId);
      const products = await tx.product.findMany({ where: { id: { in: ids }, active: true } });
      const byId = new Map(products.map((p) => [p.id, p]));

      let total = 0;
      const itemsData = body.items.map((item) => {
        const product = byId.get(item.productId);
        if (!product) throw new HttpError(400, `Product ${item.productId} not found`);
        if (product.stock < item.quantity) {
          throw new HttpError(409, `Insufficient stock for "${product.name}"`);
        }
        total += product.price * item.quantity;
        return {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
        };
      });

      // Decrement stock
      for (const item of body.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
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
    });

    res.status(201).json(order);
  })
);

// GET /api/orders/:id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    });
    if (!order) throw new HttpError(404, 'Order not found');
    res.json(order);
  })
);

// GET /api/orders (admin) — list all orders
router.get(
  '/',
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  })
);

// PATCH /api/orders/:id/status (admin)
const statusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'preparing', 'delivered', 'cancelled']),
});
router.patch(
  '/:id/status',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { status } = statusSchema.parse(req.body);
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(order);
  })
);
