import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubscribeNow = () => {
    onClose();
    navigate('/abonnement');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-hd-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-crown text-white text-2xl"></i>
          </div>
          <h3 className="text-2xl font-serif text-hd-secondary mb-2">Abonnement H-Daily</h3>
          <p className="text-hd-text text-sm">
            Recevez des paniers frais régulièrement avec des avantages exclusifs
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center text-sm">
            <i className="fas fa-truck text-hd-primary mr-3"></i>
            <span>Livraison chaque semaine ou chaque mois</span>
          </div>
          <div className="flex items-center text-sm">
            <i className="fas fa-percentage text-hd-primary mr-3"></i>
            <span>Jusqu'à 20% de réduction</span>
          </div>
          <div className="flex items-center text-sm">
            <i className="fas fa-credit-card text-hd-primary mr-3"></i>
            <span>Accès au crédit jusqu'à 30,000 HTG</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubscribeNow}
            className="flex-1 btn-primary"
          >
            S'abonner maintenant
          </button>
          <button
            onClick={onClose}
            className="flex-1 btn-outline"
          >
            Plus tard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
