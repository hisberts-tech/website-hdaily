import React, { useState } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../lib/api';

const Contact: React.FC = () => {
  const { addNotification } = useNotifications();
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setSubmitting(true);
    try {
      await api.sendContact({
        fullName: String(data.get('fullName') ?? ''),
        email: String(data.get('email') ?? ''),
        phone: String(data.get('phone') ?? ''),
        subject: String(data.get('subject') ?? ''),
        message: String(data.get('message') ?? ''),
      });
      addNotification('Message envoyé! Nous vous contacterons rapidement.', 'success');
      form.reset();
    } catch (err) {
      addNotification(
        err instanceof Error ? err.message : "Échec de l'envoi du message",
        'error'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: 'fas fa-phone',         label: t('contact.phone'),   value: '+509 3913 4651',       action: 'tel:+50939134651' },
    { icon: 'far fa-envelope',      label: t('contact.email'),   value: 'hisberts@gmail.com',   action: 'mailto:hisberts@gmail.com' },
    { icon: 'fab fa-whatsapp',      label: 'WhatsApp',           value: '+509 3913 4651',       action: 'https://wa.me/50939134651' },
    { icon: 'fas fa-map-marker-alt',label: t('contact.address'), value: 'Port-au-Prince, Haïti',action: '#' },
  ];

  const hours = [
    { day: 'Lundi - Vendredi', hours: '8h - 20h' },
    { day: 'Samedi',           hours: '8h - 14h' },
    { day: 'Dimanche',         hours: '9h - 14h' },
  ];

  const faq = [
    {
      question: 'Quels sont les délais de livraison?',
      answer: 'Nous livrons en moins de 24h dans toute la région de Port-au-Prince. Pour les autres régions, les délais peuvent varier entre 24h et 48h.'
    },
    {
      question: 'Comment passer commande?',
      answer: 'Vous pouvez commander via notre site, par téléphone au +509 3913 4651, ou directement sur WhatsApp. Nous confirmons toujours votre commande avant livraison.'
    },
    {
      question: 'Quels modes de paiement acceptez-vous?',
      answer: 'Nous acceptons MonCash, Natcash, virements bancaires, et paiement à la livraison. Les clients abonnés peuvent également bénéficier du service de crédit.'
    },
    {
      question: 'Puis-je personnaliser mon panier?',
      answer: 'Absolument! Contactez-nous pour créer un panier personnalisé selon vos besoins et votre budget.'
    },
    {
      question: 'Comment fonctionne le service de crédit?',
      answer: "Le crédit vous permet d'acheter maintenant et payer plus tard. Remplissez le formulaire de demande et nous vous contacterons sous 24h pour validation."
    }
  ];

  return (
    <div className="min-h-screen bg-hd-cream">
      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32 bg-gradient-to-br from-hd-cream to-hd-light">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 text-center">
          <div className="inline-flex items-center gap-2 bg-hd-surface/70 backdrop-blur-sm rounded-full px-5 py-2 border border-hd-primary/20 mb-6 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-hd-primary animate-pulse"></span>
            <span className="text-sm uppercase tracking-[0.2em] text-hd-primary font-bold">{t('contact.badge')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-hd-secondary leading-[1.1]">
            {t('contact.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-hd-primary to-emerald-600">{t('contact.title2')}</span>
          </h1>
          <p className="text-hd-text text-lg xl:text-2xl max-w-3xl mx-auto mt-6 xl:mt-8 leading-relaxed font-light">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 px-6 bg-hd-light">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-serif text-hd-secondary mb-6">{t('contact.formTitle')}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="fullName"
                    placeholder={t('contact.fieldName')}
                    required
                    className="px-5 py-3 rounded-xl border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={t('contact.fieldEmail')}
                    required
                    className="px-5 py-3 rounded-xl border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder={t('contact.fieldPhone')}
                  required
                  className="w-full px-5 py-3 rounded-xl border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder={t('contact.fieldSubject')}
                  required
                  className="w-full px-5 py-3 rounded-xl border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary"
                />
                <textarea
                  name="message"
                  placeholder={t('contact.fieldMessage')}
                  rows={5}
                  required
                  className="w-full px-5 py-3 rounded-xl border border-hd-border bg-hd-surface focus:outline-none focus:ring-2 focus:ring-hd-primary text-hd-secondary"
                ></textarea>
                <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
                  {submitting ? t('common.sending') : t('contact.sendBtn')} <i className="far fa-paper-plane ml-2"></i>
                </button>
              </form>
            </div>

            {/* Hours & Location */}
            <div>
              <h2 className="text-3xl font-serif text-hd-secondary mb-6">{t('contact.hoursTitle')}</h2>

              <div className="bg-hd-surface rounded-2xl p-6 shadow-lg mb-6">
                <h3 className="font-semibold text-lg text-hd-secondary mb-4">{t('contact.hoursSection')}</h3>
                <div className="space-y-2">
                  {hours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-hd-border last:border-0">
                      <span className="text-hd-text">{schedule.day}</span>
                      <span className="font-medium text-hd-secondary">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-hd-surface rounded-2xl p-6 shadow-lg">
                <h3 className="font-semibold text-lg text-hd-secondary mb-4">{t('contact.locationTitle')}</h3>
                <div className="aspect-video bg-hd-light rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-map-marked-alt text-4xl text-hd-muted"></i>
                </div>
                <p className="text-hd-text">
                  <strong>{t('contact.address')}:</strong> Port-au-Prince, Haïti<br />
                  <strong>{t('contact.phone')}:</strong> +509 3913 4651<br />
                  <strong>{t('contact.email')}:</strong> hisberts@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-24 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-hd-secondary mb-4">{t('contact.waysTitle')}</h2>
          <p className="text-hd-text text-lg xl:text-xl max-w-3xl mx-auto">{t('contact.waysSubtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.action}
              className="bg-hd-surface rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
              target={info.action.startsWith('http') ? '_blank' : '_self'}
              rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <div className="w-12 h-12 bg-hd-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <i className={`${info.icon} text-white text-xl`}></i>
              </div>
              <h3 className="font-semibold text-lg text-hd-secondary mb-1">{info.label}</h3>
              <p className="text-hd-text group-hover:text-hd-primary transition-colors">{info.value}</p>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary">{t('contact.faqTitle')}</h2>
          <div className="section-divider"></div>
        </div>
        <div className="space-y-4">
          {faq.map((item, index) => (
            <details key={index} className="bg-hd-surface rounded-2xl p-6 shadow-lg group">
              <summary className="font-semibold text-lg text-hd-secondary cursor-pointer list-none flex items-center justify-between">
                {item.question}
                <i className="fas fa-chevron-down text-hd-primary group-open:rotate-180 transition-transform"></i>
              </summary>
              <p className="mt-4 text-hd-text">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-hd-cream to-hd-surface border-t border-hd-border">
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-28 2xl:px-40 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-hd-secondary mb-6">{t('contact.ctaTitle')}</h2>
          <p className="text-lg xl:text-xl text-hd-text mb-16 max-w-3xl mx-auto leading-relaxed">{t('contact.ctaSubtitle')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="https://wa.me/50939134651" className="btn-primary flex justify-center items-center px-10 py-5 text-lg font-bold">
              <i className="fab fa-whatsapp mr-3"></i> {t('contact.ctaWhatsapp')}
            </a>
            <a href="tel:+50939134651" className="btn-secondary flex justify-center items-center px-10 py-5 text-lg font-bold">
              <i className="fas fa-phone mr-3"></i> {t('contact.ctaPhone')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
