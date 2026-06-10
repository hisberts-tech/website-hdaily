import { Product, CategoryFilter } from '../types';

// In dev, requests go to "/api" and Vite proxies them to the backend (see
// vite.config.ts). In production set VITE_API_URL to the deployed API origin,
// e.g. "https://api.h-daily.com".
const BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

const TOKEN_KEY = 'hdaily-token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  details?: unknown;
  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const body = isJson ? await res.json() : null;

  if (!res.ok) {
    const message = (body && (body.error as string)) || `Request failed (${res.status})`;
    throw new ApiError(res.status, message, body?.details);
  }
  return body as T;
}

// ----- Domain payload types -----

export interface CheckoutPayload {
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: 'moncash' | 'natcash' | 'cash' | 'card';
  items: { productId: number; quantity: number }[];
}

export interface SubscriptionPayload {
  planId: 'basic' | 'family' | 'premium';
  fullName: string;
  email: string;
  phone: string;
  address: string;
  frequency: 'weekly' | 'monthly';
  deliveryDay: string;
  deliveryTime: string;
  paymentMethod: 'moncash' | 'natcash' | 'cash' | 'card';
  creditRequest: boolean;
}

export interface CreditApplicationPayload {
  firstName: string;
  lastName: string;
  phone: string;
  nif: string;
  address: string;
  level: 'express' | 'standard' | 'premium';
  term: 'one_week' | 'one_month';
}

export interface ContactPayload {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface PaymentConfig {
  moncash: {
    number: string;
    instructions: string[];
  };
}

export interface MonCashPaymentPayload {
  planId: 'basic' | 'family' | 'premium';
  fullName: string;
  email: string;
  phone: string;
  address: string;
  frequency: 'weekly' | 'monthly';
  deliveryDay: string;
  deliveryTime: string;
  creditRequest: boolean;
  senderPhone: string;
  transactionRef: string;
}

// ----- API surface -----

export const api = {
  // Products
  listProducts: (params?: { category?: CategoryFilter; search?: string }) => {
    const qs = new URLSearchParams();
    if (params?.category && params.category !== 'all') qs.set('category', params.category);
    if (params?.search) qs.set('search', params.search);
    const suffix = qs.toString() ? `?${qs}` : '';
    return request<Product[]>(`/products${suffix}`);
  },
  getProduct: (id: number) => request<Product>(`/products/${id}`),

  // Orders
  checkout: (payload: CheckoutPayload) =>
    request(`/orders`, { method: 'POST', body: JSON.stringify(payload) }),

  // Subscriptions
  getPlans: () => request(`/subscriptions/plans`),
  subscribe: (payload: SubscriptionPayload) =>
    request(`/subscriptions`, { method: 'POST', body: JSON.stringify(payload) }),

  // Credit
  getCreditLevels: () => request(`/credit/levels`),
  applyForCredit: (payload: CreditApplicationPayload) =>
    request(`/credit/applications`, { method: 'POST', body: JSON.stringify(payload) }),

  // Contact
  sendContact: (payload: ContactPayload) =>
    request(`/contact`, { method: 'POST', body: JSON.stringify(payload) }),

  // Payments (manual MonCash)
  getPaymentConfig: () => request<PaymentConfig>(`/payments/config`),
  payWithMonCash: (payload: MonCashPaymentPayload) =>
    request(`/payments/moncash`, { method: 'POST', body: JSON.stringify(payload) }),

  // Auth
  register: (payload: { email: string; password: string; fullName: string; phone?: string }) =>
    request<{ token: string; user: unknown }>(`/auth/register`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  login: (payload: { email: string; password: string }) =>
    request<{ token: string; user: unknown }>(`/auth/login`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
