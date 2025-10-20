import React, { useState } from 'react';
import { Users, TrendingUp, Gift, Ticket, Search, Plus, Globe, ChevronDown, Mail, MapPin, ShoppingCart, Percent, Eye, Edit, AlertCircle, Target, BarChart3, Clock, Menu, X, CheckCircle, Upload } from 'lucide-react';

export default function CRMPage() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const stats = {
    clientsInscrits: 42380,
    tauxActivation: 71,
    pointsDistribues: 12600000,
    utilisationCoupons: 38
  };

  const clients = [
    { id: 1, nom: 'Jeanne Leroy', segment: 'Gold', points: 12450, dernierAchat: 'Hier', avatar: 'https://i.pravatar.cc/150?img=5', achats: 624, coupons: 2 },
    { id: 2, nom: 'Karim B.', segment: 'Platinum', points: 32880, dernierAchat: '2j', avatar: 'https://i.pravatar.cc/150?img=12', achats: 1245, coupons: 5 },
    { id: 3, nom: 'Emma D.', segment: 'Silver', points: 3120, dernierAchat: '5j', avatar: 'https://i.pravatar.cc/150?img=9', achats: 234, coupons: 1 },
    { id: 4, nom: 'Marc T.', segment: 'Gold', points: 8750, dernierAchat: '3j', avatar: 'https://i.pravatar.cc/150?img=15', achats: 890, coupons: 3 },
    { id: 5, nom: 'Sophie L.', segment: 'Silver', points: 2340, dernierAchat: '1 sem', avatar: 'https://i.pravatar.cc/150?img=20', achats: 456, coupons: 1 },
    { id: 6, nom: 'Ahmed K.', segment: 'Platinum', points: 45120, dernierAchat: 'Hier', avatar: 'https://i.pravatar.cc/150?img=33', achats: 2340, coupons: 8 }
  ];

  const currentClient = selectedClient || clients[0];

  // Modal Component
  const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-[30px] max-w-2xl w-full my-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white rounded-t-[30px]">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 max-h-[calc(90vh-100px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );

  const NewProgramModal = () => (
    <Modal title="Nouveau programme de fidélité" onClose={() => setActiveModal(null)}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">Créez un programme pour récompenser vos clients. Vous pourrez l'éditer avant activation.</p>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target size={18} className="text-green-600" />
            Paramètres généraux
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom du programme</label>
              <input type="text" defaultValue="Programme Carrefour+" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <p className="text-xs text-gray-500 mt-1">Visible sur le ticket et dans l'espace client</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <input type="text" defaultValue="Points cumulés" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                <p className="text-xs text-gray-500 mt-1">Points par euro dépensé</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Brouillon</option>
                  <option>Actif</option>
                  <option>En test</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-200 flex gap-3">
          <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-[20px] hover:bg-gray-200 font-medium transition">Annuler</button>
          <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-[20px] hover:bg-green-200 font-medium transition">Enregistrer brouillon</button>
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-[20px] hover:bg-blue-700 font-medium transition">Créer et activer</button>
        </div>
      </div>
    </Modal>
  );

  const NewClientModal = () => (
    <Modal title="Nouveau client" onClose={() => setActiveModal(null)}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">Ajoutez un client au programme de fidélité. Les champs obligatoires sont requis pour l'adhésion.</p>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users size={18} className="text-blue-600" />
            Identité
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
              <input type="text" placeholder="Marie" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
              <input type="text" placeholder="Dupont" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" placeholder="marie.dupont@email.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <p className="text-xs text-gray-500 mt-1">Requis pour le compte en ligne</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
              <input type="tel" placeholder="+33 6 12 34 56 78" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <p className="text-xs text-gray-500 mt-1">Utilisé pour les SMS et le support</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-red-600" />
            Adresse
          </h3>
          <div className="space-y-4">
            <input type="text" placeholder="10 Rue de la Paix" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            <div className="grid grid-cols-3 gap-4">
              <input type="text" placeholder="75002" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <input type="text" placeholder="Paris" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <input type="text" placeholder="France" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-200 flex gap-3">
          <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-[20px] hover:bg-gray-200 font-medium transition">Annuler</button>
          <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-[20px] hover:bg-green-200 font-medium transition">Enregistrer brouillon</button>
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-[20px] hover:bg-blue-700 font-medium transition">Créer le client</button>
        </div>
      </div>
    </Modal>
  );

  const CouponModal = () => (
    <Modal title={`Emettre un coupon • ${currentClient.nom}`} onClose={() => setActiveModal(null)}>
      <div className="space-y-6">
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
          <img src={currentClient.avatar} alt={currentClient.nom} className="w-12 h-12 rounded-full" />
          <div>
            <p className="font-semibold text-gray-900">{currentClient.nom}</p>
            <p className="text-sm text-gray-600">Client ID: CF-00452198 | Solde points: 1250</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Ticket size={18} className="text-blue-600" />
            Informations du coupon
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type de coupon</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>Remise en %</option>
                <option>Remise fixe</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Valeur</label>
              <input type="text" defaultValue="10 %" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
              <input type="text" defaultValue="AUTO-GEN" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-purple-600" />
            Période de validité
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date de début</label>
              <input type="date" defaultValue="2025-01-15" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date de fin</label>
              <input type="date" defaultValue="2025-03-31" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Utilisations max</label>
              <input type="text" defaultValue="Illimité" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-200 flex gap-3">
          <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-[20px] hover:bg-gray-200 font-medium transition">Annuler</button>
          <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-[20px] hover:bg-green-200 font-medium transition">Exporter CSV</button>
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-[20px] hover:bg-blue-700 font-medium transition">Emettre le coupon</button>
        </div>
      </div>
    </Modal>
  );

  const AddPointsModal = () => (
    <Modal title={`Ajouter des points • ${currentClient.nom}`} onClose={() => setActiveModal(null)}>
      <div className="space-y-6">
        <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <img src={currentClient.avatar} alt={currentClient.nom} className="w-12 h-12 rounded-full" />
          <div>
            <p className="font-semibold text-gray-900">{currentClient.nom}</p>
            <p className="text-sm text-gray-600">ID Client: CF-00452198 | Solde actuel: 1250 pts</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Gift size={18} className="text-purple-600" />
            Détails du crédit
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Points à ajouter</label>
              <input type="number" placeholder="250" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <p className="text-xs text-gray-500 mt-1">Entrez un entier positif</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Motif</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>Geste commercial</option>
                <option>Régularisation</option>
                <option>Bonus</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Référence</label>
              <input type="text" placeholder="TICKET #A1-90832" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Validité et régles</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date d'expiration</label>
              <input type="date" defaultValue="2025-12-31" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Convertibles en coupon</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>Oui</option>
                <option>Non</option>
              </select>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-200 flex gap-3">
          <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-[20px] hover:bg-gray-200 font-medium transition">Annuler</button>
          <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-[20px] hover:bg-green-200 font-medium transition">Enregistrer brouillon</button>
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-[20px] hover:bg-blue-700 font-medium transition">Confirmer l'ajout</button>
        </div>
      </div>
    </Modal>
  );

  const ImportClientsModal = () => (
    <Modal title="Importer des clients" onClose={() => setActiveModal(null)}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">Importez vos clients à partir d'un fichier CSV ou XLSX. Mappez les colonnes avant d'importer.</p>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Plus size={18} />
            1) Sélection du fichier
          </h3>
          <div className="border-2 border-dashed border-green-300 rounded-lg p-8 bg-green-50 text-center hover:bg-green-100 transition cursor-pointer">
            <input type="file" accept=".csv,.xlsx" className="hidden" id="file-input" />
            <label htmlFor="file-input" className="cursor-pointer">
              <p className="font-medium text-gray-700">Glissez-déposez votre fichier ici</p>
              <p className="text-sm text-gray-600 mt-1">ou cliquez pour parcourir</p>
              <p className="text-xs text-gray-500 mt-2">Format: CSV, XLSX - Max 10 Mo</p>
            </label>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">2) Mapping des champs</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <input type="text" placeholder="colonne: last_name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                <p className="text-xs text-gray-500 mt-1">Obligatoire</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                <input type="text" placeholder="colonne: first_name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                <p className="text-xs text-gray-500 mt-1">Obligatoire</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="text" placeholder="colonne: email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input type="text" placeholder="colonne: phone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-200 flex gap-3">
          <button onClick={() => setActiveModal(null)} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-[20px] hover:bg-gray-200 font-medium transition">Retour</button>
          <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-[20px] hover:bg-green-200 font-medium transition">Exporter erreurs</button>
          <button onClick={() => setActiveModal('importConfirm')} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-[20px] hover:bg-blue-700 font-medium transition">Lancer l'import</button>
        </div>
      </div>
    </Modal>
  );

  const ImportConfirmModal = () => (
    <Modal title="Paramètres enregistrés" onClose={() => setActiveModal(null)}>
      <div className="space-y-6">
        <p className="text-sm text-gray-600">Étape suivante: confirmer et lancer l'import des clients</p>
        
        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Encodage: UTF-8</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Séparateur: ;</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">En-têtes: Oui</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Conflits: Mise à jour</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Tag: Import_Sept-2025</span>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-purple-600" />
            Récapitulatif de la configuration
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-xs text-gray-600 font-semibold">Total lignes</p>
              <p className="text-2xl font-bold text-green-700">2 500</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-xs text-gray-600 font-semibold">Prêts à importer</p>
              <p className="text-2xl font-bold text-blue-700">2 380</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <p className="text-xs text-gray-600 font-semibold">À vérifier</p>
              <p className="text-2xl font-bold text-orange-700">120</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500 text-xs">
            <p className="text-gray-700"><strong>RGPD:</strong> base légale renseignée, consentement promos: Oui</p>
          </div>
          <div className="mt-2 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
            <p>Les contacts opposés seront exclus automatiquement</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={18} className="text-green-600" />
            Échantillon validé
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Nom</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Prénom</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Téléphone</th>
                  <th className="px-3 py-2 text-left font-semibold text-gray-700">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-2">Dupont</td>
                  <td className="px-3 py-2">Marie</td>
                  <td className="px-3 py-2">marie@example.com</td>
                  <td className="px-3 py-2">+33600000000</td>
                  <td className="px-3 py-2"><span className="px-2 py-1 bg-green-100 text-green-700 rounded font-semibold">Valide</span></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-2">Martin</td>
                  <td className="px-3 py-2">Paul</td>
                  <td className="px-3 py-2">paul@example.com</td>
                  <td className="px-3 py-2">+33611111111</td>
                  <td className="px-3 py-2"><span className="px-2 py-1 bg-green-100 text-green-700 rounded font-semibold">Valide</span></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-2">Silva</td>
                  <td className="px-3 py-2">Ana</td>
                  <td className="px-3 py-2">ana@example.com</td>
                  <td className="px-3 py-2">+33633333333</td>
                  <td className="px-3 py-2"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded font-semibold">Téléphone manquant indicatif</span></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-2">Khan</td>
                  <td className="px-3 py-2">Amir</td>
                  <td className="px-3 py-2">amir@example.com</td>
                  <td className="px-3 py-2">+33644444444</td>
                  <td className="px-3 py-2"><span className="px-2 py-1 bg-red-100 text-red-700 rounded font-semibold">Email en doubloon</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Actions avant import</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Ignorer les doublons</p>
                <p className="text-xs text-gray-600">120 doublons détectés</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <div>
                <p className="font-medium text-gray-900 text-sm">Mettre à jour si email existe</p>
                <p className="text-xs text-gray-600">Sélectionné</p>
              </div>
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 flex gap-3">
          <button onClick={() => setActiveModal('import')} className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-[20px] hover:bg-gray-200 font-medium transition">Retour à la configuration</button>
          <button className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-[20px] hover:bg-green-200 font-medium transition">Exporter les erreurs</button>
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-[20px] hover:bg-blue-700 font-medium transition flex items-center justify-center gap-2">
            <Upload size={16} />
            Confirmer et lancer l'import
          </button>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {activeModal === 'newProgram' && <NewProgramModal />}
      {activeModal === 'newClient' && <NewClientModal />}
      {activeModal === 'coupon' && <CouponModal />}
      {activeModal === 'addPoints' && <AddPointsModal />}
      {activeModal === 'import' && <ImportClientsModal />}
      {activeModal === 'importConfirm' && <ImportConfirmModal />}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-sm md:text-lg font-bold text-gray-700 truncate">Accueil / Clients & Fidélité</h1>
          <div className="flex gap-2 md:gap-3">
            <button onClick={() => setActiveModal('newProgram')} className="hidden md:flex items-center gap-2 px-4 py-2 text-green-700 font-semibold rounded-[20px] bg-green-100 hover:bg-green-200 transition whitespace-nowrap">
              <Globe size={18} />
              Nouveau programme
            </button>
            <button onClick={() => setActiveModal('newClient')} className="flex items-center gap-2 px-3 md:px-4 py-2 bg-[#0b79d0] text-white rounded-[20px] hover:bg-blue-700 transition">
              <Plus size={18} />
              <span className="hidden md:inline">Nouveau client</span>
            </button>
            <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="px-4 md:px-6 py-4 md:py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6">
          <div className="bg-white rounded-[20px] md:rounded-[30px] p-4 md:p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-xs md:text-sm font-semibold">Clients inscrits</span>
              <Users size={18} className="text-blue-600" />
            </div>
            <div className="text-xl md:text-3xl font-bold text-gray-900">{(stats.clientsInscrits / 1000).toFixed(0)}K</div>
            <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-600 text-white rounded-full text-xs font-medium w-full">
              <TrendingUp size={12} className="mr-1" />
              +2.1% ce mois
            </div>
          </div>

          <div className="bg-white rounded-[20px] md:rounded-[30px] p-4 md:p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-xs md:text-sm font-semibold">Taux d'activation</span>
              <Target size={18} className="text-purple-600" />
            </div>
            <div className="text-xl md:text-3xl font-bold text-gray-900">{stats.tauxActivation}%</div>
            <div className="mt-3 inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium w-full">
              <BarChart3 size={12} className="mr-1" />
              Campagne en cours
            </div>
          </div>

          <div className="bg-white rounded-[20px] md:rounded-[30px] p-4 md:p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-xs md:text-sm font-semibold">Points distribués</span>
              <Gift size={18} className="text-cyan-600" />
            </div>
            <div className="text-xl md:text-3xl font-bold text-gray-900">{(stats.pointsDistribues / 1000000).toFixed(1)}M</div>
            <div className="mt-3 inline-flex items-center px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium w-full">
              <Gift size={12} className="mr-1" />
              Semaine
            </div>
          </div>

          <div className="bg-white rounded-[20px] md:rounded-[30px] p-4 md:p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-xs md:text-sm font-semibold">Utilisation coupons</span>
              <Ticket size={18} className="text-orange-600" />
            </div>
            <div className="text-xl md:text-3xl font-bold text-gray-900">{stats.utilisationCoupons}%</div>
            <div className="mt-3 inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium w-full">
              <Percent size={12} className="mr-1" />
              À booster
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Clients List */}
          <div className="lg:col-span-2 bg-white rounded-[20px] md:rounded-[30px] shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 px-4 md:px-6 py-3">
              <h3 className="font-semibold text-gray-900 text-sm md:text-base">Annuaire Clients</h3>
            </div>

            {/* Search Bar */}
            <div className="px-4 md:px-6 py-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Rechercher un client..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b79d0] text-sm"
                />
              </div>
            </div>

            {/* Clients Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-green-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase">Client</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase hidden md:table-cell">Segment</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase">Points</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase hidden sm:table-cell">Dernier achat</th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {clients.map((client) => (
                    <tr 
                      key={client.id} 
                      className="hover:bg-gray-50 cursor-pointer transition"
                      onClick={() => setSelectedClient(client)}
                    >
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={client.avatar} 
                            alt={client.nom}
                            className="w-8 md:w-10 h-8 md:h-10 rounded-full object-cover border-2 border-gray-200"
                          />
                          <span className="font-medium text-gray-500 text-xs md:text-sm truncate">{client.nom}</span>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 hidden md:table-cell">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          client.segment === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                          client.segment === 'Platinum' ? 'bg-cyan-100 text-cyan-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {client.segment}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-gray-900 font-medium text-xs md:text-sm">{(client.points / 1000).toFixed(0)}K</td>
                      <td className="px-4 md:px-6 py-4 text-gray-600 hidden sm:table-cell text-xs md:text-sm">{client.dernierAchat}</td>
                      <td className="px-4 md:px-6 py-4">
                        <button className="text-green-700 bg-green-100 px-2 py-1 hover:bg-green-200 rounded-[30px] font-semibold text-xs md:text-sm transition">
                          Voir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Panel - Client Details */}
          <div className="bg-white rounded-[20px] md:rounded-[30px] shadow-sm p-4 md:p-6">
            <h3 className="font-semibold text-gray-900 mb-6 text-sm md:text-base">Client: {currentClient.nom.split(' ')[0]}</h3>

            {/* Client Info */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={currentClient.avatar} 
                  alt={currentClient.nom}
                  className={`w-10 md:w-12 h-10 md:h-12 rounded-full object-cover border-2 shadow-sm ${
                    currentClient.segment === 'Gold' ? 'border-yellow-400' :
                    currentClient.segment === 'Platinum' ? 'border-cyan-400' :
                    'border-gray-300'
                  }`}
                />
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900 text-xs md:text-sm truncate">{currentClient.nom}</div>
                  <div className="text-xs text-gray-500">{currentClient.segment} • Carte #4N1235</div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="space-y-3 md:space-y-4 mb-6">
              <div className="bg-green-50 rounded-[20px] md:rounded-[30px] p-3 md:p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingCart size={14} className="text-green-700" />
                  <span className="text-xs md:text-sm font-medium text-green-900">Derniers achats</span>
                </div>
                <div className="text-lg md:text-2xl font-bold text-green-900">{currentClient.achats} FCFA</div>
                <div className="text-xs text-green-700 mt-1 font-semibold">Total 30j • +17%</div>
                <div className="text-xs text-gray-600 mt-1 font-semibold">6 commandes</div>
              </div>

              <div className="bg-purple-50 rounded-[20px] md:rounded-[30px] p-3 md:p-4 border border-purple-200">
                <div className="flex items-center gap-2 mb-1">
                  <Gift size={14} className="text-purple-700" />
                  <span className="text-xs md:text-sm font-medium text-purple-900">Points & avantages</span>
                </div>
                <div className="text-lg md:text-xl font-bold text-purple-900">{(currentClient.points / 1000).toFixed(0)}K pts</div>
                <div className="text-xs text-purple-700 mt-1 font-semibold">Valeur: Élevée</div>
                <div className="text-xs text-gray-600 mt-1 font-semibold">{currentClient.coupons} coupons actifs</div>
              </div>

              <div className="bg-blue-50 rounded-[20px] md:rounded-[30px] p-3 md:p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <Mail size={14} className="text-blue-700" />
                  <span className="text-xs md:text-sm font-medium text-blue-900">Engagement</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs md:text-sm text-blue-700 font-semibold">Emails: Ouverture 54%</span>
                  <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-semibold">Fidèle</span>
                </div>
                <div className="text-xs text-gray-600 mt-1 font-semibold">SMS: 2 opt-in</div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button onClick={() => setActiveModal('coupon')} className="w-full flex items-center justify-between px-4 py-2 md:py-3 bg-blue-50 text-blue-700 rounded-[30px] hover:bg-blue-100 transition text-xs md:text-sm font-semibold">
                <span className="flex items-center gap-2">
                  <Ticket size={14} />
                  Émettre coupon
                </span>
              </button>
              <button onClick={() => setActiveModal('addPoints')} className="w-full flex items-center justify-center gap-2 px-4 py-2 md:py-3 bg-[#0b79d0] text-white rounded-[30px] hover:bg-blue-700 transition text-xs md:text-sm font-semibold">
                <Plus size={14} />
                Ajouter points
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex gap-2 mt-6">
          <button onClick={() => setActiveModal('import')} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-green-700 bg-green-100 rounded-[30px] hover:bg-green-200 transition text-xs md:text-sm font-medium">
            <Users size={16} />
            <span className="hidden sm:inline">Importer clients</span>
            <span className="sm:hidden">Importer</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#0b79d0] text-white rounded-[30px] hover:bg-blue-700 transition text-xs md:text-sm font-medium">
            <Edit size={16} />
            <span className="hidden sm:inline">Enregistrer</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4 space-y-3">
          <button onClick={() => setActiveModal('newProgram')} className="w-full flex items-center gap-2 px-4 py-3 text-green-700 font-semibold rounded-[20px] bg-green-100 hover:bg-green-200 transition text-sm">
            <Globe size={18} />
            Nouveau programme
          </button>
          <div className="pt-3 border-t border-gray-200 space-y-3">
            <h4 className="font-semibold text-gray-900 text-sm">Filtres rapides</h4>
            <button className="w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 text-sm">Tous les clients</button>
            <button className="w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 text-sm">Segment: Gold</button>
            <button className="w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 text-sm">Segment: Platinum</button>
            <button className="w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 text-sm">Inactifs (60j)</button>
          </div>
        </div>
      )}
    </div>
  );
}