import React from 'react';
import { useNotifications } from '../context/NotificationContext';

const Contact: React.FC = () => {
  const { addNotification } = useNotifications();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification('Message envoyé! Nous vous contacterons rapidement.', 'success');
  };

  const contactInfo = [
    {
      icon: 'fas fa-phone',
      label: 'Téléphone',
      value: '+509 3913 4651',
      action: 'tel:+50939134651'
    },
    {
      icon: 'far fa-envelope',
      label: 'Email',
      value: 'hisberts@gmail.com',
      action: 'mailto:hisberts@gmail.com'
    },
    {
      icon: 'fab fa-whatsapp',
      label: 'WhatsApp',
      value: '+509 3913 4651',
      action: 'https://wa.me/50939134651'
    },
    {
      icon: 'fas fa-map-marker-alt',
      label: 'Adresse',
      value: 'Port-au-Prince, Haïti',
      action: '#'
    }
  ];

  const hours = [
    { day: 'Lundi - Vendredi', hours: '8h - 20h' },
    { day: 'Samedi', hours: '8h - 14h' },
    { day: 'Dimanche', hours: '9h - 14h' }
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
      answer: 'Le crédit vous permet d\'acheter maintenant et payer plus tard. Remplissez le formulaire de demande et nous vous contacterons sous 24h pour validation.'
    }
  ];

  return (
    <div className="min-h-screen bg-hd-cream">
      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-br from-hd-cream to-hd-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-1.5 border border-hd-primary/20 mb-5">
            <span className="w-2 h-2 rounded-full bg-hd-primary"></span>
            <span className="text-sm uppercase tracking-[0.2em] text-hd-primary font-bold">Contact</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-hd-secondary leading-[1.15]">
            Restons en <span className="text-hd-primary">contact</span>
          </h1>
          <p className="text-hd-text text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            Notre équipe est à votre disposition pour répondre à toutes vos questions.
          </p>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 px-6 bg-hd-light">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-serif text-hd-secondary mb-6">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nom complet"
                    required
                    className="px-5 py-3 rounded-xl border border-hd-border bg-white focus:outline-none focus:ring-2 focus:ring-hd-primary"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="px-5 py-3 rounded-xl border border-hd-border bg-white focus:outline-none focus:ring-2 focus:ring-hd-primary"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Téléphone"
                  required
                  className="w-full px-5 py-3 rounded-xl border border-hd-border bg-white focus:outline-none focus:ring-2 focus:ring-hd-primary"
                />
                <input
                  type="text"
                  placeholder="Sujet"
                  required
                  className="w-full px-5 py-3 rounded-xl border border-hd-border bg-white focus:outline-none focus:ring-2 focus:ring-hd-primary"
                />
                <textarea
                  placeholder="Votre message..."
                  rows={5}
                  required
                  className="w-full px-5 py-3 rounded-xl border border-hd-border bg-white focus:outline-none focus:ring-2 focus:ring-hd-primary"
                ></textarea>
                <button type="submit" className="btn-primary">
                  Envoyer le message <i className="far fa-paper-plane ml-2"></i>
                </button>
              </form>
            </div>

            {/* Hours & Location */}
            <div>
              <h2 className="text-3xl font-serif text-hd-secondary mb-6">Horaires & Localisation</h2>
              
              {/* Hours */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <h3 className="font-semibold text-lg text-hd-secondary mb-4">Horaires d'ouverture</h3>
                <div className="space-y-2">
                  {hours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-hd-border last:border-0">
                      <span className="text-hd-text">{schedule.day}</span>
                      <span className="font-medium text-hd-secondary">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-semibold text-lg text-hd-secondary mb-4">Où nous trouver</h3>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-map-marked-alt text-4xl text-gray-400"></i>
                </div>
                <p className="text-hd-text">
                  <strong>Adresse:</strong> Port-au-Prince, Haïti<br />
                  <strong>Téléphone:</strong> +509 3913 4651<br />
                  <strong>Email:</strong> hisberts@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-hd-secondary mb-4">Différentes façons de nous contacter</h2>
          <p className="text-hd-text text-lg max-w-2xl mx-auto">
            Choisissez la méthode qui vous convient le mieux pour nous joindre rapidement.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.action}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
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
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-hd-secondary">Questions fréquentes</h2>
          <div className="section-divider"></div>
        </div>

        <div className="space-y-4">
          {faq.map((item, index) => (
            <details key={index} className="bg-white rounded-2xl p-6 shadow-lg group">
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
      <section className="py-20 px-6 bg-gradient-to-r from-hd-secondary to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Prêt à commander?</h2>
          <p className="text-lg opacity-90 mb-8">
            Contactez-nous dès maintenant pour passer votre commande ou obtenir plus d'informations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/50939134651" className="btn-primary bg-white text-hd-secondary hover:bg-hd-primary hover:text-white">
              <i className="fab fa-whatsapp mr-2"></i> Commander via WhatsApp
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

export default Contact;
