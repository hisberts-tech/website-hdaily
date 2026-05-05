import React from 'react';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, getTotalPrice, updateQuantity, removeFromCart } = useCart();
  const { addNotification } = useNotifications();

  const handleCheckout = () => {
    if (items.length === 0) {
      addNotification('Votre panier est vide', 'error');
      return;
    }

    let message = "Bonjour! Je souhaite commander les produits suivants:\n\n";
    let total = 0;

    items.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      message += `${index + 1}. ${item.name} (${item.quantity} ${item.unit}) - ${item.price} HTG/${item.unit} = ${itemTotal} HTG\n`;
    });

    message += `\nTotal: ${total} HTG`;

    const whatsappUrl = `https://wa.me/50939134651?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    addNotification('Commande envoyée via WhatsApp!', 'success');
    onClose();
  };

  const handleQuantityChange = (productId: number, change: number) => {
    updateQuantity(productId, change);
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
    addNotification('Produit retiré du panier', 'info');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = getTotalPrice();

  if (!isOpen && items.length === 0) {
    return null; // Don't render cart if empty and closed
  }

  return (
    <>
      {/* Cart Toggle Button */}
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('openCart'))}
        className="fixed bottom-6 right-6 bg-hd-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-30 hover:scale-110 transition-transform md:bottom-6"
        aria-label="Panier"
      >
        <i className="fas fa-shopping-cart text-xl"></i>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 animate-fade-in">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl animate-slide-up">
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold text-hd-secondary">Mon Panier</h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <i className="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500 mb-4">Votre panier est vide</p>
                    <button
                      onClick={onClose}
                      className="text-hd-primary hover:text-hd-primary-dark transition-colors"
                    >
                      Continuer mes achats
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.src = '/src/assets/images/default-product.jpg';
                          }}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-hd-secondary">{item.name}</h4>
                          <p className="text-xs text-gray-500">{item.price} HTG/{item.unit}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="w-6 h-6 bg-gray-200 rounded text-xs hover:bg-gray-300 transition-colors"
                            >
                              -
                            </button>
                            <span className="text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="w-6 h-6 bg-gray-200 rounded text-xs hover:bg-gray-300 transition-colors"
                            >
                              +
                            </button>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="ml-auto text-red-500 hover:text-red-700 transition-colors"
                            >
                              <i className="fas fa-trash text-xs"></i>
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm text-hd-secondary">
                            {item.price * item.quantity} HTG
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Cart Footer */}
              {items.length > 0 && (
                <div className="border-t p-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-semibold text-hd-secondary">Total:</span>
                    <span className="text-xl font-bold text-hd-primary">{totalPrice} HTG</span>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={handleCheckout}
                      className="w-full btn-primary"
                    >
                      Commander via WhatsApp
                    </button>
                    <button
                      onClick={onClose}
                      className="w-full btn-outline"
                    >
                      Continuer mes achats
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
