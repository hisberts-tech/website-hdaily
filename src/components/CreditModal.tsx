import React, { useState } from 'react';

interface CreditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreditModal: React.FC<CreditModalProps> = ({ isOpen, onClose }) => {
  const [showForm, setShowForm] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setShowForm(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    handleClose();
    alert("Votre demande de crédit a été soumise avec succès.");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl w-full p-6 relative animate-scale-in ${showForm ? 'max-w-2xl' : 'max-w-md'}`}>
        <button
          onClick={handleClose}
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
            {showForm ? "Remplissez le formulaire ci-dessous pour faire votre demande." : "Achetez maintenant et payez plus tard avec nos options de crédit flexibles"}
          </p>
        </div>

        {!showForm ? (
          <>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 max-h-64 overflow-y-auto">
              <h4 className="font-semibold text-amber-900 mb-3 sticky top-0 bg-amber-50">Conditions de crédit</h4>
              <ul className="text-sm text-amber-800 space-y-2 text-left">
                <li>• Être client enregistré</li>
                <li>• Fournir un numéro de téléphone valide</li>
                <li>• Fournir nom et prénom</li>
                <li>• Fournir un NIF ou CIN (carte d'identité)</li>
                <li>• Limite de crédit entre 3 000 et 7 500 HTG</li>
                <li>• Choisir un délai de remboursement (1 semaine ou 1 mois)</li>
                <li>• Pour un terme d'un mois, la dette augmente de 10%</li>
                <li>• Fournir une adresse complète et vérifiable</li>
                <li>• Accepter les termes et conditions du service de crédit</li>
                <li>• Avoir complété au moins 3 commandes payées et validées avec H-Daily</li>
                <li>• N'avoir aucune dette en cours ou en retard</li>
                <li>• Respecter les délais de remboursement pour maintenir l'accès au crédit</li>
                <li>• L'accès au crédit peut être suspendu en cas de retard de paiement</li>
                <li>• H-Daily se réserve le droit de réduire ou retirer la limite de crédit si les conditions ne sont pas respectées</li>
                <li>• Toutes les informations fournies doivent être exactes et vérifiables</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(true)}
                className="flex-1 btn-primary"
              >
                Demander du crédit
              </button>
              <button
                onClick={handleClose}
                className="flex-1 btn-outline"
              >
                Plus tard
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hd-primary outline-none" placeholder="Jean" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hd-primary outline-none" placeholder="Dupont" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone *</label>
                <input type="tel" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hd-primary outline-none" placeholder="+509 3913 4651" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIF ou CIN *</label>
                <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hd-primary outline-none" placeholder="Votre NIF ou CIN" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse complète *</label>
              <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hd-primary outline-none" placeholder="Votre adresse" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Montant demandé (HTG) *</label>
                <select required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hd-primary outline-none">
                  <option value="">Sélectionnez le montant</option>
                  <option value="3000">3 000 HTG</option>
                  <option value="4500">4 500 HTG</option>
                  <option value="6000">6 000 HTG</option>
                  <option value="7500">7 500 HTG</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Délai de remboursement *</label>
                <select required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hd-primary outline-none">
                  <option value="">Sélectionnez le délai</option>
                  <option value="1_week">1 semaine</option>
                  <option value="1_month">1 mois (+10% d'augmentation)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 btn-primary"
              >
                Soumettre
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 btn-outline"
              >
                Retour
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreditModal;
