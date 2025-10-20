import React, { useState } from 'react';
import { FaDownload, FaPlus, FaUserPlus, FaKey, FaEdit, FaTrash, FaCopy, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';
import { MdEmail, MdRefresh } from 'react-icons/md';

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('utilisateurs');
  const [selectedRole, setSelectedRole] = useState(null);

  const users = [
    {
      name: 'Sarah Dupont',
      email: 'sarah.dupont@carrefour.fr',
      role: 'Manager rayon',
      magasin: 'Lyon Dieu',
      lastActive: 'Il y a 2h',
      status: 'active'
    },
    {
      name: 'Rachid Benali',
      email: 'r.benali@carrefour.fr',
      role: 'Caissier',
      magasin: 'Marseille Prado',
      lastActive: 'Hier',
      status: 'active'
    },
    {
      name: 'Julie Martin',
      email: 'julie.martin@carrefour.fr',
      role: 'Admin',
      magasin: 'Paris Bercy',
      lastActive: 'Il y a 5j',
      status: 'active'
    }
  ];

  const invitations = [
    {
      email: 'claire.roche@carrefour.fr',
      role: 'Approvisionneur',
      sentDate: '10 sept.',
      expiresDate: '17 sept.',
      status: 'pending'
    },
    {
      email: 'paul.durand@carrefour.fr',
      role: 'Caissier',
      sentDate: '11 sept.',
      expiresDate: '18 sept.',
      status: 'pending'
    }
  ];

  const roles = [
    {
      name: 'Admin',
      description: 'Accès complet à toutes les fonctionnalités',
      color: 'green',
      permissions: {
        stocks: { lire: true, ecrire: true, administrer: true },
        ventes: { lire: true, ecrire: true, administrer: false },
        promotions: { lire: true, ecrire: true, administrer: false },
        reporting: { lire: true, ecrire: false, administrer: false }
      }
    },
    {
      name: 'Manager rayon',
      description: 'Stocks, Ventes, Promotions',
      permissions: {
        stocks: { lire: true, ecrire: true, administrer: false },
        ventes: { lire: true, ecrire: true, administrer: false },
        promotions: { lire: true, ecrire: true, administrer: false },
        reporting: { lire: true, ecrire: false, administrer: false }
      }
    },
    {
      name: 'Caissier',
      description: 'Caisses, Ventes du jour',
      permissions: {
        stocks: { lire: false, ecrire: false, administrer: false },
        ventes: { lire: true, ecrire: true, administrer: false },
        promotions: { lire: false, ecrire: false, administrer: false },
        reporting: { lire: false, ecrire: false, administrer: false }
      }
    },
    {
      name: 'Approvisionneur',
      description: 'Stocks, Fournisseurs',
      permissions: {
        stocks: { lire: true, ecrire: true, administrer: false },
        ventes: { lire: false, ecrire: false, administrer: false },
        promotions: { lire: false, ecrire: false, administrer: false },
        reporting: { lire: false, ecrire: false, administrer: false }
      }
    }
  ];

  const activityLog = [
    {
      type: 'success',
      message: 'Connexion réussie',
      details: '12 sept. • Julie Martin • IP 192.168.1.1',
      icon: FaCheckCircle
    },
    {
      type: 'info',
      message: 'Modification rôle',
      details: '11 sept. • Alex Martin a modifié "Manager rayon"',
      icon: FaEdit
    },
    {
      type: 'warning',
      message: 'Tentative échouée',
      details: '09 sept. • 3 essais • Rachid Benali',
      icon: FaExclamationCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Accueil</span>
            <span>/</span>
            <span>Paramètres</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Accès & rôles</span>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <FaDownload />
              Exporter
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <FaPlus />
              Nouveau rôle
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">Utilisateurs actifs</div>
            <div className="text-3xl font-bold text-gray-900 mb-3">128</div>
            <div className="bg-cyan-500 text-white text-xs px-3 py-1 rounded-full inline-block">
              +9 ce mois
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">Rôles</div>
            <div className="text-3xl font-bold text-gray-900 mb-3">7</div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <FaKey className="text-green-600" />
              Standardisés
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">Invitations en attente</div>
            <div className="text-3xl font-bold text-gray-900 mb-3">5</div>
            <div className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full inline-block">
              Expire bientôt
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">Dernière revue d'accès</div>
            <div className="text-3xl font-bold text-gray-900 mb-3">12 sept.</div>
            <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full inline-block flex items-center gap-1 w-fit">
              <FaCheckCircle />
              Conforme
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - User List */}
          <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Tabs */}
            <div className="border-b border-gray-200 px-6 py-3">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('utilisateurs')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'utilisateurs'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Utilisateurs
                </button>
                <button
                  onClick={() => setActiveTab('invitations')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'invitations'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Invitations
                </button>
              </div>
            </div>

            {/* Filters */}
            {activeTab === 'utilisateurs' && (
              <>
                <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-4 text-sm">
                  <span className="text-gray-600">Utilisateurs</span>
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="border border-gray-300 rounded px-3 py-1.5 text-sm flex-1 max-w-xs"
                  />
                  <select className="border border-gray-300 rounded px-3 py-1.5 text-sm">
                    <option>Rôle: Tous</option>
                    <option>Admin</option>
                    <option>Manager rayon</option>
                    <option>Caissier</option>
                  </select>
                  <select className="border border-gray-300 rounded px-3 py-1.5 text-sm">
                    <option>Statut: Actif</option>
                    <option>Inactif</option>
                  </select>
                  <span className="text-gray-600">Rôles & permissions</span>
                  <span className="text-gray-600">Magasin: Tous</span>
                </div>

                {/* User Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Utilisateur</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Rôle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Magasin</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Dernière activité</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map((user, index) => (
                        <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedRole(user)}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-medium">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-xs text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              user.role === 'Admin' ? 'bg-green-500 text-white' :
                              user.role === 'Caissier' ? 'bg-cyan-500 text-white' :
                              'bg-gray-200 text-gray-700'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{user.magasin}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{user.lastActive}</td>
                          <td className="px-6 py-4">
                            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                              Gérer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-200">
                  <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    <FaUserPlus />
                    Inviter utilisateur
                  </button>
                </div>
              </>
            )}

            {activeTab === 'invitations' && (
              <>
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between text-sm">
                  <span className="text-gray-600">Statut: En attente</span>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">Journal d'audit</span>
                    <span className="text-gray-600">Période: 30j</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Rôle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Envoyée le</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Expire le</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {invitations.map((invitation, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{invitation.email}</td>
                          <td className="px-6 py-4">
                            <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium">
                              {invitation.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{invitation.sentDate}</td>
                          <td className="px-6 py-4">
                            <span className="inline-block px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-medium">
                              {invitation.expiresDate}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                              Renvoyer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
                  <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    <MdRefresh />
                    Réinitialiser
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600">
                    <MdEmail />
                    Enregistrer
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right Column - Role Details & Activity */}
          <div className="space-y-6">
            {/* Role Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Rôles & permissions</h3>
              <div className="space-y-3">
                {roles.map((role, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedRole?.role === role.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedRole({ role: role.name })}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FaKey className={role.color === 'green' ? 'text-green-600' : 'text-gray-400'} />
                        <span className="text-sm font-medium text-gray-900">{role.name}</span>
                      </div>
                      {role.color === 'green' && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                          Actif
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{role.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Role Permissions Detail */}
            {selectedRole && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Détails du rôle sélectionné</h3>
                  <p className="text-xs text-gray-600">Rôle: {selectedRole.role || 'Manager rayon'}</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      Accès: Stocks
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      Accès: Ventes
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Accès: Promotions
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-left text-gray-600">
                        <th className="pb-2">Module</th>
                        <th className="pb-2 text-center">Lire</th>
                        <th className="pb-2 text-center">Écrire</th>
                        <th className="pb-2 text-center">Administrer</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-2 text-gray-700">Stocks</td>
                        <td className="text-center"><FaCheckCircle className="inline text-green-600" /></td>
                        <td className="text-center">On</td>
                        <td className="text-center text-gray-400">Off</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-700">Ventes / Caisse</td>
                        <td className="text-center"><FaCheckCircle className="inline text-green-600" /></td>
                        <td className="text-center">On</td>
                        <td className="text-center text-gray-400">Off</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-700">Promotions</td>
                        <td className="text-center"><FaCheckCircle className="inline text-green-600" /></td>
                        <td className="text-center">On</td>
                        <td className="text-center text-gray-400">Off</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-700">Reporting</td>
                        <td className="text-center"><FaCheckCircle className="inline text-green-600" /></td>
                        <td className="text-center text-gray-400">Off</td>
                        <td className="text-center text-gray-400">Off</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                    <FaCopy />
                    Dupliquer rôle
                  </button>
                  <button className="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 flex items-center justify-center gap-2">
                    <FaTrash />
                    Supprimer rôle
                  </button>
                </div>

                <button className="w-full mt-2 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2">
                  <MdEmail />
                  Enregistrer modifications
                </button>
              </div>
            )}

            {/* Activity Log */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Journal d'audit</h3>
              <div className="space-y-3">
                {activityLog.map((log, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`mt-0.5 ${
                      log.type === 'success' ? 'text-green-600' :
                      log.type === 'warning' ? 'text-red-500' :
                      'text-blue-600'
                    }`}>
                      <log.icon className="text-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 mb-1">{log.message}</p>
                      <p className="text-xs text-gray-600">{log.details}</p>
                    </div>
                    {log.type === 'success' && (
                      <span className="px-2 py-1 bg-green-500 text-white text-xs rounded flex items-center gap-1 flex-shrink-0">
                        OK
                      </span>
                    )}
                    {log.type === 'info' && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded flex items-center gap-1 flex-shrink-0">
                        Info
                      </span>
                    )}
                    {log.type === 'warning' && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs rounded flex items-center gap-1 flex-shrink-0">
                        Alerte
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}