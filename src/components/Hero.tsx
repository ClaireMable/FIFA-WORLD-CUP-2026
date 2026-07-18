import React, { useState, useEffect } from 'react';
import { Calendar, Users, BarChart3, TrendingUp, HelpCircle, ArrowRight } from 'lucide-react';

// Use the exact generated image path
const TROPHY_IMG = "https://ik.imagekit.io/srri8ez3b/temaworldcup";

interface HeroProps {
  onScheduleClick: () => void;
  onPredictionClick: () => void;
  onGroupsClick: () => void;
  onBracketClick: () => void;
  onStatsClick: () => void;
}

export default function Hero({ onScheduleClick, onPredictionClick, onGroupsClick, onBracketClick, onStatsClick }: HeroProps) {
  // Target date: 20 Juli 2026 di Jam 05.00 WIB (UTC+7)
  const targetTime = new Date("2026-07-20T05:00:00+07:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const quickNavs = [
    { label: 'JADWAL', icon: Calendar, action: onScheduleClick },
    { label: 'PREDIKSI', icon: HelpCircle, action: onPredictionClick },
    { label: 'GRUP', icon: Users, action: onGroupsClick },
    { label: 'BRACKET', icon: BarChart3, action: onBracketClick },
    { label: 'STATISTIK', icon: TrendingUp, action: onStatsClick },
  ];

  return (
    <section id="beranda" className="relative overflow-hidden bg-[#020617] border-b border-gray-800/50 pb-8 lg:pb-12 pt-8">
      {/* Background Graphic with softer left gradient so the center/right stadium is bright and gorgeous */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/70 to-transparent sm:w-2/3 lg:w-1/2 z-10" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#020617] to-transparent z-10" />
        <img 
          src={TROPHY_IMG} 
          alt="World Cup Stadium background" 
          className="w-full h-full object-cover object-center scale-100 transition-opacity duration-700 opacity-90"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[500px] lg:min-h-[600px]">
          
          {/* Hero Left Info */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            
            <h1 className="font-sans italic font-black text-5xl sm:text-7xl lg:text-8xl leading-none tracking-normal mb-4 uppercase select-none">
              <span className="block text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.55)]">
                FIFA WORLD
              </span>
              <span className="block mt-2 sm:mt-3">
                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.55)] mr-3 sm:mr-4">CUP</span>
                <span className="text-brand italic inline-block drop-shadow-[0_0_30px_rgba(173,255,47,0.65)]">
                  2026
                </span>
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-8 text-gray-200">
              <span className="text-lg sm:text-xl font-bold tracking-wide font-display text-white">
                11 JUNI – 19 JULI 2026
              </span>
              <span className="hidden sm:inline text-gray-500">|</span>
              <span className="text-xs sm:text-sm font-mono tracking-wider flex items-center gap-1.5 bg-gray-900/80 border border-gray-800 px-3 py-1.5 rounded-full w-max">
                USA <span className="text-brand">•</span> CANADA <span className="text-brand">•</span> MEXICO
              </span>
            </div>

            {/* Countdown timer with premium styling */}
            <div className="mb-10">
              <div className="text-[10px] font-mono tracking-[0.25em] text-brand/90 mb-3 uppercase font-extrabold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand rounded-full animate-ping" />
                EVENT BERAKHIR DALAM (20 JULI 2026, 05:00 WIB)
              </div>
              <div className="grid grid-cols-4 gap-3 max-w-md">
                
                {/* Days */}
                <div className="bg-[#030712]/80 border border-gray-800/80 rounded-xl p-3 flex flex-col items-center justify-center backdrop-blur-sm relative group hover:border-brand/40 transition-all">
                  <span className="text-3xl sm:text-4xl font-display font-black text-white group-hover:text-brand transition-colors">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-gray-400 mt-1">HARI</span>
                </div>

                {/* Hours */}
                <div className="bg-[#030712]/80 border border-gray-800/80 rounded-xl p-3 flex flex-col items-center justify-center backdrop-blur-sm relative group hover:border-brand/40 transition-all">
                  <span className="text-3xl sm:text-4xl font-display font-black text-white group-hover:text-brand transition-colors">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-gray-400 mt-1">JAM</span>
                </div>

                {/* Minutes */}
                <div className="bg-[#030712]/80 border border-gray-800/80 rounded-xl p-3 flex flex-col items-center justify-center backdrop-blur-sm relative group hover:border-brand/40 transition-all">
                  <span className="text-3xl sm:text-4xl font-display font-black text-white group-hover:text-brand transition-colors">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-gray-400 mt-1">MENIT</span>
                </div>

                {/* Seconds */}
                <div className="bg-[#030712]/80 border border-gray-800/80 rounded-xl p-3 flex flex-col items-center justify-center backdrop-blur-sm relative group hover:border-brand/40 transition-all">
                  <span className="text-3xl sm:text-4xl font-display font-black text-brand animate-pulse">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-gray-400 mt-1">DETIK</span>
                </div>

              </div>
            </div>

            {/* Hero Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={onScheduleClick}
                className="flex items-center gap-2 bg-brand text-black font-black font-display text-sm tracking-wider px-6 sm:px-8 py-3.5 rounded-xl shadow-[0_4px_14px_rgba(173,255,47,0.4)] hover:bg-brand-hover hover:shadow-[0_4px_24px_rgba(173,255,47,0.6)] active:scale-95 transition-all duration-200 cursor-pointer"
              >
                LIHAT JADWAL 
                <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
              </button>

              <button 
                onClick={onGroupsClick}
                className="flex items-center gap-2 bg-black/50 border border-gray-800 text-white font-bold font-display text-sm tracking-wide px-6 sm:px-8 py-3.5 rounded-xl hover:bg-gray-800/80 hover:border-brand/30 transition-all duration-200"
              >
                LIHAT GRUP
                <ArrowRight className="w-4 h-4 text-brand" />
              </button>
            </div>

          </div>

          {/* Hero Right Widget - Compact, sleek vertical navigation panel to keep background fully visible */}
          <div className="lg:col-span-3 lg:col-start-10 flex justify-center lg:justify-end w-full">
            <div className="w-full lg:max-w-[200px] bg-[#030712]/50 border border-gray-800/65 p-4 sm:p-5 rounded-2xl shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-800/60">
                <span className="font-display font-black text-xs tracking-wider text-gray-400 uppercase">MENU</span>
                <span className="w-1.5 h-1.5 bg-brand rounded-full shadow-[0_0_5px_rgba(173,255,47,0.8)] animate-pulse" />
              </div>

              <div className="flex flex-col gap-2.5">
                {quickNavs.map((nav, idx) => {
                  const Icon = nav.icon;
                  return (
                    <button
                      key={idx}
                      onClick={nav.action}
                      className="flex items-center gap-4 w-full p-3 bg-gray-950/40 hover:bg-brand/10 border border-gray-900/40 hover:border-brand/20 rounded-xl group transition-all duration-200 text-left cursor-pointer"
                    >
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-900 border border-gray-800/80 group-hover:bg-brand group-hover:text-black rounded-lg text-gray-400 group-hover:scale-105 transition-all shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-display font-bold text-xs sm:text-xs lg:text-[11px] tracking-wider text-gray-300 group-hover:text-white transition-colors">
                        {nav.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
