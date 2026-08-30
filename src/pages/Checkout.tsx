import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { useLoyalty, pointsForPurchase } from '../context/LoyaltyContext';
import { useLanguage } from '../context/LanguageContext';
import { lineIdOf, itemUnitPrice, itemUnitLabel } from '../lib/cart';
import { api, ApiError, CheckoutPayload } from '../lib/api';

type PaymentMethod = CheckoutPayload['paymentMethod'];

const paymentMethods: { value: PaymentMethod; icon: string; labelKey: string }[] = [
  { value: 'moncash', icon: 'fa-mobile-screen-button', labelKey: 'checkout.moncash' },
  { value: 'natcash', icon: 'fa-wallet', labelKey: 'checkout.natcash' },
  { value: 'cash', icon: 'fa-money-bill-wave', labelKey: 'checkout.cash' },
  { value: 'card', icon: 'fa-credit-card', labelKey: 'checkout.card' },
];

const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { addNotification } = useNotifications();
  const { awardPurchase } = useLoyalty();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [form, setForm] = useState({ fullName: '', phone: '', address: '' });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('moncash');
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState<{ id: string; total: number } | null>(null);

  const totalPrice = getTotalPrice();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || submitting) return;

    const payload: CheckoutPayload = {
      customerName: form.fullName,
      phone: form.phone,
      address: form.address,
      paymentMethod,
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        variant: item.variant,
      })),
    };

    setSubmitting(true);
    try {
      const createdOrder = await api.checkout(payload);
      awardPurchase(createdOrder.total, totalItems);
      setOrder({ id: createdOrder.id, total: createdOrder.total });
      clearCart();
      addNotification(t('checkout.success'), 'success');
    } catch (err) {
      const message = err instanceof ApiError ? err.message : t('checkout.errorGeneric');
      addNotification(message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary';

  // Confirmation screen
  if (order) {
    return (
      <div className="min-h-screen bg-hd-cream flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center bg-hd-surface rounded-3xl border border-hd-border shadow-sm p-8 sm:p-10">
          <div className="w-16 h-16 bg-hd-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <i className="fas fa-check text-2xl text-hd-primary"></i>
          </div>
          <h1 className="text-2xl font-serif text-hd-secondary mb-2">{t('checkout.success')}</h1>
          <p className="text-hd-text mb-6">{t('checkout.successDesc')}</p>
          <div className="flex justify-between bg-hd-light rounded-xl px-4 py-3 mb-6 text-sm">
            <span className="text-hd-muted">{t('checkout.orderNumber')}</span>
            <span className="font-semibold text-hd-secondary">#{order.id.slice(0, 8).toUpperCase()}</span>
          </div>
          <button onClick={() => navigate('/boutique')} className="btn-primary w-full">
            {t('checkout.backToShop')}
          </button>
        </div>
      </div>
    );
  }

  // Empty cart guard
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-hd-cream flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center">
          <i className="fas fa-cart-shopping text-4xl text-hd-muted/50 mb-4"></i>
          <p className="text-hd-text mb-6">{t('checkout.emptyCart')}</p>
          <button onClick={() => navigate('/boutique')} className="btn-primary">
            {t('checkout.backToShop')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hd-cream">
      <section className="pt-14 pb-6 md:pt-20 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-hd-secondary">{t('checkout.title')}</h1>
        <p className="text-hd-text text-lg mt-3 max-w-2xl mx-auto">{t('checkout.subtitle')}</p>
      </section>

      <section className="pb-20 xl:pb-28 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Delivery + payment */}
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-3xl border border-hd-border bg-hd-surface shadow-sm p-5 sm:p-6">
              <h2 className="text-lg font-serif font-semibold text-hd-secondary mb-4">
                <i className="fas fa-truck text-hd-primary mr-2"></i>
                {t('checkout.deliveryInfo')}
              </h2>
              <div className="space-y-4">
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder={t('checkout.fullName')}
                  className={inputClass}
                />
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder={t('checkout.phone')}
                  className={inputClass}
                />
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder={t('checkout.address')}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-hd-border bg-hd-surface shadow-sm p-5 sm:p-6">
              <h2 className="text-lg font-serif font-semibold text-hd-secondary mb-4">
                <i className="fas fa-credit-card text-hd-primary mr-2"></i>
                {t('checkout.paymentMethod')}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => {
                  const active = paymentMethod === method.value;
                  return (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => setPaymentMethod(method.value)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                        active
                          ? 'border-hd-primary bg-hd-primary/5 shadow-sm'
                          : 'border-hd-border hover:border-hd-primary/40'
                      }`}
                    >
                      <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        active ? 'bg-hd-primary text-white' : 'bg-hd-light text-hd-muted'
                      }`}>
                        <i className={`fas ${method.icon} text-sm`}></i>
                      </span>
                      <span className={`text-sm font-medium ${active ? 'text-hd-secondary' : 'text-hd-text'}`}>
                        {t(method.labelKey)}
                      </span>
                    </button>
                  );
                })}
              </div>
              {paymentMethod === 'moncash' && (
                <p className="text-xs text-hd-muted mt-4">
                  <i className="fas fa-circle-info mr-1"></i>
                  {t('checkout.moncashHint')}
                </p>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-hd-border bg-hd-surface shadow-sm p-5 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-serif font-semibold text-hd-secondary mb-4">
                {t('checkout.orderSummary')}
              </h2>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => {
                  const lineId = lineIdOf(item);
                  const unitPrice = itemUnitPrice(item);
                  return (
                    <div key={lineId} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg shrink-0"
                        onError={(e) => { e.currentTarget.src = '/images/sac du riz.webp'; }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-hd-secondary truncate">{item.name}</p>
                        <p className="text-xs text-hd-muted">
                          {item.quantity} × {unitPrice} HTG/{itemUnitLabel(item)}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-hd-secondary shrink-0">
                        {unitPrice * item.quantity} HTG
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-hd-border mt-4 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-hd-secondary">{t('cart.total')}</span>
                  <span className="text-xl font-bold text-hd-primary">{totalPrice} HTG</span>
                </div>
                <div className="flex items-center gap-2 bg-hd-primary/5 rounded-lg px-3 py-2">
                  <i className="fas fa-star text-hd-primary text-xs"></i>
                  <span className="text-xs text-hd-secondary">
                    {t('cart.pointsPreview')}{' '}
                    <strong className="text-hd-primary">+{pointsForPurchase(totalPrice)} pts</strong>{' '}
                    {t('cart.pointsLabel')}
                  </span>
                </div>
                <button type="submit" disabled={submitting} className="w-full btn-primary disabled:opacity-60">
                  {submitting ? t('checkout.submitting') : t('checkout.submit')}
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Checkout;
