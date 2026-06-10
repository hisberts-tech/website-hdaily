import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { useLanguage } from '../context/LanguageContext';
import heroImage from '../assets/images/pexels-alisa-skripina-2147548092-35568378.jpg';
import produitsFraisImage from '../assets/images/pexels-badun-21044412.jpg';
import alimentairesImage from '../assets/images/pexels-bertellifotografia-30893333.jpg';
import quotidiensImage from '../assets/images/pexels-david-iloba-28486424-14881644.jpg';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const cardIn = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Home: React.FC = () => {
  const { addToCart } = useCart();
  const { addNotification } = useNotifications();
  const { t } = useLanguage();

  const handlePanierOrder = (name: string, price: number) => {
    addToCart({
      id: Date.now(), name, price, category: 'frais', unit: 'panier',
      image: '/src/assets/images/sac du riz.webp',
      description: `Panier ${name}`, stock: 10,
    });
    addNotification(`${name} ${t('common.addToCart')}!`, 'success');
  };

  const productCategories = [
    { title: t('home.catFrais'),  description: t('home.catFraisDesc'), image: produitsFraisImage, href: '/boutique', icon: 'fa-spa',            tag: t('home.catFraisTag'), text: t('home.catFraisText') },
    { title: t('home.catAlim'),   description: t('home.catAlimDesc'),  image: alimentairesImage,  href: '/boutique', icon: 'fa-shopping-basket', tag: t('home.catAlimTag'),  text: t('home.catAlimText') },
    { title: t('home.catQuot'),   description: t('home.catQuotDesc'),  image: quotidiensImage,    href: '/boutique', icon: 'fa-home',            tag: t('home.catQuotTag'),  text: t('home.catQuotText') },
  ];

  const paniers = [
    { name: 'Panier Basic',   price: 600,  description: 'Pour vos besoins quotidiens essentiels', features: ['Riz premium','Pâtes','Huile végétale','Tomates fraîches'], popular: false },
    { name: 'Panier Family',  price: 1200, description: 'Idéal pour toute la famille', features: ['Riz superieur','Légumes variés','Fruits tropicaux','Produits laitiers & Œufs'], popular: true, originalPrice: 1500 },
    { name: 'Panier Premium', price: 2200, description: "L'excellence H-Daily", features: ['Sélection premium bio','Fruits & légumes rares','Produits importés','Livraison prioritaire & remise fidélité'], popular: false },
  ];

  const services = [
    { icon: 'fa-leaf',      title: t('home.svc100Fresh'),   description: t('home.svc100FreshDesc') },
    { icon: 'fa-truck',     title: t('home.svcDelivery'),   description: t('home.svcDeliveryDesc') },
    { icon: 'fa-lock',      title: t('home.svcPayment'),    description: t('home.svcPaymentDesc') },
    { icon: 'fa-handshake', title: t('home.svcCredit'),     description: t('home.svcCreditDesc') },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg-pattern pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24">
            <div className="text-center lg:text-left w-full lg:w-[45%] z-10">
              <div className="inline-flex items-center gap-2 bg-hd-surface/70 backdrop-blur-sm rounded-full px-5 py-2 border border-hd-primary/20 mb-6 lg:mb-8 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-hd-primary animate-pulse"></span>
                <span className="text-xs sm:text-sm font-semibold text-hd-primary tracking-wide uppercase">{t('home.heroBadge')}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-semibold text-hd-secondary leading-[1.1] tracking-tight">
                {t('home.heroTitle1')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-hd-primary to-emerald-600">{t('home.heroTitle2')}</span>{' '}
                <br className="hidden lg:block" />{t('home.heroTitle3')}
              </h1>
              <p className="text-hd-text text-base sm:text-lg md:text-xl xl:text-2xl max-w-2xl mx-auto lg:mx-0 mt-6 sm:mt-8 leading-relaxed font-light">
                {t('home.heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full mt-10 xl:mt-12">
                <Link to="/boutique" className="btn-primary flex justify-center items-center px-8 py-4 xl:px-10 xl:py-5 text-lg xl:text-xl">
                  {t('home.heroBtn1')} <i className="fas fa-arrow-right ml-2"></i>
                </Link>
                <a href="#paniers" className="btn-secondary flex justify-center items-center px-8 py-4 xl:px-10 xl:py-5 text-lg xl:text-xl">
                  {t('home.heroBtn2')}
                </a>
              </div>
            </div>
            <div className="w-full lg:w-[55%] max-w-2xl lg:max-w-none mx-auto relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-hd-primary/20 to-emerald-300/20 rounded-[2rem] blur-2xl transform rotate-3 scale-105 opacity-60"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] xl:aspect-[16/10] border-8 border-hd-surface/50 backdrop-blur-sm">
                <img src={heroImage} alt="Assortiment artisanal" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                <div className="absolute top-6 right-6 bg-hd-surface/95 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-hd-primary shadow-xl flex items-center gap-2">
                  <i className="fas fa-bolt text-yellow-500"></i> {t('home.heroBadgeDelivery')}
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-center">
                  <div className="bg-hd-surface/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl flex items-center gap-4 border border-hd-surface/50 w-full max-w-md">
                    <div className="w-12 h-12 bg-hd-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-leaf text-hd-primary text-xl"></i>
                    </div>
                    <div className="text-left">
                      <p className="text-hd-secondary font-bold text-sm sm:text-base uppercase tracking-wider">{t('home.heroPremium')}</p>
                      <p className="text-hd-text text-sm mt-1">{t('home.heroPremiumSub')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        <div className="text-center mb-16">
          <span className="text-sm md:text-base uppercase tracking-[0.3em] text-hd-primary font-bold">{t('home.categoriesLabel')}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-hd-secondary mt-3">{t('home.categoriesTitle')}</h2>
          <div className="w-24 h-1 bg-hd-primary mx-auto my-6 rounded-full"></div>
          <p className="text-hd-text text-lg lg:text-xl max-w-3xl mx-auto mt-4">{t('home.categoriesSubtitle')}</p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {productCategories.map((category, index) => (
            <motion.div key={index} variants={cardIn}>
            <Link to={category.href} className="block group">
              <div className="card-premium subtle-border cursor-pointer">
                <div className="h-56 relative overflow-hidden">
                  <img src={category.image} alt={category.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <span className="absolute bottom-3 left-3 text-[10px] font-semibold text-white bg-black/50 px-2 py-0.5 rounded-full">{category.tag}</span>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold text-hd-secondary">{category.title}</h3>
                      <p className="text-xs sm:text-sm text-hd-muted mt-1">{category.description}</p>
                    </div>
                    <i className={`fas ${category.icon} text-hd-primary text-xl`}></i>
                  </div>
                  <p className="text-hd-text text-xs sm:text-sm mt-2 sm:mt-3">{category.text}</p>
                  <div className="mt-5 w-full py-3 border border-hd-border rounded-full text-base font-medium text-hd-secondary group-hover:bg-hd-primary group-hover:text-white transition-all inline-block text-center cursor-pointer">
                    {t('home.discoverSelection')} <i className="fas fa-arrow-right ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                  </div>
                </div>
              </div>
            </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Paniers Pré-faits */}
      <section id="paniers" className="bg-gradient-to-b from-hd-light to-hd-cream py-24">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
          <div className="text-center mb-16">
            <span className="text-sm md:text-base uppercase tracking-[0.3em] text-hd-primary font-bold">
              <i className="fas fa-gift mr-2"></i> {t('home.paniersLabel')}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary mt-3">{t('home.paniersTitle')}</h2>
            <div className="w-24 h-1 bg-hd-primary mx-auto my-6 rounded-full"></div>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {paniers.map((panier, index) => (
              <motion.div key={index} variants={cardIn} className={`bg-hd-surface rounded-2xl shadow-lg card-premium p-6 flex flex-col relative ${panier.popular ? 'ring-1 ring-hd-primary/40 lg:scale-105 z-10' : ''}`}>
                {panier.popular && (
                  <span className="badge-popular absolute -top-3 right-6 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    {t('common.popular')}
                  </span>
                )}
                <div className="flex justify-between items-start">
                  <div>
                    <i className={`fas ${panier.name.includes('Basic') ? 'fa-shopping-basket' : panier.name.includes('Family') ? 'fa-crown' : 'fa-star'} text-2xl text-hd-primary`}></i>
                    <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold mt-2 text-hd-secondary">{panier.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-lg sm:text-xl font-bold text-hd-primary">{panier.price.toLocaleString()}</span>
                    <span className="text-sm text-hd-muted"> {t('common.htg')}</span>
                    {panier.originalPrice && (
                      <div className="text-xs text-hd-muted line-through">{panier.originalPrice.toLocaleString()} HTG</div>
                    )}
                  </div>
                </div>
                <p className="text-hd-muted text-sm mt-1">{panier.description}</p>
                <div className="mb-3"><span className="text-xs text-green-600">{t('common.inStock')}</span></div>
                <ul className="mt-4 space-y-2 text-sm text-hd-secondary">
                  {panier.features.map((feature, idx) => (
                    <li key={idx}><i className="fas fa-check-circle text-hd-primary mr-2"></i>{feature}</li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePanierOrder(panier.name, panier.price)}
                  className={`mt-6 w-full py-2.5 rounded-full font-semibold shadow-md transition ${
                    panier.name.includes('Basic')
                      ? 'bg-hd-primary text-white hover:bg-hd-primary-dark'
                      : 'bg-hd-surface border-2 border-hd-primary text-hd-primary hover:bg-hd-primary hover:text-white'
                  }`}
                >
                  {t('common.order')}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center w-full"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={fadeUp} className="p-5">
              <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-md hover:scale-110 transition-transform">
                <i className={`fas ${service.icon} text-white text-2xl`}></i>
              </div>
              <h4 className="font-semibold text-base sm:text-lg text-hd-secondary">{service.title}</h4>
              <p className="text-xs sm:text-sm text-hd-text">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Loyalty Program Teaser */}
      <section className="py-20 px-6 bg-gradient-to-br from-hd-secondary to-black text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-5">
                <i className="fas fa-star text-yellow-400 text-xs"></i>
                <span className="text-xs font-bold uppercase tracking-widest text-yellow-300">{t('home.loyaltyBadge')}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-4">{t('home.loyaltyTitle')}</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">{t('home.loyaltySubtitle')}</p>
              <Link to="/fidelite" className="inline-flex items-center gap-3 bg-hd-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-hd-primary/90 transition hover:scale-105">
                <i className="fas fa-star"></i> {t('home.loyaltyBtn')}
              </Link>
            </div>
            <div className="flex-shrink-0 grid grid-cols-2 gap-4 w-full max-w-xs">
              {[
                { tier: 'Bronze',  icon: 'fa-medal', color: 'text-amber-400',  pts: '0 pts',      benefit: `5% ${t('home.loyaltyDiscount')}` },
                { tier: 'Argent',  icon: 'fa-medal', color: 'text-slate-300',  pts: '500 pts',    benefit: `10% ${t('home.loyaltyDiscount')}` },
                { tier: 'Or',      icon: 'fa-crown', color: 'text-yellow-400', pts: '2 000 pts',  benefit: `15% ${t('home.loyaltyDiscount')}` },
                { tier: 'Platine', icon: 'fa-gem',   color: 'text-purple-400', pts: '5 000 pts',  benefit: `20% ${t('home.loyaltyDiscount')}` },
              ].map((tier) => (
                <div key={tier.tier} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                  <i className={`fas ${tier.icon} text-2xl ${tier.color} mb-2 block`}></i>
                  <p className="font-bold text-white text-sm">{tier.tier}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{tier.pts}</p>
                  <p className={`text-xs font-semibold mt-1 ${tier.color}`}>{tier.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-24 px-6 bg-hd-light border-t border-hd-border">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 text-center">
          <div className="inline-flex items-center gap-3 bg-hd-primary/10 rounded-full px-6 py-3 border border-hd-primary/30 mb-6">
            <i className="fas fa-crown text-hd-primary text-xl"></i>
            <span className="text-sm uppercase tracking-[0.2em] text-hd-primary font-bold">Service Premium</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-hd-secondary mb-6">{t('home.subscriptionTitle')}</h2>
          <p className="text-lg sm:text-xl md:text-2xl text-hd-text max-w-3xl mx-auto font-light leading-relaxed">{t('home.subscriptionText')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
            <Link to="/abonnement" className="btn-primary flex justify-center items-center px-10 py-5 text-lg font-bold">{t('home.subscriptionBtn1')}</Link>
            <a href="#contact" className="btn-secondary flex justify-center items-center px-10 py-5 text-lg font-bold">{t('home.subscriptionBtn2')}</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gradient-to-b from-hd-cream to-hd-surface py-24 px-6 border-t border-hd-border">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 flex flex-col lg:flex-row gap-16 xl:gap-24 items-center">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 text-hd-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
              <i className="far fa-comment-dots text-xl"></i> {t('home.contactBadge')}
            </span>
            <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-2 text-hd-secondary leading-tight">{t('home.contactTitle')}</h3>
            <p className="text-hd-text text-lg xl:text-xl mt-6 leading-relaxed">{t('home.contactSubtitle')}</p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <i className="fas fa-phone text-hd-primary w-6"></i><span className="text-hd-text">+509 3913 4651</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <i className="far fa-envelope text-hd-primary w-6"></i><span className="text-hd-text">hisberts@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <i className="fab fa-whatsapp text-hd-primary w-6"></i><span className="text-hd-text">WhatsApp Business (24/7)</span>
              </div>
            </div>
            <a href="https://wa.me/50939134651" className="inline-flex items-center gap-2 mt-6 bg-hd-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md hover:bg-hd-primary-dark transition">
              <i className="fab fa-whatsapp"></i> {t('home.contactWhatsapp')}
            </a>
          </div>
          <div className="flex-1 w-full bg-hd-surface/60 rounded-2xl p-8 shadow-sm border border-hd-border">
            <form className="space-y-4">
              <input type="text"  placeholder={t('home.contactFieldName')}  className="w-full px-5 py-3 rounded-xl border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary" />
              <input type="email" placeholder={t('home.contactFieldEmail')} className="w-full px-5 py-3 rounded-xl border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary" />
              <textarea rows={3}  placeholder={t('home.contactFieldMsg')}   className="w-full px-5 py-3 rounded-xl border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary"></textarea>
              <button type="button" className="btn-primary w-full">
                {t('home.contactSend')} <i className="far fa-paper-plane ml-1"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
