import React, { useState } from 'react';
import ProcessFlow from '../components/ProcessFlow';
import { useLanguage } from '../context/LanguageContext';

const Services: React.FC = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const { t } = useLanguage();

  const services = [
    {
      icon: 'fas fa-truck',
      title: t('services.svcDeliveryTitle'),
      description: 'Service de livraison rapide et fiable dans toute la région de Port-au-Prince et ses environs. Nous garantissons la fraîcheur de vos produits avec un système de chaîne du froid contrôlé.',
      features: [
        'Livraison en moins de 24h',
        'Suivi de commande en temps réel via WhatsApp',
        'Livraison programmée disponible (choisissez votre créneau)',
        'Emballage isotherme sécurisé',
        'Notification SMS avant livraison',
        'Livraison même le week-end',
        'Retour gratuit si produit endommagé',
        'Assurance qualité sur tous les produits'
      ],
      benefits: [
        'Économisez temps et argent',
        'Produits toujours frais et de qualité',
        'Flexibilité horaire adaptée à votre emploi du temps',
        'Service client disponible 7j/7'
      ],
      process: [
        'Commande en ligne ou par téléphone',
        'Confirmation immédiate',
        'Préparation personnalisée',
        'Livraison à votre porte',
        'Vérification qualité avec vous'
      ],
      popular: false
    },
    {
      icon: 'fas fa-credit-card',
      title: t('services.svcPayTitle'),
      description: 'Multiple options de paiement sécurisées pour votre confort. Acceptons toutes les méthodes de paiement populaires en Haïti avec transactions cryptées et protégées.',
      features: [
        'MonCash - Instantané et sécurisé',
        'NatCash - Rapide et fiable',
        'Paiement à la livraison - Cash',
        'Carte bancaire - Visa/Mastercard',
        'Options de crédit intégrées',
        'Paiement en plusieurs fois disponible',
        'Facture détaillée fournie',
        'Remboursement 48h si insatisfaction'
      ],
      benefits: [
        'Aucun frais de transaction cachés',
        'Paiement sécurisé et crypté',
        'Flexibilité totale de choix',
        'Reçus automatiques par email',
        'Historique de paiements consultable'
      ],
      process: [
        'Sélection des produits',
        'Choix de la méthode de paiement',
        'Validation sécurisée',
        'Confirmation instantanée',
        'Reçu automatique'
      ],
      popular: false
    },
    {
      icon: 'fas fa-credit-card',
      title: t('services.svcCreditTitle'),
      description: 'Solutions de crédit adaptées à vos besoins avec des conditions transparentes et des taux compétitifs. Achetez maintenant et payez selon votre rythme.',
      features: [
        "Crédit 7 jours avec seulement 10% d'intérêt",
        "Crédit 1 mois avec seulement 10% d'intérêt",
        'Approbation rapide en moins de 2h',
        'Montants de 1,000 à 50,000 HTG',
        'Aucun document complexe requis',
        'Possibilité de renouvellement',
        'Remboursement flexible',
        'Pas de frais de dossier cachés'
      ],
      benefits: [
        'Accès immédiat aux produits',
        'Gérez votre budget facilement',
        "Taux d'intérêt les plus bas du marché",
        'Processus simple et rapide',
        'Confidentialité totale garantie'
      ],
      process: [
        'Demande de crédit en ligne',
        'Vérification rapide (ID et téléphone)',
        'Approbation instantanée',
        'Réception des produits',
        'Paiement échelonné selon échéance'
      ],
      popular: true
    },
    {
      icon: 'fas fa-crown',
      title: t('services.svcSubTitle'),
      description: "Service premium d'abonnement personnalisé avec livraison régulière et avantages exclusifs. Profitez de réductions spéciales et d'un service prioritaire.",
      features: [
        'Livraison hebdomadaire ou mensuelle au choix',
        'Réduction de 15% à 20% sur tous les produits',
        'Paniers personnalisés selon vos préférences',
        'Produits bio et locaux prioritaires',
        'Service client dédié 24/7',
        'Livraison express gratuite',
        'Points de fidélité cumulables',
        'Accès aux nouveaux produits en avant-première',
        'Modification gratuite de votre panier',
        'Pause ou annulation sans frais'
      ],
      benefits: [
        'Économies substantielles mensuelles',
        'Produits toujours frais et sélectionnés',
        'Gain de temps considérable',
        'Surprise exclusive chaque mois',
        'Sérénité et régularité',
        'Famille nourrie sainement'
      ],
      process: [
        'Consultation personnalisée gratuite',
        'Création de votre profil de préférences',
        'Sélection de votre fréquence de livraison',
        'Première livraison avec cadeaux de bienvenue',
        'Ajustements selon vos retours'
      ],
      popular: false
    }
  ];

  const serviceKeys = ['livraison', 'paiement', 'credit', 'abonnement'];

  return (
    <div className="min-h-screen bg-hd-cream">
      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32 bg-gradient-to-br from-hd-cream to-hd-light">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 text-center">
          <div className="inline-flex items-center gap-2 bg-hd-surface/70 backdrop-blur-sm rounded-full px-5 py-2 border border-hd-primary/20 mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-hd-primary animate-pulse"></span>
            <span className="text-sm uppercase tracking-[0.2em] text-hd-primary font-bold">{t('services.badge')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-hd-secondary leading-[1.1]">
            {t('services.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-hd-primary to-emerald-600">{t('services.title2')}</span>
          </h1>
          <p className="text-hd-text text-lg xl:text-2xl max-w-3xl mx-auto mt-6 xl:mt-8 leading-relaxed font-light">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-hd-secondary">{t('services.overviewTitle')}</h2>
          <div className="w-24 h-1 bg-hd-primary mx-auto my-6 rounded-full"></div>
          <p className="text-hd-text text-lg lg:text-xl max-w-3xl mx-auto mt-4">{t('services.overviewSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full">
          {services.map((svc, i) => (
            <div key={i} className="bg-hd-surface rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${svc.icon} text-white text-2xl`}></i>
              </div>
              {svc.popular && (
                <div className="mb-2">
                  <span className="bg-hd-primary text-white text-xs font-bold px-2 py-1 rounded-full">{t('common.popular')}</span>
                </div>
              )}
              <h3 className="font-serif text-xl font-semibold text-hd-secondary mb-3">{svc.title}</h3>
              <p className="text-hd-text text-sm mb-4">
                {i === 0 ? t('services.svcDeliveryDesc') :
                 i === 1 ? t('services.svcPayDesc') :
                 i === 2 ? t('services.svcCreditDesc') :
                           t('services.svcSubDesc')}
              </p>
              <button
                onClick={() => setExpandedService(expandedService === serviceKeys[i] ? null : serviceKeys[i])}
                className="text-hd-primary font-semibold hover:text-hd-primary-dark transition"
              >
                {expandedService === serviceKeys[i] ? t('services.lessDetails') : t('services.learnMore')}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Service Details */}
      {expandedService && (
        <section className="py-20 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
          {expandedService === 'livraison' && (
            <article id="livraison-details" className="bg-hd-surface rounded-2xl shadow-lg p-8 mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-hd-primary rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-truck text-white text-xl"></i>
                </div>
                <h3 className="font-serif text-3xl font-semibold text-hd-secondary">{t('services.svcDeliveryTitle')}</h3>
              </div>
              <div className="prose prose-lg max-w-none text-hd-text">
                <p className="text-lg leading-relaxed mb-6">
                  Notre service de livraison à domicile révolutionne votre expérience d'achat en vous apportant les produits les plus frais directement à votre porte.
                </p>
                <h4 className="font-semibold text-xl text-hd-secondary mb-4">Comment ça fonctionne ?</h4>
                <p className="mb-4">
                  Le processus est simple et conçu pour votre confort. Vous commandez depuis chez vous via notre plateforme en ligne ou par téléphone, notre équipe prépare votre commande avec le plus grand soin, et nous la livrons en moins de 24 heures.
                </p>
                <ProcessFlow steps={services[0].process} vertical={true} />
                <h4 className="font-semibold text-xl text-hd-secondary mb-4">Nos garanties de qualité</h4>
                <ul className="space-y-2 mb-6">
                  {services[0].features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start">
                      <i className="fas fa-check text-hd-primary mr-3 mt-1"></i><span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )}

          {expandedService === 'paiement' && (
            <article id="paiement-details" className="bg-hd-surface rounded-2xl shadow-lg p-8 mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-hd-primary rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-credit-card text-white text-xl"></i>
                </div>
                <h3 className="font-serif text-3xl font-semibold text-hd-secondary">{t('services.svcPayTitle')}</h3>
              </div>
              <div className="prose prose-lg max-w-none text-hd-text">
                <p className="text-lg leading-relaxed mb-6">
                  Nous comprenons que chaque client a des préférences différentes en matière de paiement. C'est pourquoi nous avons mis en place un système de paiement flexible qui accepte toutes les méthodes populaires en Haïti.
                </p>
                <h4 className="font-semibold text-xl text-hd-secondary mb-4">Méthodes de paiement acceptées</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {['MonCash', 'NatCash', 'Paiement à la livraison', 'Carte bancaire'].map((m) => (
                    <div key={m} className="bg-hd-light rounded-lg p-4">
                      <h5 className="font-semibold text-hd-secondary mb-2">{m}</h5>
                    </div>
                  ))}
                </div>
                <ProcessFlow steps={services[1].process} title="Étapes du paiement" vertical={true} />
              </div>
            </article>
          )}

          {expandedService === 'credit' && (
            <article id="credit-details" className="bg-hd-surface rounded-2xl shadow-lg p-8 mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-hd-primary rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-credit-card text-white text-xl"></i>
                </div>
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-3xl font-semibold text-hd-secondary">{t('services.svcCreditTitle')}</h3>
                  <span className="bg-hd-primary text-white text-sm font-bold px-3 py-1 rounded-full">{t('common.popular')}</span>
                </div>
              </div>
              <div className="prose prose-lg max-w-none text-hd-text">
                <p className="text-lg leading-relaxed mb-6">
                  Notre service de crédit est conçu pour vous donner accès aux produits dont vous avez besoin, quand vous en avez besoin, sans attendre votre prochaine paie.
                </p>
                <h4 className="font-semibold text-xl text-hd-secondary mb-4">Conditions de crédit simples</h4>
                <div className="bg-hd-primary/10 rounded-xl p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-hd-secondary mb-3">Crédit 7 jours</h5>
                      <ul className="space-y-2">
                        <li>• Taux d'intérêt : seulement 10%</li>
                        <li>• Montants : 1,000 à 25,000 HTG</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-hd-secondary mb-3">Crédit 1 mois</h5>
                      <ul className="space-y-2">
                        <li>• Taux d'intérêt : seulement 10%</li>
                        <li>• Montants : 1,000 à 50,000 HTG</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <ProcessFlow steps={services[2].process} title="Étapes de demande de crédit" vertical={true} />
              </div>
            </article>
          )}

          {expandedService === 'abonnement' && (
            <article id="abonnement-details" className="bg-hd-surface rounded-2xl shadow-lg p-8 mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-hd-primary rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-crown text-white text-xl"></i>
                </div>
                <h3 className="font-serif text-3xl font-semibold text-hd-secondary">{t('services.svcSubTitle')}</h3>
              </div>
              <div className="prose prose-lg max-w-none text-hd-text">
                <p className="text-lg leading-relaxed mb-6">
                  Transformez votre expérience d'achat avec notre service d'abonnement premium. Recevez régulièrement des paniers personnalisés remplis de produits frais et locaux.
                </p>
                <ProcessFlow steps={services[3].process} title="Étapes de démarrage" vertical={true} />
              </div>
            </article>
          )}
        </section>
      )}

      {/* Statistics Section */}
      <section className="py-24 px-6 bg-hd-light">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-hd-secondary">{t('services.statsTitle')}</h2>
            <div className="w-24 h-1 bg-hd-primary mx-auto my-6 rounded-full"></div>
            <p className="text-hd-text text-lg xl:text-xl max-w-3xl mx-auto mt-4">{t('services.statsSubtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 w-full">
            {[
              { val: '10k+', label: t('services.statClients') },
              { val: '50k+', label: t('services.statDeliveries') },
              { val: '98%',  label: t('services.statSatisfaction') },
              { val: '24h',  label: t('services.statGuarantee') },
            ].map(({ val, label }) => (
              <div key={val} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-hd-primary mb-3">{val}</div>
                <p className="text-hd-secondary font-medium text-lg">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-hd-secondary">{t('services.testimonialsTitle')}</h2>
          <div className="w-24 h-1 bg-hd-primary mx-auto my-6 rounded-full"></div>
          <p className="text-hd-text text-lg xl:text-xl max-w-3xl mx-auto mt-4">{t('services.testimonialsSubtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full">
          {[
            { initials: 'JD', name: 'Jean Dupont',   role: 'Client abonné',    quote: "Le service d'abonnement a transformé mon quotidien. Produits toujours frais, livraison ponctuelle et économies substantielles. Je recommande vivement!" },
            { initials: 'MP', name: 'Marie Pierre',  role: 'Mère de famille',  quote: "La livraison à domicile est un vrai gain de temps. Plus besoin de faire les courses, tout vient à moi. Les produits sont toujours de qualité supérieure." },
            { initials: 'PJ', name: 'Paul Joseph',   role: 'Entrepreneur',     quote: "Le service de crédit m'a permis de gérer mon budget efficacement. Processus simple, approbation rapide et conditions transparentes. Excellent service!" },
          ].map(({ initials, name, role, quote }) => (
            <div key={name} className="bg-hd-surface rounded-2xl p-8 shadow-lg subtle-border hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-hd-primary rounded-full flex items-center justify-center mr-4 shadow-md">
                  <span className="text-white font-bold text-xl">{initials}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-hd-secondary">{name}</h4>
                  <p className="text-sm text-hd-text">{role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star text-yellow-400 text-sm mr-1"></i>)}
              </div>
              <p className="text-hd-text italic text-lg leading-relaxed">"{quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-hd-light to-hd-cream">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-hd-secondary">{t('services.faqTitle')}</h2>
            <div className="w-24 h-1 bg-hd-primary mx-auto my-6 rounded-full"></div>
            <p className="text-hd-text text-lg xl:text-xl max-w-3xl mx-auto mt-4">{t('services.faqSubtitle')}</p>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Comment fonctionne la livraison à domicile?', a: 'Notre service de livraison fonctionne en 3 étapes simples : 1) Commandez en ligne ou par téléphone, 2) Nous préparons vos produits avec soin, 3) Nous livrons à votre porte en moins de 24h.' },
              { q: 'Quelles sont les conditions pour le service de crédit?', a: "Le crédit est accessible à toute personne majeure avec une pièce d'identité valide et un numéro de téléphone. Les montants vont de 1,000 à 50,000 HTG avec seulement 10% d'intérêt." },
              { q: 'Puis-je modifier mon abonnement?', a: "Oui! Votre abonnement est entièrement flexible. Vous pouvez modifier les produits, changer la fréquence de livraison, mettre en pause ou annuler sans frais." },
              { q: 'Quels modes de paiement acceptez-vous?', a: 'Nous acceptons tous les modes de paiement populaires en Haïti : MonCash, NatCash, paiement à la livraison en espèces, et cartes bancaires Visa/Mastercard.' },
            ].map(({ q, a }, i) => (
              <details key={i} className="bg-hd-surface rounded-2xl p-6 shadow-lg group">
                <summary className="font-semibold text-lg text-hd-secondary cursor-pointer list-none flex items-center justify-between">
                  {q}
                  <i className="fas fa-chevron-down text-hd-primary group-open:rotate-180 transition-transform"></i>
                </summary>
                <p className="mt-4 text-hd-text">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-hd-cream to-hd-surface border-t border-hd-border">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-hd-secondary mb-6">{t('services.ctaTitle')}</h2>
          <p className="text-lg xl:text-xl text-hd-text mb-16 max-w-3xl mx-auto leading-relaxed">{t('services.ctaSubtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full">
            <div className="bg-hd-surface rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-hd-border/50">
              <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-md group-hover:scale-110 transition-transform">
                <i className="fas fa-phone text-2xl"></i>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-hd-secondary mb-3">{t('services.ctaPhone')}</h3>
              <p className="mb-6 text-hd-text">{t('services.ctaPhoneDesc')}</p>
              <a href="tel:+50939134651" className="inline-block bg-hd-surface border-2 border-hd-primary text-hd-primary px-8 py-3 rounded-full font-semibold hover:bg-hd-primary hover:text-white transition-all">
                +509 3913 4651
              </a>
            </div>
            <div className="bg-hd-surface rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-hd-border/50">
              <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-md group-hover:scale-110 transition-transform">
                <i className="fab fa-whatsapp text-3xl"></i>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-hd-secondary mb-3">{t('services.ctaWhatsapp')}</h3>
              <p className="mb-6 text-hd-text">{t('services.ctaWhatsappDesc')}</p>
              <a href="https://wa.me/50939134651" className="inline-block bg-[#25D366] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#128C7E] transition-all hover:scale-105">
                {t('services.ctaWhatsappBtn')}
              </a>
            </div>
            <div className="bg-hd-surface rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-hd-border/50">
              <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-md group-hover:scale-110 transition-transform">
                <i className="far fa-envelope text-2xl"></i>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-hd-secondary mb-3">{t('services.ctaEmail')}</h3>
              <p className="mb-6 text-hd-text">{t('services.ctaEmailDesc')}</p>
              <a href="mailto:contact@hdaily.ht" className="inline-block bg-hd-surface border-2 border-hd-primary text-hd-primary px-8 py-3 rounded-full font-semibold hover:bg-hd-primary hover:text-white transition-all">
                {t('services.ctaEmailBtn')}
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="/boutique" className="btn-primary flex justify-center items-center">
              <i className="fas fa-shopping-cart mr-3"></i> {t('services.orderBtn')}
            </a>
            <a href="/abonnement" className="btn-secondary flex justify-center items-center">
              <i className="fas fa-crown mr-3"></i> {t('services.subscribeBtn')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
