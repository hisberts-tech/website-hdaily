import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';
import { useLoyalty, SUBSCRIPTION_BONUS } from '../context/LoyaltyContext';
import { useLanguage } from '../context/LanguageContext';
import { api, SubscriptionPayload } from '../lib/api';
import MonCashPaymentModal, { MonCashPlan } from '../components/MonCashPaymentModal';

const Abonnement: React.FC = () => {
  const { addNotification } = useNotifications();
  const { addPoints } = useLoyalty();
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [moncashPlan, setMoncashPlan] = useState<MonCashPlan | null>(null);
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
      frequency: t('common.perWeek'),
      description: 'Idéal pour les besoins essentiels',
      features: [
        'Livraison hebdomadaire',
        'Panier Basic personnalisé',
        '10% de réduction sur tous les produits',
        "Accès au crédit Express (jusqu'à 5000 HTG)",
        'Support client prioritaire'
      ],
      popular: false
    },
    {
      id: 'family',
      name: 'Abonnement Family',
      price: 4500,
      originalPrice: 5500,
      frequency: t('common.perWeek'),
      description: 'Parfait pour toute la famille',
      features: [
        'Livraison hebdomadaire ou mensuelle',
        'Panier Family sur mesure',
        '15% de réduction sur tous les produits',
        "Accès au crédit Standard (jusqu'à 15000 HTG)",
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
      frequency: t('common.perWeek'),
      description: "L'excellence H-Daily",
      features: [
        'Livraison flexible (hebdomadaire/mensuelle)',
        'Panier Premium ultra-personnalisé',
        '20% de réduction sur tous les produits',
        "Accès au crédit Premium (jusqu'à 30000 HTG)",
        'Livraison express en moins de 12h',
        'Produits bio et rares',
        'Conseiller personnel dédié'
      ],
      popular: false
    }
  ];

  const paymentMethods = [
    { id: 'moncash', name: 'MonCash',               icon: 'fas fa-mobile-alt' },
    { id: 'natcash', name: 'NatCash',               icon: 'fas fa-mobile-alt' },
    { id: 'cash',    name: 'Paiement à la livraison',icon: 'fas fa-money-bill-wave' },
    { id: 'card',    name: 'Carte bancaire',         icon: 'fas fa-credit-card' },
  ];

  const handlePlanSelect = (planId: string) => setSelectedPlan(planId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan || !formData.paymentMethod) {
      addNotification('Veuillez sélectionner un plan et une méthode de paiement', 'error');
      return;
    }
    const payload: SubscriptionPayload = {
      planId: selectedPlan as SubscriptionPayload['planId'],
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      frequency: formData.frequency as SubscriptionPayload['frequency'],
      deliveryDay: formData.deliveryDay,
      deliveryTime: formData.deliveryTime,
      paymentMethod: formData.paymentMethod as SubscriptionPayload['paymentMethod'],
      creditRequest: formData.creditRequest,
    };
    setSubmitting(true);
    try {
      await api.subscribe(payload);
      const bonus = SUBSCRIPTION_BONUS[selectedPlan] ?? 0;
      if (bonus > 0) {
        const planLabel = subscriptionPlans.find(p => p.id === selectedPlan)?.name ?? 'Abonnement';
        addPoints(bonus, `Souscription — ${planLabel}`);
        addNotification(`Demande d'abonnement envoyée ! +${bonus} points de fidélité offerts 🎉`, 'success');
      } else {
        addNotification("Demande d'abonnement envoyée ! Nous vous contacterons sous 24h.", 'success');
      }
      setSelectedPlan('');
      setFormData({ name: '', email: '', phone: '', address: '', frequency: 'weekly', deliveryDay: 'monday', deliveryTime: 'morning', paymentMethod: '', creditRequest: false });
    } catch (err) {
      addNotification(err instanceof Error ? err.message : "Échec de l'envoi de la demande", 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-hd-cream">
      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32 bg-gradient-to-br from-hd-cream to-hd-light">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-16 text-center">
          <div className="inline-flex items-center gap-2 bg-hd-surface/70 backdrop-blur-sm rounded-full px-5 py-2 border border-hd-primary/20 mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-hd-primary animate-pulse"></span>
            <span className="text-sm uppercase tracking-[0.2em] text-hd-primary font-bold">{t('abonnement.badge')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-hd-secondary leading-[1.1]">
            {t('abonnement.title1')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-hd-primary to-emerald-600">{t('abonnement.title2')}</span> {t('abonnement.title3')}
          </h1>
          <p className="text-hd-text text-lg xl:text-2xl max-w-3xl mx-auto mt-6 xl:mt-8 leading-relaxed font-light">
            {t('abonnement.subtitle')}
          </p>
        </div>
      </section>

      {/* Benefits Overview */}
      <section className="py-24 px-6 max-w-[1600px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-hd-secondary">{t('abonnement.benefitsTitle')}</h2>
          <div className="w-24 h-1 bg-hd-primary mx-auto my-6 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full">
          {[
            { icon: 'fa-truck',       title: t('abonnement.benefit1Title'), desc: t('abonnement.benefit1Desc') },
            { icon: 'fa-percentage',  title: t('abonnement.benefit2Title'), desc: t('abonnement.benefit2Desc') },
            { icon: 'fa-credit-card', title: t('abonnement.benefit3Title'), desc: t('abonnement.benefit3Desc') },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="text-center">
              <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`fas ${icon} text-white text-2xl`}></i>
              </div>
              <h3 className="font-serif text-xl font-semibold text-hd-secondary mb-2">{title}</h3>
              <p className="text-hd-text">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-24 px-6 bg-gradient-to-b from-hd-light to-hd-cream border-y border-hd-border/50">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-hd-secondary">{t('abonnement.plansTitle')}</h2>
            <div className="w-24 h-1 bg-hd-primary mx-auto my-6 rounded-full"></div>
            <p className="text-hd-text text-lg lg:text-xl max-w-3xl mx-auto mt-4">{t('abonnement.plansSubtitle')}</p>
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
                    {t('common.popular')}
                  </span>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl font-semibold text-hd-secondary mb-2">{plan.name}</h3>
                    <p className="text-hd-text text-sm mb-4">{plan.description}</p>
                    <div className="mb-2">
                      <span className="text-3xl font-bold text-hd-secondary">{plan.price.toLocaleString()}</span>
                      <span className="text-sm text-hd-muted"> HTG {plan.frequency}</span>
                    </div>
                    {plan.originalPrice && (
                      <div className="text-sm text-hd-muted line-through">
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

                  {/* Loyalty bonus badge */}
                  <div className="flex items-center justify-center gap-1.5 bg-hd-primary/5 rounded-lg py-2 mb-2 border border-hd-primary/15">
                    <i className="fas fa-star text-hd-primary text-xs"></i>
                    <span className="text-xs font-semibold text-hd-primary">
                      +{SUBSCRIPTION_BONUS[plan.id]} points de fidélité offerts
                    </span>
                  </div>

                  <button
                    className={`w-full py-3 rounded-full font-semibold shadow-md transition flex items-center justify-center gap-2 ${
                      selectedPlan === plan.id
                        ? 'bg-hd-primary text-white ring-2 ring-hd-primary/40 shadow-hd-primary/25'
                        : 'bg-hd-surface border-2 border-hd-primary text-hd-primary hover:bg-hd-primary hover:text-white'
                    }`}
                  >
                    {selectedPlan === plan.id
                      ? <><i className="fas fa-check-circle"></i> {t('abonnement.selectedPlan')}</>
                      : t('abonnement.selectPlan')}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMoncashPlan({ id: plan.id as MonCashPlan['id'], name: plan.name, price: plan.price });
                    }}
                    className="w-full mt-3 py-3 rounded-full font-semibold border-2 border-hd-primary text-hd-primary hover:bg-hd-primary hover:text-white transition flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-mobile-alt"></i> {t('abonnement.payMoncash')}
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
          <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary">{t('abonnement.howTitle')}</h2>
          <div className="section-divider"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { num: '1', title: t('abonnement.step1'),    desc: t('abonnement.step1Desc') },
            { num: '2', title: t('abonnement.step2'),    desc: t('abonnement.step2Desc') },
            { num: '3', title: t('abonnement.step3'),    desc: t('abonnement.step3Desc') },
            { num: '4', title: t('abonnement.step4'),    desc: t('abonnement.step4Desc') },
            { num: '5', title: t('abonnement.step5'),    desc: t('abonnement.step5Desc') },
          ].map(({ num, title, desc }, idx, arr) => (
            <div key={num} className="relative text-center">
              {idx < arr.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-1/2 w-full h-0.5 bg-hd-primary/20 -z-0"></div>
              )}
              <div className="relative z-10 w-12 h-12 bg-hd-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 shadow-md">{num}</div>
              <h3 className="font-semibold text-base text-hd-secondary mb-2">{title}</h3>
              <p className="text-hd-text text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Selection */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary">{t('abonnement.productsTitle')}</h2>
          <div className="section-divider"></div>
          <p className="text-hd-text max-w-2xl mx-auto mt-4">{t('abonnement.productsSubtitle')}</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-hd-light to-hd-surface rounded-2xl border border-hd-border/60 shadow-sm p-10 text-center gap-6">
          <div className="w-20 h-20 bg-hd-primary/10 rounded-full flex items-center justify-center">
            <i className="fas fa-store text-hd-primary text-3xl"></i>
          </div>
          <div>
            <h3 className="text-2xl font-serif font-semibold text-hd-secondary mb-2">{t('abonnement.visitShop')}</h3>
            <p className="text-hd-text max-w-md mx-auto">{t('abonnement.visitShopDesc')}</p>
          </div>
          <Link
            to="/boutique"
            className="inline-flex items-center gap-3 bg-hd-primary text-white px-8 py-4 rounded-full font-semibold text-lg shadow-md hover:bg-hd-primary/90 transition-all hover:scale-105"
          >
            <i className="fas fa-shopping-basket"></i>
            {t('abonnement.seeProducts')}
          </Link>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 px-6 bg-hd-light">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary">{t('abonnement.payTitle')}</h2>
            <div className="section-divider"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {paymentMethods.map((method) => (
              <div key={method.id} className="text-center">
                <div className="w-16 h-16 bg-hd-surface rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
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
        <div className="bg-hd-surface rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-serif text-hd-secondary mb-6 text-center">{t('abonnement.formTitle')}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text"  name="name"    placeholder={t('abonnement.fieldName')}    value={formData.name}    onChange={handleInputChange} required className="px-5 py-3 rounded-xl border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary" />
              <input type="email" name="email"   placeholder={t('abonnement.fieldEmail')}   value={formData.email}   onChange={handleInputChange} required className="px-5 py-3 rounded-xl border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="tel"  name="phone"   placeholder={t('abonnement.fieldPhone')}   value={formData.phone}   onChange={handleInputChange} required className="px-5 py-3 rounded-xl border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary" />
              <input type="text" name="address" placeholder={t('abonnement.fieldAddress')} value={formData.address} onChange={handleInputChange} required className="px-5 py-3 rounded-xl border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary" />
            </div>

            <div>
              <label className="block text-sm font-medium text-hd-secondary mb-2">{t('abonnement.frequency')}</label>
              <select name="frequency" value={formData.frequency} onChange={handleInputChange} className="w-full px-5 py-3 rounded-xl border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary">
                <option value="weekly">{t('abonnement.freqWeekly')}</option>
                <option value="monthly">{t('abonnement.freqMonthly')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-hd-secondary mb-2">{t('abonnement.deliveryDay')}</label>
              <select name="deliveryDay" value={formData.deliveryDay} onChange={handleInputChange} className="w-full px-5 py-3 rounded-xl border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary">
                <option value="monday">Lundi</option>
                <option value="tuesday">Mardi</option>
                <option value="wednesday">Mercredi</option>
                <option value="thursday">Jeudi</option>
                <option value="friday">Vendredi</option>
                <option value="saturday">Samedi</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-hd-secondary mb-2">{t('abonnement.deliveryTime')}</label>
              <select name="deliveryTime" value={formData.deliveryTime} onChange={handleInputChange} className="w-full px-5 py-3 rounded-xl border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary">
                <option value="morning">{t('abonnement.timeMorning')}</option>
                <option value="afternoon">{t('abonnement.timeAfternoon')}</option>
                <option value="evening">{t('abonnement.timeEvening')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-hd-secondary mb-2">{t('abonnement.payMethod')}</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {paymentMethods.map((method) => (
                  <label key={method.id} className="relative">
                    <input type="radio" name="paymentMethod" value={method.id} checked={formData.paymentMethod === method.id} onChange={handleInputChange} className="sr-only" />
                    <div className={`cursor-pointer rounded-lg border-2 p-3 text-center transition-all ${
                      formData.paymentMethod === method.id
                        ? 'border-hd-primary bg-hd-primary/10'
                        : 'border-hd-border hover:border-hd-primary'
                    }`}>
                      <i className={`${method.icon} text-hd-primary mb-1`}></i>
                      <p className="text-xs font-medium text-hd-secondary">{method.name}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <input type="checkbox" name="creditRequest" id="creditRequest" checked={formData.creditRequest} onChange={handleInputChange} className="w-4 h-4 text-hd-primary border-gray-300 rounded focus:ring-hd-primary" />
              <label htmlFor="creditRequest" className="ml-2 text-sm text-hd-text">{t('abonnement.creditOption')}</label>
            </div>

            <button type="submit" className="w-full btn-primary disabled:opacity-60" disabled={!selectedPlan || submitting}>
              {submitting
                ? t('abonnement.sending')
                : selectedPlan
                ? t('abonnement.confirmBtn')
                : t('abonnement.selectFirst')}
            </button>
          </form>
        </div>
      </section>

      <MonCashPaymentModal plan={moncashPlan} onClose={() => setMoncashPlan(null)} />
    </div>
  );
};

export default Abonnement;
