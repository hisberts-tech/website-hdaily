import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';

const Boutique: React.FC = () => {
  const { filteredProducts, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useProducts();
  const { addToCart } = useCart();
  const { addNotification } = useNotifications();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const categories = [
    { value: 'all', label: 'Tous' },
    { value: 'frais', label: 'Produits Frais' },
    { value: 'alimentaires', label: 'Alimentaires' },
    { value: 'quotidiens', label: 'Quotidiens' },
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category as any);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, Math.min(quantity, 99))
    }));
  };

  const handleAddToCart = (product: any) => {
    const quantity = quantities[product.id] || 1;
    addToCart(product, quantity);
    addNotification(`${product.name} ajouté au panier (${quantity} ${product.unit})`, 'success');
    // Reset quantity after adding to cart
    setQuantities(prev => ({
      ...prev,
      [product.id]: 1
    }));
  };

  const handleToggleFavorite = (_productId: number) => {
    addNotification('Fonctionnalité favoris bientôt disponible!', 'info');
  };

  return (
    <div className="min-h-screen bg-hd-cream">
      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-br from-hd-cream to-hd-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-1.5 border border-hd-primary/20 mb-5">
            <span className="w-2 h-2 rounded-full bg-hd-primary"></span>
            <span className="text-sm uppercase tracking-[0.2em] text-hd-primary font-bold">Boutique</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-hd-secondary leading-[1.15]">
            Découvrez nos <span className="text-hd-primary">produits</span>
          </h1>
          <p className="text-hd-text text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            Découvrez notre sélection complète de produits premium pour tous vos besoins quotidiens.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-full border border-hd-border bg-white focus:outline-none focus:ring-2 focus:ring-hd-primary focus:border-transparent"
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-hd-muted"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif text-hd-secondary mb-4">Catégories</h2>
          <p className="text-hd-text">Parcourez nos produits par catégorie</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`px-6 py-2 rounded-full border font-medium transition-all ${
                selectedCategory === category.value
                  ? 'bg-hd-primary text-white border-hd-primary'
                  : 'border-hd-border text-hd-secondary hover:border-hd-primary hover:text-hd-primary'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20 px-6 max-w-7xl mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-hd-secondary mb-2">Aucun produit trouvé</h3>
            <p className="text-hd-text">
              {searchQuery 
                ? `Aucun produit ne correspond à "${searchQuery}"`
                : 'Aucun produit dans cette catégorie'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="card-premium subtle-border product-card">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/src/assets/images/sac du riz.webp';
                    }}
                  />
                  {product.badge && (
                    <span className="badge-new absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => handleToggleFavorite(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-hd-primary hover:text-white transition-all"
                  >
                    <i className="far fa-heart text-sm"></i>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg font-semibold text-hd-secondary mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-xl font-bold text-black">{product.price}</span>
                      <span className="text-sm text-hd-muted"> HTG/{product.unit}</span>
                    </div>
                    <span className={`text-xs ${product.stock > 20 ? 'text-green-600' : 'text-orange-600'}`}>
                      {product.stock > 20 ? 'En stock' : `Plus que ${product.stock}`}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantities[product.id] || 1}
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                      className="flex-1 px-3 py-2 border border-hd-border rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-hd-primary"
                    />
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn-primary flex-1 text-sm"
                    >
                      <i className="fas fa-cart-plus mr-1"></i> Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <section className="pb-20 px-6 max-w-7xl mx-auto">
          <div className="flex justify-center gap-2">
            <button className="px-4 py-2 rounded-lg border border-hd-border text-hd-secondary hover:bg-hd-primary hover:text-white transition-all">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="px-4 py-2 rounded-lg bg-hd-primary text-white font-medium">1</button>
            <button className="px-4 py-2 rounded-lg border border-hd-border text-hd-secondary hover:bg-hd-primary hover:text-white transition-all">2</button>
            <button className="px-4 py-2 rounded-lg border border-hd-border text-hd-secondary hover:bg-hd-primary hover:text-white transition-all">3</button>
            <button className="px-4 py-2 rounded-lg border border-hd-border text-hd-secondary hover:bg-hd-primary hover:text-white transition-all">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Boutique;
