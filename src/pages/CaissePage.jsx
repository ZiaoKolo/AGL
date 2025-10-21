import React, { useState, useEffect } from 'react';
import { Search, BarChart, ShoppingCart, Percent, CreditCard, Pause, DollarSign, User, X, Minus, Plus, Trash2, Check, ChevronRight, Banknote, Smartphone, Printer } from 'lucide-react';

// Produits simulés avec SKU ajouté
const products = [
  { code: '3245678901', sku: '3245678901', name: 'Pain de mie', price: 2.50, category: 'Boulangerie', stock: 45, image: 'https://via.placeholder.com/40x40?text=Pain' },
  { code: '3245678902', sku: '3245678902', name: 'Lait entier 1L', price: 1.20, category: 'Produits laitiers', stock: 89, image: 'https://via.placeholder.com/40x40?text=Lait' },
  { code: '3245678903', sku: '3245678903', name: 'Coca-Cola 1.5L', price: 2.80, category: 'Boissons', stock: 67, image: 'https://via.placeholder.com/40x40?text=Coca' },
  { code: '3245678904', sku: '3245678904', name: 'Poulet entier', price: 8.50, category: 'Viande', stock: 23, image: 'https://via.placeholder.com/40x40?text=Poulet' },
  { code: '3245678905', sku: '3245678905', name: 'Bananes (kg)', price: 2.30, category: 'Fruits', stock: 120, image: 'https://via.placeholder.com/40x40?text=Banane' },
  { code: '3245678906', sku: '3245678906', name: 'Riz 1kg', price: 3.50, category: 'Épicerie', stock: 78, image: 'https://via.placeholder.com/40x40?text=Riz' },
  { code: '3245678907', sku: '3245678907', name: 'Huile tournesol 1L', price: 4.20, category: 'Épicerie', stock: 54, image: 'https://via.placeholder.com/40x40?text=Huile' },
  { code: '3245678908', sku: '3245678908', name: 'Tomates (kg)', price: 3.80, category: 'Légumes', stock: 92, image: 'https://via.placeholder.com/40x40?text=Tomate' },
  { code: '3245678909', sku: '3245678909', name: 'Yaourt nature x4', price: 2.90, category: 'Produits laitiers', stock: 61, image: 'https://via.placeholder.com/40x40?text=Yaourt' },
  { code: '3245678910', sku: '3245678910', name: 'Pâtes 500g', price: 1.50, category: 'Épicerie', stock: 103, image: 'https://via.placeholder.com/40x40?text=Pates' }
];

// Clients fidélité simulés
const fidelityClients = {
  '0749950512': { name: 'Monsieur Dupont', card: '0749950512', points: 800 },
  '0153979792': { name: 'Madame Koné', card: '0153979792', points: 1200 },
  '0500158502': { name: 'Monsieur Yao', card: '0500158502', points: 450 }
};

