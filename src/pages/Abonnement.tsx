import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';

const Abonnement: React.FC = () => {
  const { addNotification } = useNotifications();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    frequency: 'weekly',
    deliveryDay: 'monday',
    deliveryTime: 'morning',
    paymentMethod: '',
    creditRequest: false
  });

  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Abonnement Basic',
      price: 2500,
      originalPrice: 3000,
      frequency: 'par semaine',
      description: 'Idéal pour les besoins essentiels',
      features: [
        'Livraison hebdomadaire',
        'Panier Basic personnalisé',
        '10% de réduction sur tous les produits',
        'Accès au crédit Express (jusqu\'à 5000 HTG)',
        'Support client prioritaire'
      ],
      popular: false
    },
    {
      id: 'family',
      name: 'Abonnement Family',
      price: 4500,
      originalPrice: 5500,
      frequency: 'par semaine',
      description: 'Parfait pour toute la famille',
      features: [
        'Livraison hebdomadaire ou mensuelle',
        'Panier Family sur mesure',
        '15% de réduction sur tous les produits',
        'Accès au crédit Standard (jusqu\'à 15000 HTG)',
        'Livraison prioritaire',
        'Produits exclusifs'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Abonnement Premium',
      price: 7500,
      originalPrice: 9000,
      frequency: 'par semaine',
      description: 'L\'excellence H-Daily',
      features: [
        'Livraison flexible (hebdomadaire/mensuelle)',
        'Panier Premium ultra-personnalisé',
        '20% de réduction sur tous les produits',
        'Accès au crédit Premium (jusqu\'à 30000 HTG)',
        'Livraison express en moins de 12h',
        'Produits bio et rares',
        'Conseiller personnel dédié'
      ],
      popular: false
    }
  ];

  const paymentMethods = [
    { id: 'moncash', name: 'MonCash', icon: 'fas fa-mobile-alt' },
    { id: 'natcash', name: 'NatCash', icon: 'fas fa-mobile-alt' },
    { id: 'cash', name: 'Paiement à la livraison', icon: 'fas fa-money-bill-wave' },
    { id: 'card', name: 'Carte bancaire', icon: 'fas fa-credit-card' }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan || !formData.paymentMethod) {
      addNotification('Veuillez sélectionner un plan et une méthode de paiement', 'error');
      return;
    }

    addNotification('Demande d\'abonnement envoyée! Nous vous contacterons sous 24h.', 'success');
    
    // Reset form
    setSelectedPlan('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      frequency: 'weekly',
      deliveryDay: 'monday',
      deliveryTime: 'morning',
      paymentMethod: '',
      creditRequest: false
    });
  };

  return (
    <div className="min-h-screen bg-hd-cream">
      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32 bg-gradient-to-br from-hd-cream to-hd-light">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-5 py-2 border border-hd-primary/20 mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-hd-primary animate-pulse"></span>
            <span className="text-sm uppercase tracking-[0.2em] text-hd-primary font-bold">Abonnement</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-hd-secondary leading-[1.1]">
            L'<span className="text-transparent bg-clip-text bg-gradient-to-r from-hd-primary to-emerald-600">abonnement</span> H-Daily
          </h1>
          <p className="text-hd-text text-lg xl:text-2xl max-w-3xl mx-auto mt-6 xl:mt-8 leading-relaxed font-light">
            Recevez des paniers frais régulièrement avec des avantages exclusifs et un service premium.
          </p>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-24 px-6 max-w-[1600px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-hd-secondary">Avantages exclusifs</h2>
          <div className="w-24 h-1 bg-hd-primary mx-auto my-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-truck text-white text-2xl"></i>
            </div>
            <h3 className="font-serif text-xl font-semibold text-hd-secondary mb-2">Livraison régulière</h3>
            <p className="text-hd-text">Chaque semaine ou chaque mois, selon vos besoins</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-percentage text-white text-2xl"></i>
            </div>
            <h3 className="font-serif text-xl font-semibold text-hd-secondary mb-2">Réductions spéciales</h3>
            <p className="text-hd-text">Jusqu'à 20% de réduction sur tous les produits</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-credit-card text-white text-2xl"></i>
            </div>
            <h3 className="font-serif text-xl font-semibold text-hd-secondary mb-2">Accès au crédit</h3>
            <p className="text-hd-text">Options de crédit flexibles jusqu'à 30,000 HTG</p>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-24 px-6 bg-gradient-to-b from-hd-light to-hd-cream border-y border-hd-border/50">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-hd-secondary">Choisissez votre plan</h2>
            <div className="w-24 h-1 bg-hd-primary mx-auto my-6 rounded-full"></div>
            <p className="text-hd-text text-lg lg:text-xl max-w-3xl mx-auto mt-4">
              Des plans flexibles adaptés à tous les budgets et besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full mb-16">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`card-premium subtle-border flex flex-col relative cursor-pointer transition-all ${
                  selectedPlan === plan.id ? 'ring-2 ring-hd-primary transform lg:scale-105' : ''
                } ${plan.popular ? 'ring-1 ring-hd-primary/40' : ''}`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {plan.popular && (
                  <span className="badge-popular absolute -top-3 right-6 text-white text-[11px] font-bold px-3 py-1 rounded-full z-10">
                    Le plus populaire
                  </span>
                )}
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl font-semibold text-hd-secondary mb-2">{plan.name}</h3>
                    <p className="text-hd-text text-sm mb-4">{plan.description}</p>
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-black">{plan.price.toLocaleString()}</span>
                      <span className="text-sm text-hd-muted"> HTG {plan.frequency}</span>
                    </div>
                    {plan.originalPrice && (
                      <div className="text-sm text-gray-400 line-through">
                        {plan.originalPrice.toLocaleString()} HTG {plan.frequency}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 text-sm text-hd-secondary mb-6 flex-1">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <i className="fas fa-check-circle text-hd-primary mr-3 mt-0.5 flex-shrink-0"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-full font-semibold shadow-md transition ${
                      selectedPlan === plan.id
                        ? 'bg-green-600 text-white ring-2 ring-green-400'
                        : 'bg-green-600 text-white hover:bg-green-500'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Sélectionné ✓' : 'Choisir ce plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary">Comment ça marche?</h2>
          <div className="section-divider"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-hd-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
              1
            </div>
            <h3 className="font-semibold text-lg text-hd-secondary mb-2">Visitez le site</h3>
            <p className="text-hd-text text-sm">Choisissez vos produits ou un panier pré-fait</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-hd-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
              2
            </div>
            <h3 className="font-semibold text-lg text-hd-secondary mb-2">Placez votre commande</h3>
            <p className="text-hd-text text-sm">Sélectionnez votre plan d'abonnement</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-hd-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
              3
            </div>
            <h3 className="font-semibold text-lg text-hd-secondary mb-2">Choisissez le paiement</h3>
            <p className="text-hd-text text-sm">Payez maintenant ou bénéficiez du crédit</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-hd-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
              4
            </div>
            <h3 className="font-semibold text-lg text-hd-secondary mb-2">Préparation</h3>
            <p className="text-hd-text text-sm">Nous préparons votre commande avec soin</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-hd-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
              5
            </div>
            <h3 className="font-semibold text-lg text-hd-secondary mb-2">Livraison à domicile</h3>
            <p className="text-hd-text text-sm">Livraison rapide et fiable</p>
          </div>
        </div>
      </section>

      {/* Product Selection */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary">Choisissez vos produits</h2>
          <div className="section-divider"></div>
          <p className="text-hd-text max-w-2xl mx-auto mt-4">
            Explorez notre boutique pour découvrir tous nos produits frais et choisir ceux que vous souhaitez recevoir régulièrement.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-hd-light to-white rounded-2xl border border-hd-border/60 shadow-sm p-10 text-center gap-6">
          <div className="w-20 h-20 bg-hd-primary/10 rounded-full flex items-center justify-center">
            <i className="fas fa-store text-hd-primary text-3xl"></i>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-semibold text-hd-secondary mb-2">Visitez notre boutique</h3>
            <p className="text-hd-text max-w-md mx-auto">
              Parcourez notre sélection complète de produits frais, épicerie et plus encore. Ajoutez vos favoris au panier et combinez votre abonnement.
            </p>
          </div>
          <Link
            to="/boutique"
            className="inline-flex items-center gap-3 bg-hd-primary text-white px-8 py-4 rounded-full font-semibold text-lg shadow-md hover:bg-hd-primary/90 transition-all hover:scale-105"
          >
            <i className="fas fa-shopping-basket"></i>
            Voir tous les produits
          </Link>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 px-6 bg-hd-light">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary">Méthodes de paiement</h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {paymentMethods.map((method) => (
              <div key={method.id} className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <i className={`${method.icon} text-hd-primary text-xl`}></i>
                </div>
                <p className="font-medium text-hd-secondary">{method.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-serif text-hd-secondary mb-6 text-center">Commencez votre abonnement</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Nom complet"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="px-5 py-3 rounded-xl border border-hd-border bg-white focus:outline-none focus:ring-2 focus:ring-hd-primary"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="px-5 py-3 rounded-xl border border-hd-border bg-white focus:outline-none focus:ring-2 focus:ring-hd-primary"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="tel"
                name="phone"
                placeholder="Téléphone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="px-5 py-3 rounded-xl border border-hd-border bg-white focus:outline-none focus:ring-2 focus:ring-hd-primary"
              />
              <input
                type="text"
                name="address"
                placeholder="Adresse de livraison"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="px-5 py-3 rounded-xl border border-hd-border bg-white focus:outline-none focus:ring-2 focus:ring-hd-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-hd-secondary mb-2">Fréquence de livraison</label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl border border-hd-border bg-white focus:outline-none focus:ring-2 focus:ring-hd-primary"
              >
                <option value="weekly">Chaque semaine</option>
                <option value="monthly">Chaque mois</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-hd-secondary mb-2">Jour de livraison</label>
              <select
                name="deliveryDay"
                value={formData.deliveryDay}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl border border-hd-border bg-white focus:outline-none focus:ring-2 focus:ring-hd-primary"
              >
                <option value="monday">Lundi</option>
                <option value="tuesday">Mardi</option>
                <option value="wednesday">Mercredi</option>
                <option value="thursday">Jeudi</option>
                <option value="friday">Vendredi</option>
                <option value="saturday">Samedi</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-hd-secondary mb-2">Heure de livraison</label>
              <select
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleInputChange}
                className="w-full px-5 py-3 rounded-xl border border-hd-border bg-white focus:outline-none focus:ring-2 focus:ring-hd-primary"
              >
                <option value="morning">Matin (8h - 12h)</option>
                <option value="afternoon">Après-midi (12h - 17h)</option>
                <option value="evening">Soir (17h - 20h)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-hd-secondary mb-2">Méthode de paiement</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {paymentMethods.map((method) => (
                  <label key={method.id} className="relative">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`cursor-pointer rounded-lg border-2 p-3 text-center transition-all ${
                      formData.paymentMethod === method.id
                        ? 'border-hd-primary bg-hd-primary/10'
                        : 'border-hd-border hover:border-hd-primary'
                    }`}>
                      <i className={`${method.icon} text-hd-primary mb-1`}></i>
                      <p className="text-xs font-medium">{method.name}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="creditRequest"
                id="creditRequest"
                checked={formData.creditRequest}
                onChange={handleInputChange}
                className="w-4 h-4 text-hd-primary border-gray-300 rounded focus:ring-hd-primary"
              />
              <label htmlFor="creditRequest" className="ml-2 text-sm text-hd-text">
                Je souhaite bénéficier d'une option de crédit
              </label>
            </div>

            <button
              type="submit"
              className="w-full btn-primary"
              disabled={!selectedPlan}
            >
              {selectedPlan ? 'Confirmer mon abonnement' : 'Sélectionnez un plan d\'abord'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Abonnement;
