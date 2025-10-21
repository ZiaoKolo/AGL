import React, { useState, useEffect } from 'react';
import { Search, Plus, Star, Trophy, MoreHorizontal, X } from 'lucide-react';

const CRMPage = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      points: 1250,
      lastVisit: "Aujourd'hui",
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop'
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      email: 'thomas.dubois@email.com',
      points: 980,
      lastVisit: 'Il y a 2 jours',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop'
    },
    {
      id: 3,
      name: 'Marie Leroy',
      email: 'marie.leroy@email.com',
      points: 875,
      lastVisit: 'Il y a 3 jours',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop'
    },
    {
      id: 4,
      name: 'Lucas Bernard',
      email: 'lucas.bernard@email.com',
      points: 720,
      lastVisit: 'Il y a 5 jours',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop'
    },
    {
      id: 5,
      name: 'Emma Petit',
      email: 'emma.petit@email.com',
      points: 650,
      lastVisit: 'Il y a 1 semaine',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop'
    },
    {
      id: 6,
      name: 'Paul Moreau',
      email: 'paul.moreau@email.com',
      points: 540,
      lastVisit: 'Il y a 1 semaine',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    points: 0
  });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topCustomers = [...customers]
    .sort((a, b) => b.points - a.points)
    .slice(0, 3);

  const maxPoints = topCustomers[0]?.points || 1;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'points' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newCustomer = {
      id: customers.length + 1,
      name: formData.name,
      email: formData.email,
      points: formData.points,
      lastVisit: "Aujourd'hui",
      avatar: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1494790108377-be9c29b29330' : '1507003211169-0a1dd7228f2d'}?w=80&h=80&fit=crop`
    };

    setCustomers(prev => [...prev, newCustomer]);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', points: 0 });
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      setCustomers(prev => prev.filter(c => c.id !== id));
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  const getRankColor = (index) => {
    if (index === 0) return 'ring-[#3dd68c]';
    if (index === 1) return 'ring-[#4a90e2]';
    return 'ring-[#cd7f32]';
  };

  const getRankBgColor = (index) => {
    if (index === 0) return 'bg-[#3dd68c] text-[#0a1628]';
    if (index === 1) return 'bg-[#4a90e2] text-white';
    return 'bg-[#cd7f32] text-white';
  };

  return (
    <div className="bg-[#0a1628] text-gray-100 min-h-screen">
      <div className="max-w-[1400px] mx-auto p-6 lg:p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-2">
            Gestion des Clients
          </h1>
          <p className="text-gray-400 text-sm">Gérez vos clients et suivez leur fidélité</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Search Bar & Add Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Rechercher un client..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0f1f3a] border border-[#1a2f4a] rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3dd68c]/50 focus:border-[#3dd68c] transition-all"
                />
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#3dd68c] hover:bg-[#35c17d] text-[#0a1628] px-5 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-[#3dd68c]/20"
              >
                <Plus className="w-4 h-4" />
                Ajouter client
              </button>
            </div>
            
            {/* Clients Table */}
            <div className="bg-[#0f1f3a] border border-[#1a2f4a] rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1a2f4a]">
                      <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Nom</th>
                      <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                      <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Points</th>
                      <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Dernière visite</th>
                      <th className="text-right px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1a2f4a]">
                    {filteredCustomers.map((customer, index) => (
                      <tr 
                        key={customer.id} 
                        className="hover:bg-[#142b47] transition-colors"
                        style={{
                          opacity: 0,
                          animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`
                        }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={customer.avatar} 
                              alt={customer.name}
                              className="w-9 h-9 rounded-full object-cover"
                            />
                            <span className="text-sm font-medium text-white">{customer.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">{customer.email}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#3dd68c]/10 text-[#3dd68c] rounded-full text-sm font-medium">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            {customer.points.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">{customer.lastVisit}</td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleDeleteCustomer(customer.id)}
                            className="text-gray-400 hover:text-red-400 transition-colors"
                            title="Supprimer"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
          
          {/* Sidebar - Top 3 Clients */}
          <div className="lg:col-span-1">
            <div className="bg-[#0f1f3a] border border-[#1a2f4a] rounded-lg p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-[#3dd68c]" />
                <h2 className="text-lg font-semibold text-white">Top 3 Clients Fidèles</h2>
              </div>
              
              <div className="space-y-6">
                {topCustomers.map((customer, index) => (
                  <div key={customer.id} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={customer.avatar} 
                          alt={customer.name}
                          className={`w-12 h-12 rounded-full object-cover ring-2 ${getRankColor(index)}`}
                        />
                        <div className={`absolute -top-1 -right-1 ${getRankBgColor(index)} w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold`}>
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">{customer.name}</div>
                        <div className="text-xs text-gray-400">{customer.points.toLocaleString()} points</div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Progression</span>
                        <span className="text-[#3dd68c] font-medium">
                          {Math.round((customer.points / maxPoints) * 100)}%
                        </span>
                      </div>
                      <div className="h-2 bg-[#1a2f4a] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#3dd68c] to-[#2fb574] rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${(customer.points / maxPoints) * 100}%`,
                            animation: `fillGauge 1.5s ease-out ${0.3 + index * 0.2}s forwards`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-[#1a2f4a]">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Prochain palier</span>
                  <span className="text-[#3dd68c] font-medium">1,500 pts</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
            style={{ animation: 'fadeIn 0.3s ease-out forwards' }}
          ></div>
          <div 
            className="relative bg-[#0f1f3a] border border-[#1a2f4a] rounded-lg w-full max-w-md p-6 shadow-2xl"
            style={{ animation: 'modalZoomIn 0.3s ease-out forwards' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Ajouter un client</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nom complet</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Sophie Martin"
                  className="w-full bg-[#0a1628] border border-[#1a2f4a] rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3dd68c]/50 focus:border-[#3dd68c] transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="exemple@email.com"
                  className="w-full bg-[#0a1628] border border-[#1a2f4a] rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3dd68c]/50 focus:border-[#3dd68c] transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Téléphone</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+33 6 12 34 56 78"
                  className="w-full bg-[#0a1628] border border-[#1a2f4a] rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3dd68c]/50 focus:border-[#3dd68c] transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Points initiaux</label>
                <input 
                  type="number" 
                  name="points"
                  value={formData.points}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full bg-[#0a1628] border border-[#1a2f4a] rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3dd68c]/50 focus:border-[#3dd68c] transition-all"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-[#1a2f4a] hover:bg-[#233a56] text-gray-300 px-4 py-2.5 rounded-lg font-medium text-sm transition-all"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-[#3dd68c] hover:bg-[#35c17d] text-[#0a1628] px-4 py-2.5 rounded-lg font-medium text-sm transition-all hover:shadow-lg hover:shadow-[#3dd68c]/20"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fillGauge {
          from {
            width: 0%;
          }
        }
        
        @keyframes modalZoomIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CRMPage;