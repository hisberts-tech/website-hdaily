import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api, CreditApplicationPayload } from '../lib/api';

const CreditService: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload: CreditApplicationPayload = {
      firstName: String(data.get('firstName') ?? ''),
      lastName:  String(data.get('lastName') ?? ''),
      phone:     String(data.get('phone') ?? ''),
      nif:       String(data.get('nif') ?? ''),
      address:   String(data.get('address') ?? ''),
      level:     String(data.get('level') ?? '') as CreditApplicationPayload['level'],
      term:      (String(data.get('term') ?? '') === '1_month' ? 'one_month' : 'one_week'),
    };

    setFormSubmitted(true);
    try {
      await api.applyForCredit(payload);
      form.reset();
      alert('Votre demande de crédit a été soumise avec succès.');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Échec de la soumission de la demande.');
    } finally {
      setFormSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen bg-hd-light pt-24 pb-20">
      {/* Hero Section */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 mb-16 text-center">
        <div className="w-20 h-20 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <i className="fas fa-credit-card text-4xl text-white"></i>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-hd-secondary mb-6">{t('credit.title')}</h1>
        <p className="text-lg sm:text-xl text-hd-text max-w-3xl mx-auto font-light leading-relaxed">{t('credit.subtitle')}</p>
      </section>

      {/* Credit Levels */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 mb-20">
        <h2 className="text-3xl font-serif text-center text-hd-secondary mb-10">{t('credit.levelsTitle')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-hd-surface rounded-2xl shadow-md p-8 text-center border-t-4 border-hd-primary/50">
            <h3 className="text-2xl font-serif text-hd-secondary mb-4">{t('credit.expressTitle')}</h3>
            <p className="text-4xl font-bold text-hd-primary mb-2">5 000 <span className="text-xl text-hd-muted">HTG</span></p>
            <p className="text-hd-text mt-4">{t('credit.expressDesc')}</p>
            <div className="mt-4 inline-block bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium border border-blue-100">{t('credit.expressLevel')}</div>
          </div>
          <div className="bg-hd-surface rounded-2xl shadow-xl p-8 text-center border-t-4 border-hd-primary transform md:-translate-y-4 relative">
            <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-hd-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{t('common.popular')}</span>
            <h3 className="text-2xl font-serif text-hd-secondary mb-4">{t('credit.standardTitle')}</h3>
            <p className="text-4xl font-bold text-hd-primary mb-2">15 000 <span className="text-xl text-hd-muted">HTG</span></p>
            <p className="text-hd-text mt-4">{t('credit.standardDesc')}</p>
            <div className="mt-4 inline-block bg-amber-50 text-amber-700 text-xs px-3 py-1 rounded-full font-medium border border-amber-100">
              <i className="fas fa-lock text-[10px] mr-1.5"></i>{t('credit.standardUnlock')}
            </div>
          </div>
          <div className="bg-hd-surface rounded-2xl shadow-md p-8 text-center border-t-4 border-amber-500">
            <h3 className="text-2xl font-serif text-hd-secondary mb-4">{t('credit.premiumTitle')}</h3>
            <p className="text-4xl font-bold text-hd-primary mb-2">30 000 <span className="text-xl text-hd-muted">HTG</span></p>
            <p className="text-hd-text mt-4">{t('credit.premiumDesc')}</p>
            <div className="mt-4 inline-block bg-amber-50 text-amber-700 text-xs px-3 py-1 rounded-full font-medium border border-amber-100">
              <i className="fas fa-lock text-[10px] mr-1.5"></i>{t('credit.premiumUnlock')}
            </div>
          </div>
        </div>

        {/* Progression Rules */}
        <div className="mt-16 bg-hd-primary/5 rounded-2xl p-8 border border-hd-primary/20 max-w-4xl mx-auto shadow-sm">
          <h3 className="text-xl font-serif text-hd-secondary mb-4 flex items-center justify-center gap-3">
            <i className="fas fa-chart-line text-hd-primary"></i> {t('credit.progressTitle')}
          </h3>
          <p className="text-hd-text text-center mb-6 max-w-2xl mx-auto">{t('credit.progressDesc')}</p>
          <ul className="space-y-4 max-w-xl mx-auto bg-hd-surface p-6 rounded-xl border border-hd-primary/10">
            <li className="flex gap-3 items-start">
              <i className="fas fa-check-circle text-hd-primary mt-1"></i>
              <span className="text-sm text-hd-secondary">Compléter au moins <strong>3 achats</strong> à votre niveau de crédit actuel.</span>
            </li>
            <li className="flex gap-3 items-start">
              <i className="fas fa-check-circle text-hd-primary mt-1"></i>
              <span className="text-sm text-hd-secondary"><strong>Rembourser toutes vos dettes à temps</strong>, sans aucun retard.</span>
            </li>
            <li className="flex gap-3 items-start">
              <i className="fas fa-check-circle text-hd-primary mt-1"></i>
              <span className="text-sm text-hd-secondary">Respecter l'ensemble des conditions générales du service de crédit.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Benefits and How it Works */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-hd-surface p-8 rounded-2xl shadow-sm border border-hd-border">
            <h2 className="text-2xl font-serif text-hd-secondary mb-6 flex items-center gap-3">
              <i className="fas fa-star text-hd-primary"></i> Avantages du service
            </h2>
            <ul className="space-y-4">
              {[
                { icon: 'fa-check',          title: 'Processus simplifié',        desc: 'Demande en ligne rapide et réponse sous 24h ouvrées.' },
                { icon: 'fa-calendar-alt',   title: 'Flexibilité de paiement',    desc: 'Choisissez entre un remboursement à 1 semaine ou 1 mois selon vos besoins.' },
                { icon: 'fa-shopping-basket',title: "Pouvoir d'achat immédiat",   desc: "Faites vos courses aujourd'hui même si vous attendez une rentrée d'argent." },
              ].map(({ icon, title, desc }) => (
                <li key={title} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-hd-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className={`fas ${icon} text-hd-primary`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-hd-secondary">{title}</h4>
                    <p className="text-sm text-hd-text mt-1">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-hd-surface p-8 rounded-2xl shadow-sm border border-hd-border">
            <h2 className="text-2xl font-serif text-hd-secondary mb-6 flex items-center gap-3">
              <i className="fas fa-cogs text-hd-primary"></i> Comment ça marche ?
            </h2>
            <div className="space-y-6">
              {[
                { n: '1', title: 'Remplissez le formulaire',      desc: 'Complétez votre demande ci-dessous avec vos informations exactes.' },
                { n: '2', title: 'Validation de la demande',       desc: 'Notre équipe vérifie votre historique client et valide votre ligne de crédit.' },
                { n: '3', title: 'Achetez librement',              desc: 'Utilisez votre crédit pour payer vos commandes H-Daily.' },
              ].map(({ n, title, desc }) => (
                <div key={n} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-hd-primary text-white flex items-center justify-center font-bold flex-shrink-0">{n}</div>
                  <div>
                    <h4 className="font-semibold text-hd-secondary">{title}</h4>
                    <p className="text-sm text-hd-text mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 mb-20 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Conditions */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-amber-50 border border-amber-200 p-8 rounded-2xl shadow-sm">
            <h3 className="text-xl font-serif text-amber-900 mb-6 flex items-center gap-2">
              <i className="fas fa-list-ul"></i> Conditions du Service
            </h3>
            <ul className="text-sm text-amber-800 space-y-3">
              {[
                'Être client enregistré',
                'Fournir un numéro de téléphone valide',
                'Fournir nom et prénom',
                'Fournir un NIF ou CIN (carte d\'identité)',
                'Choisir un délai de remboursement (1 semaine ou 1 mois)',
                'Pour un terme d\'un mois, la dette augmente de 10%',
                'Fournir une adresse complète et vérifiable',
                'Accepter les termes et conditions du service de crédit',
                'Avoir complété au moins 3 commandes payées et validées avec H-Daily',
                'N\'avoir aucune dette en cours ou en retard',
                'Respecter les délais de remboursement pour maintenir l\'accès au crédit',
                'L\'accès au crédit peut être suspendu en cas de retard de paiement',
                'H-Daily se réserve le droit de réduire ou retirer la limite de crédit si les conditions ne sont pas respectées',
                'Toutes les informations fournies doivent être exactes et vérifiables',
              ].map((cond, i) => (
                <li key={i} className="flex gap-2"><i className="fas fa-circle text-[8px] mt-1.5"></i> {cond}</li>
              ))}
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
          <div className="bg-hd-surface p-8 md:p-10 rounded-2xl shadow-lg border border-hd-border">
            <h2 className="text-3xl font-serif text-hd-secondary mb-8 text-center">{t('credit.formTitle')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-hd-secondary mb-2">{t('credit.fieldFirst')} *</label>
                  <input type="text" name="firstName" required className="w-full px-4 py-3 border border-hd-border rounded-xl focus:ring-2 focus:ring-hd-primary outline-none transition-all bg-hd-surface text-hd-secondary" placeholder="Jean" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-hd-secondary mb-2">{t('credit.fieldLast')} *</label>
                  <input type="text" name="lastName" required className="w-full px-4 py-3 border border-hd-border rounded-xl focus:ring-2 focus:ring-hd-primary outline-none transition-all bg-hd-surface text-hd-secondary" placeholder="Dupont" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-hd-secondary mb-2">{t('credit.fieldPhone')} *</label>
                  <input type="tel" name="phone" required className="w-full px-4 py-3 border border-hd-border rounded-xl focus:ring-2 focus:ring-hd-primary outline-none transition-all bg-hd-surface text-hd-secondary" placeholder="+509 3913 4651" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-hd-secondary mb-2">{t('credit.fieldNif')} *</label>
                  <input type="text" name="nif" required className="w-full px-4 py-3 border border-hd-border rounded-xl focus:ring-2 focus:ring-hd-primary outline-none transition-all bg-hd-surface text-hd-secondary" placeholder="Votre NIF ou CIN" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-hd-secondary mb-2">{t('credit.fieldAddress')} *</label>
                <input type="text" name="address" required className="w-full px-4 py-3 border border-hd-border rounded-xl focus:ring-2 focus:ring-hd-primary outline-none transition-all bg-hd-surface text-hd-secondary" placeholder="Votre adresse exacte" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-hd-secondary mb-2">{t('credit.levelLabel')} *</label>
                  <select name="level" required className="w-full px-4 py-3 border border-hd-border rounded-xl focus:ring-2 focus:ring-hd-primary outline-none transition-all bg-hd-surface text-hd-secondary">
                    <option value="">Sélectionnez le niveau souhaité</option>
                    <option value="express">{t('credit.expressTitle')} (Jusqu'à 5 000 HTG)</option>
                    <option value="standard">{t('credit.standardTitle')} (Jusqu'à 15 000 HTG)</option>
                    <option value="premium">{t('credit.premiumTitle')} (Jusqu'à 30 000 HTG)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-hd-secondary mb-2">{t('credit.termLabel')} *</label>
                  <select name="term" required className="w-full px-4 py-3 border border-hd-border rounded-xl focus:ring-2 focus:ring-hd-primary outline-none transition-all bg-hd-surface text-hd-secondary">
                    <option value="">Sélectionnez le délai</option>
                    <option value="1_week">{t('credit.term1Week')}</option>
                    <option value="1_month">{t('credit.term1Month')}</option>
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
                    <><i className="fas fa-spinner fa-spin mr-2"></i> {t('credit.submitting')}</>
                  ) : (
                    <><i className="fas fa-paper-plane mr-2"></i> {t('credit.submitBtn')}</>
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
