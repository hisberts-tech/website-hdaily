import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';

const Paniers: React.FC = () => {
  const { addToCart } = useCart();
  const { addNotification } = useNotifications();

  const handlePanierOrder = (name: string, price: number) => {
    addToCart({
      id: Date.now(),
      name,
      price,
      category: 'frais',
      unit: 'panier',
      image: '/src/assets/images/panier-default.jpg',
      description: `Panier ${name}`,
      stock: 10,
    });
    addNotification(`${name} ajouté au panier!`, 'success');
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
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-1.5 border border-hd-primary/20 mb-5">
            <span className="w-2 h-2 rounded-full bg-hd-primary"></span>
            <span className="text-sm uppercase tracking-[0.2em] text-hd-primary font-bold">Paniers Pré-faits</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-hd-secondary leading-[1.15]">
            Nos <span className="text-hd-primary">paniers</span> sur mesure
          </h1>
          <p className="text-hd-text text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            Découvrez notre sélection de paniers prêts à l'emploi, conçus pour répondre à tous vos besoins.
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
                panier.popular ? 'ring-1 ring-hd-primary/40 transform scale-105' : ''
              }`}
            >
              {panier.popular && (
                <span className="badge-popular absolute -top-3 right-6 text-white text-[11px] font-bold px-3 py-1 rounded-full z-10">
                  Populaire
                </span>
              )}
                            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-semibold text-hd-secondary">{panier.name}</h3>
                    <p className="text-hd-muted text-sm mt-1">{panier.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <span className="text-xl font-bold text-black">{panier.price.toLocaleString()}</span>
                    <span className="text-sm text-hd-muted"> HTG</span>
                    {panier.originalPrice && (
                      <div className="text-xs text-gray-400 line-through">{panier.originalPrice.toLocaleString()} HTG</div>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="text-xs text-green-600 font-medium">
                    <i className="fas fa-check-circle mr-1"></i> Disponible immédiatement
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
                    className={`w-full py-3 rounded-full font-semibold shadow-md transition ${
                      panier.popular ? 'btn-primary' : 'bg-hd-secondary text-white hover:bg-hd-primary'
                    }`}
                  >
                    <i className="fas fa-shopping-cart mr-2"></i>
                    Commander ce panier
                  </button>
                  <Link
                    to="/contact"
                    className="block w-full py-3 border border-hd-border rounded-full text-center text-sm font-medium text-hd-secondary hover:border-hd-primary hover:text-hd-primary transition"
                  >
                    <i className="fas fa-phone mr-2"></i>
                    Contacter pour personnaliser
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
              <i className="fas fa-magic"></i> Service personnalisé
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary">Créez votre panier</h2>
            <div className="section-divider"></div>
            <p className="text-hd-text max-w-2xl mx-auto mt-4">
              Besoin d'un panier sur mesure? Notre équipe vous accompagne pour créer la composition parfaite.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-hd-secondary mb-4">Comment ça marche?</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-hd-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-hd-secondary">Contactez-nous</h4>
                      <p className="text-sm text-hd-text">Par téléphone, email ou WhatsApp</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-hd-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-hd-secondary">Exprimez vos besoins</h4>
                      <p className="text-sm text-hd-text">Budget, préférences, contraintes</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-hd-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-hd-secondary">Recevez une proposition</h4>
                      <p className="text-sm text-hd-text">Composition détaillée et devis</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-hd-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-hd-secondary">Livraison express</h4>
                      <p className="text-sm text-hd-text">En moins de 24h</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-lg text-hd-secondary mb-4">Demande de panier personnalisé</h4>
                <form className="space-y-3">
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="w-full px-4 py-2 rounded-lg border border-hd-border focus:outline-none focus:ring-2 focus:ring-hd-primary"
                  />
                  <input
                    type="tel"
                    placeholder="Votre téléphone"
                    className="w-full px-4 py-2 rounded-lg border border-hd-border focus:outline-none focus:ring-2 focus:ring-hd-primary"
                  />
                  <input
                    type="number"
                    placeholder="Budget approximatif (HTG)"
                    className="w-full px-4 py-2 rounded-lg border border-hd-border focus:outline-none focus:ring-2 focus:ring-hd-primary"
                  />
                  <textarea
                    placeholder="Décrivez vos besoins..."
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-hd-border focus:outline-none focus:ring-2 focus:ring-hd-primary"
                  ></textarea>
                  <button
                    type="button"
                    onClick={() => addNotification('Demande envoyée! Nous vous contacterons rapidement.', 'success')}
                    className="w-full btn-primary"
                  >
                    Envoyer la demande
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
