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
      <section className="hero-bg-pattern pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-1.5 border border-hd-primary/20 mb-5">
              <span className="w-2 h-2 rounded-full bg-hd-primary"></span>
              <span className="text-xs font-semibold text-hd-primary tracking-wide">Épicerie Premium en Haïti</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-hd-secondary leading-[1.15] tracking-tight">
              Des produits <br />
              <span className="text-hd-primary">d'exception</span> livrés chez vous
            </h1>
            <p className="text-hd-text text-lg max-w-xl mx-auto lg:mx-0 mt-6 leading-relaxed">
              Produits frais, paniers sur mesure et livraison rapide. Découvrez la nouvelle façon de faire vos courses.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-8">
              <Link to="/boutique" className="btn-primary">
                Explorer le menu <i className="fas fa-arrow-right ml-2"></i>
              </Link>
              <a href="#paniers" className="btn-outline">
                Voir nos coffrets
              </a>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src={heroImage} alt="Assortiment artisanal" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-hd-primary shadow-sm">
                Livraison 24h
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 inline-block">
                  <p className="text-hd-secondary font-medium text-xs uppercase tracking-wide">Assortiment premium</p>
                  <p className="text-hd-text text-xs mt-1">Fruits tropicaux, épices & produits frais</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-[0.2em] text-hd-primary font-bold">Notre sélection</span>
          <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary">Produits d'excellence</h2>
          <div className="section-divider"></div>
          <p className="text-hd-text max-w-2xl mx-auto mt-4">Des fruits frais aux produits du quotidien, tout est pensé pour votre confort.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-2xl font-semibold">{category.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{category.description}</p>
                    </div>
                    <i className={`fas ${category.icon} text-hd-primary text-xl`}></i>
                  </div>
                  <p className="text-hd-text text-sm mt-3">
                    {category.title.includes('Frais') ? 'Sélection quotidienne de produits biologiques et locaux. Livraison garantie en moins de 24h.' :
                     category.title.includes('Alimentaires') ? 'Riz premium, pâtes authentiques, huile d\'olive extra vierge. L\'essentiel de votre garde-manger.' :
                     'Articles ménagers, soins essentiels, produits d\'entretien écologiques. Tout pour le foyer.'}
                  </p>
                  <div className="mt-5 w-full py-2.5 border border-gray-200 rounded-full text-sm font-medium text-hd-secondary group-hover:bg-hd-primary group-hover:text-white transition-all inline-block text-center cursor-pointer">
                    Découvrir →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Paniers Pré-faits */}
      <section id="paniers" className="bg-hd-light py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-widest text-hd-primary font-bold">
              <i className="fas fa-gift"></i> Idéal pour toutes les occasions
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary">Nos Paniers Pré-faits</h2>
            <div className="section-divider"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paniers.map((panier, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg card-premium p-6 flex flex-col relative ${
                  panier.popular ? 'ring-1 ring-hd-primary/40 transform scale-105' : ''
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
                    <h3 className="font-serif text-2xl font-semibold mt-2">{panier.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-hd-primary">{panier.price.toLocaleString()}</span>
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
                    panier.popular ? 'btn-primary' : 'bg-hd-secondary text-white hover:bg-hd-primary'
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
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          {services.map((service, index) => (
            <div key={index} className="p-5">
              <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <i className={`fas ${service.icon} text-white text-2xl`}></i>
              </div>
              <h4 className="font-semibold text-lg">{service.title}</h4>
              <p className="text-sm text-hd-text">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-hd-secondary to-gray-800 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <i className="fas fa-crown text-4xl text-hd-primary mb-3"></i>
          <h2 className="font-serif text-4xl">Abonnement Premium</h2>
          <div className="w-24 h-0.5 bg-hd-primary mx-auto my-4"></div>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Recevez chaque semaine votre sélection personnalisée et bénéficiez de -10% sur tous vos achats
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button className="bg-white text-hd-secondary px-8 py-3 rounded-full font-semibold hover:bg-hd-primary hover:text-white transition">
              S'abonner dès maintenant
            </button>
            <button className="border border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/10">
              En savoir plus
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-hd-light py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 text-center lg:text-left">
            <span className="text-hd-primary font-bold tracking-wider uppercase">
              <i className="far fa-comment"></i> Besoin d'aide ?
            </span>
            <h3 className="font-serif text-3xl mt-2 text-hd-secondary">Notre équipe est à votre écoute</h3>
            <p className="text-hd-text mt-3">
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
