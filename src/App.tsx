import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Matches from './components/Matches';
import GroupStage from './components/GroupStage';
import RoadToFinal from './components/RoadToFinal';
import StatisticsAndPlayers from './components/StatisticsAndPlayers';
import Footer from './components/Footer';
import { LogIn, HelpCircle, KeyRound, Mail, X } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('beranda');
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authEmail, setAuthEmail] = useState('anjelaliem09@gmail.com');
  const [authPassword, setAuthPassword] = useState('password123');
  const [authError, setAuthError] = useState('');

  // Matches control state from header/hero menus
  const [matchesTab, setMatchesTab] = useState<'JADWAL' | 'PREDIKSI'>('JADWAL');
  const [showAllMatches, setShowAllMatches] = useState(false);
  const [viewMode, setViewMode] = useState<string | null>(null);

  const isDark = true;

  useEffect(() => {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const toggleTheme = () => {};

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setViewMode(params.get('view'));
  }, []);

  // Active section tracker on scroll
  useEffect(() => {
    const sections = ['beranda', 'pertandingan', 'grup', 'bracket', 'statistik'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // offset for nav height

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail) {
      setAuthError('Email wajib diisi.');
      return;
    }
    if (!authPassword) {
      setAuthError('Password wajib diisi.');
      return;
    }

    // Successfully log in
    const nickname = authEmail.split('@')[0];
    setUser({
      email: authEmail,
      name: nickname.charAt(0).toUpperCase() + nickname.slice(1)
    });
    setAuthModalOpen(false);
    setAuthError('');
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Helper smooth scroll triggers passed to hero or quick menus
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  if (viewMode === 'bracket') {
    return (
      <div className="min-h-screen bg-[#030712] text-gray-200 antialiased selection:bg-brand selection:text-black py-8">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RoadToFinal />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-gray-200 antialiased selection:bg-brand selection:text-black">
      
      {/* Header */}
      <Header 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        user={user}
        onLogout={handleLogout}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero 
          onScheduleClick={() => {
            setMatchesTab('JADWAL');
            setShowAllMatches(true);
            scrollTo('pertandingan');
          }}
          onPredictionClick={() => {
            setMatchesTab('PREDIKSI');
            setShowAllMatches(true);
            scrollTo('pertandingan');
          }}
          onGroupsClick={() => scrollTo('grup')}
          onBracketClick={() => {
            scrollTo('bracket');
          }}
          onStatsClick={() => scrollTo('statistik')}
        />

        {/* Schedule / Matches Section */}
        <Matches 
          activeTab={matchesTab}
          setActiveTab={setMatchesTab}
          showAll={showAllMatches}
          setShowAll={setShowAllMatches}
        />

        {/* Group Stage Tables */}
        <GroupStage />

        {/* Bracket / Road To Final */}
        <RoadToFinal />

        {/* Statistics, Banner and Top Players */}
        <StatisticsAndPlayers />
      </main>

      {/* Footer & Newsletter */}
      <Footer />

      {/* Auth Modal overlay */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-gray-950 border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-left">
            
            {/* Corner Close */}
            <button 
              onClick={() => {
                setAuthModalOpen(false);
                setAuthError('');
              }}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white hover:bg-gray-900 border border-transparent hover:border-gray-800 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title / Brand header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">⚽</span>
                <span className="font-display font-black text-lg tracking-wider text-white">
                  KAPSUL<span className="text-brand">4D</span>
                </span>
              </div>
              <h3 className="font-display font-black text-xl text-white">
                Masuk ke Akun Anda
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Koneksikan email untuk menyimpan prediksi skor piala dunia anda.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-400 font-mono tracking-wider">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-600" />
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(e) => {
                      setAuthEmail(e.target.value);
                      setAuthError('');
                    }}
                    placeholder="nama@email.com"
                    className="w-full bg-gray-900 border border-gray-800 focus:border-brand/40 text-xs text-white pl-10 pr-4 py-3.5 rounded-xl outline-none transition-all placeholder:text-gray-700"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-gray-400 font-mono tracking-wider">
                    PASSWORD
                  </label>
                  <a href="#" className="text-[10px] text-brand hover:underline font-semibold">Lupa Password?</a>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3.5 w-4 h-4 text-gray-600" />
                  <input
                    type="password"
                    value={authPassword}
                    onChange={(e) => {
                      setAuthPassword(e.target.value);
                      setAuthError('');
                    }}
                    placeholder="••••••••"
                    className="w-full bg-gray-900 border border-gray-800 focus:border-brand/40 text-xs text-white pl-10 pr-4 py-3.5 rounded-xl outline-none transition-all placeholder:text-gray-700"
                  />
                </div>
              </div>

              {/* Error messages */}
              {authError && (
                <p className="text-xs text-red-500 font-mono pl-1">
                  {authError}
                </p>
              )}

              {/* Action Button */}
              <button
                type="submit"
                className="w-full bg-brand text-black font-black font-display text-xs tracking-wider py-4 rounded-xl shadow-[0_4px_14px_rgba(173,255,47,0.4)] hover:bg-brand-hover active:scale-95 transition-all uppercase mt-6"
              >
                LOGIN KE SEKARANG
              </button>

            </form>

            <div className="mt-6 pt-4 border-t border-gray-900 text-center text-xs text-gray-500">
              Belum punya akun? <a href="#" className="text-brand hover:underline font-bold">Daftar Kapsul4D</a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
