import { Router } from 'express';
import { z } from 'zod';
import { Category, Prisma, Product } from '@prisma/client';
import { prisma } from '../db.js';
import { asyncHandler, HttpError } from '../middleware/error.js';
import { requireAdmin } from '../middleware/auth.js';

export const router = Router();

// Collapse the flat bulk* columns into the nested `bulk` object the web client
// expects (see website-hdaily/src/types Product).
function serializeProduct(p: Product) {
  const { bulkUnit, bulkPrice, bulkMinQty, ...rest } = p;
  return {
    ...rest,
    bulk:
      bulkUnit != null && bulkPrice != null
        ? { unit: bulkUnit, price: bulkPrice, minQty: bulkMinQty ?? 1 }
        : undefined,
  };
}

const listQuery = z.object({
  category: z.enum(['all', 'frais', 'alimentaires', 'quotidiens']).optional(),
  search: z.string().trim().optional(),
});

// GET /api/products?category=frais&search=riz
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { category, search } = listQuery.parse(req.query);

    const where: Prisma.ProductWhereInput = { active: true };
    if (category && category !== 'all') where.category = category as Category;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({ where, orderBy: { id: 'asc' } });
    res.json(products.map(serializeProduct));
  })
);

// GET /api/products/:id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) throw new HttpError(400, 'Invalid product id');

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product || !product.active) throw new HttpError(404, 'Product not found');
    res.json(serializeProduct(product));
  })
);

const productShape = z.object({
  name: z.string().min(1),
  category: z.enum(['frais', 'alimentaires', 'quotidiens']),
  price: z.number().int().nonnegative(),
  unit: z.string().min(1),
  image: z.string().min(1),
  description: z.string().min(1),
  stock: z.number().int().nonnegative().default(0),
  badge: z.string().optional(),
  // Wholesale option: pass unit + price together, or omit both.
  bulkUnit: z.string().min(1).nullish(),
  bulkPrice: z.number().int().nonnegative().nullish(),
  bulkMinQty: z.number().int().positive().nullish(),
});

const bulkPaired = (d: { bulkUnit?: string | null; bulkPrice?: number | null }): boolean =>
  (d.bulkUnit == null) === (d.bulkPrice == null);
const bulkPairMsg = {
  message: 'bulkUnit et bulkPrice doivent être fournis ensemble',
  path: ['bulkPrice'] as (string | number)[],
};

const productCreate = productShape.refine(bulkPaired, bulkPairMsg);
const productUpdate = productShape.partial().refine(bulkPaired, bulkPairMsg);

// POST /api/products (admin)
router.post(
  '/',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const data = productCreate.parse(req.body);
    const product = await prisma.product.create({ data });
    res.status(201).json(serializeProduct(product));
  })
);

// PATCH /api/products/:id (admin)
router.patch(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) throw new HttpError(400, 'Invalid product id');
    const data = productUpdate.parse(req.body);
    const product = await prisma.product.update({ where: { id }, data });
    res.json(serializeProduct(product));
  })
);

// DELETE /api/products/:id (admin) — soft delete
router.delete(
  '/:id',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) throw new HttpError(400, 'Invalid product id');
    await prisma.product.update({ where: { id }, data: { active: false } });
    res.status(204).end();
  })
);
