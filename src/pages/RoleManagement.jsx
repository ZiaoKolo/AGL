import React, { useState, useEffect } from 'react';
import { Shield, Users, ShieldCheck, UserCheck, Key, Search, Plus, Settings, MoreHorizontal, ChevronDown, X, Eye, Edit, Trash2, UserPlus, BarChart2, Package, DollarSign, UserCircle, Heart } from 'lucide-react';

const RoleManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [permissionsModalOpen, setPermissionsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  // Définition des rôles simplifiés
  const roles = [
    {
      name: 'Admin',
      description: 'Accès complet à toutes les fonctionnalités',
      permissions: ['view_content', 'edit_content', 'delete_content', 'manage_users', 'invite_users', 'system_settings', 'view_stats', 'manage_stock', 'manage_cash', 'manage_hr', 'manage_crm', 'view_reports']
    },
    {
      name: 'Gestionnaire de Stock',
      description: 'Gestion des stocks et des rayons',
      permissions: ['view_content', 'edit_content', 'manage_stock', 'view_stats']
    },
    {
      name: 'RH',
      description: 'Gestion des ressources humaines',
      permissions: ['view_content', 'manage_hr', 'view_stats', 'manage_users']
    },
    {
      name: 'Caissière',
      description: 'Gestion des caisses et ventes',
      permissions: ['view_content', 'manage_cash', 'manage_crm']
    }
  ];

  const [users, setUsers] = useState([
    { id: 1, name: 'Alexandre Dupont', email: 'alex.dupont@company.fr', role: 'Admin', status: 'Actif', lastLogin: 'Il y a 2 heures', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop' },
    { id: 2, name: 'Sophie Martin', email: 'sophie.martin@company.fr', role: 'Gestionnaire de Stock', status: 'Actif', lastLogin: 'Aujourd\'hui', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
    { id: 3, name: 'Thomas Bernard', email: 'thomas.bernard@company.fr', role: 'RH', status: 'Actif', lastLogin: 'Il y a 1 jour', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop' },
    { id: 4, name: 'Marie Dubois', email: 'marie.dubois@company.fr', role: 'Caissière', status: 'Actif', lastLogin: 'Il y a 2 jours', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop' },
    { id: 5, name: 'Lucas Petit', email: 'lucas.petit@company.fr', role: 'RH', status: 'Inactif', lastLogin: 'Il y a 15 jours', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop' },
    { id: 6, name: 'Emma Moreau', email: 'emma.moreau@company.fr', role: 'Caissière', status: 'Actif', lastLogin: 'Il y a 3 jours', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop' }
  ]);

  const permissionsList = [
    { id: 'view_content', name: 'Voir le contenu', icon: Eye, category: 'Contenu' },
    { id: 'edit_content', name: 'Modifier le contenu', icon: Edit, category: 'Contenu' },
    { id: 'delete_content', name: 'Supprimer le contenu', icon: Trash2, category: 'Contenu' },
    { id: 'manage_users', name: 'Gérer les utilisateurs', icon: Users, category: 'Utilisateurs' },
    { id: 'invite_users', name: 'Inviter des utilisateurs', icon: UserPlus, category: 'Utilisateurs' },
    { id: 'system_settings', name: 'Accès aux paramètres système', icon: Settings, category: 'Système' },
    { id: 'view_stats', name: 'Voir les statistiques', icon: BarChart2, category: 'Système' },
    { id: 'manage_stock', name: 'Gérer les stocks', icon: Package, category: 'Opérations' },
    { id: 'manage_cash', name: 'Gérer les caisses', icon: DollarSign, category: 'Opérations' },
    { id: 'manage_hr', name: 'Gérer les RH', icon: UserCircle, category: 'Opérations' },
    { id: 'manage_crm', name: 'Gérer la fidélisation', icon: Heart, category: 'Opérations' },
    { id: 'view_reports', name: 'Voir les rapports', icon: BarChart2, category: 'Opérations' }
  ];

  const navigationItems = [
    { id: 'roles', name: 'Gestion des Rôles', icon: Shield, path: '/RoleManagement' },
    { id: 'stock', name: 'Stock', icon: Package, path: '/stocks' },
    { id: 'caisse', name: 'Caisse', icon: DollarSign, path: '/caisses' },
    { id: 'rh', name: 'RH', icon: UserCircle, path: '/EmployeeManagement' },
    { id: 'crm', name: 'CRM', icon: Heart, path: '/crm' }
  ];

  const stats = [
    { label: 'Total utilisateurs', value: users.length, icon: Users },
    { label: 'Administrateurs', value: users.filter(u => u.role === 'Admin').length, icon: ShieldCheck },
    { label: 'Utilisateurs actifs', value: users.filter(u => u.status === 'Actif').length, icon: UserCheck },
    { label: 'Rôles définis', value: roles.length, icon: Key }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));
    setOpenDropdown(null);
  };

  const openPermissionsModal = (user) => {
    setSelectedUser(user);
    setPermissionsModalOpen(true);
  };

  const getUserPermissions = (roleName) => {
    const role = roles.find(r => r.name === roleName);
    return role ? role.permissions : [];
  };

  const groupPermissionsByCategory = () => {
    const grouped = {};
    permissionsList.forEach(perm => {
      if (!grouped[perm.category]) {
        grouped[perm.category] = [];
      }
      grouped[perm.category].push(perm);
    });
    return grouped;
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const renderContent = () => {
    // Contenu par défaut - Gestion des rôles
    return (
      <>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-[#0f1f3a] border border-[#1a2f4a] rounded-lg p-5 hover:border-[#3dd68c]/30 transition-all" style={{ animation: `slideRight 0.5s ease-out ${0.1 + idx * 0.05}s forwards`, opacity: 0 }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">{stat.label}</span>
                <stat.icon className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
              </div>
              <div className="text-2xl font-semibold text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0f1f3a] border border-[#1a2f4a] rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3dd68c]/50 focus:border-[#3dd68c] transition-all"
            />
          </div>
          <button
            onClick={() => setRoleModalOpen(true)}
            className="bg-[#3dd68c] hover:bg-[#35c17d] text-[#0a1628] px-5 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-[#3dd68c]/20"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            Ajouter utilisateur
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-[#0f1f3a] border border-[#1a2f4a] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a2f4a]">
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Utilisateur</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Rôle</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Statut</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Dernière connexion</th>
                  <th className="text-right px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a2f4a]">
                {filteredUsers.map((user, idx) => (
                  <tr key={user.id} className="hover:bg-[#142b47] transition-colors group" style={{ animation: `slideRight 0.5s ease-out ${0.1 + idx * 0.05}s forwards`, opacity: 0 }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <div className="text-sm font-medium text-white">{user.name}</div>
                          <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="dropdown relative">
                        <button
                          onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-[#1a2f4a] hover:bg-[#233a56] rounded-lg text-sm text-gray-300 transition-colors"
                        >
                          <span>{user.role}</span>
                          <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                        {openDropdown === user.id && (
                          <div className="absolute bottom-full left-0 z-10 mb-2 min-w-[12rem] bg-[#0f1f3a] border border-[#1a2f4a] rounded-lg p-1 shadow-xl">
                            {roles.map(role => (
                              <button
                                key={role.name}
                                onClick={() => handleRoleChange(user.id, role.name)}
                                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-[#1a2f4a] rounded transition-colors"
                              >
                                {role.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.status === 'Actif'
                          ? 'bg-[#3dd68c]/10 text-[#3dd68c]'
                          : 'bg-gray-500/10 text-gray-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          user.status === 'Actif' ? 'bg-[#3dd68c]' : 'bg-gray-400'
                        }`}></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{user.lastLogin}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => openPermissionsModal(user)}
                        className="text-gray-400 hover:text-[#3dd68c] transition-colors mr-2"
                        title="Éditer les permissions"
                      >
                        <Settings className="w-5 h-5" strokeWidth={1.5} />
                      </button>
                      <button className="text-gray-400 hover:text-white transition-colors" title="Plus d'options">
                        <MoreHorizontal className="w-5 h-5" strokeWidth={1.5} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="bg-[#0a1628] text-gray-100 min-h-screen">
      <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-[#3dd68c]" strokeWidth={1.5} />
            <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white">Administration</h1>
          </div>
          <p className="text-gray-400 text-sm">Gérez les rôles utilisateurs et leurs permissions</p>
        </div>

        {/* Navigation */}
        <div className="bg-[#0f1f3a] border border-[#1a2f4a] rounded-lg p-2 mb-8 flex flex-wrap gap-2">
          {navigationItems.map(item => {
            const IconComponent = item.icon;
            const isActive = window.location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-[#3dd68c] text-[#0a1628] shadow-lg shadow-[#3dd68c]/20'
                    : 'text-gray-300 hover:bg-[#1a2f4a]'
                }`}
              >
                <IconComponent className="w-4 h-4" strokeWidth={1.5} />
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Dynamic Content */}
        {renderContent()}
      </div>

      {/* Add Role Modal */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setRoleModalOpen(false)}></div>
          <div className="relative bg-[#0f1f3a]/85 backdrop-blur-xl border border-[#1a2f4a] rounded-lg w-full max-w-md p-6 shadow-2xl" style={{ animation: 'modalZoom 0.3s ease-out forwards' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Ajouter un nouvel utilisateur</h3>
              <button onClick={() => setRoleModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nom complet</label>
                <input
                  type="text"
                  placeholder="Ex: Jean Dupont"
                  className="w-full bg-[#0a1628] border border-[#1a2f4a] rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3dd68c]/50 focus:border-[#3dd68c] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="jean.dupont@company.fr"
                  className="w-full bg-[#0a1628] border border-[#1a2f4a] rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3dd68c]/50 focus:border-[#3dd68c] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Rôle</label>
                <div className="relative">
                  <select className="w-full bg-[#0a1628] border border-[#1a2f4a] rounded-lg px-4 py-2.5 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3dd68c]/50 focus:border-[#3dd68c] transition-all appearance-none cursor-pointer">
                    {roles.map(role => (
                      <option key={role.name} value={role.name}>{role.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" strokeWidth={1.5} />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setRoleModalOpen(false)}
                  className="flex-1 bg-[#1a2f4a] hover:bg-[#233a56] text-gray-300 px-4 py-2.5 rounded-lg font-medium text-sm transition-all"
                >
                  Annuler
                </button>
                <button
                  onClick={() => setRoleModalOpen(false)}
                  className="flex-1 bg-[#3dd68c] hover:bg-[#35c17d] text-[#0a1628] px-4 py-2.5 rounded-lg font-medium text-sm transition-all hover:shadow-lg hover:shadow-[#3dd68c]/20"
                >
                  Créer l'utilisateur
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {permissionsModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setPermissionsModalOpen(false)}></div>
          <div className="relative bg-[#0f1f3a]/85 backdrop-blur-xl border border-[#1a2f4a] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl" style={{ animation: 'modalZoom 0.3s ease-out forwards' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">{selectedUser.name}</h3>
                <p className="text-sm text-gray-400">{selectedUser.role}</p>
              </div>
              <button onClick={() => setPermissionsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="space-y-6">
              {Object.entries(groupPermissionsByCategory()).map(([category, perms]) => (
                <div key={category} className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">{category}</h4>
                  {perms.map(perm => {
                    const IconComponent = perm.icon;
                    const hasPermission = getUserPermissions(selectedUser.role).includes(perm.id);
                    return (
                      <label key={perm.id} className="flex items-center justify-between p-3 bg-[#0a1628] border border-[#1a2f4a] rounded-lg hover:border-[#3dd68c]/30 transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                          <span className="text-sm text-gray-300">{perm.name}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={hasPermission}
                          readOnly
                          className="w-5 h-5 rounded border-[#1a2f4a] bg-[#0a1628] text-[#3dd68c] focus:ring-[#3dd68c]/50 focus:ring-2 cursor-pointer"
                        />
                      </label>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-6 mt-6 border-t border-[#1a2f4a]">
              <button
                onClick={() => setPermissionsModalOpen(false)}
                className="flex-1 bg-[#1a2f4a] hover:bg-[#233a56] text-gray-300 px-4 py-2.5 rounded-lg font-medium text-sm transition-all"
              >
                Annuler
              </button>
              <button
                onClick={() => setPermissionsModalOpen(false)}
                className="flex-1 bg-[#3dd68c] hover:bg-[#35c17d] text-[#0a1628] px-4 py-2.5 rounded-lg font-medium text-sm transition-all hover:shadow-lg hover:shadow-[#3dd68c]/20"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes modalZoom {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default RoleManagement;