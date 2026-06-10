import { PrismaClient } from '@prisma/client';
import { isProd } from './env.js';

// Single shared Prisma client. In dev, avoid creating many clients on reload.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: isProd ? ['error'] : ['query', 'warn', 'error'],
  });

if (!isProd) globalForPrisma.prisma = prisma;
