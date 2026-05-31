import React, { useState } from 'react';

const CreditService: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      alert("Votre demande de crédit a été soumise avec succès.");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-hd-light pt-24 pb-20">
      {/* Hero Section */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 mb-16 text-center">
        <div className="w-20 h-20 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <i className="fas fa-credit-card text-4xl text-white"></i>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-hd-secondary mb-6">Service de Crédit H-Daily</h1>
        <p className="text-lg sm:text-xl text-hd-text max-w-3xl mx-auto font-light leading-relaxed">
          Achetez maintenant et payez plus tard grâce à nos options de crédit flexibles. Profitez de vos produits préférés sans attendre.
        </p>
      </section>

      {/* Credit Levels */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 mb-20">
        <h2 className="text-3xl font-serif text-center text-hd-secondary mb-10">Nos Niveaux de Crédit</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-8 text-center border-t-4 border-hd-primary/50">
            <h3 className="text-2xl font-serif text-hd-secondary mb-4">Crédit Express</h3>
            <p className="text-4xl font-bold text-hd-primary mb-2">5 000 <span className="text-xl text-gray-500">HTG</span></p>
            <p className="text-hd-text mt-4">Idéal pour les petits achats et dépannages rapides du quotidien.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-hd-primary transform md:-translate-y-4 relative">
            <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-hd-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Populaire</span>
            <h3 className="text-2xl font-serif text-hd-secondary mb-4">Crédit Standard</h3>
            <p className="text-4xl font-bold text-hd-primary mb-2">15 000 <span className="text-xl text-gray-500">HTG</span></p>
            <p className="text-hd-text mt-4">La solution parfaite pour vos courses hebdomadaires régulières.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-8 text-center border-t-4 border-amber-500">
            <h3 className="text-2xl font-serif text-hd-secondary mb-4">Crédit Premium</h3>
            <p className="text-4xl font-bold text-hd-primary mb-2">30 000 <span className="text-xl text-gray-500">HTG</span></p>
            <p className="text-hd-text mt-4">Pour les familles nombreuses et les clients très fidèles.</p>
          </div>
        </div>
      </section>

      {/* Benefits and How it Works */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Benefits */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-hd-border">
            <h2 className="text-2xl font-serif text-hd-secondary mb-6 flex items-center gap-3">
              <i className="fas fa-star text-hd-primary"></i> Avantages du service
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-hd-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-check text-hd-primary"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-hd-secondary">Processus simplifié</h4>
                  <p className="text-sm text-hd-text mt-1">Demande en ligne rapide et réponse sous 24h ouvrées.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-hd-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-calendar-alt text-hd-primary"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-hd-secondary">Flexibilité de paiement</h4>
                  <p className="text-sm text-hd-text mt-1">Choisissez entre un remboursement à 1 semaine ou 1 mois selon vos besoins.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-hd-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-shopping-basket text-hd-primary"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-hd-secondary">Pouvoir d'achat immédiat</h4>
                  <p className="text-sm text-hd-text mt-1">Faites vos courses aujourd'hui même si vous attendez une rentrée d'argent.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* How it works */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-hd-border">
            <h2 className="text-2xl font-serif text-hd-secondary mb-6 flex items-center gap-3">
              <i className="fas fa-cogs text-hd-primary"></i> Comment ça marche ?
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-hd-primary text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-hd-secondary">Remplissez le formulaire</h4>
                  <p className="text-sm text-hd-text mt-1">Complétez votre demande ci-dessous avec vos informations exactes.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-hd-primary text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-hd-secondary">Validation de la demande</h4>
                  <p className="text-sm text-hd-text mt-1">Notre équipe vérifie votre historique client et valide votre ligne de crédit.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-hd-primary text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-hd-secondary">Achetez librement</h4>
                  <p className="text-sm text-hd-text mt-1">Utilisez votre crédit pour payer vos commandes H-Daily.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 mb-20 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Conditions & Repayment Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-amber-50 border border-amber-200 p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-serif text-amber-900 mb-6 flex items-center gap-2">
              <i className="fas fa-list-ul"></i> Conditions du Service
            </h3>
            <ul className="text-sm text-amber-800 space-y-3">
              <li className="flex gap-2"><i className="fas fa-circle text-[8px] mt-1.5"></i> Être client enregistré</li>
              <li className="flex gap-2"><i className="fas fa-circle text-[8px] mt-1.5"></i> Fournir un numéro de téléphone valide</li>
              <li className="flex gap-2"><i className="fas fa-circle text-[8px] mt-1.5"></i> Fournir nom et prénom</li>
              <li className="flex gap-2"><i className="fas fa-circle text-[8px] mt-1.5"></i> Fournir un NIF ou CIN (carte d'identité)</li>
              <li className="flex gap-2"><i className="fas fa-circle text-[8px] mt-1.5"></i> Choisir un délai de remboursement (1 semaine ou 1 mois)</li>
              <li className="flex gap-2"><i className="fas fa-circle text-[8px] mt-1.5"></i> Pour un terme d'un mois, la dette augmente de 10%</li>
              <li className="flex gap-2"><i className="fas fa-circle text-[8px] mt-1.5"></i> Fournir une adresse complète et vérifiable</li>
              <li className="flex gap-2"><i className="fas fa-circle text-[8px] mt-1.5"></i> Accepter les termes et conditions du service de crédit</li>
              <li className="flex gap-2"><i className="fas fa-circle text-[8px] mt-1.5"></i> Avoir complété au moins 3 commandes payées et validées avec H-Daily</li>
              <li className="flex gap-2"><i className="fas fa-circle text-[8px] mt-1.5"></i> N'avoir aucune dette en cours ou en retard</li>
              <li className="flex gap-2"><i className="fas fa-circle text-[8px] mt-1.5"></i> Respecter les délais de remboursement pour maintenir l'accès au crédit</li>
              <li className="flex gap-2"><i className="fas fa-circle text-[8px] mt-1.5"></i> L'accès au crédit peut être suspendu en cas de retard de paiement</li>
              <li className="flex gap-2"><i className="fas fa-circle text-[8px] mt-1.5"></i> H-Daily se réserve le droit de réduire ou retirer la limite de crédit si les conditions ne sont pas respectées</li>
              <li className="flex gap-2"><i className="fas fa-circle text-[8px] mt-1.5"></i> Toutes les informations fournies doivent être exactes et vérifiables</li>
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-serif text-red-900 mb-4 flex items-center gap-2">
              <i className="fas fa-exclamation-triangle"></i> Informations de Remboursement
            </h3>
            <p className="text-sm text-red-800 mb-3">
              Le non-respect des échéances de remboursement entraîne la suspension immédiate et définitive de votre accès au crédit.
            </p>
            <p className="text-sm text-red-800 font-bold">
              Note importante : Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-hd-border">
            <h2 className="text-3xl font-serif text-hd-secondary mb-8 text-center">Formulaire de demande</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                  <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-hd-primary outline-none transition-all" placeholder="Jean" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                  <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-hd-primary outline-none transition-all" placeholder="Dupont" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de téléphone *</label>
                  <input type="tel" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-hd-primary outline-none transition-all" placeholder="+509 3913 4651" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">NIF ou CIN *</label>
                  <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-hd-primary outline-none transition-all" placeholder="Votre NIF ou CIN" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse complète *</label>
                <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-hd-primary outline-none transition-all" placeholder="Votre adresse exacte" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Montant demandé (HTG) *</label>
                  <select required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-hd-primary outline-none transition-all bg-white">
                    <option value="">Sélectionnez le niveau souhaité</option>
                    <option value="express">Crédit Express (Jusqu'à 5 000 HTG)</option>
                    <option value="standard">Crédit Standard (Jusqu'à 15 000 HTG)</option>
                    <option value="premium">Crédit Premium (Jusqu'à 30 000 HTG)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Délai de remboursement *</label>
                  <select required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-hd-primary outline-none transition-all bg-white">
                    <option value="">Sélectionnez le délai</option>
                    <option value="1_week">1 semaine (Sans frais additionnels)</option>
                    <option value="1_month">1 mois (+10% d'augmentation)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={formSubmitted}
                  className="w-full btn-primary py-4 text-lg font-bold flex justify-center items-center"
                >
                  {formSubmitted ? (
                    <><i className="fas fa-spinner fa-spin mr-2"></i> Traitement en cours...</>
                  ) : (
                    <><i className="fas fa-paper-plane mr-2"></i> Soumettre la demande</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreditService;
