import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Cart from './Cart';
import Notifications from './Notifications';
import SubscriptionModal from './SubscriptionModal';
import CreditModal from './CreditModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener('openCart', handleOpenCart);
    return () => window.removeEventListener('openCart', handleOpenCart);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onSubscriptionClick={() => setIsSubscriptionModalOpen(true)}
        onCreditClick={() => setIsCreditModalOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Notifications />
      <SubscriptionModal 
        isOpen={isSubscriptionModalOpen} 
        onClose={() => setIsSubscriptionModalOpen(false)} 
      />
      <CreditModal 
        isOpen={isCreditModalOpen} 
        onClose={() => setIsCreditModalOpen(false)} 
      />
    </div>
  );
};

export default Layout;
