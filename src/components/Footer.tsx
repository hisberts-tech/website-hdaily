import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import logo from '../assets/images/ChatGPT_Image_7_mars_2026__10_43_31-removebg-preview.svg';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quick: [
      { name: t('nav.home'),      href: '/' },
      { name: t('nav.boutique'),  href: '/boutique' },
      { name: t('nav.paniers'),   href: '/paniers' },
      { name: t('nav.subscription').replace(' Premium', ''), href: '/abonnement' },
    ],
    support: [
      { name: t('footer.privacy'),  href: '#' },
      { name: t('footer.delivery'), href: '#' },
      { name: t('footer.faq'),      href: '#' },
      { name: t('footer.contact'),  href: '/contact' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook',  icon: 'fab fa-facebook-f', href: '#' },
    { name: 'Instagram', icon: 'fab fa-instagram',  href: '#' },
    { name: 'WhatsApp',  icon: 'fab fa-whatsapp',   href: 'https://wa.me/50939134651' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-hd-secondary via-hd-secondary to-black text-gray-300 pt-20 pb-12 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6 animate-fade-in">
            <Link to="/" className="inline-block group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative">
                <img src={logo} alt="H-Daily Logo" className="h-20 w-auto transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute -inset-1 bg-hd-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">{t('footer.tagline')}</p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="group relative w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-hd-primary transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-hd-primary/25"
                  aria-label={social.name}
                  target={social.href.startsWith('http') ? '_blank' : '_self'}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <i className={`${social.icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-bold text-lg mb-6 relative">
              <span className="relative z-10">{t('footer.quickLinks')}</span>
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-hd-primary rounded-full"></div>
            </h5>
            <ul className="space-y-3">
              {footerLinks.quick.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-hd-primary transition-all duration-300 flex items-center group text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-hd-primary mr-0 group-hover:mr-2 transition-all duration-300 rounded-full"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-white font-bold text-lg mb-6 relative">
              <span className="relative z-10">{t('footer.support')}</span>
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-hd-primary rounded-full"></div>
            </h5>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-gray-400 hover:text-hd-primary transition-all duration-300 flex items-center group text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-hd-primary mr-0 group-hover:mr-2 transition-all duration-300 rounded-full"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Location */}
          <div>
            <h5 className="text-white font-bold text-lg mb-6 relative">
              <span className="relative z-10">{t('footer.hoursContact')}</span>
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-hd-primary rounded-full"></div>
            </h5>
            <div className="space-y-4">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-hd-primary/20 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-clock text-hd-primary text-sm"></i>
                  </div>
                  <span className="text-sm text-gray-300 font-medium">{t('footer.hours')}</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  <span className="text-hd-primary font-medium">{t('footer.monSat')}</span> 8h - 20h<br />
                  <span className="text-hd-primary font-medium">{t('footer.sun')}</span> 9h - 14h
                </p>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-hd-primary/20 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-map-marker-alt text-hd-primary text-sm"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 font-medium">{t('footer.location')}</p>
                    <p className="text-xs text-gray-400">{t('footer.locationValue')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative mt-16 pt-8 border-t border-gray-700/50">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hd-primary/50 to-transparent"></div>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-gray-500 text-center md:text-left">
              © {currentYear} H-Daily Premium — L'élégance du goût. {t('footer.allRights')}
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>{t('footer.madeWith')}</span>
              <i className="fas fa-heart text-hd-primary animate-pulse"></i>
              <span>{t('footer.inHaiti')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
