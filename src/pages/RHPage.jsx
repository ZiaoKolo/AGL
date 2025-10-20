import React, { useState } from "react";
import {
  FiDownload,
  FiUserPlus,
  FiCalendar,
  FiClock,
  FiAlertCircle,
  FiUsers,
  FiChevronDown,
  FiSearch,
  FiEye,
  FiCheck,
  FiPlus,
  FiEdit,
  FiFileText,
} from "react-icons/fi";

export default function HRDashboard() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");

  const employees = [
    {
      name: "Clara Dupont",
      service: "Caisse",
      contract: "CDI",
      leaveDays: 8,
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Mehdi Karim",
      service: "Rayon frais",
      contract: "CDD",
      leaveDays: 11,
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Sophie Martin",
      service: "RH",
      contract: "CDI",
      leaveDays: 15,
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  ];

  const leaveRequests = [
    {
      name: "Emma D.",
      period: "15-18 Juin (3j)",
      type: "CP",
      days: 11,
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    {
      name: "Marc L.",
      period: "22-24 Juin (2j)",
      type: "RTT",
      days: 6,
      avatar: "https://i.pravatar.cc/150?img=13",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500 font-semibold">
            Accueil / <span className="text-gray-700">Ressources humaines</span>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-100 font-medium text-green-700 rounded-[20px] hover:bg-green-200 transition">
              <FiDownload className="w-4 h-4" />
              <span>Exporter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0b79d0] text-white rounded-[20px] hover:bg-blue-600 transition">
              <FiUserPlus className="w-4 h-4" />
              <span>Nouvel employé</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-[30px] p-5 shadow-sm">
            <div className="text-sm text-gray-600 mb-1 font-semibold">
              Employés actifs
            </div>
            <div className="text-3xl font-bold mb-2">164</div>
            <div className="inline-flex items-center px-3 py-1 bg-[#16a34a] text-white w-full rounded-full text-xs font-medium">
              +3 ce mois
            </div>
          </div>

          <div className="bg-white rounded-[30px] p-5 shadow-sm">
            <div className="text-sm text-gray-600 mb-1 font-semibold">
              Congés en cours
            </div>
            <div className="text-3xl font-bold mb-2">12</div>
            <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium w-full">
              <FiCalendar className="w-3 h-3 mr-1" />
              Retour moyen: 4j
            </div>
          </div>

          <div className="bg-white rounded-[30px] p-5 shadow-sm">
            <div className="text-sm text-gray-600 mb-1 font-semibold">
              Retards
            </div>
            <div className="text-3xl font-bold mb-2">5</div>
            <div className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium w-full">
              <FiAlertCircle className="w-3 h-3 mr-1" />À suivre
            </div>
          </div>

          <div className="bg-white rounded-[30px] p-5 shadow-sm">
            <div className="text-sm text-gray-600 mb-1 font-semibold">
              Postes à pourvoir
            </div>
            <div className="text-3xl font-bold mb-2">8</div>
            <div className="inline-flex items-center px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium w-full">
              <FiUsers className="w-3 h-3 mr-1" />
              Recrutement
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column - Employee Directory */}
        <div className="lg:col-span-2 bg-white rounded-[30px] shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Annuaire employés</h2>

          <div className="mb-4">
            <div className="relative mb-3">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un employé, service..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
            <div className="flex gap-3">
              <button className="px-3 py-1.5 border border-gray-300 font-semibold rounded-lg text-sm flex items-center gap-1 hover:bg-gray-50">
                Service: Tous <FiChevronDown className="w-4 h-4" />
              </button>
              <button className="px-3 py-1.5 border border-gray-300 font-semibold rounded-lg text-sm flex items-center gap-1 hover:bg-gray-50">
                Statut: Actif <FiChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto mb-4 rounded-t-2xl md:rounded-t-3xl ">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-bold text-green-700 bg-green-50">
                    Employé
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-green-700 bg-green-50">
                    Service
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-green-700 bg-green-50">
                    Contrat
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-green-700 bg-green-50">
                    Solde congés
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-green-700 bg-green-50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedEmployee(emp.name)}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-gray-600 font-medium">
                          {emp.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700 font-semibold">
                      {emp.service}
                    </td>
                    <td className="py-3 px-4 text-gray-700 font-semibold">
                      {emp.contract}
                    </td>
                    <td className="py-3 px-4 text-gray-700 font-semibold">
                      {emp.leaveDays}j
                    </td>
                    <td className="py-3 px-4">
                      <button className="px-3 py-1 text-sm text-green-600 font-semibold hover:bg-green-50 rounded transition">
                        Voir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Employee Profile */}
        <div className="bg-white rounded-[30px] shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Résumé employé</h2>
            <p className="text-sm text-gray-500 font-semibold">Employé: Clara</p>
          </div>

          <div className="text-center mb-6">
            <img
              src="https://i.pravatar.cc/150?img=1"
              alt="Clara Dupont"
              className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-blue-200"
            />
            <div>
              <div className="font-semibold text-lg">Clara Dupont</div>
              <div className="text-sm text-green-700 font-semibold bg-green-100 p-1 rounded-[30px] w-1/4 mx-auto">Caisse • CDI</div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Prochains congés */}
            <div className="border border-gray-200 rounded-[30px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <FiCalendar className="w-4 h-4 text-gray-600" />
                <span className="font-semibold text-sm">Prochains congés</span>
              </div>
              <div className="text-sm text-gray-600 font-semibold">12-16 Juin • 3j ouvrés</div>
              <div className="text-xs text-green-700 mt-1 font-semibold bg-green-100 rounded-[20px] p-1 w-1/7">Solde: 8j</div>
            </div>

            {/* Présence */}
            <div className="border border-gray-200 rounded-[30px] p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FiClock className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold text-sm">Présence (30j)</span>
                </div>
                <div className="px-2 py-0.5 bg-green-100 text-green-700 rounded-[20px] text-xs font-medium">
                  OK
                </div>
              </div>
              <div className="text-sm text-gray-600 font-semibold">Taux: 96%</div>
              <div className="text-xs text-gray-500 font-semibold">Retards: 1</div>
            </div>

            {/* Formation */}
            <div className="border border-gray-200 rounded-[30px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <FiFileText className="w-4 h-4 text-gray-600" />
                <span className="font-semibold text-sm">Formation</span>
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                Sécurité • HACCP à renouveler
              </div>
              <div className="mt-2">
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-[30px] text-xs font-medium">
                  À planifier
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-[30px] bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition">
              <FiPlus className="w-4 h-4" /> Ajouter congés
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#0b79d0] text-white rounded-[30px] hover:bg-[#0a6bbd] transition">
              <FiEdit className="w-4 h-4" /> Modifier profil
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave Requests */}
        <div className="lg:col-span-2 bg-white rounded-[30px] shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Demandes de congés</h2>

          <div className="flex gap-4 mb-4 border-b border-gray-200">
            <button
              className={`pb-2 px-1 text-sm font-medium transition ${
                activeTab === "pending"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              En attente
            </button>
            <button
              className={`pb-2 px-1 text-sm font-medium transition ${
                activeTab === "accepted"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("accepted")}
            >
              Acceptées
            </button>
            <button
              className={`pb-2 px-1 text-sm font-medium transition ${
                activeTab === "refused"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("refused")}
            >
              Refusées
            </button>
          </div>

          <div className="overflow-x-auto mb-4 rounded-t-2xl md:rounded-t-3xl">
            <table className="w-full">
              <thead>
                <tr className="border-b border-green-200">
                  <th className="text-left py-3 px-4 text-sm  text-green-700 font-bold bg-green-50">
                    Employé
                  </th>
                  <th className="text-left py-3 px-4 text-sm  text-green-700 font-bold bg-green-50">
                    Période
                  </th>
                  <th className="text-left py-3 px-4 text-sm  text-green-700 font-bold bg-green-50">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-sm  text-green-700 font-bold bg-green-50">
                    Solde restant
                  </th>
                  <th className="text-left py-3 px-4 text-sm  text-green-700 font-bold bg-green-50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((req, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={req.avatar}
                          alt={req.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="font-medium text-gray-500">{req.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-700">{req.period}</td>
                    <td className="py-3 px-4 font-semibold text-gray-700">{req.type}</td>
                    <td className="py-3 px-4 font-semibold text-gray-700">{req.days}j</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 text-sm font-semibold text-green-700  rounded-[30px] bg-green-100 hover:bg-green-200">
                          Détails
                        </button>
                        <button className="px-3 py-1 text-sm font-semibold text-white bg-[#0b79d0] rounded-[30px] hover:bg-blue-700">
                          Valider
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* HR Alerts */}
        <div className="bg-white rounded-[30px] shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Alertes RH</h2>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-[30px] p-4">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1">
                    Badge d'accès expirant
                  </div>
                  <div className="text-xs text-gray-600 font-semibold mb-2">
                    5 employés dans 7 jours
                  </div>
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-[30px] text-xs font-medium">
                    Renouveler
                  </span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-[30px] p-4">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1">
                    Formation HACCP
                  </div>
                  <div className="text-xs font-semibold  text-gray-600 mb-2">
                    4 employés en retard
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-[30px] text-xs font-medium">
                    Urgent
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-right">
            <button className="text-md text-[#0b79d0] hover:text-blue-800">
              Filtre: Tous
            </button>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-center gap-4 mt-6">
        <button className="flex items-center gap-2 px-6 py-2 bg-green-100  rounded-[30px] hover:bg-green-200 transition">
          <FiDownload className="w-4 h-4" />
          Importer employés
        </button>
        <button className="flex items-center gap-2 px-6 py-2 bg-[#0b79d0] text-white rounded-[30px] hover:bg-blue-800 transition">
          <FiCheck className="w-4 h-4" />
          Enregistrer changements
        </button>
      </div>
    </div>
  );
}
