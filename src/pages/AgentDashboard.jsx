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
  Minimize2,
  X,
  Mail,
  FileText,
  Link as LinkIcon,
  Download,
  Save,
  Send,
  Lock,
  Clock as ClockIcon,
  RefreshCw,
  UserPlus
} from 'lucide-react';
import { PiExportBold } from "react-icons/pi";
import { BsSend } from "react-icons/bs";
import { FaRegSmile } from "react-icons/fa";

// Données mockées
const mockData = {
  agent: {
    nom: "Clara Moreau",
    role: "Caissière",
    magasin: "Magasin A",
    photo: "https://i.pinimg.com/736x/a9/21/7f/a9217f43edd88f18a5bdbc480aa4d8e4.jpg"
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
      id: 1,
      type: "pause",
      message: "Pause de 15 min à 11:30",
      couleur: "orange"
    },
    {
      id: 2,
      type: "validation",
      message: "Validation de caisse nécessaire avant 12:00",
      couleur: "orange"
    },
    {
      id: 3,
      type: "objectif",
      message: "Objectif atteint: 100 tickets",
      couleur: "orange"
    }
  ]
};

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [activeObjectifTab, setActiveObjectifTab] = useState('Q1');
  const [notifications, setNotifications] = useState(mockData.notifications);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [exportStep, setExportStep] = useState(1);
  const [sendStep, setSendStep] = useState(1);
  const [exchangeStep, setExchangeStep] = useState(1);

  const { agent, statistiques, objectifs, derniersTickets, planning, produitsScannés } = mockData;

  // Événement: Changer l'onglet Performance
  const handleTabChange = (tab) => {
    console.log(`Changement de tab performance: ${tab}`);
    setActiveTab(tab);
  };

  // Événement: Changer l'onglet Objectifs
  const handleObjectifTabChange = (tab) => {
    console.log(`Changement de tab objectif: ${tab}`);
    setActiveObjectifTab(tab);
  };

  // Événement: Exporter
  const handleExport = () => {
    console.log('Export PDF initié');
    setShowExportModal(true);
    setExportStep(1);
  };

  // Événement: Envoyer le rapport
  const handleSendReport = () => {
    console.log('Rapport envoyé au manager');
    setShowSendModal(true);
    setSendStep(1);
  };

  // Événement: Supprimer une notification
  const handleRemoveNotification = (id) => {
    console.log(`Notification ${id} supprimée`);
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  // Événement: Échanger un créneau
  const handleExchangeShift = (jour) => {
    console.log(`Demande d'échange pour le ${jour}`);
    setSelectedShift(jour);
    setShowExchangeModal(true);
    setExchangeStep(1);
  };

  // Fermer les modals
  const closeModals = () => {
    setShowExportModal(false);
    setShowSendModal(false);
    setShowExchangeModal(false);
    setExportStep(1);
    setSendStep(1);
    setExchangeStep(1);
  };

  // Navigation dans les étapes
  const nextStep = (modalType) => {
    if (modalType === 'export' && exportStep < 3) setExportStep(exportStep + 1);
    if (modalType === 'send' && sendStep < 3) setSendStep(sendStep + 1);
    if (modalType === 'exchange' && exchangeStep < 3) setExchangeStep(exchangeStep + 1);
  };

  const prevStep = (modalType) => {
    if (modalType === 'export' && exportStep > 1) setExportStep(exportStep - 1);
    if (modalType === 'send' && sendStep > 1) setSendStep(sendStep - 1);
    if (modalType === 'exchange' && exchangeStep > 1) setExchangeStep(exchangeStep - 1);
  };

  const finishExport = () => {
    console.log('Export terminé');
    closeModals();
  };

  const finishSend = () => {
    console.log('Envoi terminé');
    closeModals();
  };

  const finishExchange = () => {
    console.log('Échange soumis');
    closeModals();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="w-full mx-auto">
          {/* En-tête Agent */}
          <div className="bg-white rounded-[30px] shadow-sm p-6 mb-6">
            <div className="flex flex-col gap-2 items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src={agent.photo} 
                  alt={agent.nom}
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <h1 className="text-[18px] font-bold text-gray-900">{agent.nom}</h1>
                  <p className="text-gray-500 font-semibold">
                    Rôle: {agent.role} • {agent.magasin} • Aujourd'hui
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200"
                >
                  <PiExportBold className="w-4 h-4" />
                  Exporter
                </button>
                <button 
                  onClick={handleSendReport}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0b79d0] text-white rounded-lg hover:bg-blue-700"
                >
                  <BsSend className="w-4 h-4" />
                  Envoyer le rapport
                </button>
              </div>
            </div>
          </div>

          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Tickets traités */}
            <div className="bg-white rounded-[30px] shadow-sm p-6 border-[#e2e8f0] border border-solid">
              <div className="font-semibold text-[15px] text-gray-500 mb-2">Tickets traités (jour)</div>
              <div className="text-3xl font-bold text-gray-900 mb-3">{statistiques.ticketsTraites}</div>
              <div className="flex items-center gap-2 bg-[#0EA569] text-white px-3 py-1.5 rounded-[30px] text-sm font-medium w-full">
                <TrendingUp className="w-4 h-4" />
                {statistiques.tendance} vs moy.
              </div>
            </div>

            {/* Panier moyen */}
            <div className="bg-white rounded-[30px] shadow-sm p-6">
              <div className="font-semibold text-[15px] text-gray-600 mb-2">Panier moyen</div>
              <div className="text-3xl font-bold text-gray-900 mb-3">{statistiques.panierMoyen.toFixed(2)} FCFA</div>
              <div className="flex items-center gap-2 bg-green-100 text-green-700 font-semibold px-3 py-1.5 rounded-[30px] text-sm">
                <Clock className="w-4 h-4" />
                Temps/Client: {statistiques.tempsParClient}
              </div>
            </div>

            {/* Satisfaction clients */}
            <div className="bg-white rounded-[30px] shadow-sm p-6">
              <div className="font-semibold text-sm text-gray-600 mb-2">Satisfaction clients</div>
              <div className="text-3xl font-bold text-gray-900 mb-3">{statistiques.satisfaction}/5</div>
              <div className="flex items-center gap-2 bg-[#0EA569] text-white px-3 py-1.5 rounded-[30px] text-sm font-medium w-full">
                <FaRegSmile className="w-4 h-4" />
                {statistiques.totalAvis} avis
              </div>
            </div>
          </div>

          {/* Section Performance et Objectifs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Performance horaire */}
            <div className="lg:col-span-2 bg-white rounded-[30px] shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Performance horaire</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleTabChange('today')}
                    className={`px-4 py-2 rounded-[20px] text-sm font-medium ${
                      activeTab === 'today' 
                        ? 'bg-[#0b79d0] text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Aujourd'hui
                  </button>
                  <button 
                    onClick={() => handleTabChange('week')}
                    className={`px-4 py-2 rounded-[20px] text-sm font-medium ${
                      activeTab === 'week' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Semaine
                  </button>
                </div>
              </div>
              <div className="text-center text-gray-500 py-4 border border-dashed border-gray-300 bg-gray-50 rounded-lg">
                <div className="h-48 rounded-lg flex items-center justify-center">
                  <div className="text-gray-400">Graphique (barres par heure)</div>
                </div>
              </div>
            </div>

            {/* Objectifs */}
            <div className="bg-white rounded-[30px] shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Objectifs</h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleObjectifTabChange('Q1')}
                    className={`px-3 py-1.5 rounded-[20px] text-sm font-medium ${
                      activeObjectifTab === 'Q1' 
                        ? 'bg-[#0b79d0] text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Q1
                  </button>
                  <button 
                    onClick={() => handleObjectifTabChange('annuel')}
                    className={`px-3 py-1.5 rounded-[20px] text-sm font-medium ${
                      activeObjectifTab === 'annuel' 
                        ? 'bg-green-100 text-green-700' 
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
                          ? 'bg-[#0EA569] text-white' 
                          : 'bg-green-100 text-green-800'
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
            <div className="bg-white rounded-[30px] shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Derniers tickets de caisse</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white text-gray-600 border border-gray-300 rounded-[20px] text-sm font-medium">
                    Aujourd'hui
                  </button>
                  <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-[20px] text-sm">
                    Caisse #2
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <div className="grid grid-cols-5 gap-2 text-xs font-medium pb-2 border-b p-2 bg-green-100 rounded-[30px]">
                  <div className="font-bold text-[15px] text-green-700">Client</div>
                  <div className="font-bold text-[15px] text-green-700">Articles</div>
                  <div className="font-bold text-[15px] text-green-700">Remise</div>
                  <div className="font-bold text-[15px] text-green-700">Total</div>
                  <div className="font-bold text-[15px] text-green-700">Heure</div>
                </div>
                {derniersTickets.map((ticket, index) => (
                  <div key={index} className="grid grid-cols-5 gap-2 text-sm py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://i.pinimg.com/736x/5e/87/00/5e8700424201eb225c9a7dea4c3ec7f4.jpg"
                        alt={ticket.client}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-medium text-[14px] text-gray-600">{ticket.client}</span>
                    </div>
                    <div className="font-semibold text-[14px] text-gray-600">{ticket.articles}</div>
                    <div className="text-gray-600 font-semibold">{ticket.remise}</div>
                    <div className="font-medium">{ticket.total} FCFA</div>
                    <div className="text-gray-600 font-semibold">{ticket.heure}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Planning & congés */}
            <div className="bg-white rounded-[30px] shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Planning & congés (agent)</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white text-gray-600 border border-gray-300 rounded-[20px] text-sm font-medium">
                    Cette semaine
                  </button>
                  <button className="px-3 py-1 bg-white text-gray-600 border border-gray-300 rounded-[20px] text-sm font-medium">
                    Magasin A
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <div className="grid grid-cols-5 gap-2 text-xs font-medium pb-2 border-b p-2 bg-green-100 rounded-[30px]">
                  <div className='font-bold text-[15px] text-green-700'>Jour</div>
                  <div className='font-bold text-[15px] text-green-700'>Plage</div>
                  <div className='font-bold text-[15px] text-green-700'>Poste</div>
                  <div className='font-bold text-[15px] text-green-700'>Statut</div>
                  <div className='font-bold text-[15px] text-green-700'>Actions</div>
                </div>
                {planning.map((item, index) => (
                  <div key={index} className="grid grid-cols-5 gap-2 text-sm py-3 border-b border-gray-100 items-center">
                    <div className="font-medium">{item.jour}</div>
                    <div className="text-gray-600 font-semibold">{item.plage}</div>
                    <div className="text-gray-600 font-semibold">{item.poste}</div>
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
                      <button 
                        onClick={() => handleExchangeShift(item.jour)}
                        className="px-3 py-1 bg-[#0b79d0] text-white rounded-[20px] font-semibold text-xs hover:bg-blue-700"
                      >
                        Échanger
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Produits souvent scannés */}
            <div className="bg-white rounded-[30px] shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Produits souvent scannés (poste)</h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 rounded-[20px] text-sm font-medium">
                    Aujourd'hui
                  </button>
                  <button className="px-3 py-1 bg-white text-gray-700 border border-gray-300 rounded-[20px] text-sm">
                    Caisse #2
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <div className="grid grid-cols-5 gap-2 text-xs font-medium pb-2 border-b p-2 bg-green-100 rounded-[30px]">
                  <div className='font-bold text-[15px] text-green-700'>Produit</div>
                  <div className='font-bold text-[15px] text-green-700'>Qté</div>
                  <div className='font-bold text-[15px] text-green-700'>Remises</div>
                  <div className='font-bold text-[15px] text-green-700'>Total</div>
                </div>
                {produitsScannés.map((produit, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2 text-sm py-3 border-b border-gray-100">
                    <div className="font-medium">{produit.produit}</div>
                    <div className="text-gray-600 font-bold">{produit.quantite}</div>
                    <div className="text-gray-600 font-bold">{produit.remises}</div>
                    <div className="font-medium">{produit.total} FCFA</div>
                  </div>
                ))}
              </div>

              {/* Notifications */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Notifications agent</h4>
                <div className="space-y-2">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      onClick={() => handleRemoveNotification(notif.id)}
                      className="bg-[#f59e0b] border border-orange-200 rounded-[30px] p-3 text-[15px] font-semibold text-orange-900 cursor-pointer hover:bg-orange-300 transition"
                    >
                      {notif.message}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Export */}
      {showExportModal && (
  <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b sticky top-0 bg-white rounded-t-3xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Export en cours</h2>
                  <p className="text-sm text-gray-500">Clara Moreau • Tableau de bord agent • Format: PDF • Lien valable 7 jours</p>
                </div>
                <button onClick={closeModals} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 transition-all ${exportStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-100'}`}>
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium text-sm">Préparation</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 transition-all ${exportStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                  <RefreshCw className="w-5 h-5" />
                  <span className="font-medium text-sm">Génération</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 transition-all ${exportStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                  <Send className="w-5 h-5" />
                  <span className="font-medium text-sm">Distribution</span>
                </div>
              </div>

              {exportStep === 2 && (
                <div className="mt-4">
                  <div className="text-sm text-gray-600 mb-2">Estimé: ~15s • 84%</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all" style={{width: '84%'}}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Body */}
            <div className="p-6">
              {exportStep === 1 && (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">Résumé</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Pages/onglets</span>
                        <span className="float-right font-semibold">6</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Lignes exportées</span>
                        <span className="float-right font-semibold">312</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-white border border-green-300 text-green-700 rounded text-xs">Anonymisé</span>
                        <span className="text-gray-600">Confidentialité</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-white border border-green-300 text-green-700 rounded text-xs">Téléchargement</span>
                        <span className="text-gray-600">Destination</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Lien et fichiers</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-gray-600" />
                          <span className="text-sm">Rapport-Clara-2025-03-12.pdf</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            Télécharger
                          </button>
                          <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm">
                            <Save className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <LinkIcon className="w-5 h-5 text-gray-600" />
                          <span className="text-sm text-gray-600">https://exports.hypermarket/7i/abC123...</span>
                        </div>
                        <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                          Copier le lien
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Actions rapides</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Mail className="w-5 h-5 text-gray-600" />
                          <span className="text-sm">Envoyer par e-mail à un manager</span>
                        </div>
                        <button className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                          Envoyer
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Send className="w-5 h-5 text-gray-600" />
                          <span className="text-sm">Envoyer vers Reporting</span>
                        </div>
                        <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm">
                          Publier
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-5 h-5 text-gray-600" />
                          <span className="text-sm">Programmer un export récurrent</span>
                        </div>
                        <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm">
                          Programmer
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 text-sm text-orange-900">
                    Vous pouvez fermer cette fenêtre, l'export se poursuit en arrière-plan.
                  </div>
                </div>
              )}

              {exportStep === 2 && (
                <div className="text-center py-8">
                  <RefreshCw className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin" />
                  <p className="text-gray-600">Génération du fichier PDF en cours...</p>
                </div>
              )}

              {exportStep === 3 && (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">Export terminé !</p>
                  <p className="text-gray-600">Votre fichier est prêt à être téléchargé</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t flex justify-between sticky bottom-0 bg-white rounded-b-3xl">
              <button onClick={closeModals} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Fermer
              </button>
              <div className="flex gap-3">
                {exportStep > 1 && exportStep < 3 && (
                  <button onClick={() => prevStep('export')} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Retour
                  </button>
                )}
                {exportStep < 3 ? (
                  <button onClick={() => nextStep('export')} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    {exportStep === 1 ? 'Générer' : 'Continuer'}
                  </button>
                ) : (
                  <button onClick={finishExport} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    Terminer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Envoyer */}
      {showSendModal && (
  <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b sticky top-0 bg-white rounded-t-3xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Envoyer le rapport</h2>
                  <p className="text-sm text-gray-500">Choisissez le format et la destination avant l'envoi • Clara Moreau • Tableau de bord agent</p>
                </div>
                <button onClick={closeModals} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 transition-all ${sendStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-100'}`}>
                  <Package className="w-5 h-5" />
                  <span className="font-medium text-sm">Préparer</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 transition-all ${sendStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                  <Mail className="w-5 h-5" />
                  <span className="font-medium text-sm">Format & destination</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 transition-all ${sendStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium text-sm">Confirmation</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {sendStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Format d'export</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <button className="p-4 border-2 border-green-500 bg-green-50 rounded-lg text-left hover:shadow-md transition">
                        <FileText className="w-6 h-6 text-green-600 mb-2" />
                        <div className="font-semibold">PDF</div>
                        <div className="text-xs text-gray-600">Mise en page prête à partager</div>
                      </button>
                      <button className="p-4 border-2 border-gray-300 rounded-lg text-left hover:border-blue-500 hover:shadow-md transition">
                        <FileText className="w-6 h-6 text-gray-600 mb-2" />
                        <div className="font-semibold">Excel (.xlsx)</div>
                        <div className="text-xs text-gray-600">Données tabulaires</div>
                      </button>
                      <button className="p-4 border-2 border-gray-300 rounded-lg text-left hover:border-blue-500 hover:shadow-md transition">
                        <FileText className="w-6 h-6 text-gray-600 mb-2" />
                        <div className="font-semibold">CSV</div>
                        <div className="text-xs text-gray-600">Compatibilité maximale</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Destinations</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border-2 border-green-500 bg-green-50 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-green-600" />
                          <div>
                            <div className="font-semibold">Envoyer par e-mail</div>
                            <div className="text-sm text-gray-600">ajouter des destinataires...</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition">
                        <div className="flex items-center gap-3">
                          <Send className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-semibold">Reporting interne</div>
                            <div className="text-sm text-gray-600">Publier dans Reporting</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-semibold">Groupes/équipes</div>
                            <div className="text-sm text-gray-600">ex: Managers Région Sud</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition">
                        <div className="flex items-center gap-3">
                          <Package className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-semibold">Dossier partagé</div>
                            <div className="text-sm text-gray-600">choisir un dossier...</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">martin.dupont@carrefour.fr</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">aicha@finance.local</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Équipe Caisses</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Les droits d'accès seront appliqués automatiquement selon les rôles.</p>
                  </div>
                </div>
              )}

              {sendStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Paramètres d'envoi</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5" />
                          <div>
                            <div className="font-semibold">Protection par mot de passe</div>
                            <div className="text-sm text-green-600">Activée</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                        <div className="flex items-center gap-3">
                          <ClockIcon className="w-5 h-5" />
                          <div>
                            <div className="font-semibold">Expiration du lien</div>
                            <div className="text-sm text-gray-600">7 jours</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="w-5 h-5" />
                          <div>
                            <div className="font-semibold">Anonymisation</div>
                            <div className="text-sm text-gray-600">Standard</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5" />
                          <div>
                            <div className="font-semibold">Planification</div>
                            <div className="text-sm text-gray-600">Maintenant</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">Récapitulatif</span>
                    </div>
                    <p className="text-sm text-blue-800">PDF • 6 onglets • 312 lignes • 3 destinataires</p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Vous pourrez réutiliser ces paramètres pour un envoi récurrent.</p>
                  </div>
                </div>
              )}

              {sendStep === 3 && (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">Rapport envoyé avec succès !</p>
                  <p className="text-gray-600">Les destinataires ont été notifiés</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t flex justify-between sticky bottom-0 bg-white rounded-b-3xl">
              <button onClick={closeModals} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                {sendStep === 3 ? 'Fermer' : 'Annuler'}
              </button>
              <div className="flex gap-3">
                {sendStep > 1 && sendStep < 3 && (
                  <button onClick={() => prevStep('send')} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Retour
                  </button>
                )}
                {sendStep < 3 ? (
                  <button onClick={() => nextStep('send')} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    {sendStep === 2 ? 'Envoyer maintenant' : 'Continuer'}
                  </button>
                ) : (
                  <button onClick={finishSend} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    Terminer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Échange de créneau */}
      {showExchangeModal && (
  <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b sticky top-0 bg-white rounded-t-3xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Demande de congé</h2>
                  <p className="text-sm text-gray-500">Étape suivante après « Demander congé » • Clara Moreau • Ressources humaines</p>
                </div>
                <button onClick={closeModals} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 transition-all ${exchangeStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-100'}`}>
                  <FileText className="w-5 h-5" />
                  <span className="font-medium text-sm">Détails</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 transition-all ${exchangeStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium text-sm">Validation & notifications</span>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 transition-all ${exchangeStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium text-sm">Confirmation</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              {exchangeStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Validateurs</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border-2 border-green-500 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            JD
                          </div>
                          <div>
                            <div className="font-semibold">Manager direct</div>
                            <div className="text-sm text-gray-600">Ex: J. Dupont</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                            CB
                          </div>
                          <div>
                            <div className="font-semibold">Remplaçant</div>
                            <div className="text-sm text-gray-600">Sélectionner un collègue</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">J. Dupont</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">C. Bernard (backup)</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Le manager et le remplaçant seront notifiés pour garantir la continuité du service.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Période et type</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-300 rounded-lg">
                        <label className="text-sm text-gray-600 block mb-2">Du</label>
                        <input type="date" defaultValue="2025-01-01" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                      </div>
                      <div className="p-4 border border-gray-300 rounded-lg">
                        <label className="text-sm text-gray-600 block mb-2">Au</label>
                        <input type="date" defaultValue="2025-01-01" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div className="p-4 border border-gray-300 rounded-lg">
                        <label className="text-sm text-gray-600 block mb-2">Type de congé</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                          <option>CP • RTT • Sans solde...</option>
                          <option>Congé payé</option>
                          <option>RTT</option>
                          <option>Sans solde</option>
                        </select>
                      </div>
                      <div className="p-4 border border-gray-300 rounded-lg">
                        <label className="text-sm text-gray-600 block mb-2">Solde disponible</label>
                        <div className="text-lg font-semibold">CP-12 | RTT-4j</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div className="p-4 border border-gray-300 rounded-lg">
                        <label className="text-sm text-gray-600 block mb-2">Prise</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                          <option>Journée entière</option>
                          <option>Demi-journée</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Message au manager</h3>
                    <textarea 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
                      rows="3"
                      placeholder="Motif, handover, tâches confiées..."
                      defaultValue="Motif, handover, tâches confiées..."
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-2">Ce message sera inclus dans l'email de demande de l'historique RH.</p>
                  </div>
                </div>
              )}

              {exchangeStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-green-600" />
                          <div>
                            <div className="font-semibold">Notifier par e-mail</div>
                            <div className="text-sm text-gray-600">Manager + RH</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Send className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-semibold">Message interne</div>
                            <div className="text-sm text-gray-600">Canal équipe + Caisse 1</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-semibold">Rappel automatique</div>
                            <div className="text-sm text-gray-600">48 h avant le départ</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">Récapitulatif</span>
                    </div>
                    <p className="text-sm text-gray-800 mb-1">CP • 3 jours • du 28/10 au 2s/10 • 2s/10 lignes • 3 destinataires • Manager: J. Dupont</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Impact planning</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">2 shifts à réaffecter</span>
                        <span className="text-sm font-semibold">Caisse 1 et 5</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">Historique</span>
                        <span className="text-sm font-semibold">Dernier congé pris: 15/08 — 2 jours</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Les demandes sont soumises aux règles d'ancienneté et de solde.</p>
                  </div>
                </div>
              )}

              {exchangeStep === 3 && (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">Demande soumise !</p>
                  <p className="text-gray-600">Votre manager sera notifié pour validation</p>
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">Vous recevrez une notification dès que votre demande sera traitée</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t flex justify-between sticky bottom-0 bg-white rounded-b-3xl">
              <button onClick={closeModals} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                {exchangeStep === 3 ? 'Fermer' : 'Annuler'}
              </button>
              <div className="flex gap-3">
                {exchangeStep > 1 && exchangeStep < 3 && (
                  <button onClick={() => prevStep('exchange')} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Retour
                  </button>
                )}
                {exchangeStep === 1 && (
                  <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Prévisualiser la demande
                  </button>
                )}
                {exchangeStep < 3 ? (
                  <button onClick={() => nextStep('exchange')} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    {exchangeStep === 2 ? 'Soumettre pour validation' : 'Continuer'}
                  </button>
                ) : (
                  <button onClick={finishExchange} className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    Terminer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDashboard;