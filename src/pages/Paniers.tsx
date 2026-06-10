import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { useLanguage } from '../context/LanguageContext';

const Paniers: React.FC = () => {
  const { addToCart } = useCart();
  const { addNotification } = useNotifications();
  const { t } = useLanguage();

  const handlePanierOrder = (name: string, price: number) => {
    addToCart({
      id: Date.now(),
      name,
      price,
      category: 'frais',
      unit: 'panier',
      image: '/src/assets/images/sac du riz.webp',
      description: `Panier ${name}`,
      stock: 10,
    });
    addNotification(`${name} ${t('common.addToCart')}!`, 'success');
  };

  const paniers = [
    {
      name: 'Panier Basic',
      price: 600,
      description: 'Pour vos besoins quotidiens essentiels',
      features: ['Riz premium', 'Pâtes', 'Huile végétale', 'Tomates fraîches'],
      popular: false,
      image: '/src/assets/images/pexels-badun-21044412.jpg',
    },
    {
      name: 'Panier Family',
      price: 1200,
      description: 'Idéal pour toute la famille',
      features: ['Riz superieur', 'Légumes variés', 'Fruits tropicaux', 'Produits laitiers & Œufs'],
      popular: true,
      image: '/src/assets/images/pexels-alisa-skripina-2147548092-35568378.jpg',
      originalPrice: 1500,
    },
    {
      name: 'Panier Premium',
      price: 2200,
      description: "L'excellence H-Daily",
      features: ['Sélection premium bio', 'Fruits & légumes rares', 'Produits importés', 'Livraison prioritaire & remise fidélité'],
      popular: false,
      image: '/src/assets/images/pexels-bertellifotografia-30893333.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-hd-cream">
      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-br from-hd-cream to-hd-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-hd-surface/70 backdrop-blur-sm rounded-full px-4 py-1.5 border border-hd-primary/20 mb-5">
            <span className="w-2 h-2 rounded-full bg-hd-primary"></span>
            <span className="text-sm uppercase tracking-[0.2em] text-hd-primary font-bold">{t('paniers.badge')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-hd-secondary leading-[1.15]">
            {t('paniers.title1')} <span className="text-hd-primary">{t('paniers.title2')}</span> {t('paniers.title3')}
          </h1>
          <p className="text-hd-text text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            {t('paniers.subtitle')}
          </p>
        </div>
      </section>

      {/* Paniers Grid */}
      <section className="pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paniers.map((panier, index) => (
            <div
              key={index}
              className={`card-premium subtle-border flex flex-col relative ${
                panier.popular ? 'ring-1 ring-hd-primary/40 lg:transform lg:scale-105' : ''
              }`}
            >
              {panier.popular && (
                <span className="badge-popular absolute -top-3 right-6 text-white text-[11px] font-bold px-3 py-1 rounded-full z-10">
                  {t('common.popular')}
                </span>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-semibold text-hd-secondary">{panier.name}</h3>
                    <p className="text-hd-muted text-sm mt-1">{panier.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <span className="text-xl font-bold text-hd-secondary">{panier.price.toLocaleString()}</span>
                    <span className="text-sm text-hd-muted"> HTG</span>
                    {panier.originalPrice && (
                      <div className="text-xs text-hd-muted line-through">{panier.originalPrice.toLocaleString()} HTG</div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-xs text-green-600 font-medium">
                    <i className="fas fa-check-circle mr-1"></i> {t('paniers.available')}
                  </span>
                </div>

                <ul className="space-y-2 text-sm text-hd-secondary mb-6 flex-1">
                  {panier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <i className="fas fa-check-circle text-hd-primary mr-2 mt-0.5 flex-shrink-0"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <button
                    onClick={() => handlePanierOrder(panier.name, panier.price)}
                    className="btn-primary w-full flex justify-center items-center py-3"
                  >
                    <i className="fas fa-shopping-cart mr-2"></i>
                    {t('paniers.orderBtn')}
                  </button>
                  <Link
                    to="/contact"
                    className="btn-secondary w-full flex justify-center items-center py-3"
                  >
                    <i className="fas fa-phone mr-2"></i>
                    {t('paniers.contactBtn')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Panier Section */}
      <section className="py-20 px-6 bg-hd-light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-widest text-hd-primary font-bold">
              <i className="fas fa-magic"></i> {t('paniers.customBadge')}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary">{t('paniers.customTitle')}</h2>
            <div className="section-divider"></div>
            <p className="text-hd-text max-w-2xl mx-auto mt-4">{t('paniers.customSubtitle')}</p>
          </div>

          <div className="bg-hd-surface rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-hd-secondary mb-4">{t('paniers.howTitle')}</h3>
                <div className="space-y-4">
                  {[
                    { title: t('paniers.step1Title'), desc: t('paniers.step1Desc') },
                    { title: t('paniers.step2Title'), desc: t('paniers.step2Desc') },
                    { title: t('paniers.step3Title'), desc: t('paniers.step3Desc') },
                    { title: t('paniers.step4Title'), desc: t('paniers.step4Desc') },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 bg-hd-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-hd-secondary">{step.title}</h4>
                        <p className="text-sm text-hd-text">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-hd-cream rounded-xl p-6">
                <h4 className="font-semibold text-lg text-hd-secondary mb-4">{t('paniers.formTitle')}</h4>
                <form className="space-y-3">
                  <input
                    type="text"
                    placeholder={t('paniers.fieldName')}
                    className="w-full px-4 py-2 rounded-lg border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary"
                  />
                  <input
                    type="tel"
                    placeholder={t('paniers.fieldPhone')}
                    className="w-full px-4 py-2 rounded-lg border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary"
                  />
                  <input
                    type="number"
                    placeholder={t('paniers.fieldBudget')}
                    className="w-full px-4 py-2 rounded-lg border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary"
                  />
                  <textarea
                    placeholder={t('paniers.fieldNeeds')}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary"
                  ></textarea>
                  <button
                    type="button"
                    onClick={() => addNotification('Demande envoyée! Nous vous contacterons rapidement.', 'success')}
                    className="w-full btn-primary"
                  >
                    {t('paniers.sendBtn')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Paniers;
