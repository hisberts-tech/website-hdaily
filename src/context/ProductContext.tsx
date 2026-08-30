import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, CategoryFilter } from '../types';
import { api } from '../lib/api';

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: CategoryFilter;
  searchQuery: string;
  loading: boolean;
  error: string | null;
  setSelectedCategory: (category: CategoryFilter) => void;
  setSearchQuery: (query: string) => void;
  getProductById: (id: number) => Product | undefined;
  getProductsByCategory: (category: CategoryFilter) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Product[] = [
  // Produits Frais
  {
    id: 1,
    name: "Tomates Fraîches",
    category: "frais",
    price: 150,
    unit: "kg",
    image: "/images/sac du riz.webp",
    description: "Tomates rouges juteuses, cultivées localement",
    stock: 50,
    badge: "Bio",
    bulk: { unit: "caisse ~20 kg", price: 2500, minQty: 1 }
  },
  {
    id: 2,
    name: "Laitues Romaines",
    category: "frais",
    price: 80,
    unit: "pièce",
    image: "/images/sac du riz.webp",
    description: "Laitues fraîches et croquantes pour vos salades",
    stock: 30,
    badge: "Nouveau",
    bulk: { unit: "caisse x24", price: 1600, minQty: 1 }
  },
  {
    id: 3,
    name: "Carottes Bio",
    category: "frais",
    price: 120,
    unit: "kg",
    image: "/images/sac du riz.webp",
    description: "Carottes douces et colorées, riches en vitamines",
    stock: 45,
    bulk: { unit: "sac 10 kg", price: 1000, minQty: 1 }
  },
  {
    id: 4,
    name: "Bananes Locales",
    category: "frais",
    price: 100,
    unit: "douzaine",
    image: "/images/sac du riz.webp",
    description: "Bananes sucrées cultivées en Haïti",
    stock: 100,
    badge: "Local",
    bulk: { unit: "régime (~10 douzaines)", price: 850, minQty: 1 }
  },

  // Produits Alimentaires
  {
    id: 5,
    name: "Riz Premium",
    category: "alimentaires",
    price: 350,
    unit: "marmite",
    image: "/images/pexels-bertellifotografia-30893333.jpg",
    description: "Riz de haute qualité, grain long",
    stock: 200,
    badge: "Best-seller",
    bulk: { unit: "sac 25 kg", price: 2800, minQty: 1 }
  },
  {
    id: 6,
    name: "Pâtes Italiennes",
    category: "alimentaires",
    price: 280,
    unit: "500g",
    image: "/images/pexels-bertellifotografia-30893333.jpg",
    description: "Pâtes authentiques importées d'Italie",
    stock: 80,
    bulk: { unit: "carton x20", price: 4800, minQty: 1 }
  },
  {
    id: 7,
    name: "Huile d'Olive Extra Vierge",
    category: "alimentaires",
    price: 850,
    unit: "L",
    image: "/images/pexels-bertellifotografia-30893333.jpg",
    description: "Huile d'olive premium, première pression à froid",
    stock: 40,
    badge: "Premium",
    bulk: { unit: "carton 12 x 1 L", price: 9000, minQty: 1 }
  },
  {
    id: 8,
    name: "Farine de Blé",
    category: "alimentaires",
    price: 180,
    unit: "marmite",
    image: "/images/pexels-bertellifotografia-30893333.jpg",
    description: "Farine de blé de qualité supérieure",
    stock: 150,
    bulk: { unit: "sac 25 kg", price: 3800, minQty: 1 }
  },

  // Produits Quotidiens
  {
    id: 9,
    name: "Savon Liquide",
    category: "quotidiens",
    price: 250,
    unit: "L",
    image: "/images/pexels-david-iloba-28486424-14881644.jpg",
    description: "Savon liquide doux pour les mains",
    stock: 60,
    badge: "Écologique",
    bulk: { unit: "carton 12 x 1 L", price: 2500, minQty: 1 }
  },
  {
    id: 10,
    name: "Essuie-tout",
    category: "quotidiens",
    price: 120,
    unit: "paquet",
    image: "/images/pexels-david-iloba-28486424-14881644.jpg",
    description: "Essuie-tout de haute qualité, 3 rouleaux",
    stock: 100,
    bulk: { unit: "carton x24", price: 2400, minQty: 1 }
  },
  {
    id: 11,
    name: "Détergent Écologique",
    category: "quotidiens",
    price: 450,
    unit: "L",
    image: "/images/pexels-david-iloba-28486424-14881644.jpg",
    description: "Détergent biodegradable pour sols",
    stock: 35,
    badge: "Bio",
    bulk: { unit: "bidon 20 L", price: 7800, minQty: 1 }
  },
  {
    id: 12,
    name: "Sacs Poubelle",
    category: "quotidiens",
    price: 150,
    unit: "paquet",
    image: "/images/pexels-david-iloba-28486424-14881644.jpg",
    description: "Sacs poubelle résistants, 30 unités",
    stock: 120,
    bulk: { unit: "carton x30", price: 3600, minQty: 1 }
  }
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load products from the API. Falls back to the bundled list on failure so the
  // catalogue still renders if the backend is unavailable.
  useEffect(() => {
    let cancelled = false;
    api
      .listProducts()
      .then((data) => {
        if (!cancelled && data.length > 0) setProducts(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? 'Failed to load products');
        console.error('Failed to load products from API, using bundled list:', err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getProductById = (id: number) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: CategoryFilter) => {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
  };

  const value: ProductContextType = {
    products,
    filteredProducts,
    selectedCategory,
    searchQuery,
    loading,
    error,
    setSelectedCategory,
    setSearchQuery,
    getProductById,
    getProductsByCategory,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
