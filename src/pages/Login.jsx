import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setIsFadingOut(true);
    
    setTimeout(() => {
      console.log('Navigation vers le tableau de bord...');
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Remember me:', rememberMe);
      // Navigation logic would go here
      // window.location.href = '/dashboard';
    }, 500);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1E2A5E 0%, #162047 50%, #1E2A5E 100%)' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .backdrop-blur-glass {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.08);
        }
        
        .glow-button:hover {
          box-shadow: 0 0 25px rgba(102, 204, 153, 0.6), 0 0 50px rgba(102, 204, 153, 0.3);
        }
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        
        .transition-page {
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        
        .fade-out {
          opacity: 0;
          transform: scale(0.95);
        }
      `}</style>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: '#66CC99' }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: '#66CC99' }}
        />
      </div>

      {/* Main container */}
      <div 
        className={`relative w-full max-w-md transition-page ${isFadingOut ? 'fade-out' : ''}`}
      >
        {/* Logo */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-block px-4 py-2 mb-4">
            <h1 
              className="text-3xl font-semibold tracking-tight text-white"
              style={{ letterSpacing: '-0.02em' }}
            >
              SuperMarket<span style={{ color: '#66CC99' }}>Manager</span>
            </h1>
          </div>
          <p className="text-white/60 text-sm font-light">
            Gérez votre supermarché efficacement
          </p>
        </div>

        {/* Login form */}
        <div 
          className="backdrop-blur-glass border border-white/10 rounded-2xl p-8 shadow-2xl animate-slide-up"
          style={{ 
            animationDelay: '0.2s', 
            opacity: 0, 
            animationFillMode: 'forwards' 
          }}
        >
          <h2 className="text-2xl font-semibold text-white mb-2 tracking-tight">
            Connexion
          </h2>
          <p className="text-white/50 text-sm mb-8 font-light">
            Accédez à votre tableau de bord
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email field */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-white/80"
              >
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="vous@exemple.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300"
                style={{
                  borderColor: emailFocused ? '#66CC99' : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: emailFocused ? '0 0 0 3px rgba(102, 204, 153, 0.1)' : 'none'
                }}
              />
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-white/80"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300"
                style={{
                  borderColor: passwordFocused ? '#66CC99' : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: passwordFocused ? '0 0 0 3px rgba(102, 204, 153, 0.1)' : 'none'
                }}
              />
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center text-sm text-white/60 cursor-pointer hover:text-white/80 transition-colors">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 mr-2 rounded"
                  style={{ accentColor: '#66CC99' }}
                />
                <span className="font-light">Se souvenir de moi</span>
              </label>
              <a 
                href="#" 
                className="text-sm font-light hover:text-white transition-colors"
                style={{ color: '#66CC99' }}
              >
                Mot de passe oublié ?
              </a>
            </div>

            {/* Submit button */}
           
            <button
              type="submit"
              className="w-full py-3.5 rounded-lg font-medium text-white transition-all duration-300 glow-button mt-6 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #66CC99 0%, #52B88A 100%)' }}
            >
              Se connecter
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-white/40 backdrop-blur-glass font-light">
                ou
              </span>
            </div>
          </div>

          {/* Alternative options */}
          <div className="text-center">
            <p className="text-sm text-white/50 font-light">
              Pas encore de compte ?{' '}
              <a 
                href="#" 
                className="font-medium hover:underline transition-colors"
                style={{ color: '#66CC99' }}
              >
                Créer un compte
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/30 text-xs font-light">
            © 2024 SuperMarket Manager. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}