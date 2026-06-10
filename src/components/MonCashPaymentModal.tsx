import React, { useEffect, useState } from 'react';
import { api, MonCashPaymentPayload, PaymentConfig } from '../lib/api';
import { useNotifications } from '../context/NotificationContext';

export interface MonCashPlan {
  id: 'basic' | 'family' | 'premium';
  name: string;
  price: number;
}

interface Props {
  plan: MonCashPlan | null; // when null, the modal is closed
  onClose: () => void;
}

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  frequency: 'weekly',
  deliveryDay: 'monday',
  deliveryTime: 'morning',
  senderPhone: '',
  transactionRef: '',
};

const MonCashPaymentModal: React.FC<Props> = ({ plan, onClose }) => {
  const { addNotification } = useNotifications();
  const [config, setConfig] = useState<PaymentConfig | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // Load merchant number + instructions when the modal opens.
  useEffect(() => {
    if (!plan) return;
    setForm(emptyForm);
    setDone(false);
    api
      .getPaymentConfig()
      .then(setConfig)
      .catch(() => setConfig(null));
  }, [plan]);

  if (!plan) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: MonCashPaymentPayload = {
      planId: plan.id,
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      address: form.address,
      frequency: form.frequency as MonCashPaymentPayload['frequency'],
      deliveryDay: form.deliveryDay,
      deliveryTime: form.deliveryTime,
      creditRequest: false,
      senderPhone: form.senderPhone,
      transactionRef: form.transactionRef,
    };

    setSubmitting(true);
    try {
      await api.payWithMonCash(payload);
      setDone(true);
      addNotification('Paiement reçu, en attente de vérification.', 'success');
    } catch (err) {
      addNotification(
        err instanceof Error ? err.message : 'Échec de l\'envoi du paiement',
        'error'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const moncashNumber = config?.moncash.number ?? '+509 3913 4651';
  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-hd-border bg-white focus:outline-none focus:ring-2 focus:ring-hd-primary';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-hd-border sticky top-0 bg-white rounded-t-2xl">
          <h3 className="text-lg font-serif font-semibold text-hd-secondary">
            <i className="fas fa-mobile-alt text-hd-primary mr-2"></i>
            Paiement MonCash — {plan.name}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Fermer">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {done ? (
          /* Confirmation */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-check text-2xl text-green-600"></i>
            </div>
            <h4 className="text-xl font-serif text-hd-secondary mb-2">Paiement reçu</h4>
            <p className="text-hd-text mb-6">
              Votre paiement est en attente de vérification. Nous confirmons votre abonnement sous 24h.
            </p>
            <button onClick={onClose} className="btn-primary">
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-5">
            {/* Payment instructions */}
            <div className="bg-hd-primary/5 border border-hd-primary/20 rounded-xl p-4">
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-sm text-hd-text">Montant à envoyer</span>
                <span className="text-2xl font-bold text-hd-primary">
                  {plan.price.toLocaleString()} HTG
                </span>
              </div>
              <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-hd-border">
                <div>
                  <p className="text-xs text-hd-muted">Numéro MonCash</p>
                  <p className="font-semibold text-hd-secondary">{moncashNumber}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(moncashNumber);
                    addNotification('Numéro copié', 'info');
                  }}
                  className="text-hd-primary hover:text-hd-primary/80 text-sm font-medium"
                >
                  <i className="far fa-copy mr-1"></i> Copier
                </button>
              </div>
              <ol className="mt-3 space-y-1.5 text-sm text-hd-text list-decimal list-inside">
                {(config?.moncash.instructions ?? [
                  'Composez *202# ou ouvrez l\'application MonCash.',
                  `Envoyez le montant exact au numéro ${moncashNumber}.`,
                  'Notez le numéro de transaction reçu par SMS.',
                  'Saisissez ce numéro ci-dessous pour confirmer.',
                ]).map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Customer details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Nom complet" className={inputClass} />
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email" className={inputClass} />
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="Téléphone" className={inputClass} />
              <input name="address" value={form.address} onChange={handleChange} required placeholder="Adresse de livraison" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select name="frequency" value={form.frequency} onChange={handleChange} className={inputClass}>
                <option value="weekly">Hebdomadaire</option>
                <option value="monthly">Mensuelle</option>
              </select>
              <select name="deliveryDay" value={form.deliveryDay} onChange={handleChange} className={inputClass}>
                <option value="monday">Lundi</option>
                <option value="tuesday">Mardi</option>
                <option value="wednesday">Mercredi</option>
                <option value="thursday">Jeudi</option>
                <option value="friday">Vendredi</option>
                <option value="saturday">Samedi</option>
              </select>
              <select name="deliveryTime" value={form.deliveryTime} onChange={handleChange} className={inputClass}>
                <option value="morning">Matin</option>
                <option value="afternoon">Après-midi</option>
                <option value="evening">Soir</option>
              </select>
            </div>

            {/* Payment proof */}
            <div className="border-t border-hd-border pt-4 space-y-4">
              <p className="text-sm font-medium text-hd-secondary">
                <i className="fas fa-receipt text-hd-primary mr-2"></i>
                Confirmation du paiement
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="senderPhone" type="tel" value={form.senderPhone} onChange={handleChange} required placeholder="Votre numéro MonCash" className={inputClass} />
                <input name="transactionRef" value={form.transactionRef} onChange={handleChange} required placeholder="N° de transaction (ID)" className={inputClass} />
              </div>
            </div>

            <button type="submit" disabled={submitting} className="w-full btn-primary disabled:opacity-60">
              {submitting ? 'Envoi...' : 'Confirmer le paiement'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MonCashPaymentModal;
