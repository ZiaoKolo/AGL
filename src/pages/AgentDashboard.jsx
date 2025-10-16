import React, { useState } from 'react';
import { 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp, 
  Calendar,
  Users,
  Package,
  Euro,
  Maximize2,
  Minimize2
} from 'lucide-react';

// Données mockées
const mockData = {
  agent: {
    nom: "Clara Moreau",
    role: "Caissière",
    magasin: "Magasin A",
    photo: "https://ui-avatars.com/api/?name=Clara+Moreau&background=3b82f6&color=fff"
  },
  statistiques: {
    ticketsTraites: 126,
    tendance: "+6.1%",
    panierMoyen: 27.40,
    tempsParClient: "3m25s",
    satisfaction: 4.7,
    totalAvis: 22
  },
  objectifs: [
    {
      id: 1,
      titre: "Tickets/jour ≥ 120",
      atteint: 126,
      statut: "OK",
      couleur: "green"
    },
    {
      id: 2,
      titre: "Taux remises ≤ 8%",
      actuel: 7.5,
      statut: "Stable",
      couleur: "orange"
    },
    {
      id: 3,
      titre: "Satisfaction ≥ 4.5",
      actuel: 4.7,
      statut: "Bon",
      couleur: "green"
    }
  ],
  derniersTickets: [
    {
      client: "Marc L.",
      articles: 7,
      remise: "-10%",
      total: "38.40",
      heure: "10:14"
    },
    {
      client: "Emma D.",
      articles: 3,
      remise: "Carte fidélité",
      total: "12.90",
      heure: "10:26"
    },
    {
      client: "Sophie L.",
      articles: 5,
      remise: "-",
      total: "21.30",
      heure: "10:41"
    }
  ],
  planning: [
    {
      jour: "Lun",
      plage: "08:00 - 16:00",
      poste: "Caisse #2",
      statut: "Confirmé",
      couleur: "green"
    },
    {
      jour: "Mar",
      plage: "08:00 - 16:00",
      poste: "Caisse #2",
      statut: "En attente",
      couleur: "yellow"
    }
  ],
  produitsScannés: [
    {
      produit: "Eau minérale 6x1.5L",
      quantite: 34,
      remises: "-",
      total: "101.66"
    },
    {
      produit: "Pommes (kg)",
      quantite: 28,
      remises: "-5% moy.",
      total: "79.12"
    }
  ],
  notifications: [
    {
      type: "pause",
      message: "Pause de 15 min à 11:30",
      couleur: "orange"
    },
    {
      type: "validation",
      message: "Validation de caisse nécessaire avant 12:00",
      couleur: "orange"
    },
    {
      type: "objectif",
      message: "Objectif atteint: 100 tickets",
      couleur: "orange"
    }
  ]
};

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [activeObjectifTab, setActiveObjectifTab] = useState('Q1');

  const { agent, statistiques, objectifs, derniersTickets, planning, produitsScannés, notifications } = mockData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="w-full mx-auto">
          {/* En-tête Agent */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src={agent.photo} 
                  alt={agent.nom}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h1 className="text-[24px] font-bold text-gray-900">{agent.nom}</h1>
                  <p className="text-gray-600">
                    Rôle: {agent.role} • {agent.magasin} • Aujourd'hui
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Calendar className="w-4 h-4" />
                  Exporter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <TrendingUp className="w-4 h-4" />
                  Envoyer le rapport
                </button>
              </div>
            </div>
          </div>

          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Tickets traités */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-sm text-gray-600 mb-2">Tickets traités (jour)</div>
              <div className="text-3xl font-bold text-gray-900 mb-3">{statistiques.ticketsTraites}</div>
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium w-fit">
                <TrendingUp className="w-4 h-4" />
                {statistiques.tendance} vs moy.
              </div>
            </div>

            {/* Panier moyen */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-sm text-gray-600 mb-2">Panier moyen</div>
              <div className="text-3xl font-bold text-gray-900 mb-3">€ {statistiques.panierMoyen.toFixed(2)}</div>
              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm">
                <Clock className="w-4 h-4" />
                Temps/Client: {statistiques.tempsParClient}
              </div>
            </div>

            {/* Satisfaction clients */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-sm text-gray-600 mb-2">Satisfaction clients</div>
              <div className="text-3xl font-bold text-gray-900 mb-3">{statistiques.satisfaction}/5</div>
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium w-fit">
                <CheckCircle className="w-4 h-4" />
                {statistiques.totalAvis} avis
              </div>
            </div>
          </div>

          {/* Section Performance et Objectifs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Performance horaire */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Performance horaire</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveTab('today')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      activeTab === 'today' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Aujourd'hui
                  </button>
                  <button 
                    onClick={() => setActiveTab('week')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      activeTab === 'week' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Semaine
                  </button>
                </div>
              </div>
              <div className="text-center text-gray-500 py-12">
                <div className="text-sm mb-2">Graphique (barres par heure)</div>
                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-gray-400">Visualisation des performances par heure</div>
                </div>
              </div>
            </div>

            {/* Objectifs */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Objectifs</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveObjectifTab('Q1')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      activeObjectifTab === 'Q1' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Q1
                  </button>
                  <button 
                    onClick={() => setActiveObjectifTab('annuel')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      activeObjectifTab === 'annuel' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Annuel
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {objectifs.map((objectif) => (
                  <div key={objectif.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">{objectif.titre}</div>
                          <div className="text-sm text-gray-600">
                            Atteint: {objectif.atteint || objectif.actuel}
                            {objectif.actuel && '%'}
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        objectif.couleur === 'green' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {objectif.statut}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section inférieure - 3 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Derniers tickets de caisse */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Derniers tickets de caisse</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium">
                    Aujourd'hui
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    Caisse #2
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <div className="grid grid-cols-5 gap-2 text-xs font-medium text-gray-600 pb-2 border-b">
                  <div>Client</div>
                  <div>Articles</div>
                  <div>Remise</div>
                  <div>Total</div>
                  <div>Heure</div>
                </div>
                {derniersTickets.map((ticket, index) => (
                  <div key={index} className="grid grid-cols-5 gap-2 text-sm py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="font-medium">{ticket.client}</span>
                    </div>
                    <div className="text-gray-600">{ticket.articles}</div>
                    <div className="text-gray-600">{ticket.remise}</div>
                    <div className="font-medium">€ {ticket.total}</div>
                    <div className="text-gray-600">{ticket.heure}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Planning & congés */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Planning & congés (agent)</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium">
                    Cette semaine
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    Magasin A
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <div className="grid grid-cols-5 gap-2 text-xs font-medium text-gray-600 pb-2 border-b">
                  <div>Jour</div>
                  <div>Plage</div>
                  <div>Poste</div>
                  <div>Statut</div>
                  <div>Actions</div>
                </div>
                {planning.map((item, index) => (
                  <div key={index} className="grid grid-cols-5 gap-2 text-sm py-3 border-b border-gray-100 items-center">
                    <div className="font-medium">{item.jour}</div>
                    <div className="text-gray-600">{item.plage}</div>
                    <div className="text-gray-600">{item.poste}</div>
                    <div>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        item.couleur === 'green' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          item.couleur === 'green' ? 'bg-green-600' : 'bg-yellow-600'
                        }`} />
                        {item.statut}
                      </span>
                    </div>
                    <div>
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                        Échanger
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Produits souvent scannés */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Produits souvent scannés (poste)</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium">
                    Aujourd'hui
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    Caisse #2
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-600 pb-2 border-b">
                  <div>Produit</div>
                  <div>Qté</div>
                  <div>Remises</div>
                  <div>Total</div>
                </div>
                {produitsScannés.map((produit, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 text-sm py-3 border-b border-gray-100">
                    <div className="font-medium">{produit.produit}</div>
                    <div className="text-gray-600">{produit.quantite}</div>
                    <div className="text-gray-600">{produit.remises}</div>
                    <div className="font-medium">€ {produit.total}</div>
                  </div>
                ))}
              </div>

              {/* Notifications */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Notifications agent</h4>
                <div className="space-y-2">
                  {notifications.map((notif, index) => (
                    <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-900">
                      {notif.message}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;