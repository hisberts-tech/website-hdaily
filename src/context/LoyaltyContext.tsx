import React, { createContext, useContext, useState, useEffect } from 'react';

export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface LoyaltyEntry {
  id: string;
  date: string;
  description: string;
  points: number;
  type: 'earn' | 'redeem';
}

export interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  icon: string;
  category: 'discount' | 'delivery' | 'voucher';
}

export interface TierInfo {
  tier: LoyaltyTier;
  label: string;
  minPoints: number;
  maxPoints: number | null;
  color: string;
  bgColor: string;
  borderColor: string;
  ringColor: string;
  icon: string;
  benefit: string;
  discountPct: number;
}

export const TIERS: TierInfo[] = [
  {
    tier: 'bronze',
    label: 'Bronze',
    minPoints: 0,
    maxPoints: 499,
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-400',
    ringColor: 'ring-amber-400',
    icon: 'fa-medal',
    benefit: '5% de réduction sur votre prochaine commande',
    discountPct: 5,
  },
  {
    tier: 'silver',
    label: 'Argent',
    minPoints: 500,
    maxPoints: 1999,
    color: 'text-slate-500',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-400',
    ringColor: 'ring-slate-400',
    icon: 'fa-medal',
    benefit: '10% de réduction + livraison gratuite',
    discountPct: 10,
  },
  {
    tier: 'gold',
    label: 'Or',
    minPoints: 2000,
    maxPoints: 4999,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-400',
    ringColor: 'ring-yellow-400',
    icon: 'fa-crown',
    benefit: '15% de réduction + livraison express gratuite',
    discountPct: 15,
  },
  {
    tier: 'platinum',
    label: 'Platine',
    minPoints: 5000,
    maxPoints: null,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-400',
    ringColor: 'ring-purple-400',
    icon: 'fa-gem',
    benefit: '20% de réduction + conseiller dédié + produits exclusifs',
    discountPct: 20,
  },
];

export const REWARDS: LoyaltyReward[] = [
  {
    id: 'discount_5pct',
    name: '5% de réduction',
    description: 'Un code promo de 5% valable sur votre prochaine commande',
    pointsCost: 100,
    icon: 'fa-tag',
    category: 'discount',
  },
  {
    id: 'free_delivery',
    name: 'Livraison gratuite',
    description: 'Livraison offerte sur votre prochaine commande',
    pointsCost: 200,
    icon: 'fa-truck',
    category: 'delivery',
  },
  {
    id: 'discount_10pct',
    name: '10% de réduction',
    description: 'Un code promo de 10% valable sur votre prochaine commande',
    pointsCost: 350,
    icon: 'fa-tag',
    category: 'discount',
  },
  {
    id: 'voucher_200',
    name: 'Bon de 200 HTG',
    description: 'Réduction de 200 HTG déduite de votre prochaine commande',
    pointsCost: 400,
    icon: 'fa-gift',
    category: 'voucher',
  },
  {
    id: 'voucher_500',
    name: 'Bon de 500 HTG',
    description: 'Réduction de 500 HTG déduite de votre prochaine commande',
    pointsCost: 900,
    icon: 'fa-gift',
    category: 'voucher',
  },
  {
    id: 'voucher_1000',
    name: 'Bon de 1 000 HTG',
    description: 'Réduction de 1 000 HTG déduite de votre prochaine commande',
    pointsCost: 1800,
    icon: 'fa-star',
    category: 'voucher',
  },
];

export function getTierInfo(totalEarned: number): TierInfo {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (totalEarned >= TIERS[i].minPoints) return TIERS[i];
  }
  return TIERS[0];
}

export function getNextTier(totalEarned: number): TierInfo | null {
  for (const tier of TIERS) {
    if (totalEarned < tier.minPoints) return tier;
  }
  return null;
}

export function pointsForPurchase(totalHTG: number): number {
  return Math.floor(totalHTG / 100);
}

export const SUBSCRIPTION_BONUS: Record<string, number> = {
  basic: 250,
  family: 500,
  premium: 1000,
};

interface LoyaltyState {
  totalEarned: number;
  availablePoints: number;
  history: LoyaltyEntry[];
  hasFirstPurchaseBonus: boolean;
}

