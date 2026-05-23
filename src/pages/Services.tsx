import React, { useState } from 'react';
import ProcessFlow from '../components/ProcessFlow';

const Services: React.FC = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const services = [
    {
      icon: 'fas fa-truck',
      title: 'Livraison à domicile',
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
      title: 'Paiement flexible',
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
      title: 'Credit service',
      description: 'Solutions de crédit adaptées à vos besoins avec des conditions transparentes et des taux compétitifs. Achetez maintenant et payez selon votre rythme.',
      features: [
        'Crédit 7 jours avec seulement 10% d\'intérêt',
        'Crédit 1 mois avec seulement 10% d\'intérêt',
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
        'Taux d\'intérêt les plus bas du marché',
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
      title: 'Abonnement',
      description: 'Service premium d\'abonnement personnalisé avec livraison régulière et avantages exclusifs. Profitez de réductions spéciales et d\'un service prioritaire.',
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

  return (
    <div className="min-h-screen bg-hd-cream">
      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32 bg-gradient-to-br from-hd-cream to-hd-light">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-5 py-2 border border-hd-primary/20 mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-hd-primary animate-pulse"></span>
            <span className="text-sm uppercase tracking-[0.2em] text-hd-primary font-bold">Services</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-hd-secondary leading-[1.1]">
            Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-hd-primary to-emerald-600">services</span>
          </h1>
          <p className="text-hd-text text-lg xl:text-2xl max-w-3xl mx-auto mt-6 xl:mt-8 leading-relaxed font-light">
            Découvrez tous les services que H-Daily propose pour faciliter votre quotidien.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-hd-secondary">Nos Services</h2>
          <div className="w-24 h-1 bg-hd-primary mx-auto my-6 rounded-full"></div>
          <p className="text-hd-text text-lg lg:text-xl max-w-3xl mx-auto mt-4">
            Découvrez les différents services que H-Daily propose pour faciliter votre quotidien.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-truck text-white text-2xl"></i>
            </div>
            <h3 className="font-serif text-xl font-semibold text-hd-secondary mb-3">Livraison à domicile</h3>
            <p className="text-hd-text text-sm mb-4">Livraison rapide et fiable des produits frais à votre porte</p>
            <button
              onClick={() => setExpandedService(expandedService === 'livraison' ? null : 'livraison')}
              className="text-hd-primary font-semibold hover:text-hd-primary-dark transition"
            >
              {expandedService === 'livraison' ? 'Moins de détails' : 'En savoir plus →'}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-credit-card text-white text-2xl"></i>
            </div>
            <h3 className="font-serif text-xl font-semibold text-hd-secondary mb-3">Paiement flexible</h3>
            <p className="text-hd-text text-sm mb-4">Multiple options de paiement sécurisées pour votre confort</p>
            <button
              onClick={() => setExpandedService(expandedService === 'paiement' ? null : 'paiement')}
              className="text-hd-primary font-semibold hover:text-hd-primary-dark transition"
            >
              {expandedService === 'paiement' ? 'Moins de détails' : 'En savoir plus →'}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow border-2 border-hd-primary">
            <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-credit-card text-white text-2xl"></i>
            </div>
            <div className="mb-2">
              <span className="bg-hd-primary text-white text-xs font-bold px-2 py-1 rounded-full">Populaire</span>
            </div>
            <h3 className="font-serif text-xl font-semibold text-hd-secondary mb-3">Credit service</h3>
            <p className="text-hd-text text-sm mb-4">Achetez maintenant et payez plus tard avec nos options de crédit</p>
            <button
              onClick={() => setExpandedService(expandedService === 'credit' ? null : 'credit')}
              className="text-hd-primary font-semibold hover:text-hd-primary-dark transition"
            >
              {expandedService === 'credit' ? 'Moins de détails' : 'En savoir plus →'}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-crown text-white text-2xl"></i>
            </div>
            <h3 className="font-serif text-xl font-semibold text-hd-secondary mb-3">Abonnement</h3>
            <p className="text-hd-text text-sm mb-4">Service premium avec livraison régulière et réductions exclusives</p>
            <button
              onClick={() => setExpandedService(expandedService === 'abonnement' ? null : 'abonnement')}
              className="text-hd-primary font-semibold hover:text-hd-primary-dark transition"
            >
              {expandedService === 'abonnement' ? 'Moins de détails' : 'En savoir plus →'}
            </button>
          </div>
        </div>
      </section>

      {/* Service Details */}
      {expandedService && (
        <section className="py-20 px-6 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary">Détails des Services</h2>
            <div className="section-divider"></div>
            <p className="text-hd-text max-w-2xl mx-auto mt-4">
              Explorez en détail chaque service et ses spécificités.
            </p>
          </div>

          {/* Livraison à domicile Details */}
          {expandedService === 'livraison' && (
            <article id="livraison-details" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-hd-primary rounded-full flex items-center justify-center mr-4">
              <i className="fas fa-truck text-white text-xl"></i>
            </div>
            <h3 className="font-serif text-3xl font-semibold text-hd-secondary">Livraison à domicile</h3>
          </div>
          
          <div className="prose prose-lg max-w-none text-hd-text">
            <p className="text-lg leading-relaxed mb-6">
              Notre service de livraison à domicile révolutionne votre expérience d'achat en vous apportant 
              les produits les plus frais directement à votre porte. Fini les déplacements, les files d'attente 
              et le transport de lourds sacs de courses.
            </p>
            
            <h4 className="font-semibold text-xl text-hd-secondary mb-4">Comment ça fonctionne ?</h4>
            <p className="mb-4">
              Le processus est simple et conçu pour votre confort. Vous commandez depuis chez vous via 
              notre plateforme en ligne ou par téléphone, notre équipe prépare votre commande avec le plus 
              grand soin, et nous la livrons en moins de 24 heures dans toute la région de Port-au-Prince.
            </p>
            
            <ProcessFlow 
              steps={services[0].process}
              vertical={true}
            />
            
            <h4 className="font-semibold text-xl text-hd-secondary mb-4">Nos garanties de qualité</h4>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <i className="fas fa-check text-hd-primary mr-3 mt-1"></i>
                <span>Chaîne du froid contrôlée pour préserver la fraîcheur</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-hd-primary mr-3 mt-1"></i>
                <span>Emballage isotherme professionnel pour chaque livraison</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-hd-primary mr-3 mt-1"></i>
                <span>Suivi en temps réel de votre commande via WhatsApp</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-hd-primary mr-3 mt-1"></i>
                <span>Retour gratuit si un produit ne vous convient pas</span>
              </li>
            </ul>
            
            <h4 className="font-semibold text-xl text-hd-secondary mb-4">Les avantages pour vous</h4>
            <p className="mb-4">
              Gagnez un temps précieux que vous pouvez consacrer à votre famille ou vos activités professionnelles. 
              Bénéficiez de produits toujours frais et sélectionnés avec soin. Profitez d'une flexibilité totale 
              avec des créneaux de livraison adaptés à votre emploi du temps, y compris le week-end.
            </p>
          </div>
        </article>
          )}

        {/* Paiement flexible Details */}
        {expandedService === 'paiement' && (
          <article id="paiement-details" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-hd-primary rounded-full flex items-center justify-center mr-4">
              <i className="fas fa-credit-card text-white text-xl"></i>
            </div>
            <h3 className="font-serif text-3xl font-semibold text-hd-secondary">Paiement flexible</h3>
          </div>
          
          <div className="prose prose-lg max-w-none text-hd-text">
            <p className="text-lg leading-relaxed mb-6">
              Nous comprenons que chaque client a des préférences différentes en matière de paiement. 
              C'est pourquoi nous avons mis en place un système de paiement flexible qui accepte 
              toutes les méthodes populaires en Haïti, avec des transactions 100% sécurisées.
            </p>
            
            <h4 className="font-semibold text-xl text-hd-secondary mb-4">Méthodes de paiement acceptées</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-hd-light rounded-lg p-4">
                <h5 className="font-semibold text-hd-secondary mb-2">MonCash</h5>
                <p className="text-sm">Paiement instantané et sécurisé via votre mobile</p>
              </div>
              <div className="bg-hd-light rounded-lg p-4">
                <h5 className="font-semibold text-hd-secondary mb-2">NatCash</h5>
                <p className="text-sm">Solution de paiement rapide et fiable</p>
              </div>
              <div className="bg-hd-light rounded-lg p-4">
                <h5 className="font-semibold text-hd-secondary mb-2">Paiement à la livraison</h5>
                <p className="text-sm">Payez en espèces à la réception de vos produits</p>
              </div>
              <div className="bg-hd-light rounded-lg p-4">
                <h5 className="font-semibold text-hd-secondary mb-2">Carte bancaire</h5>
                <p className="text-sm">Visa/Mastercard acceptées avec cryptage SSL</p>
              </div>
            </div>
            
            <h4 className="font-semibold text-xl text-hd-secondary mb-4">Sécurité et transparence</h4>
            <p className="mb-4">
              Toutes nos transactions sont protégées par un cryptage de niveau bancaire. 
              Vous recevez automatiquement une facture détaillée par email et aucun frais caché 
              n'est appliqué. Votre historique de paiements reste consultable à tout moment.
            </p>
            
            <ProcessFlow 
              steps={services[1].process}
              title="Étapes du paiement"
              vertical={true}
            />
          </div>
        </article>
          )}

        {/* Credit service Details */}
        {expandedService === 'credit' && (
          <article id="credit-details" className="bg-white rounded-2xl shadow-lg p-8 mb-12 border-2 border-hd-primary">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-hd-primary rounded-full flex items-center justify-center mr-4">
              <i className="fas fa-credit-card text-white text-xl"></i>
            </div>
            <div className="flex items-center">
              <h3 className="font-serif text-3xl font-semibold text-hd-secondary mr-3">Credit service</h3>
              <span className="bg-hd-primary text-white text-sm font-bold px-3 py-1 rounded-full">Populaire</span>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none text-hd-text">
            <p className="text-lg leading-relaxed mb-6">
              Notre service de crédit est conçu pour vous donner accès aux produits dont vous avez besoin, 
              quand vous en avez besoin, sans attendre votre prochaine paie. Avec des conditions 
              transparentes et des taux parmi les plus bas du marché, nous rendons l'achat facile.
            </p>
            
            <h4 className="font-semibold text-xl text-hd-secondary mb-4">Conditions de crédit simples</h4>
            <div className="bg-hd-primary/10 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-hd-secondary mb-3">Crédit 7 jours</h5>
                  <ul className="space-y-2">
                    <li>• Taux d'intérêt : seulement 10%</li>
                    <li>• Montants : 1,000 à 25,000 HTG</li>
                    <li>• Remboursement : en une seule fois</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-hd-secondary mb-3">Crédit 1 mois</h5>
                  <ul className="space-y-2">
                    <li>• Taux d'intérêt : seulement 10%</li>
                    <li>• Montants : 1,000 à 50,000 HTG</li>
                    <li>• Remboursement : flexible selon vos moyens</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <h4 className="font-semibold text-xl text-hd-secondary mb-4">Processus d'approbation rapide</h4>
            <p className="mb-4">
              Pas de paperasse complexe! Une simple pièce d'identité et un numéro de téléphone suffisent. 
              Votre demande est traitée en moins de 2 heures et l'approbation est instantanée. 
              Nous respectons totalement votre confidentialité et ne partageons jamais vos informations.
            </p>
            
            <ProcessFlow 
              steps={services[2].process}
              title="Étapes de demande de crédit"
              vertical={true}
            />
            
            <h4 className="font-semibold text-xl text-hd-secondary mb-4">Pourquoi choisir notre crédit?</h4>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <i className="fas fa-star text-yellow-400 mr-3 mt-1"></i>
                <span>Taux d'intérêt les plus compétitifs du marché (10% fixe)</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-star text-yellow-400 mr-3 mt-1"></i>
                <span>Accès immédiat aux produits sans attendre</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-star text-yellow-400 mr-3 mt-1"></i>
                <span>Possibilité de renouvellement après remboursement</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-star text-yellow-400 mr-3 mt-1"></i>
                <span>Aucun frais de dossier ou frais cachés</span>
              </li>
            </ul>
          </div>
        </article>
          )}

        {/* Abonnement Details */}
        {expandedService === 'abonnement' && (
          <article id="abonnement-details" className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-hd-primary rounded-full flex items-center justify-center mr-4">
              <i className="fas fa-crown text-white text-xl"></i>
            </div>
            <h3 className="font-serif text-3xl font-semibold text-hd-secondary">Abonnement</h3>
          </div>
          
          <div className="prose prose-lg max-w-none text-hd-text">
            <p className="text-lg leading-relaxed mb-6">
              Transformez votre expérience d'achat avec notre service d'abonnement premium. 
              Recevez régulièrement des paniers personnalisés remplis de produits frais et locaux, 
              avec des réductions exclusives et un service prioritaire qui vous fait sentir VIP.
            </p>
            
            <h4 className="font-semibold text-xl text-hd-secondary mb-4">Comment fonctionne l'abonnement?</h4>
            <p className="mb-4">
              Tout commence par une consultation gratuite où nous créons votre profil de préférences. 
              Vous choisissez votre fréquence (hebdomadaire ou mensuelle), et nous personnalisons 
              chaque panier selon vos goûts et besoins. Votre première livraison inclut des cadeaux 
              de bienvenue pour vous remercier de votre confiance.
            </p>
            
            <ProcessFlow 
              steps={services[3].process}
              title="Étapes de démarrage"
              vertical={true}
            />
            
            <h4 className="font-semibold text-xl text-hd-secondary mb-4">Les avantages exclusifs</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-r from-hd-primary/10 to-hd-primary/5 rounded-lg p-4">
                <h5 className="font-semibold text-hd-secondary mb-2">Économies substantielles</h5>
                <p className="text-sm">Réductions de 15% à 20% sur tous les produits</p>
              </div>
              <div className="bg-gradient-to-r from-hd-primary/10 to-hd-primary/5 rounded-lg p-4">
                <h5 className="font-semibold text-hd-secondary mb-2">Service prioritaire</h5>
                <p className="text-sm">Livraison express gratuite et support 24/7</p>
              </div>
              <div className="bg-gradient-to-r from-hd-primary/10 to-hd-primary/5 rounded-lg p-4">
                <h5 className="font-semibold text-hd-secondary mb-2">Produits premium</h5>
                <p className="text-sm">Accès prioritaire aux bio et locaux</p>
              </div>
              <div className="bg-gradient-to-r from-hd-primary/10 to-hd-primary/5 rounded-lg p-4">
                <h5 className="font-semibold text-hd-secondary mb-2">Flexibilité totale</h5>
                <p className="text-sm">Modification, pause ou annulation sans frais</p>
              </div>
            </div>
            
            <h4 className="font-semibold text-xl text-hd-secondary mb-4">Programme de fidélité</h4>
            <p className="mb-4">
              Chaque livraison vous fait cumuler des points de fidélité échangeables contre des 
              produits gratuits ou des réductions supplémentaires. Vous bénéficiez également d'un 
              accès anticipé aux nouveaux produits et d'offres exclusives réservées aux abonnés.
            </p>
            
            <h4 className="font-semibold text-xl text-hd-secondary mb-4">La tranquillité d'esprit</h4>
            <p>
              Avec l'abonnement H-Daily, vous n'avez plus à vous soucier de vos courses. 
              Votre famille est toujours nourrie avec des produits sains et frais, 
              vous économisez temps et argent, et vous profitez d'un service premium 
              qui s'adapte à votre vie.
            </p>
          </div>
        </article>
          )}
        </section>
      )}

      {/* Statistics Section */}
      <section className="py-24 px-6 bg-hd-light">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-hd-secondary">Nos réalisations</h2>
            <div className="w-24 h-1 bg-hd-primary mx-auto my-6 rounded-full"></div>
            <p className="text-hd-text text-lg xl:text-xl max-w-3xl mx-auto mt-4">
              Des chiffres qui témoignent de notre engagement et de la confiance de nos clients
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 w-full">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-hd-primary mb-3">10k+</div>
              <p className="text-hd-secondary font-medium text-lg">Clients satisfaits</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-hd-primary mb-3">50k+</div>
              <p className="text-hd-secondary font-medium text-lg">Livraisons effectuées</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-hd-primary mb-3">98%</div>
              <p className="text-hd-secondary font-medium text-lg">Taux de satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-hd-primary mb-3">24h</div>
              <p className="text-hd-secondary font-medium text-lg">Livraison garantie</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-hd-secondary">Témoignages clients</h2>
          <div className="w-24 h-1 bg-hd-primary mx-auto my-6 rounded-full"></div>
          <p className="text-hd-text text-lg xl:text-xl max-w-3xl mx-auto mt-4">
            Ce que nos clients disent de nos services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full">
          <div className="bg-white rounded-2xl p-8 shadow-lg subtle-border hover:-translate-y-2 transition-transform duration-300">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-hd-primary rounded-full flex items-center justify-center mr-4 shadow-md">
                <span className="text-white font-bold text-xl">JD</span>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-hd-secondary">Jean Dupont</h4>
                <p className="text-sm text-hd-text">Client abonné</p>
              </div>
            </div>
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400 text-sm mr-1"></i>
              ))}
            </div>
            <p className="text-hd-text italic text-lg leading-relaxed">
              "Le service d'abonnement a transformé mon quotidien. Produits toujours frais, livraison ponctuelle et économies substantielles. Je recommande vivement!"
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg subtle-border hover:-translate-y-2 transition-transform duration-300">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-hd-primary rounded-full flex items-center justify-center mr-4 shadow-md">
                <span className="text-white font-bold text-xl">MP</span>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-hd-secondary">Marie Pierre</h4>
                <p className="text-sm text-hd-text">Mère de famille</p>
              </div>
            </div>
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400 text-sm mr-1"></i>
              ))}
            </div>
            <p className="text-hd-text italic text-lg leading-relaxed">
              "La livraison à domicile est un vrai gain de temps. Plus besoin de faire les courses, tout vient à moi. Les produits sont toujours de qualité supérieure."
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg subtle-border hover:-translate-y-2 transition-transform duration-300">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-hd-primary rounded-full flex items-center justify-center mr-4 shadow-md">
                <span className="text-white font-bold text-xl">PJ</span>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-hd-secondary">Paul Joseph</h4>
                <p className="text-sm text-hd-text">Entrepreneur</p>
              </div>
            </div>
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-yellow-400 text-sm mr-1"></i>
              ))}
            </div>
            <p className="text-hd-text italic text-lg leading-relaxed">
              "Le service de crédit m'a permis de gérer mon budget efficacement. Processus simple, approbation rapide et conditions transparentes. Excellent service!"
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-hd-light to-hd-cream">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-hd-secondary">Questions fréquentes</h2>
            <div className="w-24 h-1 bg-hd-primary mx-auto my-6 rounded-full"></div>
            <p className="text-hd-text text-lg xl:text-xl max-w-3xl mx-auto mt-4">
              Tout ce que vous devez savoir sur nos services
            </p>
          </div>
          
          <div className="space-y-4">
            <details className="bg-white rounded-2xl p-6 shadow-lg group">
              <summary className="font-semibold text-lg text-hd-secondary cursor-pointer list-none flex items-center justify-between">
                Comment fonctionne la livraison à domicile?
                <i className="fas fa-chevron-down text-hd-primary group-open:rotate-180 transition-transform"></i>
              </summary>
              <p className="mt-4 text-hd-text">
                Notre service de livraison fonctionne en 3 étapes simples : 1) Commandez en ligne ou par téléphone, 
                2) Nous préparons vos produits avec soin, 3) Nous livrons à votre porte en moins de 24h. 
                Vous recevez une notification avant la livraison et pouvez suivre votre commande en temps réel.
              </p>
            </details>
            
            <details className="bg-white rounded-2xl p-6 shadow-lg group">
              <summary className="font-semibold text-lg text-hd-secondary cursor-pointer list-none flex items-center justify-between">
                Quelles sont les conditions pour le service de crédit?
                <i className="fas fa-chevron-down text-hd-primary group-open:rotate-180 transition-transform"></i>
              </summary>
              <p className="mt-4 text-hd-text">
                Le crédit est accessible à toute personne majeure avec une pièce d'identité valide et un numéro de téléphone. 
                Les montants vont de 1,000 à 50,000 HTG avec seulement 10% d'intérêt pour 7 jours ou 1 mois. 
                L'approbation prend moins de 2h et aucun document complexe n'est requis.
              </p>
            </details>
            
            <details className="bg-white rounded-2xl p-6 shadow-lg group">
              <summary className="font-semibold text-lg text-hd-secondary cursor-pointer list-none flex items-center justify-between">
                Puis-je modifier mon abonnement?
                <i className="fas fa-chevron-down text-hd-primary group-open:rotate-180 transition-transform"></i>
              </summary>
              <p className="mt-4 text-hd-text">
                Oui! Votre abonnement est entièrement flexible. Vous pouvez modifier les produits, 
                changer la fréquence de livraison, mettre en pause ou annuler sans frais. 
                Contactez simplement notre service client et nous ajusterons votre abonnement selon vos besoins.
              </p>
            </details>
            
            <details className="bg-white rounded-2xl p-6 shadow-lg group">
              <summary className="font-semibold text-lg text-hd-secondary cursor-pointer list-none flex items-center justify-between">
                Quels modes de paiement acceptez-vous?
                <i className="fas fa-chevron-down text-hd-primary group-open:rotate-180 transition-transform"></i>
              </summary>
              <p className="mt-4 text-hd-text">
                Nous acceptons tous les modes de paiement populaires en Haïti : MonCash, NatCash, 
                paiement à la livraison en espèces, et cartes bancaires Visa/Mastercard. 
                Toutes les transactions sont sécurisées et cryptées.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-hd-cream to-white border-t border-hd-border">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-hd-secondary mb-6">Prêt à bénéficier de nos services?</h2>
          <p className="text-lg xl:text-xl text-hd-text mb-16 max-w-3xl mx-auto leading-relaxed">
            Rejoignez des milliers de clients satisfaits qui font confiance à H-Daily pour leurs besoins quotidiens. 
            Contactez-nous dès maintenant pour en savoir plus sur nos services et commencer à profiter de tous nos avantages.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-hd-border/50">
              <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-md group-hover:scale-110 transition-transform">
                <i className="fas fa-phone text-2xl"></i>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-hd-secondary mb-3">Par téléphone</h3>
              <p className="mb-6 text-hd-text">Appelez-nous pour une consultation immédiate</p>
              <a href="tel:+50939134651" className="inline-block bg-white border-2 border-hd-primary text-hd-primary px-8 py-3 rounded-full font-semibold hover:bg-hd-primary hover:text-white transition-all">
                +509 3913 4651
              </a>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-hd-border/50">
              <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-md group-hover:scale-110 transition-transform">
                <i className="fab fa-whatsapp text-3xl"></i>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-hd-secondary mb-3">Par WhatsApp</h3>
              <p className="mb-6 text-hd-text">Réponse rapide en quelques minutes</p>
              <a href="https://wa.me/50939134651" className="inline-block bg-[#25D366] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#128C7E] transition-all hover:scale-105">
                Démarrer chat
              </a>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-hd-border/50">
              <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-md group-hover:scale-110 transition-transform">
                <i className="far fa-envelope text-2xl"></i>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-hd-secondary mb-3">Par email</h3>
              <p className="mb-6 text-hd-text">Pour les demandes détaillées</p>
              <a href="mailto:contact@hdaily.ht" className="inline-block bg-white border-2 border-hd-primary text-hd-primary px-8 py-3 rounded-full font-semibold hover:bg-hd-primary hover:text-white transition-all">
                Nous écrire
              </a>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="/boutique" className="btn-primary flex justify-center items-center">
              <i className="fas fa-shopping-cart mr-3"></i> Commander maintenant
            </a>
            <a href="/abonnement" className="btn-secondary flex justify-center items-center">
              <i className="fas fa-crown mr-3"></i> S'abonner
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
