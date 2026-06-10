import { Router } from 'express';
import { router as products } from './products.js';
import { router as orders } from './orders.js';
import { router as subscriptions } from './subscriptions.js';
import { router as credit } from './credit.js';
import { router as contact } from './contact.js';
import { router as auth } from './auth.js';
import { router as payments } from './payments.js';

export const router = Router();

router.use('/products', products);
router.use('/orders', orders);
router.use('/subscriptions', subscriptions);
router.use('/credit', credit);
router.use('/contact', contact);
router.use('/auth', auth);
router.use('/payments', payments);
