import { CreditLevel, CreditTerm } from '@prisma/client';

/** Credit limit per level, in HTG (from CreditService.tsx). */
export const CREDIT_LIMITS: Record<CreditLevel, number> = {
  [CreditLevel.express]: 5000,
  [CreditLevel.standard]: 15000,
  [CreditLevel.premium]: 30000,
};

/** A one-month term increases the debt by 10%. */
export const MONTH_TERM_SURCHARGE = 0.1;

/** Total owed for a purchase given the chosen repayment term. */
export function totalWithInterest(amount: number, term: CreditTerm): number {
  if (term === CreditTerm.one_month) {
    return Math.round(amount * (1 + MONTH_TERM_SURCHARGE));
  }
  return amount;
}

/** Due date based on the repayment term. */
export function dueDateFor(term: CreditTerm, from = new Date()): Date {
  const due = new Date(from);
  if (term === CreditTerm.one_week) due.setDate(due.getDate() + 7);
  else due.setMonth(due.getMonth() + 1);
  return due;
}
