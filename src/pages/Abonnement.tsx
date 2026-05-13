import React, { useState } from 'react';
import { useNotifications } from '../context/NotificationContext';

const Abonnement: React.FC = () => {
  const { addNotification } = useNotifications();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
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

  const availableProducts = [
    { id: 'rice', name: 'Riz premium', price: 500, unit: 'kg' },
    { id: 'pasta', name: 'Pâtes', price: 300, unit: 'paquet' },
    { id: 'oil', name: 'Huile végétale', price: 450, unit: 'bouteille' },
    { id: 'tomatoes', name: 'Tomates fraîches', price: 200, unit: 'kg' },
    { id: 'vegetables', name: 'Légumes mixtes', price: 350, unit: 'panier' },
    { id: 'fruits', name: 'Fruits tropicaux', price: 400, unit: 'panier' },
    { id: 'milk', name: 'Lait', price: 150, unit: 'litre' },
    { id: 'eggs', name: 'Œufs', price: 250, unit: 'douzaine' },
  ];

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

  const handleProductToggle = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
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
    setSelectedProducts([]);
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
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-br from-hd-cream to-hd-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-1.5 border border-hd-primary/20 mb-5">
            <span className="w-2 h-2 rounded-full bg-hd-primary"></span>
            <span className="text-sm uppercase tracking-[0.2em] text-hd-primary font-bold">Abonnement</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-hd-secondary leading-[1.15]">
            L'<span className="text-hd-primary">abonnement</span> H-Daily
          </h1>
          <p className="text-hd-text text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            Recevez des paniers frais régulièrement avec des avantages exclusifs et un service premium.
          </p>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary">Avantages exclusifs</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section className="py-20 px-6 bg-hd-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary">Choisissez votre plan</h2>
            <div className="section-divider"></div>
            <p className="text-hd-text max-w-2xl mx-auto mt-4">
              Des plans flexibles adaptés à tous les budgets et besoins
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto mb-16">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`card-premium subtle-border flex flex-col relative cursor-pointer transition-all ${
                  selectedPlan === plan.id ? 'ring-2 ring-hd-primary transform scale-105' : ''
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
                        ? 'bg-hd-primary text-white'
                        : 'bg-hd-secondary text-white hover:bg-hd-primary'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Sélectionné' : 'Choisir ce plan'}
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
            Sélectionnez les produits que vous souhaitez recevoir régulièrement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {availableProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductToggle(product.id)}
              className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                selectedProducts.includes(product.id)
                  ? 'border-hd-primary bg-hd-primary/10'
                  : 'border-hd-border hover:border-hd-primary'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-hd-secondary">{product.name}</h4>
                {selectedProducts.includes(product.id) && (
                  <i className="fas fa-check-circle text-hd-primary"></i>
                )}
              </div>
              <p className="text-sm text-hd-text">
                {product.price} HTG / {product.unit}
              </p>
            </div>
          ))}
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
