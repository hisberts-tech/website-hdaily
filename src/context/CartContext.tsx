import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product, SaleVariant } from '../types';
import { cartLineId, lineIdOf, itemUnitPrice } from '../lib/cart';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number, variant?: SaleVariant) => void;
  removeFromCart: (lineId: string) => void;
  updateQuantity: (lineId: string, change: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const sumTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + itemUnitPrice(item) * item.quantity, 0);
const sumCount = (items: CartItem[]) => items.reduce((sum, item) => sum + item.quantity, 0);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; variant: SaleVariant } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { lineId: string; change: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, variant } = action.payload;
      const lineId = cartLineId(product.id, variant);
      const existingItem = state.items.find(item => lineIdOf(item) === lineId);

      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          lineIdOf(item) === lineId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { ...product, quantity, variant }];
      }

      return {
        ...state,
        items: newItems,
        total: sumTotal(newItems),
        itemCount: sumCount(newItems),
      };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => lineIdOf(item) !== action.payload);
      return {
        ...state,
        items: newItems,
        total: sumTotal(newItems),
        itemCount: sumCount(newItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { lineId, change } = action.payload;
      const item = state.items.find(item => lineIdOf(item) === lineId);

      if (!item) return state;

      const newQuantity = item.quantity + change;
      if (newQuantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: lineId });
      }

      const newItems = state.items.map(item =>
        lineIdOf(item) === lineId ? { ...item, quantity: newQuantity } : item
      );

      return {
        ...state,
        items: newItems,
        total: sumTotal(newItems),
        itemCount: sumCount(newItems),
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0,
      };

    case 'LOAD_CART': {
      // Rétro-compatibilité : les paniers enregistrés avant l'ajout des variantes
      // n'ont pas de champ `variant` — on les considère comme du détail.
      const items = action.payload.map(item => ({
        ...item,
        variant: item.variant ?? ('detail' as SaleVariant),
      }));
      return {
        items,
        total: sumTotal(items),
        itemCount: sumCount(items),
      };
    }

    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('hdaily-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('hdaily-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product, quantity = 1, variant: SaleVariant = 'detail') => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, variant } });
  };

  const removeFromCart = (lineId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: lineId });
  };

  const updateQuantity = (lineId: string, change: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { lineId, change } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalItems = () => state.itemCount;
  const getTotalPrice = () => state.total;

  const value: CartContextType = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
