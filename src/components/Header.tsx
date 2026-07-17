import React, { useState } from 'react';
import { Menu, X, LogIn, Trophy, LogOut, User } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenAuthModal?: () => void;
  user: { email: string; name: string } | null;
  onLogout: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Header({ activeSection, setActiveSection, onOpenAuthModal, user, onLogout, isDark, toggleTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'BERANDA' },
    { id: 'pertandingan', label: 'PERTANDINGAN' },
    { id: 'grup', label: 'GRUP' },
    { id: 'bracket', label: 'BRACKET' },
    { id: 'statistik', label: 'STATISTIK' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    
    if (id === 'beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Smooth scroll to element minus sticky header offset
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#030712]/90 backdrop-blur-md border-b border-gray-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a 
            href="https://shortq.net/login-kapsul4d"
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-brand/40 shadow-[0_0_12px_rgba(173,255,47,0.25)] group-hover:border-brand group-hover:scale-105 transition-all duration-300 flex-shrink-0 bg-black">
              <img 
                src="https://ik.imagekit.io/srri8ez3b/kapsul4dlogo?tr=cm-extract,x-144,y-390,w-800,h-800" 
                alt="Kapsul Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative h-7 flex-shrink-0 overflow-hidden">
              <img 
                src="https://ik.imagekit.io/srri8ez3b/tekskapsul4d?tr=cm-extract,x-240,y-402,w-1080,h-197" 
                alt="KAPSUL4D" 
                className="h-full w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-semibold tracking-wider hover:text-brand transition-all duration-200 relative py-2 ${
                  activeSection === item.id ? 'text-brand' : 'text-gray-300'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand rounded-full shadow-[0_0_8px_rgba(173,255,47,0.8)]" />
                )}
              </button>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="hidden md:flex items-center gap-4 relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 bg-gray-900 border border-gray-800 hover:border-brand/40 px-4 py-2 rounded-xl transition-all duration-200 select-none cursor-pointer"
                >
                  <div className="w-6 h-6 bg-brand text-black rounded-full flex items-center justify-center font-bold text-xs">
                    {user.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold text-white tracking-wide">{user.name}</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2.5 w-48 bg-gray-950 border border-gray-800 rounded-xl shadow-2xl p-2 animate-scaleUp z-50">
                    <div className="px-3 py-2 border-b border-gray-900 mb-1 text-left">
                      <span className="block text-[10px] font-mono text-gray-500 uppercase">Email Akun</span>
                      <span className="block text-xs font-semibold text-white truncate">{user.email}</span>
                    </div>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        onLogout();
                      }}
                      className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      LOGOUT
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="https://shortq.net/login-kapsul4d"
                className="flex items-center gap-2 bg-brand text-black font-bold font-display text-sm px-6 py-2.5 rounded-lg shadow-[0_4px_14px_rgba(173,255,47,0.4)] hover:bg-brand-hover hover:shadow-[0_4px_20px_rgba(173,255,47,0.6)] active:scale-95 transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                LOGIN
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-brand hover:bg-gray-800/40 rounded-lg transition-all duration-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#030712] border-b border-gray-800 animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold tracking-wide transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-brand/10 text-brand border-l-2 border-brand'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-brand'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 pb-2 border-t border-gray-800/80 px-4">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-8 h-8 bg-brand text-black rounded-full flex items-center justify-center font-bold text-sm">
                      {user.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-white">{user.name}</span>
                      <span className="block text-xs text-gray-400 truncate max-w-[200px]">{user.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="flex items-center justify-center gap-2 w-full bg-red-950/40 border border-red-900/60 text-red-400 font-bold font-display py-3 rounded-lg hover:bg-red-950/80 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    LOGOUT
                  </button>
                </div>
              ) : (
                <a
                  href="https://shortq.net/login-kapsul4d"
                  className="flex items-center justify-center gap-2 w-full bg-brand text-black font-bold font-display py-3 rounded-lg shadow-lg hover:bg-brand-hover transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  LOGIN
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
