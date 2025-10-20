import React, { useState } from 'react';
import { ChevronDown, Plus, Eye, AlertTriangle, Clock, TrendingUp, CheckCircle, FileText, Download, Save } from 'lucide-react';

export default function SupplierPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const suppliers = [
    { id: 1, name: 'FreshFarm SAS', category: 'Frais', score: 95, lastDelivery: 'Hier', status: 'Actif' },
    { id: 2, name: 'OceanPrime', category: 'Poissonnerie', score: 88, lastDelivery: '2 j', status: 'Actif' },
    { id: 3, name: 'TerraCéréales', category: 'Épicerie', score: 79, lastDelivery: '5 j', status: 'Actif' },
  ];

  const orders = [
    { id: 'PO-2025-1182', supplier: 'FreshFarm SAS', amount: '12 480€', status: 'En cours' },
    { id: 'PO-2025-1175', supplier: 'OceanPrime', amount: '7 320€', status: 'Réceptionnée' },
    { id: 'PO-2025-1160', supplier: 'TerraCéréales', amount: '4 910€', status: 'En retard' },
  ];

  const alerts = [
    { id: 1, message: 'Retard de livraison', ref: 'PO-2025-1160', type: 'warning' },
    { id: 2, message: 'Non-conformité', ref: '#8842', type: 'error' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Accueil / Fournisseurs</p>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">Gestion des Fournisseurs</h1>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Importer tarifs
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Plus size={18} />
                Nouveau fournisseur
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Fournisseurs actifs</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">128</p>
              </div>
              <TrendingUp size={24} className="text-green-600" />
            </div>
            <p className="text-green-600 text-xs mt-3 font-medium">↑ 15€ ce mois</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Commandes en cours</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">73</p>
              </div>
              <Clock size={24} className="text-blue-600" />
            </div>
            <p className="text-blue-600 text-xs mt-3 font-medium">Livraison 48h</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Retards signalés</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">6</p>
              </div>
              <AlertTriangle size={24} className="text-orange-600" />
            </div>
            <p className="text-orange-600 text-xs mt-3 font-medium">À surveiller</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Qualité moyenne</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">4.3/5</p>
              </div>
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <p className="text-gray-600 text-xs mt-3 font-medium">12k évaluations</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Suppliers Table */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Annuaire fournisseurs</h2>
                  <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white">
                    <option>Catégorie: Tous</option>
                    <option>Frais</option>
                    <option>Épicerie</option>
                    <option>Poissonnerie</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <input type="text" placeholder="Recherche: Nom, SIRET..." className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white">
                    <option>Status: Actif</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Fournisseur</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Catégorie</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Dernière livraison</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map(supplier => (
                      <tr key={supplier.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{supplier.name}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-medium">
                            {supplier.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{supplier.score}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{supplier.lastDelivery}</td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                            <Eye size={16} />
                            Voir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Orders */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Commandes fournisseurs</h2>
                <p className="text-xs text-gray-500 mt-1">Période: 30j | Status: Tous</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Commande</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Fournisseur</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Montant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{order.supplier}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Réceptionnée' ? 'bg-green-100 text-green-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Voir</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Analyse achats</h3>
                <p className="text-xs text-gray-500 mb-4">Période: 90j | Catégorie: Tous</p>
                <div className="bg-gray-50 rounded-lg h-40 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Graphique: Dépenses par catégorie (placeholder)</p>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-between">
                <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium">
                  <Download size={18} />
                  Exporter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  <Save size={18} />
                  Enregistrer changements
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Detail Fournisseur */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Résumé fournisseur</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">FreshFarm SAS</p>
                </div>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                  Actif
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <TrendingUp size={20} className="text-green-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Performance livraisons</p>
                    <p className="text-sm font-semibold text-gray-900">OTD: 97% • Retard: 3%</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Prix & conditions</p>
                    <p className="text-sm font-semibold text-gray-900">Index prix: -3% • Marché • Paiement: 30j</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Qualité & conformité</p>
                    <p className="text-sm font-semibold text-gray-900">Non-conformités: 0 • Traçabilité OK</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2">
                <FileText size={18} />
                Nouvelle commande
              </button>
            </div>

            {/* Alerts */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Alertes fournisseurs</h3>
                <select className="text-xs border border-gray-300 rounded px-2 py-1 bg-white">
                  <option>Filtre: Tous</option>
                </select>
              </div>

              <div className="space-y-3">
                {alerts.map(alert => (
                  <div key={alert.id} className="flex gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <AlertTriangle size={18} className={alert.type === 'warning' ? 'text-orange-600' : 'text-red-600'} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500">{alert.ref}</p>
                    </div>
                    {alert.type === 'warning' ? (
                      <button className="text-xs px-3 py-1 bg-orange-100 text-orange-800 rounded font-medium hover:bg-orange-200">
                        Action requise
                      </button>
                    ) : (
                      <button className="text-xs px-3 py-1 bg-red-100 text-red-800 rounded font-medium hover:bg-red-200">
                        Bloqué
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Contrats & documents</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Accord cadre FreshFarm</p>
                      <p className="text-xs text-gray-500">Validité: 2025-2027 • Paiement: 30j fin de mois</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-red-600">PDF</span>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Charte qualité OceanPrime</p>
                      <p className="text-xs text-gray-500">Version 2.1 • Mise à jour: 12/08</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-blue-600">DOC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}