interface LoyaltyContextValue {
  totalEarned: number;
  availablePoints: number;
  history: LoyaltyEntry[];
  tierInfo: TierInfo;
  nextTier: TierInfo | null;
  pointsToNextTier: number;
  tierProgressPct: number;
  addPoints: (points: number, description: string) => void;
  awardPurchase: (totalHTG: number, itemCount: number) => number;
  redeemReward: (reward: LoyaltyReward) => boolean;
}

const STORAGE_KEY = 'hdaily-loyalty';

const defaultState: LoyaltyState = {
  totalEarned: 0,
  availablePoints: 0,
  history: [],
  hasFirstPurchaseBonus: false,
};

const LoyaltyContext = createContext<LoyaltyContextValue | null>(null);

export const LoyaltyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<LoyaltyState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const tierInfo = getTierInfo(state.totalEarned);
  const nextTier = getNextTier(state.totalEarned);
  const pointsToNextTier = nextTier ? nextTier.minPoints - state.totalEarned : 0;

  const tierProgressPct = (() => {
    if (!nextTier) return 100;
    const range = nextTier.minPoints - tierInfo.minPoints;
    const progress = state.totalEarned - tierInfo.minPoints;
    return Math.min(100, Math.round((progress / range) * 100));
  })();

  const addPoints = (points: number, description: string) => {
    const entry: LoyaltyEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      date: new Date().toLocaleDateString('fr-FR'),
      description,
      points,
      type: 'earn',
    };
    setState(prev => ({
      ...prev,
      totalEarned: prev.totalEarned + points,
      availablePoints: prev.availablePoints + points,
      history: [entry, ...prev.history].slice(0, 50),
    }));
  };

  const awardPurchase = (totalHTG: number, itemCount: number): number => {
    let earned = pointsForPurchase(totalHTG);
    const isFirst = !state.hasFirstPurchaseBonus;

    setState(prev => {
      const entries: LoyaltyEntry[] = [];
      let bonus = earned;

      entries.push({
        id: `${Date.now()}-purchase`,
        date: new Date().toLocaleDateString('fr-FR'),
        description: `Achat — ${itemCount} article${itemCount > 1 ? 's' : ''} (${totalHTG.toLocaleString()} HTG)`,
        points: earned,
        type: 'earn',
      });

      if (isFirst) {
        const firstBonus = 100;
        bonus += firstBonus;
        entries.push({
          id: `${Date.now()}-first`,
          date: new Date().toLocaleDateString('fr-FR'),
          description: 'Bonus premier achat',
          points: firstBonus,
          type: 'earn',
        });
      }

      return {
        ...prev,
        totalEarned: prev.totalEarned + bonus,
        availablePoints: prev.availablePoints + bonus,
        hasFirstPurchaseBonus: true,
        history: [...entries, ...prev.history].slice(0, 50),
      };
    });

    if (isFirst) earned += 100;
    return earned;
  };

  const redeemReward = (reward: LoyaltyReward): boolean => {
    if (state.availablePoints < reward.pointsCost) return false;
    const entry: LoyaltyEntry = {
      id: `${Date.now()}-redeem`,
      date: new Date().toLocaleDateString('fr-FR'),
      description: `Échange: ${reward.name}`,
      points: -reward.pointsCost,
      type: 'redeem',
    };
    setState(prev => ({
      ...prev,
      availablePoints: prev.availablePoints - reward.pointsCost,
      history: [entry, ...prev.history].slice(0, 50),
    }));
    return true;
  };

  return (
    <LoyaltyContext.Provider value={{
      totalEarned: state.totalEarned,
      availablePoints: state.availablePoints,
      history: state.history,
      tierInfo,
      nextTier,
      pointsToNextTier,
      tierProgressPct,
      addPoints,
      awardPurchase,
      redeemReward,
    }}>
      {children}
    </LoyaltyContext.Provider>
  );
};

export function useLoyalty() {
  const ctx = useContext(LoyaltyContext);
  if (!ctx) throw new Error('useLoyalty must be used inside LoyaltyProvider');
  return ctx;
}
