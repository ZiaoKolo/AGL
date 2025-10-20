import React, { useState } from "react";
import {
  FiTrendingUp,
  FiShoppingCart,
  FiAlertCircle,
  FiTrash2,
  FiPrinter,
  FiSave,
  FiUser,
  FiPercent,
  FiCheck,
  FiClock,
  FiCalendar,
  FiX,
  FiDownload,
  FiMail,
  FiEye,
  FiPackage,
  FiSettings,
  FiCreditCard,
  FiDollarSign,
  FiPhone,
  FiFileText,
  FiLock,
  FiShield,
  FiEdit,
} from "react-icons/fi";
import { LuTicket } from "react-icons/lu";
import { CiShoppingBasket } from "react-icons/ci";
import { 
  BsBoxSeam, 
  BsTruck, 
  BsTag,
  BsCash,
  BsWallet,
  BsPhone,
  BsReceipt
} from "react-icons/bs";
import { BiBarcode } from "react-icons/bi";
import { 
  MdLocationOn,
  MdInventory,
  MdCategory,
  MdEvent,
  MdWarning
} from "react-icons/md";

export default function CaissePage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Eau minérale 1.5L",
      category: "Boissons",
      price: 0.55,
      qty: 2,
    },
    {
      id: 2,
      name: "Biscuits chocolat",
      category: "Epicerie",
      price: 1.95,
      qty: 1,
    },
  ]);

  const [activeModal, setActiveModal] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [amountReceived, setAmountReceived] = useState(0);
  const [cancelReason, setCancelReason] = useState("");

  const [products] = useState([
    {
      id: 1,
      name: "Eau minérale 1.5L",
      category: "Boissons",
      price: 0.55,
      stock: 842,
      image: "https://i.pinimg.com/736x/d4/8e/31/d48e31fdb5dd9494bbcbb1ddce40d5b6.jpg",
    },
    {
      id: 2,
      name: "Biscuits chocolat",
      category: "Epicerie",
      price: 1.95,
      stock: 312,
      image: "https://i.pinimg.com/1200x/b0/2d/bf/b02dbf1c4967c4581c49235d5789ca24.jpg",
    },
    {
      id: 3,
      name: "Pommes (kg)",
      category: "Fruits & Légumes",
      price: 2.4,
      stock: 0,
      image: "https://www.collinsdictionary.com/images/full/apple_158989157.jpg",
    },
  ]);

  const [transactions] = useState([
    {
      time: "10:14",
      client: "Marc L.",
      articles: 7,
      total: 38.4,
      payment: "CB",
    },
    {
      time: "10:26",
      client: "Emma D.",
      articles: 3,
      total: 12.9,
      payment: "Espèces",
    },
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = discountAmount;
  const total = subtotal - discount;

  const updateQty = (id, newQty) => {
    if (newQty <= 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, qty: newQty } : item
        )
      );
    }
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      updateQty(product.id, existingItem.qty + 1);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          qty: 1,
        },
      ]);
    }
  };

  const applyDiscount = () => {
    setActiveModal(null);
  };

  const processPayment = () => {
    setActiveModal("payment-success");
    setTimeout(() => {
      setCartItems([]);
      setDiscountAmount(0);
      setAmountReceived(0);
      setActiveModal(null);
    }, 2000);
  };

  const cancelTicket = () => {
    setCartItems([]);
    setDiscountAmount(0);
    setActiveModal(null);
  };

  const saveDraft = () => {
    setActiveModal("draft");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-6">
      {/* Modals */}
      {activeModal === "export" && (
        <ExportModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "add-product" && (
        <AddProductModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "discount" && (
        <DiscountModal
          discountAmount={discountAmount}
          setDiscountAmount={setDiscountAmount}
          onApply={applyDiscount}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === "payment" && (
        <PaymentModal
          total={total}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          amountReceived={amountReceived}
          setAmountReceived={setAmountReceived}
          onConfirm={processPayment}
          onClose={() => setActiveModal(null)}
          cartItems={cartItems}
        />
      )}
      {activeModal === "cancel" && (
        <CancelTicketModal
          cancelReason={cancelReason}
          setCancelReason={setCancelReason}
          onConfirm={cancelTicket}
          onClose={() => setActiveModal(null)}
          total={total}
          cartItems={cartItems}
        />
      )}
      {activeModal === "print" && (
        <PrintTicketModal
          total={total}
          cartItems={cartItems}
          onClose={() => setActiveModal(null)}
          onConfirm={processPayment}
        />
      )}
      {activeModal === "draft" && (
        <DraftModal 
          onClose={() => setActiveModal(null)}
          cartItems={cartItems}
          total={total}
        />
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-6">
        <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm">
          <p className="text-gray-500 text-xs md:text-sm mb-2 font-semibold">CA (Jour)</p>
          <p className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">12 480 FCFA</p>
          <div className="flex items-center gap-2 bg-[#0EA569] px-2 md:px-3 py-1 rounded-full w-full">
            <FiTrendingUp className="w-3 h-3 md:w-4 md:h-4 text-white" />
            <span className="text-white text-xs md:text-sm font-semibold">
              +4.2% vs hier
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm">
          <p className="text-gray-500 text-xs md:text-sm mb-2 font-semibold">Tickets</p>
          <p className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">1 026</p>
          <div className="flex items-center gap-2 text-teal-600 text-xs md:text-sm bg-green-100 rounded-2xl md:rounded-3xl px-2 md:px-3 py-1 w-full">
            <LuTicket className="font-semibold w-3 h-3 md:w-4 md:h-4" />
            <span className="font-semibold">Par geste: 86</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm">
          <p className="text-gray-500 text-xs md:text-sm mb-2 font-semibold">
            Panier moyen
          </p>
          <p className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">24,30 FCFA</p>
          <div className="flex items-center gap-2 text-teal-600 text-xs md:text-sm bg-green-100 rounded-2xl md:rounded-3xl px-2 md:px-3 py-1 w-full">
            <CiShoppingBasket className="text-green-700 w-4 h-4 md:w-5 md:h-5" />
            <span className="text-gray-600 text-xs md:text-sm font-medium">—</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm">
          <p className="text-gray-500 text-xs md:text-sm mb-2 font-semibold">
            Taux de remise
          </p>
          <p className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">6.8%</p>
          <div className="flex items-center gap-2 bg-yellow-50 px-2 md:px-3 py-1 rounded-full w-full">
            <FiAlertCircle className="w-3 h-3 md:w-4 md:h-4 text-yellow-600" />
            <span className="text-yellow-600 text-xs md:text-sm font-semibold">
              À surveiller
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Left: Catalogue */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <h2 className="font-semibold text-gray-900 text-sm md:text-base">Catalogue / Scan</h2>
              <input
                type="text"
                placeholder="Scanner EAN ou rechercher..."
                className="sm:ml-auto px-3 py-2 border border-gray-300 rounded-lg font-semibold text-xs md:text-sm w-full sm:w-64"
              />
              <button 
                onClick={() => setActiveModal("add-product")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-semibold hover:bg-green-600"
              >
                + Ajouter
              </button>
            </div>

            <div className="flex gap-4 md:gap-8 mb-4 md:mb-6 text-xs md:text-sm text-gray-600 overflow-x-auto">
              <span className="font-semibold whitespace-nowrap">Rayon: Tous</span>
              <span className="font-semibold whitespace-nowrap">Promo: Toutes</span>
              <button 
                onClick={() => setActiveModal("export")}
                className="ml-auto text-blue-600 font-semibold hover:text-blue-700"
              >
                <FiDownload className="inline w-4 h-4 mr-1" />
                Exporter
              </button>
            </div>

            <div className="overflow-x-auto rounded-t-2xl md:rounded-t-3xl">
              <table className="w-full min-w-[500px]">
                <thead className="bg-green-50 border border-gray-100">
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 md:py-3 px-2 text-xs md:text-sm font-semibold text-teal-700">
                      Produit
                    </th>
                    <th className="text-left py-2 md:py-3 px-2 text-xs md:text-sm font-semibold text-teal-700">
                      Prix
                    </th>
                    <th className="text-left py-2 md:py-3 px-2 text-xs md:text-sm font-semibold text-teal-700">
                      Stock
                    </th>
                    <th className="text-right py-2 md:py-3 px-2 text-xs md:text-sm font-semibold text-teal-700">
                      Ajouter
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100">
                      <td className="py-3 md:py-4 px-2 md:px-6 text-xs md:text-sm text-gray-900 flex items-center gap-2 md:gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-md border border-gray-200"
                        />
                        <span className="truncate">{product.name}</span>
                      </td>
                      <td className="py-3 md:py-4 px-2 text-xs md:text-sm text-teal-600 font-medium whitespace-nowrap">
                        {product.price.toFixed(2)} FCFA
                      </td>
                      <td className="py-3 md:py-4 px-2 text-xs md:text-sm text-gray-600 font-semibold">
                        {product.stock || "—"}
                      </td>
                      <td className="py-3 md:py-4 px-2 text-right">
                        <button 
                          onClick={() => addToCart(product)}
                          disabled={product.stock === 0}
                          className={`text-xs md:text-sm font-semibold p-2 px-2 md:px-3 rounded-2xl md:rounded-3xl whitespace-nowrap ${
                            product.stock === 0
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "text-teal-600 bg-green-50 hover:bg-green-100 hover:text-teal-700"
                          }`}
                        >
                          {product.stock === 0 ? "Rupture" : "Ajouter"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Ticket en cours */}
        <div>
          <div className="bg-white rounded-[30px] shadow-sm p-4 md:p-6">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                    Ticket en cours
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm text-gray-600 font-semibold">Client:</p>
                  <p className="text-xs md:text-sm font-semibold text-gray-900">Anonyme</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 font-semibold">Caisse #2</p>
            </div>

            <div className="overflow-x-auto mb-4 rounded-t-2xl md:rounded-t-3xl">
              <table className="w-full text-xs md:text-sm min-w-[280px]">
                <thead>
                  <tr className="bg-green-50 border-b border-gray-200 rounded-t-lg">
                    <th className="text-left py-2 px-3 md:px-2 font-semibold text-teal-700">
                      Article
                    </th>
                    <th className="text-center py-2 px-3 md:px-2 font-semibold text-teal-700">
                      Qté
                    </th>
                    <th className="text-right py-2 px-3 md:px-2 font-semibold text-teal-700">
                      Prix
                    </th>
                    <th className="text-right py-2 px-3 md:px-2 font-semibold text-teal-700">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-2 px-1 md:px-2 text-gray-900 text-xs md:text-sm">{item.name}</td>
                      <td className="py-2 px-1 md:px-2">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            updateQty(item.id, parseInt(e.target.value) || 0)
                          }
                          className="w-8 md:w-10 text-center border border-gray-300 rounded px-1 py-1 text-xs md:text-sm"
                        />
                      </td>
                      <td className="py-2 px-1 md:px-2 text-gray-900 text-right text-xs md:text-sm">
                        {item.price.toFixed(2)} FCFA
                      </td>
                      <td className="py-2 px-1 md:px-2 text-gray-900 text-right font-medium text-xs md:text-sm">
                        {((item.price * item.qty).toFixed(2))} FCFA
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-2 bg-green-50 rounded p-3 mb-4 text-xs md:text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total</span>
                <span className="text-gray-900 font-medium">
                  {subtotal.toFixed(2)} FCFA
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Remise</span>
                <span className="text-gray-900 font-medium">
                  {discount.toFixed(2)} FCFA
                </span>
              </div>
              <div className="flex justify-between font-bold border-t border-teal-200 pt-2 text-gray-900">
                <span>Total TTC</span>
                <span>{total.toFixed(2)} FCFA</span>
              </div>
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => setActiveModal("discount")}
                className="w-full bg-green-50 text-teal-700 py-2 rounded-[20px] text-xs md:text-sm font-semibold hover:bg-teal-100 flex items-center justify-center gap-2"
              >
                <FiPercent className="w-4 h-4" /> Appliquer remise
              </button>
              <button className="w-full bg-teal-50 text-teal-700 py-2 rounded-[20px] text-xs md:text-sm font-semibold hover:bg-teal-100 flex items-center justify-center gap-2">
                <FiUser className="w-4 h-4" /> Associer fidélité
              </button>
              <button 
                onClick={() => setActiveModal("payment")}
                disabled={cartItems.length === 0}
                className={`w-full py-2 rounded-[20px] text-xs md:text-sm font-semibold flex items-center justify-center gap-2 ${
                  cartItems.length === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#0b79d0] text-white hover:bg-blue-700"
                }`}
              >
                <FiCheck className="w-4 h-4" /> Encaisser
              </button>
              <button 
                onClick={() => setActiveModal("cancel")}
                disabled={cartItems.length === 0}
                className={`w-full py-2 rounded-[20px] text-xs md:text-sm font-semibold flex items-center justify-center gap-2 ${
                  cartItems.length === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#dc2626] text-white hover:bg-red-700"
                }`}
              >
                <FiTrash2 className="w-4 h-4" /> Annuler ticket
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
        {/* Transaction History */}
        <div className="lg:col-span-2 bg-white rounded-[30px] shadow-sm p-4 md:p-6">
          <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">
            Historique tickets (aujourd'hui)
          </h3>
          <div className="flex items-center gap-4 md:gap-8 mb-3 md:mb-4 text-xs md:text-sm text-gray-600 overflow-x-auto">
            <span className="whitespace-nowrap font-semibold">Caisse #2</span>
            <span className="whitespace-nowrap font-semibold">Statut: Tous</span>
          </div>

          <div className="overflow-x-auto mb-4 rounded-t-2xl md:rounded-t-3xl">
            <table className="w-full text-xs md:text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-200 bg-green-50">
                  <th className="text-left py-2 px-2 md:py-3 font-semibold text-green-700">
                    Heure
                  </th>
                  <th className="text-left py-2 px-2 md:py-3 font-semibold text-green-700">
                    Client
                  </th>
                  <th className="text-left py-2 px-2 md:py-3 font-semibold text-green-700">
                    Articles
                  </th>
                  <th className="text-left py-2 md:py-3 px-2 font-semibold text-green-700">
                    Total
                  </th>
                  <th className="text-left py-2 px-2 md:py-3 font-semibold text-green-700">
                    Paiement
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-2 md:py-3 text-gray-900 font-semibold">{tx.time}</td>
                    <td className="py-2 md:py-3 text-gray-900 font-semibold">{tx.client}</td>
                    <td className="py-2 md:py-3 text-gray-600 font-semibold">{tx.articles}</td>
                    <td className="py-2 md:py-3 text-gray-900 font-medium">
                      {tx.total.toFixed(2)} FCFA
                    </td>
                    <td className="py-2 md:py-3 text-gray-600 font-semibold">{tx.payment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cash Status */}
        <div className="bg-white rounded-[30px] shadow-sm p-4 md:p-6">
          <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">
            Etat de caisse & sessions
          </h3>

          <div className="bg-green-50 rounded-[20px] p-3 mb-3 md:mb-4 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <FiClock className="text-green-700 w-4 h-4" />
              <p className="text-gray-600 font-semibold">Session en cours</p>
            </div>
            <p className="text-gray-600 text-xs font-semibold">Ouverture à 08:00</p>
            <p className="text-gray-500 text-xs mt-1 font-semibold">Agent: Clara</p>
            <p className="text-right text-base md:text-lg font-bold text-gray-900 mt-2">
              Solde: <span className="text-green-700">250 FCFA</span>
            </p>
          </div>

          <div className="bg-gray-50 rounded-[20px] p-3 mb-3 md:mb-4">
            <div className="flex items-center gap-2">
              <FiCalendar className="text-gray-600 w-4 h-4" />
              <p className="text-xs md:text-sm text-gray-600 font-semibold">Dernière clôture</p>
            </div>
            <p className="text-xs md:text-sm text-gray-900 font-semibold">Hier 21:05 • Ecart:</p>
            <div className="flex justify-between items-center mt-2">
              <button className="bg-[#f59e0b] text-gray-900 px-2 py-1 rounded text-xs font-semibold hover:bg-yellow-500">
                Vérifier
              </button>
              <p className="text-xs md:text-sm text-gray-900 font-bold">-2,10 FCFA</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setActiveModal("print")}
              className="flex-1 bg-green-50 text-teal-700 py-2 rounded-[20px] text-xs font-semibold hover:bg-teal-100 flex items-center justify-center gap-2"
            >
              <FiPrinter className="w-4 h-4" /> Imprimer ticket
            </button>
            <button 
              onClick={saveDraft}
              disabled={cartItems.length === 0}
              className={`flex-1 py-2 rounded-[20px] text-xs font-semibold flex items-center justify-center gap-2 ${
                cartItems.length === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#0b79d0] text-white hover:bg-blue-700"
              }`}
            >
              <FiSave className="w-4 h-4" /> Enregistrer brouillon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal Components
function ExportModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [format, setFormat] = useState("csv");

  return (
  <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Exporter les données</h2>
              <p className="text-sm text-gray-500">Étape suivante après « Exporter » ▸ Supermarché ▸ Reporting</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="flex gap-2 mb-6">
            <button 
              onClick={() => setStep(1)}
              className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${step === 1 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              <FiSettings className="w-4 h-4" /> Paramètres
            </button>
            <button 
              onClick={() => setStep(2)}
              className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${step === 2 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              <FiLock className="w-4 h-4" /> Confidentialité
            </button>
            <button 
              onClick={() => setStep(3)}
              className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${step === 3 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              <FiCheck className="w-4 h-4" /> Confirmation
            </button>
          </div>

          {step === 1 && (
            <>
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Portée de l'export</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-xl p-4">
                    <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <BsBoxSeam className="w-4 h-4" /> Type de données
                    </p>
                    <select className="w-full border rounded-lg p-2 text-sm">
                      <option>Ventes • Stocks • RH...</option>
                    </select>
                  </div>
                  <div className="border rounded-xl p-4">
                    <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" /> Période
                    </p>
                    <input type="text" placeholder="JJ/MM/AAAA — JJ/MM/AAAA" className="w-full border rounded-lg p-2 text-sm" />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Format et structure</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <button 
                    onClick={() => setFormat("csv")} 
                    className={`border rounded-xl p-4 ${format === "csv" ? "border-blue-500 bg-blue-50" : ""}`}
                  >
                    <p className="font-semibold text-sm flex items-center gap-2">
                      <FiFileText className="w-4 h-4" /> CSV
                    </p>
                    <p className="text-xs text-gray-500">Séparateur:</p>
                  </button>
                  <button 
                    onClick={() => setFormat("json")} 
                    className={`border rounded-xl p-4 ${format === "json" ? "border-blue-500 bg-blue-50" : ""}`}
                  >
                    <p className="font-semibold text-sm flex items-center gap-2">
                      <FiFileText className="w-4 h-4" /> JSON
                    </p>
                    <p className="text-xs text-gray-500">Hiérarchique</p>
                  </button>
                  <button 
                    onClick={() => setFormat("xlsx")} 
                    className={`border rounded-xl p-4 ${format === "xlsx" ? "border-blue-500 bg-blue-50" : ""}`}
                  >
                    <p className="font-semibold text-sm flex items-center gap-2">
                      <FiFileText className="w-4 h-4" /> XLSX
                    </p>
                    <p className="text-xs text-gray-500">Feuilles multiples</p>
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-3">Destination</h3>
                <div className="grid grid-cols-3 gap-4">
                  <button className="border rounded-xl p-4 bg-green-50 border-green-500">
                    <p className="font-semibold text-sm flex items-center gap-2">
                      <FiDownload className="w-4 h-4" /> Téléchargement
                    </p>
                  </button>
                  <button className="border rounded-xl p-4">
                    <p className="font-semibold text-sm flex items-center gap-2">
                      <FiMail className="w-4 h-4" /> Envoi S3/FTP
                    </p>
                  </button>
                  <button className="border rounded-xl p-4">
                    <p className="font-semibold text-sm flex items-center gap-2">
                      <FiClock className="w-4 h-4" /> Planifier
                    </p>
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-between pt-4 border-t">
            <button 
              onClick={onClose} 
              className="px-6 py-2 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 flex items-center gap-2"
            >
              <FiX className="w-4 h-4" /> Annuler
            </button>
            <div className="flex gap-2">
              <button className="px-6 py-2 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 flex items-center gap-2">
                <FiEye className="w-4 h-4" /> Prévisualiser
              </button>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 flex items-center gap-2">
                <FiDownload className="w-4 h-4" /> Générer le report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddProductModal({ onClose }) {
  const [step, setStep] = useState(1);

  return (
  <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Ajouter un élément</h2>
              <p className="text-sm text-gray-500">Étape suivante après « Ajouter » ▸ Supermarché ▸ Catalogue/Stocks</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="flex gap-2 mb-6">
            <button 
              onClick={() => setStep(1)}
              className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${step === 1 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              <FiFileText className="w-4 h-4" /> Informations
            </button>
            <button 
              onClick={() => setStep(2)}
              className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${step === 2 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              <BsTag className="w-4 h-4" /> Prix & Promo
            </button>
            <button 
              onClick={() => setStep(3)}
              className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${step === 3 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              <FiCheck className="w-4 h-4" /> Validation
            </button>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold mb-4">Informations produit</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2 flex items-center gap-2">
                    <BiBarcode className="w-4 h-4" /> Code barre / EAN
                  </label>
                  <input type="text" placeholder="Ex: 3017680561234" className="w-full border rounded-lg p-2 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2 flex items-center gap-2">
                    <FiEdit className="w-4 h-4" /> Nom du produit
                  </label>
                  <input type="text" placeholder="Ex: Lait demi-écrémé 1L" className="w-full border rounded-lg p-2 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2 flex items-center gap-2">
                    <BsTruck className="w-4 h-4" /> Fournisseur
                  </label>
                  <select className="w-full border rounded-lg p-2 text-sm">
                    <option>Sélectionner</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2 flex items-center gap-2">
                    <BsBoxSeam className="w-4 h-4" /> Poids/Volume
                  </label>
                  <input type="text" placeholder="1 L • 500 g..." className="w-full border rounded-lg p-2 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2 flex items-center gap-2">
                    <MdCategory className="w-4 h-4" /> Catégorie
                  </label>
                  <select className="w-full border rounded-lg p-2 text-sm">
                    <option>Frais • Epicerie • ...</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2 flex items-center gap-2">
                    <FiPackage className="w-4 h-4" /> Conditionnement
                  </label>
                  <select className="w-full border rounded-lg p-2 text-sm">
                    <option>Unité • Carton (x12)</option>
                  </select>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-semibold mb-3">Stocks & emplacements</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-2 flex items-center gap-2">
                      <MdInventory className="w-4 h-4" /> Magasin
                    </label>
                    <select className="w-full border rounded-lg p-2 text-xs">
                      <option>Entrepôt • Sélection</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-2 flex items-center gap-2">
                      <MdLocationOn className="w-4 h-4" /> Rayon
                    </label>
                    <input type="text" placeholder="Ex: Laitages" className="w-full border rounded-lg p-2 text-xs" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-2">Stock Initial</label>
                    <input type="number" placeholder="Ex: 250 unités" className="w-full border rounded-lg p-2 text-xs" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold mb-4">Prix & promotion</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2 flex items-center gap-2">
                    <FiDollarSign className="w-4 h-4" /> Prix de vente
                  </label>
                  <input type="number" placeholder="Ex: 1.19" className="w-full border rounded-lg p-2 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2 flex items-center gap-2">
                    <FiPercent className="w-4 h-4" /> Promotion
                  </label>
                  <input type="text" placeholder="-10% • 2+1 offert..." className="w-full border rounded-lg p-2 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2 flex items-center gap-2">
                    <MdEvent className="w-4 h-4" /> Période Promo
                  </label>
                  <input type="text" placeholder="JJ/MM — JJ/MM" className="w-full border rounded-lg p-2 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2 flex items-center gap-2">
                    <BsTag className="w-4 h-4" /> Affichage
                  </label>
                  <input type="text" placeholder="Tête de gondole" className="w-full border rounded-lg p-2 text-sm" />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t mt-6">
            <button 
              onClick={onClose} 
              className="px-6 py-2 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 flex items-center gap-2"
            >
              <FiX className="w-4 h-4" /> Annuler
            </button>
            <div className="flex gap-2">
              <button className="px-6 py-2 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50">
                Enregistrer le brouillon
              </button>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 flex items-center gap-2">
                <FiCheck className="w-4 h-4" /> Créer et publier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiscountModal({ discountAmount, setDiscountAmount, onApply, onClose }) {
  return (
  <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FiPercent className="w-6 h-6 text-green-600" />
            Appliquer une remise
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Montant de la remise (FCFA)
            </label>
            <input
              type="number"
              value={discountAmount}
              onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
              className="w-full border-2 border-gray-300 rounded-xl p-3 text-lg font-semibold"
              placeholder="0.00"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setDiscountAmount(0.5)}
              className="border-2 border-green-500 text-green-600 rounded-xl p-2 font-semibold hover:bg-green-50"
            >
              0.50
            </button>
            <button
              onClick={() => setDiscountAmount(1)}
              className="border-2 border-green-500 text-green-600 rounded-xl p-2 font-semibold hover:bg-green-50"
            >
              1.00
            </button>
            <button
              onClick={() => setDiscountAmount(2)}
              className="border-2 border-green-500 text-green-600 rounded-xl p-2 font-semibold hover:bg-green-50"
            >
              2.00
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={onApply}
            className="flex-1 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 flex items-center justify-center gap-2"
          >
            <FiCheck className="w-5 h-5" />
            Appliquer
          </button>
        </div>
      </div>
    </div>
  );
}

function PaymentModal({ total, paymentMethod, setPaymentMethod, amountReceived, setAmountReceived, onConfirm, onClose, cartItems }) {
  const change = amountReceived - total;

  return (
  <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Encaissement</h2>
              <p className="text-sm text-gray-500">Étape suivante après « Encaisser » ▸ Caisse ▸ Paiement</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="flex gap-2 mb-6">
            <button className="flex-1 py-3 rounded-xl font-semibold bg-green-500 text-white flex items-center justify-center gap-2">
              <FiShoppingCart className="w-4 h-4" /> Panier
            </button>
            <button className="flex-1 py-3 rounded-xl font-semibold bg-blue-500 text-white flex items-center justify-center gap-2">
              <FiCreditCard className="w-4 h-4" /> Paiement
            </button>
            <button className="flex-1 py-3 rounded-xl font-semibold bg-gray-100 text-gray-600 flex items-center justify-center gap-2">
              <FiCheck className="w-4 h-4" /> Confirmation
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FiShoppingCart className="w-5 h-5" />
                Détails du panier
              </h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x{item.qty}</span>
                    <span className="font-semibold">{(item.price * item.qty).toFixed(2)} FCFA</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Sous-total</h3>
              <div className="bg-green-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sous-total</span>
                  <span className="font-semibold">{total.toFixed(2)} FCFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Remise</span>
                  <span className="font-semibold">0.00 FCFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>TVA</span>
                  <span className="font-semibold">0.00 FCFA</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-green-200 pt-2">
                  <span>Total TTC</span>
                  <span>{total.toFixed(2)} FCFA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>À régler</span>
                  <span className="font-bold text-lg">{total.toFixed(2)} FCFA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-3">Mode de paiement</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`border-2 rounded-xl p-4 font-semibold flex flex-col items-center gap-2 ${
                  paymentMethod === "card" ? "border-green-500 bg-green-50" : "border-gray-300"
                }`}
              >
                <FiCreditCard className="w-6 h-6" />
                <span className="text-sm">Carte</span>
                <span className="text-xs text-gray-500">CB • Sans contact</span>
              </button>
              <button
                onClick={() => setPaymentMethod("cash")}
                className={`border-2 rounded-xl p-4 font-semibold flex flex-col items-center gap-2 ${
                  paymentMethod === "cash" ? "border-green-500 bg-green-50" : "border-gray-300"
                }`}
              >
                <BsCash className="w-6 h-6" />
                <span className="text-sm">Espèces</span>
                <span className="text-xs text-gray-500">Rendu de monnaie</span>
              </button>
              <button
                onClick={() => setPaymentMethod("mobile")}
                className={`border-2 rounded-xl p-4 font-semibold flex flex-col items-center gap-2 ${
                  paymentMethod === "mobile" ? "border-green-500 bg-green-50" : "border-gray-300"
                }`}
              >
                <BsPhone className="w-6 h-6" />
                <span className="text-sm">Mobile / Sans contact</span>
                <span className="text-xs text-gray-500">Apple Pay / GPay</span>
              </button>
            </div>
          </div>

          {paymentMethod === "cash" && (
            <div className="mt-6">
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Montant reçu
              </label>
              <input
                type="number"
                value={amountReceived}
                onChange={(e) => setAmountReceived(parseFloat(e.target.value) || 0)}
                className="w-full border-2 border-gray-300 rounded-xl p-3 text-lg font-semibold mb-3"
                placeholder="0.00"
              />
              {change > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm font-semibold">Reste à payer</p>
                  <p className="text-2xl font-bold text-yellow-700">{change.toFixed(2)} FCFA</p>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 mt-6 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 flex items-center gap-2"
            >
              <FiX className="w-4 h-4" />
              Annuler
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 flex items-center gap-2">
              <FiClock className="w-4 h-4" />
              Mettre en attente
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 flex items-center justify-center gap-2"
            >
              <FiCheck className="w-5 h-5" />
              Encaisser maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CancelTicketModal({ cancelReason, setCancelReason, onConfirm, onClose, total, cartItems }) {
  const [note, setNote] = React.useState("");
  return (
  <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MdWarning className="w-6 h-6 text-orange-500" />
            Annuler le ticket
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-orange-800 flex items-center gap-2">
            <FiAlertCircle className="w-5 h-5" />
            Cette action va annuler le ticket en cours. Les articles seront réintégrés au stock et l'opération sera journalisée.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <BsReceipt className="w-5 h-5" />
            Résumé du ticket
          </h3>
          <div className="flex justify-between text-sm mb-2">
            <span>Articles</span>
            <span className="font-semibold">{cartItems.length}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Total TTC</span>
            <span className="font-semibold">{total.toFixed(2)} FCFA</span>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Caisse 04 • Agent: M. Dupont • Ticket #000742
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Motif d'annulation</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => setCancelReason("error")}
              className={`border-2 rounded-xl p-4 font-semibold flex items-center gap-2 ${
                cancelReason === "error" ? "border-orange-500 bg-orange-50" : "border-gray-300"
              }`}
            >
              <FiAlertCircle className="w-5 h-5" />
              <div className="text-left">
                <p className="text-sm">Erreur de saisie</p>
                <p className="text-xs text-gray-500">Prix/quantité</p>
              </div>
            </button>
            <button
              onClick={() => setCancelReason("customer")}
              className={`border-2 rounded-xl p-4 font-semibold flex items-center gap-2 ${
                cancelReason === "customer" ? "border-orange-500 bg-orange-50" : "border-gray-300"
              }`}
            >
              <FiUser className="w-5 h-5" />
              <div className="text-left">
                <p className="text-sm">Client s'est rétracté</p>
                <p className="text-xs text-gray-500">Panier abandonné</p>
              </div>
            </button>
            <button
              onClick={() => setCancelReason("technical")}
              className={`border-2 rounded-xl p-4 font-semibold flex items-center gap-2 ${
                cancelReason === "technical" ? "border-orange-500 bg-orange-50" : "border-gray-300"
              }`}
            >
              <FiSettings className="w-5 h-5" />
              <div className="text-left">
                <p className="text-sm">Anomalie technique</p>
                <p className="text-xs text-gray-500">TPE/Imprimante</p>
              </div>
            </button>
          </div>

          <label className="text-sm font-semibold text-gray-700 block mb-2">
            Ajouter une note (facultatif)
          </label>
          <textarea
            className="w-full border-2 border-gray-300 rounded-xl p-3 text-sm"
            rows="3"
            placeholder="Informations complémentaires..."
            value={note}
            onChange={e => setNote(e.target.value)}
          ></textarea>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold mb-3">Conséquences</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <FiPackage className="w-4 h-4 text-green-600" />
              <span>Stock: Réintégré automatiquement</span>
            </div>
            <div className="flex items-center gap-2">
              <FiUser className="w-4 h-4 text-blue-600" />
              <span>Fidélité: Points annulés</span>
            </div>
            <div className="flex items-center gap-2">
              <FiFileText className="w-4 h-4 text-orange-600" />
              <span>Journal: Action signée par l'agent</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            <FiX className="w-5 h-5" />
            Revenir à l'encaissement
          </button>
          <button
            onClick={() => onConfirm(note)}
            className="flex-1 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 flex items-center justify-center gap-2"
          >
            <FiCheck className="w-5 h-5" />
            Confirmer l'annulation
          </button>
        </div>
      </div>
    </div>
  );
}

function PrintTicketModal({ total, cartItems, onClose, onConfirm }) {
  const [printFormat, setPrintFormat] = useState("thermal");
  const [sendEmail, setSendEmail] = useState(false);

  return (
  <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FiPrinter className="w-6 h-6 text-green-600" />
                Imprimer le ticket
              </h2>
              <p className="text-sm text-gray-500">Étape finale • Choix du support et options d'envoi</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <BsReceipt className="w-5 h-5" />
              Résumé de la transaction
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Articles</span>
                <span className="font-semibold">{cartItems.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total TTC</span>
                <span className="font-semibold">{total.toFixed(2)} FCFA</span>
              </div>
              <div className="flex justify-between">
                <span>Mode de paiement</span>
                <span className="font-semibold">À sélectionner</span>
              </div>
              <div className="text-xs text-gray-500 border-t border-gray-200 pt-2 mt-2">
                Caisse 04 • Agent: M. Dupont • Ticket #000742
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Sélection du mode de paiement</h3>
            <div className="grid grid-cols-3 gap-3">
              <button className="border-2 border-gray-300 rounded-xl p-4 font-semibold flex flex-col items-center gap-2 hover:border-green-500 hover:bg-green-50">
                <FiCreditCard className="w-6 h-6" />
                <span className="text-sm">Carte bancaire</span>
                <span className="text-xs text-gray-500">CB / Visa / Mastercard</span>
              </button>
              <button className="border-2 border-gray-300 rounded-xl p-4 font-semibold flex flex-col items-center gap-2 hover:border-green-500 hover:bg-green-50">
                <BsCash className="w-6 h-6" />
                <span className="text-sm">Espèces</span>
                <span className="text-xs text-gray-500">Rendu de monnaie</span>
              </button>
              <button className="border-2 border-gray-300 rounded-xl p-4 font-semibold flex flex-col items-center gap-2 hover:border-green-500 hover:bg-green-50">
                <BsPhone className="w-6 h-6" />
                <span className="text-sm">Mobile / Sans contact</span>
                <span className="text-xs text-gray-500">Apple Pay / GPay</span>
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <FiPrinter className="w-5 h-5" />
              Options d'édition / envoi du ticket
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPrintFormat("thermal")}
                className={`border-2 rounded-xl p-4 font-semibold flex flex-col items-center gap-2 ${
                  printFormat === "thermal" ? "border-green-500 bg-green-50" : "border-gray-300"
                }`}
              >
                <FiPrinter className="w-6 h-6" />
                <span className="text-sm">Imprimer sur TPV</span>
                <span className="text-xs text-gray-500">Thermique 58/80mm</span>
              </button>
              <button
                onClick={() => setPrintFormat("email")}
                className={`border-2 rounded-xl p-4 font-semibold flex flex-col items-center gap-2 ${
                  printFormat === "email" ? "border-green-500 bg-green-50" : "border-gray-300"
                }`}
              >
                <FiMail className="w-6 h-6" />
                <span className="text-sm">Envoyer par e-mail</span>
                <span className="text-xs text-gray-500">Renseigner e-mail client</span>
              </button>
              <button
                onClick={() => setPrintFormat("sms")}
                className={`border-2 rounded-xl p-4 font-semibold flex flex-col items-center gap-2 ${
                  printFormat === "sms" ? "border-green-500 bg-green-50" : "border-gray-300"
                }`}
              >
                <FiPhone className="w-6 h-6" />
                <span className="text-sm">Envoyer par SMS</span>
                <span className="text-xs text-gray-500">Lien PDF sécurisé</span>
              </button>
            </div>
          </div>

          {printFormat === "email" && (
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 block mb-2 flex items-center gap-2">
                <FiMail className="w-4 h-4" />
                E-mail
              </label>
              <input
                type="email"
                placeholder="client@email.com"
                className="w-full border-2 border-gray-300 rounded-xl p-3 text-sm"
              />
            </div>
          )}

          {printFormat === "sms" && (
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 block mb-2 flex items-center gap-2">
                <FiPhone className="w-4 h-4" />
                Téléphone
              </label>
              <input
                type="tel"
                placeholder="+33 6 00 00 00 00"
                className="w-full border-2 border-gray-300 rounded-xl p-3 text-sm"
              />
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <div className="text-sm">
                <p className="font-semibold">Conformité & mentions légales</p>
                <p className="text-gray-600 text-xs mt-1">
                  Horodatage, SIRET, TVA, signature agent
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-4 mb-6 text-sm text-gray-600">
            <p className="font-semibold mb-1">Prévisualisation</p>
            <p className="text-xs">Un aperçu sera journalisé avec la transaction</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 flex items-center gap-2"
            >
              <FiX className="w-4 h-4" />
              Revenir à l'encaissement
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 flex items-center gap-2">
              <FiSave className="w-4 h-4" />
              Enregistrer et continuer plus tard
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 flex items-center justify-center gap-2"
            >
              <FiPrinter className="w-5 h-5" />
              Finaliser le paiement & imprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DraftModal({ onClose, cartItems, total }) {
  return (
  <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FiSave className="w-6 h-6 text-green-600" />
              Brouillon enregistré
            </h2>
            <p className="text-sm text-gray-500">
              Votre transaction a été enregistrée en tant que brouillon. Vous pourrez la reprendre plus tard depuis la file des brouillons.
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FiCheck className="w-5 h-5 text-green-600" />
            <p className="font-semibold text-green-800">Enregistrement réussi</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <BsReceipt className="w-5 h-5" />
            Détails du brouillon
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Référence</span>
              <span className="font-semibold">#DR-000742</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Créé le</span>
              <span className="font-semibold">12:41 • Aujourd'hui</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Caisse</span>
              <span className="font-semibold">04</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Agent</span>
              <span className="font-semibold">M. Dupont</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FiShoppingCart className="w-5 h-5" />
            Résumé de la transaction (brouillon)
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Articles</span>
              <span className="font-semibold">{cartItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total TTC</span>
              <span className="font-semibold">{total.toFixed(2)} FCFA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Mode de paiement</span>
              <span className="font-semibold">Non défini</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Client</span>
              <span className="font-semibold">Invité</span>
            </div>
          </div>
          <div className="border-t border-blue-200 pt-3 text-xs text-gray-600">
            <p className="font-semibold mb-1">Aperçu du ticket (brouillon)</p>
            <p className="mb-2">Mentions légales: SIRET • TVA • Horodatage</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <FiSettings className="w-5 h-5" />
            Actions rapides
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <button className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
              <FiCheck className="w-4 h-4" />
              <span>Reprendre l'encaissement</span>
            </button>
            <button className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
              <FiFileText className="w-4 h-4" />
              <span>Ouvrir la file des brouillons</span>
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-6 text-xs text-gray-600">
          <p className="flex items-center gap-2">
            <FiShield className="w-4 h-4" />
            Le brouillon est sécurisé et journalisé.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            <FiX className="w-5 h-5" />
            Retour à l'encaissement
          </button>
          <button className="flex-1 py-3 bg-green-50 text-green-700 border border-green-200 rounded-xl font-semibold hover:bg-green-100 flex items-center justify-center gap-2">
            <FiFileText className="w-5 h-5" />
            Voir les brouillons
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            <FiCheck className="w-5 h-5" />
            Finaliser maintenant
          </button>
        </div>
      </div>
    </div>
  );
}