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
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-amber-900 mb-3">Conditions de crédit</h4>
            <ul className="text-sm text-amber-800 space-y-2 text-left">
              <li>• Avoir complété au moins 3 commandes payées et validées avec H-Daily</li>
              <li>• Être un client enregistré</li>
              <li>• Fournir un numéro de téléphone valide, nom et prénom</li>
              <li>• Fournir un NIF ou CIN (carte d'identité)</li>
              <li>• Limite de crédit : 3 000 à 7 500 HTG</li>
              <li>• Délai de remboursement : 1 semaine ou 1 mois</li>
              <li>• Pour un délai d'un mois : majoration de 10% de la dette</li>
              <li>• Fournir une adresse complète et vérifiable</li>
              <li>• N'avoir aucune dette en cours ou en retard</li>
              <li>• Respecter les délais pour maintenir l'accès au crédit</li>
              <li>• L'accès au crédit peut être suspendu en cas de retard de paiement</li>
              <li>• H-Daily se réserve le droit de réduire ou retirer la limite de crédit si les conditions ne sont pas respectées</li>
              <li>• Toutes les informations fournies doivent être exactes et vérifiables</li>
            </ul>
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
