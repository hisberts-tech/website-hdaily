import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db.js';
import { asyncHandler } from '../middleware/error.js';
import { requireAdmin } from '../middleware/auth.js';

export const router = Router();

const contactSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  subject: z.string().min(1),
  message: z.string().min(1),
});

// POST /api/contact — send a contact message
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const data = contactSchema.parse(req.body);
    const saved = await prisma.contactMessage.create({ data });
    res.status(201).json({ id: saved.id, ok: true });
  })
);

// GET /api/contact (admin)
router.get(
  '/',
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(messages);
  })
);
