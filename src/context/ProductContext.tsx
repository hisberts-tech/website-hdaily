import React, { createContext, useContext, useState } from 'react';
import { Product, CategoryFilter } from '../types';

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: CategoryFilter;
  searchQuery: string;
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
    image: "/src/assets/images/pexels-badun-21044412.jpg",
    description: "Tomates rouges juteuses, cultivées localement",
    stock: 50,
    badge: "Bio"
  },
  {
    id: 2,
    name: "Laitues Romaines",
    category: "frais",
    price: 80,
    unit: "pièce",
    image: "/src/assets/images/pexels-badun-21044412.jpg",
    description: "Laitues fraîches et croquantes pour vos salades",
    stock: 30,
    badge: "Nouveau"
  },
  {
    id: 3,
    name: "Carottes Bio",
    category: "frais",
    price: 120,
    unit: "kg",
    image: "/src/assets/images/pexels-badun-21044412.jpg",
    description: "Carottes douces et colorées, riches en vitamines",
    stock: 45,
  },
  {
    id: 4,
    name: "Bananes Locales",
    category: "frais",
    price: 100,
    unit: "douzaine",
    image: "/src/assets/images/pexels-badun-21044412.jpg",
    description: "Bananes sucrées cultivées en Haïti",
    stock: 100,
    badge: "Local"
  },
  
  // Produits Alimentaires
  {
    id: 5,
    name: "Riz Premium",
    category: "alimentaires",
    price: 350,
    unit: "kg",
    image: "/src/assets/images/pexels-bertellifotografia-30893333.jpg",
    description: "Riz de haute qualité, grain long",
    stock: 200,
    badge: "Best-seller"
  },
  {
    id: 6,
    name: "Pâtes Italiennes",
    category: "alimentaires",
    price: 280,
    unit: "500g",
    image: "/src/assets/images/pexels-bertellifotografia-30893333.jpg",
    description: "Pâtes authentiques importées d'Italie",
    stock: 80,
  },
  {
    id: 7,
    name: "Huile d'Olive Extra Vierge",
    category: "alimentaires",
    price: 850,
    unit: "L",
    image: "/src/assets/images/pexels-bertellifotografia-30893333.jpg",
    description: "Huile d'olive premium, première pression à froid",
    stock: 40,
    badge: "Premium"
  },
  {
    id: 8,
    name: "Farine de Blé",
    category: "alimentaires",
    price: 180,
    unit: "kg",
    image: "/src/assets/images/pexels-bertellifotografia-30893333.jpg",
    description: "Farine de blé de qualité supérieure",
    stock: 150,
  },
  
  // Produits Quotidiens
  {
    id: 9,
    name: "Savon Liquide",
    category: "quotidiens",
    price: 250,
    unit: "L",
    image: "/src/assets/images/pexels-david-iloba-28486424-14881644.jpg",
    description: "Savon liquide doux pour les mains",
    stock: 60,
    badge: "Écologique"
  },
  {
    id: 10,
    name: "Essuie-tout",
    category: "quotidiens",
    price: 120,
    unit: "paquet",
    image: "/src/assets/images/pexels-david-iloba-28486424-14881644.jpg",
    description: "Essuie-tout de haute qualité, 3 rouleaux",
    stock: 100,
  },
  {
    id: 11,
    name: "Détergent Écologique",
    category: "quotidiens",
    price: 450,
    unit: "L",
    image: "/src/assets/images/pexels-david-iloba-28486424-14881644.jpg",
    description: "Détergent biodegradable pour sols",
    stock: 35,
    badge: "Bio"
  },
  {
    id: 12,
    name: "Sacs Poubelle",
    category: "quotidiens",
    price: 150,
    unit: "paquet",
    image: "/src/assets/images/pexels-david-iloba-28486424-14881644.jpg",
    description: "Sacs poubelle résistants, 30 unités",
    stock: 120,
  }
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

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
