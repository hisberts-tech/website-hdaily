import React from 'react';
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
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Cart />
      <Notifications />
      <SubscriptionModal />
      <CreditModal />
    </div>
  );
};

export default Layout;
