import React, { useState } from 'react';
import { FaUndo, FaSave, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    organisationName: 'Carrefour France',
    siren: '552 081 317',
    timezone: 'Europe/Paris (CET)',
    address: '93 Av. de Paris, Massy',
    currency: 'EUR (€)',
    tva: '20',
    theme: 'Automatique',
    language: 'Français',
    dateFormat: 'DD/MM/YYYY',
    visibleModules: 'Stocks, Ventes, RH, Fidélité',
    caisseNumber: '1',
    roundingMode: '0,05 EUR',
    receipt: 'Thermique 58mm',
    acceptedPayments: 'CB, Espèces, Tickets, Apple Pay',
    returnPolicy: '14 jours, ticket obligatoire',
    alertThreshold: '5 unités',
    valuationMethod: 'FIFO',
    inventoryType: 'Hebdomadaire',
    criticalStockNotification: 'Notifier Managers',
    mfaRequired: 'Oui',
    minPasswordLength: '12',
    passwordExpiration: '90 jours',
    sessionInactivity: '30 minutes'
  });

  const [notifications, setNotifications] = useState({
    stockBas: true,
    promotions: false,
    rapportVentes: true,
    alertesSecurite: true
  });

  const [integrations, setIntegrations] = useState({
    erp: { status: 'connected', label: 'Synchronisation OK' },
    comptabilite: { status: 'action', label: 'Action requise' },
    fidelite: { status: 'active', label: 'Actif' }
  });

  const tabs = [
    { id: 'general', label: 'Général' },
    { id: 'magasins', label: 'Magasins' },
    { id: 'caisse', label: 'Caisse' },
    { id: 'stocks', label: 'Stocks' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'securite', label: 'Sécurité' },
    { id: 'integrations', label: 'Intégrations' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Accueil</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Paramètres</span>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 flex items-center gap-2">
              <FaUndo />
              Restaurer par défaut
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <FaSave />
              Enregistrer
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'general' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Profil & identité */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Profil & identité</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Nom de l'organisation</label>
                  <input
                    type="text"
                    value={formData.organisationName}
                    onChange={(e) => handleInputChange('organisationName', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">SIREN</label>
                    <input
                      type="text"
                      value={formData.siren}
                      onChange={(e) => handleInputChange('siren', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Fuseau horaire</label>
                    <input
                      type="text"
                      value={formData.timezone}
                      onChange={(e) => handleInputChange('timezone', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Adresse</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Devise par défaut</label>
                    <input
                      type="text"
                      value={formData.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">TVA (%)</label>
                    <input
                      type="text"
                      value={formData.tva}
                      onChange={(e) => handleInputChange('tva', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Logo */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Logo</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="text-gray-400 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mb-2">Glissez votre logo ici</p>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  ou sélectionnez un fichier
                </button>
              </div>
            </div>

            {/* Préférences d'affichage */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Préférences d'affichage</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Thème</label>
                  <select
                    value={formData.theme}
                    onChange={(e) => handleInputChange('theme', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  >
                    <option>Automatique</option>
                    <option>Clair</option>
                    <option>Sombre</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Langue</label>
                    <select
                      value={formData.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      <option>Français</option>
                      <option>English</option>
                      <option>Español</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Format de date</label>
                    <select
                      value={formData.dateFormat}
                      onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Modules visibles sur le tableau global</label>
                  <input
                    type="text"
                    value={formData.visibleModules}
                    onChange={(e) => handleInputChange('visibleModules', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'caisse' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Paramètres Caisse */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Paramètres Caisse</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Numéro de caisse par défaut</label>
                    <input
                      type="text"
                      value={formData.caisseNumber}
                      onChange={(e) => handleInputChange('caisseNumber', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Mode arrondi</label>
                    <input
                      type="text"
                      value={formData.roundingMode}
                      onChange={(e) => handleInputChange('roundingMode', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Reçus</label>
                    <input
                      type="text"
                      value={formData.receipt}
                      onChange={(e) => handleInputChange('receipt', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Paiements acceptés</label>
                    <input
                      type="text"
                      value={formData.acceptedPayments}
                      onChange={(e) => handleInputChange('acceptedPayments', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Politique retours</label>
                  <input
                    type="text"
                    value={formData.returnPolicy}
                    onChange={(e) => handleInputChange('returnPolicy', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Magasin: Tous */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Magasin: Tous</h3>
              </div>
              <p className="text-xs text-gray-500">Sélectionnez un magasin spécifique pour afficher ses paramètres de caisse ou configurez les paramètres globaux.</p>
            </div>

            {/* Stocks & inventaire */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Stocks & inventaire</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Seuil d'alerte</label>
                    <input
                      type="text"
                      value={formData.alertThreshold}
                      onChange={(e) => handleInputChange('alertThreshold', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Méthode de valorisation</label>
                    <input
                      type="text"
                      value={formData.valuationMethod}
                      onChange={(e) => handleInputChange('valuationMethod', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Inventaire tournant</label>
                    <input
                      type="text"
                      value={formData.inventoryType}
                      onChange={(e) => handleInputChange('inventoryType', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Ruptures critiques</label>
                    <input
                      type="text"
                      value={formData.criticalStockNotification}
                      onChange={(e) => handleInputChange('criticalStockNotification', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="grid grid-cols-2 gap-6">
            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                <span className="text-xs text-gray-600">Canal: Email</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-700">Alerte stock bas</span>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-600" />
                    <span className="text-sm text-gray-900">Active</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-700">Promotions à expirer</span>
                  <span className="text-sm text-gray-500">Désactivé</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-700">Rapport quotidien ventes</span>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-600" />
                    <span className="text-sm text-gray-900">Active</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-gray-700">Alertes sécurité</span>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-600" />
                    <span className="text-sm text-gray-900">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sécurité */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Sécurité</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">MFA obligatoire</label>
                    <input
                      type="text"
                      value={formData.mfaRequired}
                      onChange={(e) => handleInputChange('mfaRequired', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Longueur minimale mot de passe</label>
                    <input
                      type="text"
                      value={formData.minPasswordLength}
                      onChange={(e) => handleInputChange('minPasswordLength', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Expiration mot de passe</label>
                    <input
                      type="text"
                      value={formData.passwordExpiration}
                      onChange={(e) => handleInputChange('passwordExpiration', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Session inactive</label>
                    <input
                      type="text"
                      value={formData.sessionInactivity}
                      onChange={(e) => handleInputChange('sessionInactivity', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-gray-900">Intégrations</h3>
              <span className="text-xs text-gray-600">Magasin: Tous</span>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              {/* ERP */}
              <div className="border border-gray-200 rounded-lg p-5">
                <h4 className="text-sm font-medium text-gray-900 mb-2">ERP</h4>
                <p className="text-xs text-gray-600 mb-3">État: Connecté</p>
                <div className="bg-green-500 text-white text-center py-2 rounded-lg text-sm font-medium">
                  Synchronisation OK
                </div>
              </div>

              {/* Comptabilité */}
              <div className="border border-gray-200 rounded-lg p-5">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Comptabilité</h4>
                <p className="text-xs text-gray-600 mb-3">État: Non connecté</p>
                <div className="bg-orange-500 text-white text-center py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                  <FaExclamationTriangle />
                  Action requise
                </div>
              </div>

              {/* Programme fidélité */}
              <div className="border border-gray-200 rounded-lg p-5">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Programme fidélité</h4>
                <p className="text-xs text-gray-600 mb-3">État: Connecté</p>
                <div className="bg-green-500 text-white text-center py-2 rounded-lg text-sm font-medium">
                  Actif
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button className="flex items-center gap-2 px-4 py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-50">
                <MdRefresh />
                Réinitialiser
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <FaSave />
                Enregistrer
              </button>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {['magasins', 'stocks', 'securite'].includes(activeTab) && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center text-gray-500">
            <p>Contenu de l'onglet "{tabs.find(t => t.id === activeTab)?.label}" à venir...</p>
          </div>
        )}
      </div>
    </div>
  );
}