import { Router } from 'express';
import { z } from 'zod';
import { PaymentMethod } from '@prisma/client';
import { prisma } from '../db.js';
import { env } from '../env.js';
import { asyncHandler, HttpError } from '../middleware/error.js';
import { optionalAuth, requireAdmin } from '../middleware/auth.js';

export const router = Router();

// GET /api/payments/config — merchant number + instructions for manual MonCash.
router.get('/config', (_req, res) => {
  res.json({
    moncash: {
      number: env.moncashNumber,
      instructions: [
        'Composez *202# ou ouvrez l\'application MonCash.',
        `Envoyez le montant exact indiqué au numéro ${env.moncashNumber}.`,
        'Notez le numéro de transaction (ID) reçu par SMS.',
        'Saisissez ce numéro de transaction ci-dessous pour confirmer votre paiement.',
      ],
    },
  });
});

const moncashSchema = z.object({
  // Subscription details
  planId: z.enum(['basic', 'family', 'premium']),
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
  frequency: z.enum(['weekly', 'monthly']).default('weekly'),
  deliveryDay: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']),
  deliveryTime: z.enum(['morning', 'afternoon', 'evening']),
  creditRequest: z.boolean().default(false),
  // Manual MonCash payment proof
  senderPhone: z.string().min(1),
  transactionRef: z.string().min(1),
});

// POST /api/payments/moncash — create a subscription + its pending MonCash payment
// in one transaction. Amount is taken from the plan server-side.
router.post(
  '/moncash',
  optionalAuth,
  asyncHandler(async (req, res) => {
    const body = moncashSchema.parse(req.body);

    const plan = await prisma.subscriptionPlan.findUnique({ where: { id: body.planId } });
    if (!plan) throw new HttpError(400, 'Unknown subscription plan');

    const result = await prisma.$transaction(async (tx) => {
      const subscription = await tx.subscription.create({
        data: {
          planId: body.planId,
          userId: req.user?.sub,
          fullName: body.fullName,
          email: body.email,
          phone: body.phone,
          address: body.address,
          frequency: body.frequency,
          deliveryDay: body.deliveryDay,
          deliveryTime: body.deliveryTime,
          paymentMethod: 'moncash',
          creditRequest: body.creditRequest,
          status: 'pending',
        },
      });

      const payment = await tx.payment.create({
        data: {
          subscriptionId: subscription.id,
          method: PaymentMethod.moncash,
          amount: plan.price,
          senderPhone: body.senderPhone,
          transactionRef: body.transactionRef,
        },
      });

      return { subscription, payment };
    });

    res.status(201).json(result);
  })
);

// GET /api/payments (admin) — list payments, newest first
router.get(
  '/',
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const payments = await prisma.payment.findMany({
      include: { subscription: { include: { plan: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(payments);
  })
);

// PATCH /api/payments/:id/verify (admin) — confirm or reject a manual payment.
// Verifying activates the linked subscription.
const verifySchema = z.object({ status: z.enum(['verified', 'rejected']) });
router.patch(
  '/:id/verify',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { status } = verifySchema.parse(req.body);

    const payment = await prisma.payment.findUnique({ where: { id: req.params.id } });
    if (!payment) throw new HttpError(404, 'Payment not found');

    const result = await prisma.$transaction(async (tx) => {
      const updated = await tx.payment.update({
        where: { id: payment.id },
        data: { status, verifiedAt: status === 'verified' ? new Date() : null },
      });

      if (payment.subscriptionId) {
        await tx.subscription.update({
          where: { id: payment.subscriptionId },
          data: { status: status === 'verified' ? 'active' : 'cancelled' },
        });
      }
      return updated;
    });

    res.json(result);
  })
);
