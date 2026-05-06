import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/images/ChatGPT_Image_7_mars_2026__10_43_31-removebg-preview.svg';

interface HeaderProps {
  onSubscriptionClick: () => void;
  onCreditClick: () => void;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSubscriptionClick, onCreditClick, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
    const location = useLocation();

  const navigation = [
    { name: 'Accueil', href: '/', icon: 'fa-home' },
    { name: 'Boutique', href: '/boutique', icon: 'fa-shopping-bag' },
    { name: 'Paniers Pré-faits', href: '/paniers', icon: 'fa-gift' },
    { name: 'Services', href: '/services', icon: 'fa-concierge-bell' },
    { name: 'Contact', href: '/contact', icon: 'fa-envelope' },
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/50939134651', '_blank');
  };

  const handleSubscriptionClick = () => {
    onSubscriptionClick();
  };

  const handleCreditClick = () => {
    onCreditClick();
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block w-full bg-white/95 backdrop-blur-sm border-b border-hd-border sticky top-0 z-40 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="H-Daily Logo" className="h-16 w-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="flex space-x-8 text-hd-secondary font-medium">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm transition-all hover:text-hd-primary ${
                  isActive(item.href) ? 'text-hd-primary font-semibold' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={onCartClick}
              className="relative group"
            >
              <i className="fas fa-shopping-cart text-xl text-black group-hover:text-hd-primary transition"></i>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-hd-primary text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {getTotalItems()}
                </span>
              )}
            </button>
            
            <button
              onClick={handleCreditClick}
              className="hidden md:flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-200 transition"
            >
              <i className="fas fa-credit-card"></i> Crédit
            </button>
            
            <button
              onClick={handleSubscriptionClick}
              className="hidden md:flex items-center gap-2 bg-hd-primary/10 text-hd-primary px-4 py-2 rounded-full text-sm font-semibold hover:bg-hd-primary hover:text-white transition"
            >
              <i className="fas fa-crown"></i> Abonnement Premium
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden w-full bg-white/95 backdrop-blur-sm border-b border-hd-border sticky top-0 z-40 transition-all shadow-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="H-Daily Logo" className="h-12 w-auto" />
          </Link>
          
          {/* Mobile Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onCartClick}
              className="relative group"
            >
              <i className="fas fa-shopping-cart text-lg text-black group-hover:text-hd-primary transition"></i>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-hd-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                  {getTotalItems()}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-hd-secondary hover:text-hd-primary transition"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-white border-t border-hd-border">
            <nav className="px-4 py-3 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? 'bg-hd-primary/10 text-hd-primary'
                      : 'text-hd-secondary hover:bg-hd-light hover:text-hd-primary'
                  }`}
                >
                  <i className={`fas ${item.icon} w-4`}></i>
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-3 border-t border-hd-border space-y-2">
                <button
                  onClick={handleCreditClick}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                >
                  <i className="fas fa-credit-card w-4"></i>
                  Crédit
                </button>
                
                <button
                  onClick={handleSubscriptionClick}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium bg-hd-primary/10 text-hd-primary hover:bg-hd-primary hover:text-white transition"
                >
                  <i className="fas fa-crown w-4"></i>
                  Abonnement Premium
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-30 hover:scale-110 transition-transform md:bottom-6"
        aria-label="Contact via WhatsApp"
      >
        <i className="fab fa-whatsapp text-2xl"></i>
      </button>
    </>
  );
};

export default Header;
