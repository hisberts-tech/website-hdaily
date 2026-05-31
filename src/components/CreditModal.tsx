import React from 'react';

interface CreditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreditModal: React.FC<CreditModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleCreditRequest = () => {
    onClose();
    // TODO: Navigate to credit application page or show credit form
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
            <i className="fas fa-credit-card text-white text-2xl"></i>
          </div>
          <h3 className="text-2xl font-serif text-hd-secondary mb-2">Service de Crédit</h3>
          <p className="text-hd-text text-sm">
            Achetez maintenant et payez plus tard avec nos options de crédit flexibles
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-hd-secondary mb-2">Crédit Express</h4>
            <p className="text-sm text-hd-text">Jusqu'à 5,000 HTG</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-hd-secondary mb-2">Crédit Standard</h4>
            <p className="text-sm text-hd-text">Jusqu'à 15,000 HTG</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-hd-secondary mb-2">Crédit Premium</h4>
            <p className="text-sm text-hd-text">Jusqu'à 30,000 HTG</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCreditRequest}
            className="flex-1 btn-primary"
          >
            Demander du crédit
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

export default CreditModal;
