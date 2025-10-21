import { useState, useEffect } from 'react';
import { Search, Plus, CheckCircle, AlertTriangle, AlertCircle, X } from 'lucide-react';

export default function StockPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Lait Entier 1L',
      sku: 'LAI-001',
      category: 'Produits laitiers',
      quantity: 450,
      threshold: 100,
      supplier: 'Lactalis',
      categoryColor: 'blue',
      image: ''
    },
    {
      id: 2,
      name: 'Pain de Mie Complet',
      sku: 'PAN-045',
      category: 'Boulangerie',
      quantity: 85,
      threshold: 50,
      supplier: 'Harry\'s',
      categoryColor: 'amber',
      image: ''
    },
    {
      id: 3,
      name: 'Tomates Bio 1kg',
      sku: 'FRL-128',
      category: 'Fruits & Légumes',
      quantity: 18,
      threshold: 30,
      supplier: 'Bio Coop',
      categoryColor: 'emerald',
      image: ''
    },
    {
      id: 4,
      name: 'Eau Minérale 6x1.5L',
      sku: 'BOI-203',
      category: 'Boissons',
      quantity: 320,
      threshold: 80,
      supplier: 'Evian',
      categoryColor: 'cyan',
      image: ''
    },
    {
      id: 5,
      name: 'Yaourt Nature x12',
      sku: 'LAI-067',
      category: 'Produits laitiers',
      quantity: 42,
      threshold: 40,
      supplier: 'Danone',
      categoryColor: 'blue',
      image: ''
    },
    {
      id: 6,
      name: 'Pâtes Spaghetti 500g',
      sku: 'EPI-092',
      category: 'Épicerie',
      quantity: 220,
      threshold: 60,
      supplier: 'Barilla',
      categoryColor: 'yellow',
      image: ''
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    supplier: '',
    quantity: '',
    threshold: '',
    notes: '',
    image: ''
  });
  const [editFormData, setEditFormData] = useState({
    id: '',
    name: '',
    sku: '',
    category: '',
    supplier: '',
    quantity: '',
    threshold: '',
    notes: '',
    image: ''
  });

  const categoryColors = {
    'Produits laitiers': 'blue',
    'Boulangerie': 'amber',
    'Fruits & Légumes': 'emerald',
    'Boissons': 'cyan',
    'Épicerie': 'yellow',
    'Surgelés': 'purple'
  };

  const calculateStats = () => {
    let sufficient = 0;
    let limited = 0;
    let low = 0;

    products.forEach(product => {
      const percentage = (product.quantity / product.threshold) * 100;
      if (percentage >= 150) sufficient++;
      else if (percentage >= 100) limited++;
      else low++;
    });

    return { sufficient, limited, low };
  };

  const getStockLevel = (product) => {
    const percentage = (product.quantity / product.threshold) * 100;
    if (percentage >= 150) return { label: 'Suffisant', color: 'emerald', width: Math.min(percentage, 100) };
    if (percentage >= 100) return { label: 'Limite', color: 'orange', width: Math.min(percentage, 100) };
    return { label: 'Faible', color: 'red', width: percentage };
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData(prev => ({ ...prev, image: ev.target.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: products.length + 1,
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      quantity: parseInt(formData.quantity),
      threshold: parseInt(formData.threshold),
      supplier: formData.supplier,
      categoryColor: categoryColors[formData.category] || 'gray',
      image: formData.image
    };
    setProducts([...products, newProduct]);
    setIsModalOpen(false);
    setFormData({
      name: '',
      sku: '',
      category: '',
      supplier: '',
      quantity: '',
      threshold: '',
      notes: '',
      image: ''
    });
    showNotification('Produit ajouté avec succès !');
  };

  const handleProductClick = (product) => {
    setEditFormData({
      id: product.id,
      name: product.name,
      sku: product.sku,
      category: product.category,
      supplier: product.supplier,
      quantity: product.quantity,
      threshold: product.threshold,
      notes: product.notes || '',
      image: product.image
    });
    setIsEditModalOpen(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setEditFormData(prev => ({ ...prev, image: ev.target.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setEditFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProducts(products.map(p =>
      p.id === editFormData.id
        ? { ...p, ...editFormData, quantity: parseInt(editFormData.quantity), threshold: parseInt(editFormData.threshold) }
        : p
    ));
    setIsEditModalOpen(false);
    showNotification('Produit modifié avec succès !');
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const stats = calculateStats();

  const getCategoryColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      amber: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    };
    return colorMap[color] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  const getLevelColorClasses = (color) => {
    const colorMap = {
      emerald: { bg: 'bg-emerald-500', text: 'text-emerald-400' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-400' },
      red: { bg: 'bg-red-500', text: 'text-red-400' }
    };
    return colorMap[color] || { bg: 'bg-gray-500', text: 'text-gray-400' };
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 min-h-screen">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-emerald-500 text-slate-900 px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in-up">
          {notification}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-2">
            Stocks disponibles
          </h1>
          <p className="text-slate-400 text-base">
            Gérez l'inventaire de votre supermarché en temps réel
          </p>
        </div>

        {/* Barre de recherche et actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400">
              <Search size={20} strokeWidth={1.5} />
            </div>
            <input
              type="text"
              placeholder="Rechercher un produit, catégorie ou fournisseur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 rounded-xl"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-xl transition-all duration-300 font-medium shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105"
          >
            <Plus size={20} strokeWidth={1.5} />
            <span className="hidden sm:inline">Ajouter produit</span>
            <span className="sm:hidden">Ajouter</span>
          </button>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Stock suffisant</p>
                <p className="text-2xl font-semibold text-emerald-400">{stats.sufficient}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle size={24} strokeWidth={1.5} className="text-emerald-400" />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Stock limite</p>
                <p className="text-2xl font-semibold text-orange-400">{stats.limited}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <AlertTriangle size={24} strokeWidth={1.5} className="text-orange-400" />
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Stock faible</p>
                <p className="text-2xl font-semibold text-red-400">{stats.low}</p>
              </div>
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <AlertCircle size={24} strokeWidth={1.5} className="text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Tableau */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Quantité
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Niveau
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Fournisseur
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProducts.map((product) => {
                  const level = getStockLevel(product);
                  const levelColors = getLevelColorClasses(level.color);
                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {product.image && (
                            <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg border border-white/10" />
                          )}
                          <div>
                            <div className="font-medium text-white">{product.name}</div>
                            <div className="text-sm text-slate-400">SKU: {product.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${getCategoryColorClasses(product.categoryColor)}`}>
                          {product.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-white font-medium">{product.quantity} unités</div>
                        <div className="text-xs text-slate-400">Seuil: {product.threshold}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="w-full bg-slate-800 rounded-full h-2 mb-1.5">
                          <div
                            className={`${levelColors.bg} h-2 rounded-full transition-all duration-1000`}
                            style={{ width: `${level.width}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${levelColors.text}`}>
                          {level.label}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-300">{product.supplier}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal d'ajout */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed bg-black/50 top-0 right-0 bottom-0 left-0 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="bg-white/5 backdrop-blur-xl border border-emerald-500/20 rounded-2xl w-full max-w-2xl relative z-10 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                Ajouter un produit
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 text-slate-400 hover:text-white"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-emerald-400 mb-2">
                    Nom du produit
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ex: Lait Entier 1L"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-400 mb-2">
                    Référence (SKU)
                  </label>
                  <input
                    type="text"
                    name="sku"
                    required
                    value={formData.sku}
                    onChange={handleInputChange}
                    placeholder="Ex: LAI-001"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-emerald-400 mb-2">
                    Catégorie
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 appearance-none"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" className="text-slate-400">Sélectionner une catégorie</option>
                    <option className="text-slate-900 bg-white">Produits laitiers</option>
                    <option className="text-slate-900 bg-white">Boulangerie</option>
                    <option className="text-slate-900 bg-white">Fruits & Légumes</option>
                    <option className="text-slate-900 bg-white">Boissons</option>
                    <option className="text-slate-900 bg-white">Épicerie</option>
                    <option className="text-slate-900 bg-white">Surgelés</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-400 mb-2">
                    Fournisseur
                  </label>
                  <input
                    type="text"
                    name="supplier"
                    required
                    value={formData.supplier}
                    onChange={handleInputChange}
                    placeholder="Ex: Lactalis"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-emerald-400 mb-2">
                    Quantité actuelle
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    required
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="Ex: 450"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-400 mb-2">
                    Seuil d'alerte
                  </label>
                  <input
                    type="number"
                    name="threshold"
                    required
                    value={formData.threshold}
                    onChange={handleInputChange}
                    placeholder="Ex: 100"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-400 mb-2">
                  Notes (optionnel)
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Informations complémentaires..."
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 resize-none"
                />
              </div>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-sm font-medium text-emerald-400 mb-2">
                    Image du produit
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                  />
                  {formData.image && (
                    <img src={formData.image} alt="Aperçu" className="mt-2 w-20 h-20 object-cover rounded-lg border border-white/10" />
                  )}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-all duration-200 font-medium border border-white/10"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-lg transition-all duration-300 font-medium shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105"
                >
                  Ajouter le produit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal d'édition */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed bg-black/50 top-0 right-0 bottom-0 left-0 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          />
          <div className="bg-white/5 backdrop-blur-xl border border-emerald-500/20 rounded-2xl w-full max-w-2xl relative z-10 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                Modifier le produit
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 text-slate-400 hover:text-white"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-emerald-400 mb-2">
                    Nom du produit
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={editFormData.name}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-400 mb-2">
                    Référence (SKU)
                  </label>
                  <input
                    type="text"
                    name="sku"
                    required
                    value={editFormData.sku}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-emerald-400 mb-2">
                    Catégorie
                  </label>
                  <select
                    name="category"
                    required
                    value={editFormData.category}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 appearance-none"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="" className="text-slate-400">Sélectionner une catégorie</option>
                    <option className="text-slate-900 bg-white">Produits laitiers</option>
                    <option className="text-slate-900 bg-white">Boulangerie</option>
                    <option className="text-slate-900 bg-white">Fruits & Légumes</option>
                    <option className="text-slate-900 bg-white">Boissons</option>
                    <option className="text-slate-900 bg-white">Épicerie</option>
                    <option className="text-slate-900 bg-white">Surgelés</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-400 mb-2">
                    Fournisseur
                  </label>
                  <input
                    type="text"
                    name="supplier"
                    required
                    value={editFormData.supplier}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-emerald-400 mb-2">
                    Quantité actuelle
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    required
                    value={editFormData.quantity}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-emerald-400 mb-2">
                    Seuil d'alerte
                  </label>
                  <input
                    type="number"
                    name="threshold"
                    required
                    value={editFormData.threshold}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-400 mb-2">
                  Notes (optionnel)
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  value={editFormData.notes}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 resize-none"
                />
              </div>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-sm font-medium text-emerald-400 mb-2">
                    Image du produit
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                  />
                  {editFormData.image && (
                    <img src={editFormData.image} alt="Aperçu" className="mt-2 w-20 h-20 object-cover rounded-lg border border-white/10" />
                  )}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-all duration-200 font-medium border border-white/10"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-lg transition-all duration-300 font-medium shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105"
                >
                  Modifier le produit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}