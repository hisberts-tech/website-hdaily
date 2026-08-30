import { CartItem, SaleVariant } from '../types';

// Une ligne de panier est identifiée par le produit ET le mode d'achat, pour
// qu'un même produit puisse figurer en gros et au détail simultanément.
export const cartLineId = (productId: number, variant: SaleVariant) => `${productId}:${variant}`;

export const lineIdOf = (item: CartItem) => cartLineId(item.id, item.variant);

// Prix unitaire effectif selon le mode d'achat.
export const itemUnitPrice = (item: CartItem): number =>
  item.variant === 'gros' && item.bulk ? item.bulk.price : item.price;

// Libellé d'unité effectif selon le mode d'achat.
export const itemUnitLabel = (item: CartItem): string =>
  item.variant === 'gros' && item.bulk ? item.bulk.unit : item.unit;
