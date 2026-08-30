import twilio from 'twilio';
import { env } from '../env.js';

const smsEnabled = Boolean(env.twilioAccountSid && env.twilioAuthToken && env.twilioFromNumber);

const client = smsEnabled ? twilio(env.twilioAccountSid, env.twilioAuthToken) : null;

if (!smsEnabled) {
  console.warn('[sms] Twilio credentials missing — SMS notifications are disabled.');
}

// Haiti numbers are entered locally (8 digits, no country code); assume +509 when none is given.
function toE164(phone: string): string {
  const trimmed = phone.trim();
  if (trimmed.startsWith('+')) return trimmed.replace(/[\s-]/g, '');
  return `+509${trimmed.replace(/[\s-]/g, '')}`;
}

export async function sendSms(phone: string, message: string): Promise<void> {
  if (!client) return;
  await client.messages.create({
    to: toE164(phone),
    from: env.twilioFromNumber,
    body: message,
  });
}

export const smsTemplates = {
  orderReceived: (orderId: string, total: number) =>
    `Order ${orderId} received, total ${total}`,
  newOrderAdmin: (customerName: string, phone: string, total: number, itemCount: number) =>
    `New order from ${customerName} (${phone}), ${itemCount} items, total ${total}`,
  statusChanged: (orderId: string, status: string) =>
    `Order ${orderId} status changed to ${status}`,
};