export default function CaisseApp() {
  const [cart, setCart] = useState([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [fidelityClient, setFidelityClient] = useState(null);
  const [transactionNumber, setTransactionNumber] = useState(1001);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [productSearchInput, setProductSearchInput] = useState('');
  const [fidelityCardInput, setFidelityCardInput] = useState('');
  const [scanValue, setScanValue] = useState('');
  
  // Modals
  const [showProductModal, setShowProductModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [showFidelityModal, setShowFidelityModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Clock update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'F1') {
        e.preventDefault();
        setShowProductModal(true);
      }
      if (e.key === 'F2') {
        e.preventDefault();
        setShowPromoModal(true);
      }
      if (e.key === 'F3') {
        e.preventDefault();
        setShowFidelityModal(true);
      }
      if (e.key === 'F9') {
        e.preventDefault();
        if (cart.length > 0) setShowPaymentModal(true);
      }
      if (e.key === 'Escape') {
        closeAllModals();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [cart.length]);

  const closeAllModals = () => {
    setShowProductModal(false);
    setShowPromoModal(false);
    setShowFidelityModal(false);
    setShowPaymentModal(false);
    setShowSuccessModal(false);
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.code === product.code);
    if (existing) {
      setCart(cart.map(item => 
        item.code === product.code 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (index, change) => {
    const newCart = [...cart];
    newCart[index].quantity += change;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const clearCart = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
      setCart([]);
      setDiscountPercent(0);
      setFidelityClient(null);
    }
  };

  const handleScan = (e) => {
    e.preventDefault();
    const code = scanValue.trim();
    if (!code) return;
    
    const found = products.find(
      (p) => p.sku === code || p.code === code
    );
    
    if (found) {
      addToCart(found);
      setScanValue('');
    } else {
      alert('Produit non trouvé');
    }
  };

  const applyPromo = (percent) => {
    setDiscountPercent(percent);
    setShowPromoModal(false);
    alert(`Remise de ${percent}% appliquée`);
  };

  const applyFidelity = () => {
    const client = fidelityClients[fidelityCardInput.trim()];
    if (client) {
      setFidelityClient(client);
      setShowFidelityModal(false);
      setFidelityCardInput('');
      alert('Carte de fidélité appliquée');
    } else {
      alert('Carte non trouvée');
    }
  };

  const processPayment = (method) => {
    setShowPaymentModal(false);
    setTimeout(() => {
      setTransactionNumber(prev => prev + 1);
      setShowSuccessModal(true);
    }, 500);
  };

  const newTransaction = () => {
    setCart([]);
    setDiscountPercent(0);
    setFidelityClient(null);
    setShowSuccessModal(false);
  };

  const suspendTransaction = () => {
    if (cart.length === 0) {
      alert('Aucune transaction en cours');
      return;
    }
    if (window.confirm('Suspendre la transaction actuelle ?')) {
      alert('Transaction suspendue avec succès');
      newTransaction();
    }
  };

  // Calculs
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const fidelityAmount = fidelityClient && fidelityClient.points >= 100 
    ? Math.min(fidelityClient.points / 100, subtotal * 0.1) 
    : 0;
  const total = subtotal - discountAmount - fidelityAmount;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearchInput.toLowerCase()) || 
    p.category.toLowerCase().includes(productSearchInput.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-white mb-1">Caisse N°3</h1>
              <p className="text-emerald-200/70 text-sm">Caissier: Sarah Kouamé</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-2">
              <span className="text-emerald-400 font-medium">
                {currentTime.toLocaleTimeString('fr-FR')}
              </span>
            </div>
            <button 
              onClick={() => alert(`Rapport de caisse\n\nTransactions: ${transactionNumber - 1001}`)}
              className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 rounded-xl px-4 py-2.5 text-white transition-all duration-300"
            >
              <BarChart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          
          {/* Colonne gauche : Catalogue produits + scan */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-4 md:p-6 mb-6">
              <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
                <input
                  type="text"
                  placeholder="Scanner EAN ou saisir le code-barres..."
                  value={scanValue}
                  onChange={(e) => setScanValue(e.target.value)}
                  className="px-3 py-2 border border-white/10 bg-white/5 text-white placeholder-slate-400 rounded-lg font-medium text-xs md:text-sm w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                />
                <button
                  type="submit"
                  className="bg-emerald-500/80 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-emerald-500/30"
                >
                  Scanner / Ajouter
                </button>
              </form>

              <div className="overflow-x-auto rounded-lg">
                <table className="w-full min-w-[500px]">
                  <thead className="border-b border-white/10 bg-white/5">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                        Produit
                      </th>
                      <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                        Prix
                      </th>
                      <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="text-right py-3 px-4 text-xs md:text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                        Ajouter
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.map((product) => (
                      <tr
                        key={product.code}
                        className="hover:bg-white/5 transition-colors duration-200 cursor-pointer"
                      >
                        <td className="py-3 px-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded-lg border border-white/10"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-white">{product.name}</div>
                            <div className="text-sm text-slate-400">SKU: {product.sku}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-emerald-300 font-semibold">
                          {product.price.toFixed(2)} FCFA
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-300 font-medium">
                          {product.stock}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            className="text-emerald-400 text-xs md:text-sm font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl hover:bg-emerald-500/20 hover:text-white transition-all duration-200"
                            onClick={() => addToCart(product)}
                            type="button"
                          >
                            Ajouter
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Colonne droite : Panier et paiement */}
          <div>
            {/* Panier */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Articles scannés</h2>
                <button 
                  onClick={clearCart}
                  className="text-red-400 hover:text-red-300 text-sm font-medium transition-all"
                >
                  Vider le panier
                </button>
              </div>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-white/40">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Aucun article scanné</p>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/30 rounded-xl p-4 flex items-center gap-4 transition-all">
                      <div className="flex-1">
                        <div className="text-white font-medium">{item.name}</div>
                        <div className="text-white/50 text-sm">{item.category}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateQuantity(index, -1)}
                          className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-white transition-all"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(index, 1)}
                          className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center text-white transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-400 font-semibold">{(item.price * item.quantity).toFixed(2)} FCFA</div>
                        <div className="text-white/50 text-sm">{item.price.toFixed(2)} FCFA/u</div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(index)}
                        className="text-red-400 hover:text-red-300 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Actions rapides */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button 
                onClick={() => setShowPromoModal(true)}
                className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 rounded-xl p-4 text-center transition-all"
              >
                <Percent className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <span className="text-white text-sm">Promo</span>
              </button>
              <button 
                onClick={() => setShowFidelityModal(true)}
                className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 rounded-xl p-4 text-center transition-all"
              >
                <CreditCard className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <span className="text-white text-sm">Fidélité</span>
              </button>
              <button 
                onClick={suspendTransaction}
                className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-emerald-400/30 rounded-xl p-4 text-center transition-all"
              >
                <Pause className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <span className="text-white text-sm">Suspendre</span>
              </button>
            </div>

            {/* Résumé */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">Résumé</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-white/70">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)} FCFA</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Remise ({discountPercent}%)</span>
                    <span>-{discountAmount.toFixed(2)} FCFA</span>
                  </div>
                )}
                {fidelityAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Fidélité</span>
                    <span>-{fidelityAmount.toFixed(2)} FCFA</span>
                  </div>
                )}
                <div className="h-px bg-white/10"></div>
                <div className="flex justify-between text-2xl font-bold text-white">
                  <span>Total</span>
                  <span>{total.toFixed(2)} FCFA</span>
                </div>
                <div className="text-white/50 text-sm text-right">{itemCount} article(s)</div>
              </div>

              <button 
                onClick={() => cart.length > 0 && setShowPaymentModal(true)}
                disabled={cart.length === 0}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-lg hover:shadow-emerald-500/50 text-slate-900 py-4 rounded-xl font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Encaisser
              </button>
            </div>

            {/* Info client */}
            {fidelityClient && (
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{fidelityClient.name}</h3>
                    <p className="text-emerald-200/60 text-sm">Carte N° {fidelityClient.card}</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-white/70 text-sm mb-1">Points disponibles</div>
                  <div className="text-emerald-400 text-2xl font-bold">{fidelityClient.points}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Recherche Produit */}
      {showProductModal && (
        <Modal onClose={() => setShowProductModal(false)}>
          <h3 className="text-xl font-semibold text-white mb-4">Rechercher un produit</h3>
          <input 
            type="text" 
            value={productSearchInput}
            onChange={(e) => setProductSearchInput(e.target.value)}
            placeholder="Nom du produit..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 mb-4 focus:outline-none focus:border-emerald-400"
          />
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredProducts.map(p => (
              <button 
                key={p.code}
                onClick={() => { addToCart(p); setShowProductModal(false); setProductSearchInput(''); }}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/30 rounded-xl p-4 flex items-center gap-3 text-left transition-all"
              >
                <div className="flex-1">
                  <div className="text-white font-medium">{p.name}</div>
                  <div className="text-white/50 text-sm">{p.category}</div>
                </div>
                <div className="text-emerald-400 font-semibold">{p.price.toFixed(2)} FCFA</div>
              </button>
            ))}
          </div>
        </Modal>
      )}

      {/* Modal Promotion */}
      {showPromoModal && (
        <Modal onClose={() => setShowPromoModal(false)}>
          <h3 className="text-xl font-semibold text-white mb-4">Appliquer une promotion</h3>
          <div className="space-y-3">
            {[5, 10, 15, 20].map(percent => (
              <button 
                key={percent}
                onClick={() => applyPromo(percent)}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/30 rounded-xl p-4 text-left transition-all"
              >
                <div className="text-emerald-400 font-semibold mb-1">Remise {percent}%</div>
                <div className="text-white/60 text-sm">Sur le total du panier</div>
              </button>
            ))}
          </div>
        </Modal>
      )}

      {/* Modal Fidélité */}
      {showFidelityModal && (
        <Modal onClose={() => setShowFidelityModal(false)}>
          <h3 className="text-xl font-semibold text-white mb-4">Carte de fidélité</h3>
          <input 
            type="text" 
            value={fidelityCardInput}
            onChange={(e) => setFidelityCardInput(e.target.value)}
            placeholder="Numéro de carte ou téléphone..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 mb-4 focus:outline-none focus:border-emerald-400"
            onKeyDown={(e) => e.key === 'Enter' && applyFidelity()}
          />
          <button 
            onClick={applyFidelity}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 py-3 rounded-xl font-semibold transition-all"
          >
            Valider
          </button>
        </Modal>
      )}

      {/* Modal Paiement */}
      {showPaymentModal && (
        <Modal onClose={() => setShowPaymentModal(false)}>
          <h3 className="text-xl font-semibold text-white mb-4">Mode de paiement</h3>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-4">
            <div className="text-white/70 text-sm mb-1">Montant à payer</div>
            <div className="text-3xl font-bold text-emerald-400">{total.toFixed(2)} FCFA</div>
          </div>
          <div className="space-y-3">
            <PaymentOption 
              icon={<CreditCard className="w-6 h-6" />}
              title="Carte bancaire"
              subtitle="CB, Visa, Mastercard"
              onClick={() => processPayment('Carte bancaire')}
            />
            <PaymentOption 
              icon={<Banknote className="w-6 h-6" />}
              title="Espèces"
              subtitle="Paiement en liquide"
              onClick={() => processPayment('Espèces')}
            />
            <PaymentOption 
              icon={<Smartphone className="w-6 h-6" />}
              title="Mobile Money"
              subtitle="Orange Money, MTN, Moov"
              onClick={() => processPayment('Mobile Money')}
            />
          </div>
        </Modal>
      )}

      {/* Modal Succès */}
      {showSuccessModal && (
        <Modal onClose={newTransaction}>
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Paiement réussi</h3>
            <p className="text-white/60 mb-6">La transaction a été effectuée avec succès</p>
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <div className="text-white/70 text-sm mb-1">Reçu N°</div>
              <div className="text-emerald-400 font-mono font-bold">#{transactionNumber}</div>
            </div>
            <button 
              onClick={() => alert('Impression du reçu en cours...')}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 py-3 rounded-xl font-semibold mb-3 transition-all flex items-center justify-center gap-2"
            >
              <Printer className="w-5 h-5" />
              Imprimer le reçu
            </button>
            <button 
              onClick={newTransaction}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl font-medium transition-all"
            >
              Nouvelle transaction
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800/90 backdrop-blur-lg border border-white/10 rounded-2xl p-6 w-full max-w-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
}

function PaymentOption({ icon, title, subtitle, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/30 rounded-xl p-4 flex items-center gap-3 text-left transition-all group"
    >
      <div className="text-emerald-400">{icon}</div>
      <div className="flex-1">
        <div className="text-white font-medium">{title}</div>
        <div className="text-white/50 text-sm">{subtitle}</div>
      </div>
      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-emerald-400 transition-all" />
    </button>
  );
}