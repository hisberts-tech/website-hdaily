import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { NotificationProvider } from './context/NotificationContext';
import { LoyaltyProvider } from './context/LoyaltyContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Boutique from './pages/Boutique';
import Paniers from './pages/Paniers';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Abonnement from './pages/Abonnement';
import CreditService from './pages/CreditService';
import Fidelite from './pages/Fidelite';

function App() {
  return (
    <ThemeProvider>
    <LanguageProvider>
    <NotificationProvider>
      <LoyaltyProvider>
        <ProductProvider>
          <CartProvider>
            <Layout>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/boutique" element={<Boutique />} />
                <Route path="/paniers" element={<Paniers />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/abonnement" element={<Abonnement />} />
                <Route path="/credit" element={<CreditService />} />
                <Route path="/fidelite" element={<Fidelite />} />
              </Routes>
            </Layout>
          </CartProvider>
        </ProductProvider>
      </LoyaltyProvider>
    </NotificationProvider>
    </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
