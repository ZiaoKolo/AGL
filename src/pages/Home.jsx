import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  ArrowRight,
  PlayCircle,
  Package,
  TrendingUp,
  Users,
  UserCheck,
  Sparkles,
  Star,
  Calendar,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ShoppingBag,
  BarChart3,
} from "lucide-react";

export default function Home() {
  const starFieldRef = useRef(null);

  useEffect(() => {
    // Create star field
    if (starFieldRef.current) {
      for (let i = 0; i < 50; i++) {
        const star = document.createElement("div");
        star.className = "absolute bg-white rounded-full animate-twinkle";
        const size = Math.random() * 3;
        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 3 + "s";
        starFieldRef.current.appendChild(star);
      }
    }

    // Intersection Observer for fade-up animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-up");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-up").forEach((el) => {
      observer.observe(el);
    });

    // Smooth scroll
    const handleClick = (e) => {
      const href = e.target.closest("a")?.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.02); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(52, 211, 153, 0.3), 0 0 40px rgba(52, 211, 153, 0.2); }
          50% { box-shadow: 0 0 30px rgba(52, 211, 153, 0.5), 0 0 60px rgba(52, 211, 153, 0.3); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .animate-fade-up { animation: fade-up 0.8s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 3s infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s ease;
        }
        
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(52, 211, 153, 0.3);
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(52, 211, 153, 0.2);
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
          box-shadow: 0 10px 30px rgba(52, 211, 153, 0.3);
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          background: linear-gradient(135deg, #6ee7b7 0%, #34d399 100%);
          box-shadow: 0 15px 40px rgba(52, 211, 153, 0.5);
          transform: translateY(-2px);
        }
        
        .nav-link { position: relative; transition: color 0.3s ease; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #34d399, #10b981);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        
        .fade-up { opacity: 0; }
      `}</style>

      {/* Star Field Background */}
      <div
        ref={starFieldRef}
        className="absolute w-full h-full top-0 left-0 overflow-hidden pointer-events-none"
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <ShoppingCart
                  className="w-5 h-5 text-white"
                  strokeWidth={1.5}
                />
              </div>
              <span className="font-poppins text-xl font-semibold tracking-tight">
                SuperMarket Manager
              </span>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#accueil"
                className="nav-link text-sm font-medium text-white/90 hover:text-emerald-400"
              >
                Accueil
              </a>
              <a
                href="#fonctionnalites"
                className="nav-link text-sm font-medium text-white/70 hover:text-emerald-400"
              >
                Fonctionnalités
              </a>
              <a
                href="#contact"
                className="nav-link text-sm font-medium text-white/70 hover:text-emerald-400"
              >
                Contact
              </a>
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-all border border-white/20"
              >
                Connexion
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-all">
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="accueil"
        className="relative pt-32 pb-20 px-6 overflow-hidden"
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-emerald-400 font-medium">
                  Solution de gestion moderne
                </span>
              </div>

              <h1 className="font-poppins text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Gérez votre supermarché
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                  {" "}
                  en toute simplicité
                </span>
              </h1>

              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                SuperMarket Manager vous offre une solution complète pour
                optimiser la gestion de vos stocks, ventes, employés et clients.
                Gagnez du temps et augmentez votre rentabilité.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="btn-primary px-8 py-4 rounded-xl text-white font-semibold flex items-center gap-3 group">
                  Commencer gratuitement
                  <ArrowRight
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    strokeWidth={1.5}
                  />
                </button>
                <button className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 transition-all flex items-center gap-3">
                  <PlayCircle className="w-5 h-5" strokeWidth={1.5} />
                  Voir la démo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                <div>
                  <div className="font-poppins text-3xl font-bold text-emerald-400 mb-1">
                    500+
                  </div>
                  <div className="text-sm text-white/60">Supermarchés</div>
                </div>
                <div>
                  <div className="font-poppins text-3xl font-bold text-emerald-400 mb-1">
                    98%
                  </div>
                  <div className="text-sm text-white/60">Satisfaction</div>
                </div>
                <div>
                  <div className="font-poppins text-3xl font-bold text-emerald-400 mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-white/60">Support</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div
              className="fade-up relative"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="animate-float relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 p-8 flex items-center justify-center">
                    <div className="w-full h-full relative">
                      {/* Store Building */}
                      <div className="absolute inset-0 flex flex-col">
                        {/* Roof */}
                        <div className="h-1/6 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-t-3xl relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-8 bg-white/90 rounded-lg flex items-center justify-center shadow-lg">
                            <span className="font-poppins text-emerald-600 font-bold text-xs">
                              MARKET
                            </span>
                          </div>
                        </div>

                        {/* Store Front */}
                        <div className="flex-1 bg-gradient-to-b from-slate-700 to-slate-800 relative">
                          <div className="grid grid-cols-3 gap-4 p-6 h-full">
                            <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center">
                              <Package
                                className="w-8 h-8 text-emerald-400 mb-2"
                                strokeWidth={1.5}
                              />
                              <div className="text-xs text-white/60 text-center">
                                Stocks
                              </div>
                            </div>
                            <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center">
                              <TrendingUp
                                className="w-8 h-8 text-emerald-400 mb-2"
                                strokeWidth={1.5}
                              />
                              <div className="text-xs text-white/60 text-center">
                                Ventes
                              </div>
                            </div>
                            <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center">
                              <Users
                                className="w-8 h-8 text-emerald-400 mb-2"
                                strokeWidth={1.5}
                              />
                              <div className="text-xs text-white/60 text-center">
                                Équipe
                              </div>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-24 bg-gradient-to-t from-emerald-500/30 to-transparent rounded-t-3xl border-t-4 border-emerald-400" />
                        </div>
                      </div>

                      {/* Floating Icons */}
                      <div className="absolute top-8 -right-4 w-16 h-16 glass-card rounded-2xl flex items-center justify-center animate-glow">
                        <ShoppingBag
                          className="w-8 h-8 text-emerald-400"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div
                        className="absolute bottom-8 -left-4 w-16 h-16 glass-card rounded-2xl flex items-center justify-center animate-glow"
                        style={{ animationDelay: "1s" }}
                      >
                        <BarChart3
                          className="w-8 h-8 text-emerald-400"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-glow" />
                <div
                  className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl animate-pulse-glow"
                  style={{ animationDelay: "1.5s" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fonctionnalites" className="py-20 px-6 relative">
        <div className="container mx-auto">
          {/* Section Header */}
          <div
            className="text-center mb-16 fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <Sparkles
                className="w-4 h-4 text-emerald-400"
                strokeWidth={1.5}
              />
              <span className="text-sm text-emerald-400 font-medium">
                Fonctionnalités
              </span>
            </div>
            <h2 className="font-poppins text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Une solution complète pour gérer chaque aspect de votre
              supermarché avec efficacité
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Package,
                title: "Gestion des Stocks",
                desc: "Suivez vos inventaires en temps réel, recevez des alertes automatiques et optimisez vos réapprovisionnements.",
                color: "blue",
                delay: "0.3s",
              },
              {
                icon: TrendingUp,
                title: "Suivi des Ventes",
                desc: "Analysez vos performances commerciales avec des tableaux de bord détaillés et des rapports personnalisés.",
                color: "emerald",
                delay: "0.4s",
              },
              {
                icon: Users,
                title: "Gestion d'Équipe",
                desc: "Organisez les horaires, suivez les performances et gérez les rôles de vos employés facilement.",
                color: "purple",
                delay: "0.5s",
              },
              {
                icon: UserCheck,
                title: "Fidélisation Client",
                desc: "Créez des programmes de fidélité, suivez les préférences clients et boostez vos ventes.",
                color: "amber",
                delay: "0.6s",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="glass-card rounded-3xl p-8 fade-up"
                style={{ animationDelay: feature.delay }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 flex items-center justify-center mb-6 shadow-lg shadow-${feature.color}-500/30`}
                >
                  <feature.icon
                    className="w-8 h-8 text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-poppins text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  {feature.desc}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium hover:gap-3 transition-all"
                >
                  En savoir plus
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div
            className="glass-card rounded-3xl p-12 lg:p-16 relative overflow-hidden fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400 rounded-full blur-3xl" />
            </div>

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-amber-400"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>

                <blockquote className="font-poppins text-2xl lg:text-3xl font-semibold mb-8 leading-relaxed">
                  "SuperMarket Manager a transformé notre façon de gérer notre
                  supermarché. Nos ventes ont augmenté de 35% en seulement 6
                  mois."
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-poppins text-xl font-bold shadow-lg shadow-emerald-500/30">
                    ML
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Marie Lefebvre</div>
                    <div className="text-white/60 text-sm">
                      Directrice, Carrefour Express Lyon
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "+35%", label: "Augmentation des ventes" },
                  { value: "-50%", label: "Temps de gestion" },
                  { value: "+28%", label: "Satisfaction client" },
                  { value: "100%", label: "ROI en 4 mois" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 rounded-2xl p-6 border border-white/10"
                  >
                    <div className="text-emerald-400 font-poppins text-4xl font-bold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div
            className="glass-card rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-400/10 to-emerald-500/10" />

            <div className="relative">
              <h2 className="font-poppins text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Prêt à transformer votre supermarché ?
              </h2>
              <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
                Rejoignez plus de 500 supermarchés qui ont choisi SuperMarket
                Manager pour optimiser leur gestion
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <button className="btn-primary px-10 py-5 rounded-xl text-white font-semibold text-lg flex items-center gap-3 group">
                  Essai gratuit 30 jours
                  <ArrowRight
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    strokeWidth={1.5}
                  />
                </button>
                <button className="px-10 py-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-lg border border-white/20 transition-all flex items-center gap-3">
                  <Calendar className="w-5 h-5" strokeWidth={1.5} />
                  Planifier une démo
                </button>
              </div>

              <p className="text-sm text-white/50 mt-6">
                Aucune carte bancaire requise • Installation en 5 minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="py-12 px-6 border-t border-white/10 relative"
      >
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <ShoppingCart
                    className="w-5 h-5 text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="font-poppins text-xl font-semibold tracking-tight">
                  SuperMarket Manager
                </span>
              </div>
              <p className="text-white/60 text-sm mb-6 max-w-md">
                La solution complète pour gérer votre supermarché avec
                efficacité et simplicité. Augmentez votre rentabilité dès
                aujourd'hui.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-emerald-500/20 border border-white/10 flex items-center justify-center transition-all"
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-white/60">
                {["Fonctionnalités", "Tarifs", "Sécurité", "Mises à jour"].map(
                  (item, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="hover:text-emerald-400 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-white/60">
                {["Documentation", "Guides", "API", "Contact"].map(
                  (item, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="hover:text-emerald-400 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">
              © 2024 SuperMarket Manager. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm text-white/50">
              {["Confidentialité", "Conditions", "Cookies"].map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="hover:text-emerald-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
