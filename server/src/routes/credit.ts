import { Router } from 'express';
import { z } from 'zod';
import { CreditLevel, CreditTerm, CreditTxType } from '@prisma/client';
import { prisma } from '../db.js';
import { asyncHandler, HttpError } from '../middleware/error.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';
import { CREDIT_LIMITS, dueDateFor, totalWithInterest } from '../lib/credit.js';

export const router = Router();

// GET /api/credit/levels — static reference data for the credit tiers
router.get('/levels', (_req, res) => {
  res.json([
    { level: 'express', limit: CREDIT_LIMITS.express, label: 'Crédit Express' },
    { level: 'standard', limit: CREDIT_LIMITS.standard, label: 'Crédit Standard' },
    { level: 'premium', limit: CREDIT_LIMITS.premium, label: 'Crédit Premium' },
  ]);
});

const applicationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(1),
  nif: z.string().min(1), // NIF or CIN
  address: z.string().min(1),
  level: z.enum(['express', 'standard', 'premium']),
  term: z.enum(['one_week', 'one_month']),
});

// POST /api/credit/applications — submit a credit request
router.post(
  '/applications',
  asyncHandler(async (req, res) => {
    const data = applicationSchema.parse(req.body);
    const application = await prisma.creditApplication.create({ data });
    res.status(201).json(application);
  })
);

// GET /api/credit/applications (admin)
router.get(
  '/applications',
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const apps = await prisma.creditApplication.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(apps);
  })
);

// POST /api/credit/applications/:id/approve (admin)
// Approves the application and opens/updates the applicant's credit account.
const approveSchema = z.object({ userId: z.string().uuid() });
router.post(
  '/applications/:id/approve',
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { userId } = approveSchema.parse(req.body);
    const application = await prisma.creditApplication.findUnique({ where: { id: req.params.id } });
    if (!application) throw new HttpError(404, 'Application not found');

    const limit = CREDIT_LIMITS[application.level as CreditLevel];

    const result = await prisma.$transaction(async (tx) => {
      await tx.creditApplication.update({
        where: { id: application.id },
        data: { status: 'approved' },
      });
      return tx.creditAccount.upsert({
        where: { userId },
        update: { level: application.level, creditLimit: limit },
        create: { userId, level: application.level, creditLimit: limit },
      });
    });

    res.json(result);
  })
);

// GET /api/credit/account — the authenticated user's credit account
router.get(
  '/account',
  requireAuth,
  asyncHandler(async (req, res) => {
    const account = await prisma.creditAccount.findUnique({
      where: { userId: req.user!.sub },
      include: { transactions: { orderBy: { createdAt: 'desc' } } },
    });
    if (!account) throw new HttpError(404, 'No credit account');
    res.json({ ...account, availableCredit: account.creditLimit - account.usedCredit });
  })
);

// POST /api/credit/account/purchase — spend credit
const purchaseSchema = z.object({
  amount: z.number().int().positive(),
  term: z.enum(['one_week', 'one_month']),
});
router.post(
  '/account/purchase',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { amount, term } = purchaseSchema.parse(req.body);

    const tx = await prisma.$transaction(async (db) => {
      const account = await db.creditAccount.findUnique({ where: { userId: req.user!.sub } });
      if (!account) throw new HttpError(404, 'No credit account');

      const total = totalWithInterest(amount, term as CreditTerm);
      if (account.usedCredit + total > account.creditLimit) {
        throw new HttpError(409, 'Purchase exceeds available credit');
      }

      await db.creditAccount.update({
        where: { id: account.id },
        data: { usedCredit: { increment: total } },
      });

      return db.creditTransaction.create({
        data: {
          accountId: account.id,
          type: CreditTxType.purchase,
          amount,
          totalAmount: total,
          dueDate: dueDateFor(term as CreditTerm),
        },
      });
    });

    res.status(201).json(tx);
  })
);

// POST /api/credit/account/payment — repay credit
const paymentSchema = z.object({ amount: z.number().int().positive() });
router.post(
  '/account/payment',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { amount } = paymentSchema.parse(req.body);

    const tx = await prisma.$transaction(async (db) => {
      const account = await db.creditAccount.findUnique({ where: { userId: req.user!.sub } });
      if (!account) throw new HttpError(404, 'No credit account');

      const applied = Math.min(amount, account.usedCredit);
      await db.creditAccount.update({
        where: { id: account.id },
        data: { usedCredit: { decrement: applied } },
      });

      return db.creditTransaction.create({
        data: {
          accountId: account.id,
          type: CreditTxType.payment,
          amount: applied,
          totalAmount: applied,
        },
      });
    });

    res.status(201).json(tx);
  })
);
