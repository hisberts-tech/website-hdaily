import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import heroImage from '../assets/images/pexels-alisa-skripina-2147548092-35568378.jpg';
import produitsFraisImage from '../assets/images/pexels-badun-21044412.jpg';
import alimentairesImage from '../assets/images/pexels-bertellifotografia-30893333.jpg';
import quotidiensImage from '../assets/images/pexels-david-iloba-28486424-14881644.jpg';

const Home: React.FC = () => {
  const { addToCart } = useCart();
  const { addNotification } = useNotifications();

  const handlePanierOrder = (name: string, price: number) => {
    // Add to cart as a special panier item
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
    addNotification(`${name} ajouté au panier!`, 'success');
  };

  const productCategories = [
    {
      title: 'Produits Frais',
      description: 'Légumes & fruits de saison',
      image: produitsFraisImage,
      href: '/boutique',
      icon: 'fa-spa',
    },
    {
      title: 'Produits Alimentaires',
      description: 'Épicerie, pâtes, riz, huiles',
      image: alimentairesImage,
      href: '/boutique',
      icon: 'fa-shopping-basket',
    },
    {
      title: 'Produits Quotidiens',
      description: 'Hygiène & entretien',
      image: quotidiensImage,
      href: '/boutique',
      icon: 'fa-home',
    },
  ];

  const paniers = [
    {
      name: 'Panier Basic',
      price: 600,
      description: 'Pour vos besoins quotidiens essentiels',
      features: ['Riz premium', 'Pâtes', 'Huile végétale', 'Tomates fraîches'],
      popular: false,
    },
    {
      name: 'Panier Family',
      price: 1200,
      description: 'Idéal pour toute la famille',
      features: ['Riz superieur', 'Légumes variés', 'Fruits tropicaux', 'Produits laitiers & Œufs'],
      popular: true,
      originalPrice: 1500,
    },
    {
      name: 'Panier Premium',
      price: 2200,
      description: "L'excellence H-Daily",
      features: ['Sélection premium bio', 'Fruits & légumes rares', 'Produits importés', 'Livraison prioritaire & remise fidélité'],
      popular: false,
    },
  ];

  const services = [
    {
      icon: 'fa-leaf',
      title: '100% Frais',
      description: 'Sélection quotidienne',
    },
    {
      icon: 'fa-truck',
      title: 'Livraison Rapide',
      description: 'Expédition en 24h',
    },
    {
      icon: 'fa-lock',
      title: 'Paiement sécurisé',
      description: 'MonCash, Natcash, cartes, livraison',
    },
    {
      icon: 'fa-handshake',
      title: 'Crédit disponible',
      description: 'Paiement flexible',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg-pattern pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24">
            <div className="text-center lg:text-left w-full lg:w-[45%] z-10">
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-5 py-2 border border-hd-primary/20 mb-6 lg:mb-8 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-hd-primary animate-pulse"></span>
                <span className="text-xs sm:text-sm font-semibold text-hd-primary tracking-wide uppercase">Épicerie Premium en Haïti</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-semibold text-hd-secondary leading-[1.1] tracking-tight">
                Des produits <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-hd-primary to-emerald-600">d'exception</span> <br className="hidden lg:block"/> livrés chez vous
              </h1>
              <p className="text-hd-text text-base sm:text-lg md:text-xl xl:text-2xl max-w-2xl mx-auto lg:mx-0 mt-6 sm:mt-8 leading-relaxed font-light">
                Produits frais, paniers sur mesure et livraison rapide. Découvrez la nouvelle façon de faire vos courses en Haïti, sans compromis sur la qualité.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full mt-10 xl:mt-12">
                <Link to="/boutique" className="btn-primary flex justify-center items-center px-8 py-4 xl:px-10 xl:py-5 text-lg xl:text-xl">
                  Explorer le menu <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </Link>
                <a href="#paniers" className="btn-secondary flex justify-center items-center px-8 py-4 xl:px-10 xl:py-5 text-lg xl:text-xl">
                  Voir nos coffrets
                </a>
              </div>
            </div>
            <div className="w-full lg:w-[55%] max-w-2xl lg:max-w-none mx-auto relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-hd-primary/20 to-emerald-300/20 rounded-[2rem] blur-2xl transform rotate-3 scale-105 opacity-60"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] xl:aspect-[16/10] border-8 border-white/50 backdrop-blur-sm">
                <img src={heroImage} alt="Assortiment artisanal" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-hd-primary shadow-xl flex items-center gap-2">
                  <i className="fas fa-bolt text-yellow-500"></i> Livraison 24h
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-center">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl flex items-center gap-4 border border-white/50 w-full max-w-md">
                    <div className="w-12 h-12 bg-hd-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-leaf text-hd-primary text-xl"></i>
                    </div>
                    <div className="text-left">
                      <p className="text-hd-secondary font-bold text-sm sm:text-base uppercase tracking-wider">Assortiment premium</p>
                      <p className="text-hd-text text-sm mt-1">Fruits tropicaux, épices & produits frais</p>
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
          <span className="text-sm md:text-base uppercase tracking-[0.3em] text-hd-primary font-bold">Notre sélection</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-hd-secondary mt-3">Produits d'excellence</h2>
          <div className="w-24 h-1 bg-hd-primary mx-auto my-6 rounded-full"></div>
          <p className="text-hd-text text-lg lg:text-xl max-w-3xl mx-auto mt-4">Des fruits frais aux produits du quotidien, tout est pensé pour votre confort et une qualité sans compromis.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full">
          {productCategories.map((category, index) => (
            <Link key={index} to={category.href} className="block group">
              <div className="card-premium subtle-border cursor-pointer">
                <div className="h-56 relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <span className="absolute bottom-3 left-3 text-[10px] font-semibold text-white bg-black/50 px-2 py-0.5 rounded-full">
                    {category.title.includes('Frais') ? 'Marché frais' : 
                     category.title.includes('Alimentaires') ? 'Épicerie fine' : 'Soins & hygiène'}
                  </span>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold">{category.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">{category.description}</p>
                    </div>
                    <i className={`fas ${category.icon} text-hd-primary text-xl`}></i>
                  </div>
                  <p className="text-hd-text text-xs sm:text-sm mt-2 sm:mt-3">
                    {category.title.includes('Frais') ? 'Sélection quotidienne de produits biologiques et locaux. Livraison garantie en moins de 24h.' :
                     category.title.includes('Alimentaires') ? 'Riz premium, pâtes authentiques, huile d\'olive extra vierge. L\'essentiel de votre garde-manger.' :
                     'Articles ménagers, soins essentiels, produits d\'entretien écologiques. Tout pour le foyer.'}
                  </p>
                  <div className="mt-5 w-full py-3 border border-gray-200 rounded-full text-base font-medium text-hd-secondary group-hover:bg-hd-primary group-hover:text-white transition-all inline-block text-center cursor-pointer">
                    Découvrir la sélection <i className="fas fa-arrow-right ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Paniers Pré-faits */}
      <section id="paniers" className="bg-gradient-to-b from-hd-light to-hd-cream py-24">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
          <div className="text-center mb-16">
            <span className="text-sm md:text-base uppercase tracking-[0.3em] text-hd-primary font-bold">
              <i className="fas fa-gift mr-2"></i> Idéal pour toutes les occasions
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary mt-3">Nos Paniers Pré-faits</h2>
            <div className="w-24 h-1 bg-hd-primary mx-auto my-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full">
            {paniers.map((panier, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg card-premium p-6 flex flex-col relative transition-transform ${
                  panier.popular ? 'ring-1 ring-hd-primary/40 lg:transform lg:scale-105 z-10' : ''
                }`}
              >
                {panier.popular && (
                  <span className="badge-popular absolute -top-3 right-6 text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    Populaire
                  </span>
                )}
                <div className="flex justify-between items-start">
                  <div>
                    <i className={`fas ${panier.name.includes('Basic') ? 'fa-shopping-basket' : 
                                   panier.name.includes('Family') ? 'fa-crown' : 'fa-star'} 
                                   text-2xl text-hd-primary`}></i>
                    <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold mt-2">{panier.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-lg sm:text-xl font-bold text-hd-primary">{panier.price.toLocaleString()}</span>
                    <span className="text-sm text-hd-muted"> HTG</span>
                    {panier.originalPrice && (
                      <div className="text-xs text-gray-400 line-through">{panier.originalPrice.toLocaleString()} HTG</div>
                    )}
                  </div>
                </div>
                <p className="text-hd-muted text-sm mt-1">{panier.description}</p>
                <div className="mb-3">
                  <span className="text-xs text-green-600">En stock</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-hd-secondary">
                  {panier.features.map((feature, idx) => (
                    <li key={idx}>
                      <i className="fas fa-check-circle text-hd-primary mr-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePanierOrder(panier.name, panier.price)}
                  className={`mt-6 w-full py-2.5 rounded-full font-semibold shadow-md transition ${
                    panier.name.includes('Basic')
                      ? 'bg-hd-primary text-white hover:bg-hd-primary-dark'
                      : 'bg-white border-2 border-hd-primary text-hd-primary hover:bg-hd-primary hover:text-white'
                  }`}
                >
                  Commander
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center w-full">
          {services.map((service, index) => (
            <div key={index} className="p-5">
              <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <i className={`fas ${service.icon} text-white text-2xl`}></i>
              </div>
              <h4 className="font-semibold text-base sm:text-lg">{service.title}</h4>
              <p className="text-xs sm:text-sm text-hd-text">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-24 px-6 bg-hd-light border-t border-hd-border">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 text-center">
          <div className="w-20 h-20 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <i className="fas fa-crown text-4xl text-white"></i>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-hd-secondary mb-6">L'Abonnement Premium</h2>
          <p className="text-lg sm:text-xl md:text-2xl text-hd-text max-w-3xl mx-auto font-light leading-relaxed">
            Recevez chaque semaine votre sélection personnalisée et bénéficiez de -20% sur tous vos achats. L'excellence livrée à votre porte.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
            <Link to="/abonnement" className="btn-primary flex justify-center items-center px-10 py-5 text-lg font-bold">
              S'abonner dès maintenant
            </Link>
            <a href="#contact" className="btn-secondary flex justify-center items-center px-10 py-5 text-lg font-bold">
              En savoir plus
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gradient-to-b from-hd-cream to-white py-24 px-6 border-t border-hd-border">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 flex flex-col lg:flex-row gap-16 xl:gap-24 items-center">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 text-hd-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
              <i className="far fa-comment-dots text-xl"></i> Besoin d'aide ?
            </span>
            <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-2 text-hd-secondary leading-tight">Notre équipe est à votre écoute</h3>
            <p className="text-hd-text text-lg xl:text-xl mt-6 leading-relaxed">
              Que ce soit par téléphone, email ou WhatsApp, nous répondons en quelques minutes.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <i className="fas fa-phone text-hd-primary w-6"></i>
                <span>+509 3913 4651</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <i className="far fa-envelope text-hd-primary w-6"></i>
                <span>hisberts@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <i className="fab fa-whatsapp text-hd-primary w-6"></i>
                <span>WhatsApp Business (24/7)</span>
              </div>
            </div>
            <a href="https://wa.me/50939134651" className="inline-flex items-center gap-2 mt-6 bg-hd-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md hover:bg-hd-primary-dark transition">
              <i className="fab fa-whatsapp"></i> Contacter via WhatsApp
            </a>
          </div>
          <div className="flex-1 w-full bg-white/60 rounded-2xl p-8 shadow-sm border border-hd-border">
            <form className="space-y-4">
              <input type="text" placeholder="Nom complet" className="w-full px-5 py-3 rounded-xl border border-hd-border bg-white focus:outline-none focus:ring-2 focus:ring-hd-primary" />
              <input type="email" placeholder="Email" className="w-full px-5 py-3 rounded-xl border border-hd-border bg-white focus:outline-none focus:ring-2 focus:ring-hd-primary" />
              <textarea rows={3} placeholder="Votre message ..." className="w-full px-5 py-3 rounded-xl border border-hd-border bg-white focus:outline-none focus:ring-2 focus:ring-hd-primary"></textarea>
              <button type="button" className="btn-primary w-full">
                Envoyer le message <i className="far fa-paper-plane ml-1"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
