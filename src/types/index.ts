// Deux façons d'acheter un produit :
//  - 'detail' : à l'unité (kg, marmite, pièce, litre…) — prix/unité de base
//  - 'gros'   : par conditionnement (sac, caisse, carton, bidon…)
export type SaleVariant = 'gros' | 'detail';

export interface BulkOption {
  unit: string;   // ex : "sac 25 kg", "caisse ~20 kg", "carton x12"
  price: number;  // HTG par unité de gros
  minQty: number; // commande minimale (nombre d'unités de gros)
}

export interface Product {
  id: number;
  name: string;
  category: 'frais' | 'alimentaires' | 'quotidiens';
  price: number;
  unit: string;
  image: string;
  description: string;
  stock: number;
  badge?: string;
  bulk?: BulkOption; // présent si le produit est aussi vendu en gros
}

export interface CartItem extends Product {
  quantity: number;
  variant: SaleVariant;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}

export interface CreditApplication {
  id: number;
  fullName: string;
  phone: string;
  nif: string;
  limit: number;
  term: '1week' | '1month';
  address: string;
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  interestRate: number;
}

export interface CreditUser extends CreditApplication {
  availableCredit: number;
  usedCredit: number;
  approvedDate: string;
  transactions?: CreditTransaction[];
}

export interface CreditTransaction {
  id: number;
  amount: number;
  totalAmount: number;
  dueDate: string;
  date: string;
  type: 'purchase' | 'payment';
}

export interface SubscriptionFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  preferences: string;
  termsAccepted: boolean;
  plan: SubscriptionPlan;
}

export interface NotificationType {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
  mobileOnly?: boolean;
}

export type CategoryFilter = 'all' | 'frais' | 'alimentaires' | 'quotidiens';
