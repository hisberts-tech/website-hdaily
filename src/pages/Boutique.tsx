import React, { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { useLanguage } from '../context/LanguageContext';
import { Product, SaleVariant } from '../types';

type CatValue = 'frais' | 'alimentaires' | 'quotidiens';

const Boutique: React.FC = () => {
  const { filteredProducts, setSelectedCategory, searchQuery, setSearchQuery, loading } = useProducts();
  const { addToCart } = useCart();
  const { addNotification } = useNotifications();
  const { t } = useLanguage();
  const [saleMode, setSaleMode] = useState<SaleVariant>('detail');
  const [openCats, setOpenCats] = useState<Set<CatValue>>(new Set());
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  // Cette page gère les catégories elle-même (accordéon) : on neutralise le
  // filtre de catégorie du contexte pour ne garder que la recherche.
  useEffect(() => {
    setSelectedCategory('all');
  }, [setSelectedCategory]);

  // Prix / unité / quantité minimale effectifs selon le mode d'achat.
  const priceOf = (p: Product) => (saleMode === 'gros' && p.bulk ? p.bulk.price : p.price);
  const unitOf = (p: Product) => (saleMode === 'gros' && p.bulk ? p.bulk.unit : p.unit);
  const minQtyOf = (p: Product) => (saleMode === 'gros' ? p.bulk?.minQty ?? 1 : 1);

  const saleModes: { value: SaleVariant; label: string; icon: string }[] = [
    { value: 'gros',   label: t('boutique.modeGros'),   icon: 'fa-boxes-stacked' },
    { value: 'detail', label: t('boutique.modeDetail'), icon: 'fa-basket-shopping' },
  ];

  const categories: { value: CatValue; label: string; icon: string }[] = [
    { value: 'frais',        label: t('boutique.catFrais'), icon: 'fa-leaf' },
    { value: 'alimentaires', label: t('boutique.catAlim'),  icon: 'fa-wheat-awn' },
    { value: 'quotidiens',   label: t('boutique.catQuot'),  icon: 'fa-house' },
  ];

  // En gros : uniquement les produits disponibles au conditionnement.
  const baseProducts =
    saleMode === 'gros' ? filteredProducts.filter((p) => p.bulk) : filteredProducts;

  const productsInCat = (cat: CatValue) => baseProducts.filter((p) => p.category === cat);

  const searchActive = searchQuery.trim() !== '';
  // Recherche active → toutes les catégories avec résultats sont dépliées.
  const isOpen = (cat: CatValue) => searchActive || openCats.has(cat);

  const handleModeChange = (mode: SaleVariant) => {
    setSaleMode(mode);
    setOpenCats(new Set());
    setQuantities({});
  };

  const toggleCat = (cat: CatValue) => {
    setOpenCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const handleQuantityChange = (product: Product, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [product.id]: Math.max(minQtyOf(product), Math.min(quantity, 99)),
    }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || minQtyOf(product);
    addToCart(product, quantity, saleMode);
    addNotification(`${product.name} ${t('common.addToCart')} (${quantity} ${unitOf(product)})`, 'success');
    setQuantities((prev) => ({ ...prev, [product.id]: minQtyOf(product) }));
  };

  const handleToggleFavorite = (_productId: number) => {
    addNotification('Fonctionnalité favoris bientôt disponible!', 'info');
  };

  const renderCard = (product: Product) => {
    const qty = quantities[product.id] || minQtyOf(product);
    const outOfStock = product.stock <= 0;
    const isBulkPricing = saleMode === 'gros' && !!product.bulk;

    return (
      <div
        key={product.id}
        className={`card-premium subtle-border product-card group flex flex-col animate-fade-in ${outOfStock ? 'opacity-75' : ''}`}
      >
        <div className="relative h-48 overflow-hidden bg-hd-light">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => { e.currentTarget.src = '/images/sac du riz.webp'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            {product.badge && (
              <span className="badge-new text-white text-[10px] font-bold px-2 py-1 rounded-full">
                {product.badge}
              </span>
            )}
            {isBulkPricing && (
              <span className="bg-hd-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                <i className="fas fa-tag mr-1"></i>{t('boutique.modeGros')}
              </span>
            )}
          </div>

          {outOfStock && (
            <div className="absolute inset-0 bg-hd-secondary/60 flex items-center justify-center">
              <span className="bg-hd-surface text-hd-secondary text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
                {t('boutique.outOfStock')}
              </span>
            </div>
          )}

          <button
            onClick={() => handleToggleFavorite(product.id)}
            aria-label="favorite"
            className="absolute top-3 right-3 w-8 h-8 bg-hd-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-hd-primary hover:text-white transition-all shadow-sm"
          >
            <i className="far fa-heart text-sm"></i>
          </button>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-serif text-lg font-semibold text-hd-secondary leading-snug">{product.name}</h3>
          </div>
          <p className="text-xs text-hd-muted mb-3 line-clamp-2">{product.description}</p>

          <div className="flex justify-between items-end mb-4 mt-auto">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-hd-secondary">{priceOf(product)}</span>
                <span className="text-xs text-hd-muted">HTG/{unitOf(product)}</span>
              </div>
              {saleMode === 'gros' && product.bulk && (
                <span className="text-[11px] text-hd-muted line-through">
                  {product.price} HTG/{product.unit}
                </span>
              )}
            </div>
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
              outOfStock ? 'text-red-500' : product.stock > 20 ? 'text-green-600' : 'text-orange-600'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                outOfStock ? 'bg-red-500' : product.stock > 20 ? 'bg-green-600' : 'bg-orange-500'
              }`}></span>
              {outOfStock ? t('boutique.outOfStock') : product.stock > 20 ? t('common.inStock') : `${t('boutique.stockLow')} ${product.stock}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center border border-hd-border rounded-full overflow-hidden bg-hd-light shrink-0">
              <button
                type="button"
                onClick={() => handleQuantityChange(product, qty - 1)}
                disabled={outOfStock}
                aria-label={t('boutique.decreaseQty')}
                className="w-9 h-9 flex items-center justify-center text-hd-secondary hover:bg-hd-primary hover:text-white transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-hd-secondary"
              >
                <i className="fas fa-minus text-xs"></i>
              </button>
              <span className="w-9 text-center text-sm font-semibold text-hd-secondary tabular-nums">{qty}</span>
              <button
                type="button"
                onClick={() => handleQuantityChange(product, qty + 1)}
                disabled={outOfStock}
                aria-label={t('boutique.increaseQty')}
                className="w-9 h-9 flex items-center justify-center text-hd-secondary hover:bg-hd-primary hover:text-white transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-hd-secondary"
              >
                <i className="fas fa-plus text-xs"></i>
              </button>
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              disabled={outOfStock}
              className="btn-primary flex-1 text-sm py-2.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-card"
            >
              <i className="fas fa-cart-plus mr-1.5"></i> {t('boutique.addToCart')}
            </button>
          </div>
        </div>
      </div>
    );
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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-full border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary focus:border-transparent text-hd-secondary"
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-hd-muted"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Grande partie : menu En Gros / Détail, catégories masquées à l'intérieur */}
      <section className="pt-14 xl:pt-20 pb-20 xl:pb-28 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        <div className="text-center mb-8">
          <h2 className="text-3xl xl:text-4xl font-serif text-hd-secondary mb-3">{t('boutique.modeTitle')}</h2>
          <p className="text-hd-text text-lg">{t('boutique.modeSubtitle')}</p>
        </div>

        {/* Menu (onglets) des deux grandes parties */}
        <div role="tablist" aria-label={t('boutique.modeTitle')} className="flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2 bg-hd-light rounded-2xl p-2 border border-hd-border shadow-inner">
            {saleModes.map((mode) => {
              const active = saleMode === mode.value;
              return (
                <button
                  key={mode.value}
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleModeChange(mode.value)}
                  className={`flex items-center gap-3 px-6 xl:px-10 py-3.5 rounded-xl text-base xl:text-lg font-semibold transition-all duration-300 ${
                    active
                      ? 'bg-hd-primary text-white shadow-lg shadow-hd-primary/25 scale-[1.02]'
                      : 'text-hd-secondary hover:bg-hd-surface'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    active ? 'bg-white/20' : 'bg-hd-primary/10 text-hd-primary'
                  }`}>
                    <i className={`fas ${mode.icon} text-sm`}></i>
                  </span>
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panneau de la grande partie active */}
        <div
          role="tabpanel"
          className="max-w-6xl mx-auto mt-6 rounded-3xl border border-hd-border bg-hd-surface shadow-sm p-5 sm:p-6 xl:p-10 animate-fade-in"
        >
          <p className="text-center text-hd-text leading-relaxed max-w-2xl mx-auto">
            {saleMode === 'gros' ? t('boutique.modeGrosDesc') : t('boutique.modeDetailDesc')}
          </p>
          {saleMode === 'gros' && (
            <p className="text-center text-sm text-hd-muted mt-3">
              <i className="fas fa-circle-info mr-1"></i>
              {t('boutique.grosHint')}
            </p>
          )}

          <div className="mt-8 pt-8 border-t border-hd-border">
            <div className="text-center mb-6">
              <h3 className="text-xl xl:text-2xl font-serif text-hd-secondary">{t('boutique.categoriesTitle')}</h3>
              <p className="text-hd-muted text-sm mt-1">
                {searchActive
                  ? `${t('boutique.noResultsSearch')} "${searchQuery}"`
                  : `${t('boutique.categoriesHint')} · ${baseProducts.length} ${t('boutique.resultsCount')}`}
              </p>
            </div>

            {/* Accordéon : chaque catégorie est masquée jusqu'à ce qu'on la déplie */}
            <div className="space-y-4">
              {categories.map((cat) => {
                const items = productsInCat(cat.value);
                const open = isOpen(cat.value);
                return (
                  <div
                    key={cat.value}
                    className={`rounded-2xl border overflow-hidden transition-colors ${
                      open ? 'border-hd-primary/30' : 'border-hd-border'
                    }`}
                  >
                    <h4>
                      <button
                        onClick={() => toggleCat(cat.value)}
                        aria-expanded={open}
                        disabled={searchActive}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-hd-light text-left hover:bg-hd-primary/5 transition-colors disabled:cursor-default"
                      >
                        <span className="flex items-center gap-3 min-w-0">
                          <span className="w-10 h-10 shrink-0 rounded-full bg-hd-primary/10 flex items-center justify-center">
                            <i className={`fas ${cat.icon} text-hd-primary`}></i>
                          </span>
                          <span className="font-serif text-lg font-semibold text-hd-secondary truncate">{cat.label}</span>
                          <span className="text-[11px] font-semibold text-hd-primary bg-hd-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                            {items.length} {t('boutique.articles')}
                          </span>
                        </span>
                        <i className={`fas fa-chevron-down text-hd-muted transition-transform ${open ? 'rotate-180 text-hd-primary' : ''}`}></i>
                      </button>
                    </h4>

                    {open && (
                      <div className="p-4 sm:p-5 bg-hd-surface animate-slide-up">
                        {loading ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {[...Array(4)].map((_, i) => (
                              <div key={i} className="card-premium subtle-border animate-pulse">
                                <div className="h-48 bg-hd-light rounded-t-2xl"></div>
                                <div className="p-4 space-y-3">
                                  <div className="h-5 bg-hd-light rounded w-3/4"></div>
                                  <div className="h-4 bg-hd-light rounded w-full"></div>
                                  <div className="h-10 bg-hd-light rounded-xl"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : items.length === 0 ? (
                          <div className="text-center py-10">
                            <i className="fas fa-box-open text-3xl text-hd-muted/50 mb-3"></i>
                            <p className="text-hd-muted">
                              {saleMode === 'gros' && !searchActive
                                ? t('boutique.grosEmpty')
                                : t('boutique.noResultsCat')}
                            </p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-6 stagger-children">
                            {items.map(renderCard)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Boutique;
