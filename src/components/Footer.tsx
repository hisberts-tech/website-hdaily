import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/ChatGPT_Image_7_mars_2026__10_43_31-removebg-preview.svg';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quick: [
      { name: 'Accueil', href: '/' },
      { name: 'Boutique', href: '/boutique' },
      { name: 'Paniers', href: '/paniers' },
      { name: 'Abonnement', href: '#' },
    ],
    support: [
      { name: 'Politique de confidentialité', href: '#' },
      { name: 'Livraison & retours', href: '#' },
      { name: 'FAQ', href: '#' },
      { name: 'Contact', href: '/contact' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'fab fa-facebook-f', href: '#' },
    { name: 'Instagram', icon: 'fab fa-instagram', href: '#' },
    { name: 'WhatsApp', href: 'https://wa.me/50939134651' },
  ];

  return (
    <footer className="bg-hd-secondary text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <Link to="/" className="inline-block">
            <img src={logo} alt="H-Daily Logo" className="h-16 w-auto" />
          </Link>
          <p className="text-sm text-gray-400">
            Votre épicerie premium en Haïti, livraison rapide et produits frais.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-gray-400 hover:text-hd-primary transition-colors"
                aria-label={social.name}
                target={social.href.startsWith('http') ? '_blank' : '_self'}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <i className={`${social.icon} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-white font-semibold mb-4">Liens rapides</h5>
          <ul className="space-y-2 text-sm">
            {footerLinks.quick.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="text-gray-400 hover:text-hd-primary transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h5 className="text-white font-semibold mb-4">Support</h5>
          <ul className="space-y-2 text-sm">
            {footerLinks.support.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="text-gray-400 hover:text-hd-primary transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours & Location */}
        <div>
          <h5 className="text-white font-semibold mb-4">Horaires</h5>
          <p className="text-sm text-gray-400 mb-2">
            Lun - Sam : 8h - 20h<br />
            Dimanche : 9h - 14h
          </p>
          <p className="text-sm text-gray-400">
            <i className="fas fa-map-marker-alt text-hd-primary mr-2"></i>
            Port-au-Prince, Haïti
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 pt-12 mt-8 border-t border-gray-700">
        <p>
          © {currentYear} H-Daily Premium — L'élégance du goût. Tous droits réservés. |{' '}
          <i className="fas fa-heart text-hd-primary"></i> fait avec passion
        </p>
      </div>
    </footer>
  );
};

export default Footer;
