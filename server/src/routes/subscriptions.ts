import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db.js';
import { asyncHandler, HttpError } from '../middleware/error.js';
import { optionalAuth, requireAdmin } from '../middleware/auth.js';

export const router = Router();

// GET /api/subscriptions/plans — the three subscription plans
router.get(
  '/plans',
  asyncHandler(async (_req, res) => {
    const plans = await prisma.subscriptionPlan.findMany({ orderBy: { price: 'asc' } });
    res.json(plans);
  })
);

const subscribeSchema = z.object({
  planId: z.enum(['basic', 'family', 'premium']),
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
  frequency: z.enum(['weekly', 'monthly']).default('weekly'),
  deliveryDay: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']),
  deliveryTime: z.enum(['morning', 'afternoon', 'evening']),
  paymentMethod: z.enum(['moncash', 'natcash', 'cash', 'card']),
  creditRequest: z.boolean().default(false),
});

// POST /api/subscriptions — create a subscription request
router.post(
  '/',
  optionalAuth,
  asyncHandler(async (req, res) => {
    const body = subscribeSchema.parse(req.body);

    const plan = await prisma.subscriptionPlan.findUnique({ where: { id: body.planId } });
    if (!plan) throw new HttpError(400, 'Unknown subscription plan');

    const subscription = await prisma.subscription.create({
      data: { ...body, userId: req.user?.sub },
      include: { plan: true },
    });
    res.status(201).json(subscription);
  })
);

// GET /api/subscriptions (admin)
router.get(
  '/',
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const subs = await prisma.subscription.findMany({
      include: { plan: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(subs);
  })
);
