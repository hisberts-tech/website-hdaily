import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { NotificationProvider } from './context/NotificationContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Boutique from './pages/Boutique';
import Paniers from './pages/Paniers';
import Services from './pages/Services';
import Contact from './pages/Contact';

function App() {
  return (
    <NotificationProvider>
      <ProductProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/boutique" element={<Boutique />} />
              <Route path="/paniers" element={<Paniers />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        </CartProvider>
      </ProductProvider>
    </NotificationProvider>
  );
}

export default App;
