import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { useLanguage } from '../context/LanguageContext';

const Boutique: React.FC = () => {
  const { filteredProducts, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useProducts();
  const { addToCart } = useCart();
  const { addNotification } = useNotifications();
  const { t } = useLanguage();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const categories = [
    { value: 'all',           label: t('boutique.catAll') },
    { value: 'frais',         label: t('boutique.catFrais') },
    { value: 'alimentaires',  label: t('boutique.catAlim') },
    { value: 'quotidiens',    label: t('boutique.catQuot') },
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category as any);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    addNotification(`${product.name} ${t('common.addToCart')} (${quantity} ${product.unit})`, 'success');
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const handleToggleFavorite = (_productId: number) => {
    addNotification('Fonctionnalité favoris bientôt disponible!', 'info');
  };

  return (
    <div className="min-h-screen bg-hd-cream">
      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32 bg-gradient-to-br from-hd-cream to-hd-light">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 text-center">
          <div className="inline-flex items-center gap-2 bg-hd-surface/70 backdrop-blur-sm rounded-full px-5 py-2 border border-hd-primary/20 mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-hd-primary animate-pulse"></span>
            <span className="text-sm uppercase tracking-[0.2em] text-hd-primary font-bold">{t('boutique.badge')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-hd-secondary leading-[1.1]">
            {t('boutique.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-hd-primary to-emerald-600">{t('boutique.title2')}</span>
          </h1>
          <p className="text-hd-text text-lg xl:text-2xl max-w-3xl mx-auto mt-6 xl:mt-8 leading-relaxed font-light">
            {t('boutique.subtitle')}
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-8">
            <div className="relative">
              <input
                type="text"
                placeholder={t('boutique.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-full border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary focus:border-transparent text-hd-secondary"
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-hd-muted"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-12 xl:pb-20 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 mt-12 xl:mt-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl xl:text-4xl font-serif text-hd-secondary mb-4">{t('boutique.categoriesTitle')}</h2>
          <p className="text-hd-text text-lg">{t('boutique.categoriesSubtitle')}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`px-6 py-2 rounded-full border font-medium transition-all ${
                selectedCategory === category.value
                  ? 'bg-hd-primary text-white border-hd-primary'
                  : 'border-hd-primary text-hd-secondary hover:bg-hd-primary hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-24 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 xl:py-24 bg-hd-surface rounded-3xl shadow-sm border border-hd-border max-w-4xl mx-auto">
            <i className="fas fa-search text-5xl text-gray-300 mb-6"></i>
            <h3 className="text-2xl font-semibold text-hd-secondary mb-3">{t('boutique.noResults')}</h3>
            <p className="text-hd-text text-lg">
              {searchQuery
                ? `${t('boutique.noResultsSearch')} "${searchQuery}"`
                : t('boutique.noResultsCat')
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 xl:gap-8 w-full">
            {currentProducts.map((product) => (
              <div key={product.id} className="card-premium subtle-border product-card">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = '/images/sac du riz.webp'; }}
                  />
                  {product.badge && (
                    <span className="badge-new absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                  <button
                    onClick={() => handleToggleFavorite(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-hd-surface/90 rounded-full flex items-center justify-center hover:bg-hd-primary hover:text-white transition-all"
                  >
                    <i className="far fa-heart text-sm"></i>
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg font-semibold text-hd-secondary mb-1">{product.name}</h3>
                  <p className="text-xs text-hd-muted mb-2">{product.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-xl font-bold text-hd-secondary">{product.price}</span>
                      <span className="text-sm text-hd-muted"> HTG/{product.unit}</span>
                    </div>
                    <span className={`text-xs ${product.stock > 20 ? 'text-green-600' : 'text-orange-600'}`}>
                      {product.stock > 20 ? t('common.inStock') : `${t('boutique.stockLow')} ${product.stock}`}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantities[product.id] || 1}
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                      className="flex-1 px-3 py-2 border border-hd-border bg-hd-surface rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary"
                    />
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn-primary flex-1 text-sm"
                    >
                      <i className="fas fa-cart-plus mr-1"></i> {t('boutique.addToCart')}
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
        <section className="pb-20 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-hd-border text-hd-secondary hover:bg-hd-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={() => { setSelectedCategory('frais'); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'frais'
                  ? 'bg-hd-primary text-white'
                  : 'border border-hd-border text-hd-secondary hover:bg-hd-primary hover:text-white'
              }`}
            >
              1
            </button>
            <button
              onClick={() => { setSelectedCategory('alimentaires'); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'alimentaires'
                  ? 'bg-hd-primary text-white'
                  : 'border border-hd-border text-hd-secondary hover:bg-hd-primary hover:text-white'
              }`}
            >
              2
            </button>
            <button
              onClick={() => { setSelectedCategory('quotidiens'); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'quotidiens'
                  ? 'bg-hd-primary text-white'
                  : 'border border-hd-border text-hd-secondary hover:bg-hd-primary hover:text-white'
              }`}
            >
              3
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-hd-border text-hd-secondary hover:bg-hd-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Boutique;
