import React from 'react';

const Services: React.FC = () => {
  const services = [
    {
      icon: 'fas fa-crown',
      title: 'Service d\'Abonnement',
      description: 'Recevez des paniers hebdomadaires personnalisés selon vos besoins et votre budget.',
      features: [
        'Paniers personnalisés chaque semaine',
        'Livraison à domicile',
        'Réductions exclusives',
        'Produits frais et locaux',
        'Support client dédié'
      ],
      popular: true
    },
    {
      icon: 'fas fa-credit-card',
      title: 'Service de Crédit',
      description: 'Achetez maintenant et payez plus tard avec nos options de crédit flexibles.',
      features: [
        'Crédit Express jusqu\'à 5000 HTG',
        'Crédit Standard jusqu\'à 15000 HTG',
        'Crédit Premium jusqu\'à 30000 HTG',
        'Taux d\'intérêt compétitifs',
        'Approbation rapide'
      ],
      popular: false
    },
    {
      icon: 'fas fa-truck',
      title: 'Service de Livraison',
      description: 'Livraison rapide et fiable dans toute la région de Port-au-Prince.',
      features: [
        'Livraison en moins de 24h',
        'Suivi de commande en temps réel',
        'Livraison programmée disponible',
        'Emballage sécurisé',
        'Notification de livraison'
      ],
      popular: false
    },
    {
      icon: 'fas fa-shopping-basket',
      title: 'Paniers Pré-faits',
      description: 'Choisissez parmi nos paniers thématiques ou demandez un panier personnalisé.',
      features: [
        'Panier Familial',
        'Panier Étudiant',
        'Panier Santé',
        'Panier Gourmet',
        'Panier sur mesure'
      ],
      popular: false
    },
    {
      icon: 'fas fa-phone-alt',
      title: 'Service Client',
      description: 'Assistance continue pour répondre à toutes vos questions et besoins.',
      features: [
        'Support par WhatsApp',
        'Assistance téléphonique',
        'Conseils personnalisés',
        'Service après-vente',
        'Disponibilité 24/7'
      ],
      popular: false
    },
    {
      icon: 'fas fa-leaf',
      title: 'Produits Bio et Locaux',
      description: 'Sélection rigoureuse de produits biologiques et locaux de qualité supérieure.',
      features: [
        'Produits certifiés bio',
        'Soutien aux agriculteurs locaux',
        'Produits de saison',
        'Traçabilité garantie',
        'Qualité premium'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-hd-cream">
      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-br from-hd-cream to-hd-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-1.5 border border-hd-primary/20 mb-5">
            <span className="w-2 h-2 rounded-full bg-hd-primary"></span>
            <span className="text-sm uppercase tracking-[0.2em] text-hd-primary font-bold">Services</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-hd-secondary leading-[1.15]">
            Nos <span className="text-hd-primary">services</span>
          </h1>
          <p className="text-hd-text text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            Découvrez tous les services que H-Daily propose pour faciliter votre quotidien.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary">Nos services exclusifs</h2>
          <div className="section-divider"></div>
          <p className="text-hd-text max-w-2xl mx-auto mt-4">
            Des solutions adaptées à tous vos besoins, avec la qualité et le service qui caractérisent H-Daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`card-premium subtle-border flex flex-col relative ${
                service.popular ? 'ring-1 ring-hd-primary/40 transform scale-105' : ''
              }`}
            >
              {service.popular && (
                <span className="badge-popular absolute -top-3 right-6 text-white text-[11px] font-bold px-3 py-1 rounded-full z-10">
                  Le plus populaire
                </span>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${service.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-hd-secondary mb-3">{service.title}</h3>
                  <p className="text-hd-text text-sm leading-relaxed">{service.description}</p>
                </div>

                <ul className="space-y-3 text-sm text-hd-secondary mb-6 flex-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <i className="fas fa-check-circle text-hd-primary mr-3 flex-shrink-0 mt-0.5"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full py-3 rounded-full font-semibold shadow-md transition bg-hd-primary text-white hover:bg-hd-primary-dark">
                  En savoir plus
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-hd-secondary to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Prêt à bénéficier de nos services?</h2>
          <p className="text-lg opacity-90 mb-8">
            Contactez-nous dès maintenant pour en savoir plus sur nos services et commencer à profiter de tous nos avantages.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/50939134651" className="btn-primary bg-white text-hd-secondary hover:bg-hd-primary hover:text-white">
              <i className="fab fa-whatsapp mr-2"></i> Contacter via WhatsApp
            </a>
            <a href="tel:+50939134651" className="btn-outline border-white text-white hover:bg-white hover:text-hd-secondary">
              <i className="fas fa-phone mr-2"></i> Appeler maintenant
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
