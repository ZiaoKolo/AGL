import React, { useState } from 'react';
import { FaChartLine, FaDownload, FaFileExcel, FaFilePdf, FaFileCsv } from 'react-icons/fa';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { BiStore } from 'react-icons/bi';

export default function SupermarketDashboard() {
  const [activeTab, setActiveTab] = useState('ventes');
  const [period, setPeriod] = useState('30j');

  const kpiData = [
    { label: 'CA (258)', value: '1,24 M€', change: '+6,2%', positive: true },
    { label: 'Panier moyen', value: '42,80€', change: '+4,4%', positive: true },
    { label: 'Marge brute', value: '28,6%', status: 'Stable' },
    { label: 'Ruptures stock', value: '32', change: '-12 vs J-30', negative: true }
  ];

  const salesDetails = [
    { rayon: 'Fruits & Légumes', ventes: '312 k€', marge: '31,2%', ruptures: 6 },
    { rayon: 'Poissonnerie', ventes: '188 k€', marge: '24,8%', ruptures: 2 },
    { rayon: 'Épicerie sucrée', ventes: '275 k€', marge: '28,1%', ruptures: 14 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Accueil / Reporting</h1>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              Comparer périodes
            </button>
            <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 flex items-center gap-2">
              Créer rapport
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {kpiData.map((kpi, index) => (
            <div key={index} className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <div className="text-sm text-gray-600 mb-2">{kpi.label}</div>
              <div className="text-2xl font-bold text-gray-900 mb-3">{kpi.value}</div>
              {kpi.change && (
                <div className={`text-sm px-3 py-1 rounded-full inline-flex items-center gap-1 ${
                  kpi.positive ? 'bg-green-100 text-green-700' : 
                  kpi.negative ? 'bg-orange-100 text-orange-700' : ''
                }`}>
                  {kpi.positive && <MdTrendingUp />}
                  {kpi.negative && <MdTrendingDown />}
                  {kpi.change}
                </div>
              )}
              {kpi.status && (
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <span className="text-green-600">%</span> {kpi.status}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Filters and Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Analyses</span>
                <select 
                  value={period} 
                  onChange={(e) => setPeriod(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value="7j">Période: 7j</option>
                  <option value="30j">Période: 30j</option>
                  <option value="90j">Période: 90j</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Magasin: Tous</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Canal: Magasin + Online</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Rapports rapides</span>
              <span className="text-sm text-gray-600">Format: PDF</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="px-6 py-3 flex gap-2">
            {['Ventes', 'Stocks', 'RH', 'Clients'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.toLowerCase()
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">Courbe des ventes</h3>
                <div className="flex gap-2">
                  <button className="text-sm text-gray-600 hover:text-gray-900">Vue: Jour</button>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                <div className="text-center text-gray-400">
                  <FaChartLine className="text-4xl mx-auto mb-2" />
                  <p className="text-sm">Graphique: CA quotidien (placeholder)</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Top catégories</h3>
                <div className="text-sm text-gray-500 mb-2">Top 5</div>
                <div className="h-48 flex items-center justify-center bg-gray-50 rounded">
                  <p className="text-sm text-gray-400">Graphique: Parts de ventes par catégorie</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Heures de pointe</h3>
                <div className="text-sm text-gray-500 mb-2">Jour: Mardi</div>
                <div className="h-48 flex items-center justify-center bg-gray-50 rounded">
                  <p className="text-sm text-gray-400">Graphique: Volume par heure</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Reports */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Ventes par rayon</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                  <span className="text-gray-700">Hebdomadaire</span>
                  <div className="flex items-center gap-2">
                    <FaFilePdf className="text-red-500" />
                    <span className="text-gray-500">PDF</span>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                  <span className="text-gray-700">Mensuel</span>
                  <div className="flex items-center gap-2">
                    <FaFileExcel className="text-green-600" />
                    <span className="text-gray-500">XLS</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Performance caisses</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                  <span className="text-gray-700">Temps d'attente</span>
                  <div className="flex items-center gap-2">
                    <FaFilePdf className="text-red-500" />
                    <span className="text-gray-500">PDF</span>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                  <span className="text-gray-700">Transactions/heure</span>
                  <div className="flex items-center gap-2">
                    <FaFileCsv className="text-blue-500" />
                    <span className="text-gray-500">CSV</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Rotation des stocks</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                  <span className="text-gray-700">Par famille</span>
                  <div className="flex items-center gap-2">
                    <FaFileExcel className="text-green-600" />
                    <span className="text-gray-500">XLS</span>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                  <span className="text-gray-700">Produits lents</span>
                  <div className="flex items-center gap-2">
                    <FaFileCsv className="text-orange-500" />
                    <span className="text-gray-500">CSV</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Fidélité & clients</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                  <span className="text-gray-700">Segmentation RFM</span>
                  <div className="flex items-center gap-2">
                    <FaFilePdf className="text-red-500" />
                    <span className="text-gray-500">PDF</span>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                  <span className="text-gray-700">Taux d'activation</span>
                  <div className="flex items-center gap-2">
                    <FaFileCsv className="text-cyan-500" />
                    <span className="text-gray-500">CSV</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Details Table */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h3 className="text-sm font-medium text-gray-700">Détails des ventes</h3>
              <div className="flex gap-6 text-sm text-gray-600">
                <span>Période: 30j</span>
                <span>Tri: CA desc</span>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-sm">
                <h4 className="font-medium text-gray-700 mb-1">Planification</h4>
                <p className="text-xs text-gray-500">Export</p>
              </div>
              <div className="text-sm">
                <h4 className="font-medium text-gray-700 mb-1">Fréquence:</h4>
                <p className="text-xs text-gray-500">Hebdo</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Rayon / Produit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ventes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Marge</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Ruptures</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {salesDetails.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{item.rayon}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.ventes}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.marge}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                        item.ruptures > 10 ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {item.ruptures}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">
                        Ouvrir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="bg-blue-50 rounded-lg px-4 py-3 flex items-start gap-3">
              <div className="bg-white rounded-full p-1 mt-0.5">
                <BiStore className="text-blue-600 text-lg" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900 mb-1">Rapport CA consolidé</p>
                <p className="text-xs text-gray-600">Quotidien 08:00 • Dest.: direction@carrefour.fr</p>
              </div>
              <button className="ml-4 px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600">
                PDF
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-yellow-50 rounded-lg px-4 py-3 flex items-start gap-3">
                <div className="text-sm">
                  <p className="font-medium text-gray-900 mb-1">Stocks critiques</p>
                  <p className="text-xs text-gray-600">Quotidien 07:00 • Dest.: achats@carrefour.fr</p>
                </div>
                <button className="ml-4 px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600">
                  CSV
                </button>
              </div>

              <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-2">
                + Nouveau planning
              </button>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex items-center justify-between rounded-b-lg">
            <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
              <FaDownload />
              Exporter vue
            </button>
            <button className="px-4 py-2 bg-cyan-500 text-white text-sm rounded-lg hover:bg-cyan-600 flex items-center gap-2">
              Enregistrer rapport
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}