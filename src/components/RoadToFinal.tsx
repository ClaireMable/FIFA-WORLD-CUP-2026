import React, { useState } from 'react';
import { Trophy, ArrowRight, ArrowDown, Shield, Sparkles, Medal, Award, CheckCircle } from 'lucide-react';
import { TEAM_FLAG_MAP } from './Matches';

interface Matchup {
  home: string;
  away: string;
  homeScore: string;
  awayScore: string;
  winner: 'home' | 'away' | 'TBD';
  date: string;
}

interface Stage {
  id: string;
  title: string;
  subtitle: string;
  teams: string;
  info: string;
  matchups: Matchup[];
}

const STAGES: Stage[] = [
  {
    id: 'round-of-32',
    title: 'ROUND OF 32',
    subtitle: '32 NEGARA',
    teams: '32 Tim',
    info: 'Babak gugur pertama pasca fase grup Piala Dunia 2026. Pertempuran sengit 32 tim terbaik dunia memperebutkan tiket babak 16 besar.',
    matchups: [
      { home: 'South Africa', away: 'Canada', homeScore: '0', awayScore: '1', winner: 'away', date: '29 Juni 2026' },
      { home: 'Netherlands', away: 'Morocco', homeScore: '1 (2)', awayScore: '1 (3)', winner: 'away', date: '30 Juni 2026' },
      { home: 'Germany', away: 'Paraguay', homeScore: '1 (3)', awayScore: '1 (4)', winner: 'away', date: '30 Juni 2026' },
      { home: 'France', away: 'Sweden', homeScore: '3', awayScore: '0', winner: 'home', date: '1 juli 2026' },
      { home: 'Belgium', away: 'Senegal', homeScore: '3', awayScore: '2', winner: 'home', date: '2 juli 2026' },
      { home: 'USA', away: 'Bosnia and Herzegovina', homeScore: '2', awayScore: '0', winner: 'home', date: '2 juli 2026' },
      { home: 'Spain', away: 'Austria', homeScore: '3', awayScore: '0', winner: 'home', date: '3 juli 2026' },
      { home: 'Portugal', away: 'Croatia', homeScore: '2', awayScore: '1', winner: 'home', date: '3 juli 2026' },
      { home: 'Brazil', away: 'Japan', homeScore: '2', awayScore: '1', winner: 'home', date: '20 Juni 2026' },
      { home: 'Ivory Coast', away: 'Norway', homeScore: '1', awayScore: '2', winner: 'away', date: '1 juli 2026' },
      { home: 'Mexico', away: 'Ecuador', homeScore: '2', awayScore: '0', winner: 'home', date: '1 juli 2026' },
      { home: 'England', away: 'DR Congo', homeScore: '2', awayScore: '1', winner: 'home', date: '1 juli 2026' },
      { home: 'Switzerland', away: 'Algeria', homeScore: '2', awayScore: '0', winner: 'home', date: '3 juli 2026' },
      { home: 'Colombia', away: 'Ghana', homeScore: '1', awayScore: '0', winner: 'home', date: '4 juli 2026' },
      { home: 'Australia', away: 'Egypt', homeScore: '1 (2)', awayScore: '1 (4)', winner: 'away', date: '4 juli 2026' },
      { home: 'Argentina', away: 'Cabo Verde', homeScore: '3', awayScore: '2', winner: 'home', date: '4 Juli 2026' }
    ]
  },
  {
    id: 'round-of-16',
    title: 'ROUND OF 16',
    subtitle: '16 NEGARA',
    teams: '16 Tim',
    info: '16 Tim tersisa bertarung habis-habisan di fase menegangkan untuk mengamankan tempat di babak Perempat Final.',
    matchups: [
      { home: 'Canada', away: 'Morocco', homeScore: '0', awayScore: '3', winner: 'away', date: '5 Juli 2026' },
      { home: 'Paraguay', away: 'France', homeScore: '0', awayScore: '1', winner: 'away', date: '5 Juli 2026' },
      { home: 'USA', away: 'Belgium', homeScore: '1', awayScore: '4', winner: 'away', date: '7 Juli 2026' },
      { home: 'Portugal', away: 'Spain', homeScore: '0', awayScore: '1', winner: 'away', date: '7 Juli 2026' },
      { home: 'Brazil', away: 'Norway', homeScore: '1', awayScore: '2', winner: 'away', date: '6 Juli 2026' },
      { home: 'Mexico', away: 'England', homeScore: '2', awayScore: '3', winner: 'away', date: '6 Juli 2026' },
      { home: 'Switzerland', away: 'Colombia', homeScore: '0 (4)', awayScore: '0 (3)', winner: 'home', date: '8 Juli 2026' },
      { home: 'Argentina', away: 'Egypt', homeScore: '3', awayScore: '2', winner: 'home', date: '7 Juli 2026' }
    ]
  },
  {
    id: 'quarter-finals',
    title: 'QUARTER-FINALS',
    subtitle: '8 NEGARA',
    teams: '8 Tim',
    info: 'Sisa 8 raksasa dunia berhadapan di babak perempat final. Ruang kesalahan semakin sempit di jalan menuju trofi emas.',
    matchups: [
      { home: 'Morocco', away: 'France', homeScore: '0', awayScore: '2', winner: 'away', date: '10 Juli 2026' },
      { home: 'Belgium', away: 'Spain', homeScore: '1', awayScore: '2', winner: 'away', date: '11 Juli 2026' },
      { home: 'Norway', away: 'England', homeScore: '1', awayScore: '2', winner: 'away', date: '12 Juli 2026' },
      { home: 'Switzerland', away: 'Argentina', homeScore: '1', awayScore: '3', winner: 'away', date: '12 Juli 2026' }
    ]
  },
  {
    id: 'semi-finals',
    title: 'SEMI-FINALS',
    subtitle: '4 NEGARA',
    teams: '4 Tim',
    info: 'Empat tim terbaik dunia berjuang memperebutkan mahkota kehormatan tertinggi dan tiket ke partai puncak Final.',
    matchups: [
      { home: 'France', away: 'Spain', homeScore: '0', awayScore: '2', winner: 'away', date: '15 Juli 2026' },
      { home: 'England', away: 'Argentina', homeScore: '1', awayScore: '2', winner: 'away', date: '16 Juli 2026' }
    ]
  },
  {
    id: 'final',
    title: 'FINAL',
    subtitle: 'PARTAI PUNCAK',
    teams: '2 Tim',
    info: 'Dua gladiator sepak bola dunia bertemu di panggung termegah bumi untuk mengukir nama mereka di trofi emas Piala Dunia FIFA 2026.',
    matchups: [
      { home: 'Spain', away: 'Argentina', homeScore: '1', awayScore: '0', winner: 'home', date: '20 Juli 2026' }
    ]
  },
  {
    id: 'champion',
    title: 'JUARA DUNIA',
    subtitle: 'SANG MAHKOTA',
    teams: '1 Juara',
    info: 'Tim yang akan mengangkat Piala Dunia Emas FIFA dan dinobatkan sebagai Raja Diraja Sepak Bola Dunia 2026.',
    matchups: [
      { home: 'Spain (Champion)', away: 'Sejarah Baru', homeScore: '🏆', awayScore: '✨', winner: 'Spain', date: '20 Juli 2026' }
    ]
  }
];

export default function RoadToFinal() {
  const [activeTab, setActiveTab] = useState<'BAGAN' | 'DETAIL'>('BAGAN');
  const [selectedStage, setSelectedStage] = useState<Stage>(STAGES[0]);

  // Compute champion based on final match results dynamically
  const finalMatch = STAGES[4].matchups[0];
  let championName = 'TBD';
  let championFlag = '';
  if (finalMatch.winner === 'home') {
    championName = finalMatch.home;
    championFlag = TEAM_FLAG_MAP[championName] || '';
  } else if (finalMatch.winner === 'away') {
    championName = finalMatch.away;
    championFlag = TEAM_FLAG_MAP[championName] || '';
  }

  const renderMatchBox = (match: Matchup) => {
    if (!match) return null;
    const homeFlag = TEAM_FLAG_MAP[match.home] || 'un';
    const awayFlag = TEAM_FLAG_MAP[match.away] || 'un';
    const isHomeWinner = match.winner === 'home';
    const isAwayWinner = match.winner === 'away';

    return (
      <div className="bracket-match">
        {/* Home row */}
        <div className={`team-row ${isHomeWinner ? 'winner' : isAwayWinner ? 'loser' : ''}`}>
          <div className="team-info">
            {match.home !== 'TBD' && match.home !== 'TBD (Champion)' && (
              <img
                src={`https://flagcdn.com/w20/${homeFlag}.png`}
                className="team-flag"
                alt=""
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                referrerPolicy="no-referrer"
              />
            )}
            <span className="team-name">{match.home}</span>
          </div>
          <span className="team-score">{match.homeScore}</span>
        </div>

        {/* Away row */}
        <div className={`team-row ${isAwayWinner ? 'winner' : isHomeWinner ? 'loser' : ''}`}>
          <div className="team-info">
            {match.away !== 'TBD' && match.away !== 'Sejarah Baru' && (
              <img
                src={`https://flagcdn.com/w20/${awayFlag}.png`}
                className="team-flag"
                alt=""
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                referrerPolicy="no-referrer"
              />
            )}
            <span className="team-name">{match.away}</span>
          </div>
          <span className="team-score">{match.awayScore}</span>
        </div>
      </div>
    );
  };

  return (
    <section id="bracket" className="py-4 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121316] border border-gray-800/80 rounded-[32px] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-8 bg-brand rounded-full shadow-[0_0_8px_rgba(173,255,47,0.8)]" />
              <h2 className="font-display italic font-extrabold text-3xl tracking-wider text-white uppercase">
                Bagan & <span className="text-gray-300">Road to Final</span>
              </h2>
            </div>
            
            {/* View Toggle Tabs */}
            <div className="flex items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800">
              <button
                onClick={() => setActiveTab('BAGAN')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'BAGAN' 
                    ? 'bg-brand text-black shadow-lg shadow-brand/10' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                BAGAN VISUAL
              </button>
              <button
                onClick={() => setActiveTab('DETAIL')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'DETAIL' 
                    ? 'bg-brand text-black shadow-lg shadow-brand/10' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                DETAIL PER BABAK
              </button>
            </div>
          </div>

          {activeTab === 'BAGAN' ? (
            /* ════════ TOURNAMENT BRACKET TREE ════════ */
            <div className="anim-in">
              <div className="bracket-mobile-hint mb-2">
                ← Swipe horizontal untuk melihat bagan lengkap →
              </div>

              <div className="bracket-scroll">
                <div className="bracket-grid">
                  
                  {/* Round of 32 */}
                  <div className="bracket-round">
                    <div className="round-header">Round of 32</div>
                    <div className="round-body">
                      {Array.from({ length: 8 }).map((_, pairIdx) => (
                        <div className="match-pair" key={pairIdx}>
                          {renderMatchBox(STAGES[0].matchups[pairIdx * 2])}
                          {renderMatchBox(STAGES[0].matchups[pairIdx * 2 + 1])}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Round of 16 */}
                  <div className="bracket-round">
                    <div className="round-header">Round of 16</div>
                    <div className="round-body">
                      {Array.from({ length: 4 }).map((_, pairIdx) => (
                        <div className="match-pair" key={pairIdx}>
                          {renderMatchBox(STAGES[1].matchups[pairIdx * 2])}
                          {renderMatchBox(STAGES[1].matchups[pairIdx * 2 + 1])}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quarter Finals */}
                  <div className="bracket-round">
                    <div className="round-header">Quarter-Finals</div>
                    <div className="round-body">
                      {Array.from({ length: 2 }).map((_, pairIdx) => (
                        <div className="match-pair" key={pairIdx}>
                          {renderMatchBox(STAGES[2].matchups[pairIdx * 2])}
                          {renderMatchBox(STAGES[2].matchups[pairIdx * 2 + 1])}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Semi Finals */}
                  <div className="bracket-round">
                    <div className="round-header">Semi-Finals</div>
                    <div className="round-body">
                      <div className="match-pair">
                        {renderMatchBox(STAGES[3].matchups[0])}
                        {renderMatchBox(STAGES[3].matchups[1])}
                      </div>
                    </div>
                  </div>

                  {/* Final & Champion Column */}
                  <div className="bracket-round round-final-col">
                    <div className="round-header">Final</div>
                    <div className="round-body final-body-center">
                      
                      {/* Champion Crown Box */}
                      <div className="champion-float">
                        <div className="champion-box">
                          <div className="champion-trophy-wrap">
                            <Trophy className="champion-trophy-icon" />
                          </div>
                          <div className="champion-label">🏆 World Champion</div>
                          {championName !== 'TBD' && championFlag && (
                            <div className="champion-flag-wrap">
                              <img 
                                className="champion-flag-img" 
                                src={`https://flagcdn.com/w160/${championFlag}.png`} 
                                alt={championName} 
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          )}
                          <div className="champion-team">{championName}</div>
                        </div>
                        <div className="champion-connector" />
                      </div>

                      {/* Final Match box */}
                      <div className="match-pair single">
                        {renderMatchBox(STAGES[4].matchups[0])}
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          ) : (
            /* ════════ STAGE BY STAGE DETAILED DRAWER ════════ */
            <div className="anim-in">
              {/* Milestone Steps */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center justify-between gap-4 mb-12">
                {STAGES.map((stage) => {
                  const isSelected = selectedStage.id === stage.id;
                  const isChampion = stage.id === 'champion';

                  return (
                    <div 
                      key={stage.id}
                      onClick={() => setSelectedStage(stage)}
                      className={`uiverse-card-container cursor-pointer text-center relative group select-none transition-all duration-300 ${
                        isSelected ? 'uiverse-card-container-active scale-[1.03]' : 'hover:scale-[1.02]'
                      }`}
                    >
                      <div className="uiverse-card-body p-4 flex flex-col items-center justify-center min-h-[140px] text-center">
                        {/* Ping Indicator for Selected Stage */}
                        {isSelected && (
                          <div className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${
                            isChampion ? 'bg-amber-400 animate-ping' : 'bg-brand animate-ping'
                          }`} />
                        )}

                        {/* Title */}
                        <span className={`block font-display font-black text-[10px] sm:text-xs tracking-wider mb-2.5 transition-colors uppercase ${
                          isSelected 
                            ? isChampion ? 'text-amber-400' : 'text-brand' 
                            : 'text-gray-300 group-hover:text-white'
                        }`}>
                          {stage.title}
                        </span>

                        {/* Trophy/Medal Icon circle */}
                        <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2.5 relative overflow-hidden transition-all duration-300 ${
                          isSelected 
                            ? isChampion 
                              ? 'bg-amber-950/40 border border-amber-500/40 text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.2)]' 
                              : 'bg-brand/10 border border-brand/30 text-brand shadow-[0_0_8px_rgba(173,255,47,0.2)]' 
                            : 'bg-neutral-900 border border-neutral-800 text-gray-400 group-hover:border-neutral-700'
                        }`}>
                          {isChampion ? (
                            <Trophy className="w-4.5 h-4.5 stroke-[2]" />
                          ) : (
                            <Medal className="w-4.5 h-4.5" />
                          )}
                        </div>

                        {/* Subtitle / Teams Count */}
                        <span className={`block font-mono text-[9px] font-bold tracking-widest transition-colors uppercase ${
                          isSelected 
                            ? isChampion ? 'text-amber-400/90' : 'text-brand/90' 
                            : 'text-gray-400'
                        }`}>
                          {stage.subtitle}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Stage Detail Drawer Card */}
              <div className="uiverse-card-container">
                <div className="uiverse-card-body p-6 relative">
                  <div className="absolute top-0 right-0 p-3 opacity-[0.02] pointer-events-none">
                    <Shield className="w-48 h-48 text-brand-hover" />
                  </div>
                  
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
                    
                    {/* Left Detail Drawer */}
                    <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-neutral-800 pb-6 lg:pb-0 lg:pr-8">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full uppercase tracking-widest font-bold border border-emerald-900/50">
                        Detail Fase Pertandingan
                      </span>
                      <h3 className="font-display font-black text-2xl text-white mt-3 uppercase tracking-wide">
                        {selectedStage.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                        {selectedStage.info}
                      </p>
                      
                      <div className="mt-6 p-4 rounded-xl bg-neutral-950/40 border border-neutral-800">
                        <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold">Keterangan Status</span>
                        <div className="flex flex-col gap-2 mt-2 text-[11px] text-gray-300">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.3)]" />
                            <span>Lolos Babak Selanjutnya</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded bg-red-500/50" />
                            <span>Tersingkir</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Matchups Board */}
                    <div className="lg:col-span-8">
                      <h4 className="text-xs font-mono font-bold text-gray-400 tracking-wider mb-4 uppercase flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        Daftar Pertandingan ({selectedStage.matchups.length} Matchups)
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
                        {selectedStage.matchups.map((match, mIdx) => {
                          const homeFlag = TEAM_FLAG_MAP[match.home] || 'un';
                          const awayFlag = TEAM_FLAG_MAP[match.away] || 'un';
                          const isHomeWinner = match.winner === 'home';
                          const isAwayWinner = match.winner === 'away';
                          const isTBD = match.winner === 'TBD';

                          return (
                            <div key={mIdx} className="uiverse-hover-card">
                              <div className="uiverse-hover-card-inner p-4 flex flex-col justify-between">
                                
                                {/* Top Header */}
                                <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono mb-3">
                                  <span className="font-bold text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-900/50">MATCHUP {mIdx + 1}</span>
                                  <span>{match.date}</span>
                                </div>

                                {/* Team Rows */}
                                <div className="flex flex-col gap-2.5">
                                  
                                  {/* Home Row */}
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 min-w-0">
                                      {match.home !== 'TBD' && match.home !== 'TBD (Champion)' && (
                                        <img
                                          src={`https://flagcdn.com/w40/${homeFlag}.png`}
                                          alt={`${match.home} flag`}
                                          className="w-5 h-4 object-cover rounded shadow-sm border border-neutral-800"
                                          referrerPolicy="no-referrer"
                                        />
                                      )}
                                      <span className={`text-xs font-semibold truncate ${isHomeWinner ? 'text-emerald-400 font-black' : isAwayWinner ? 'text-gray-500' : 'text-gray-200'}`}>
                                        {match.home}
                                      </span>
                                    </div>
                                    
                                    <span className={`text-xs font-mono font-bold ${isHomeWinner ? 'text-emerald-400 font-black' : isAwayWinner ? 'text-gray-500' : 'text-gray-400'}`}>
                                      {match.homeScore}
                                    </span>
                                  </div>

                                  {/* Divider */}
                                  <div className="h-[1px] bg-neutral-800/80 w-full" />

                                  {/* Away Row */}
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 min-w-0">
                                      {match.away !== 'TBD' && match.away !== 'Sejarah Baru' && (
                                        <img
                                          src={`https://flagcdn.com/w40/${awayFlag}.png`}
                                          alt={`${match.away} flag`}
                                          className="w-5 h-4 object-cover rounded shadow-sm border border-neutral-800"
                                          referrerPolicy="no-referrer"
                                        />
                                      )}
                                      <span className={`text-xs font-semibold truncate ${isAwayWinner ? 'text-emerald-400 font-black' : isHomeWinner ? 'text-gray-500' : 'text-gray-200'}`}>
                                        {match.away}
                                      </span>
                                    </div>
                                    
                                    <span className={`text-xs font-mono font-bold ${isAwayWinner ? 'text-emerald-400 font-black' : isHomeWinner ? 'text-gray-500' : 'text-gray-400'}`}>
                                      {match.awayScore}
                                    </span>
                                  </div>

                                </div>

                                {/* Stage Winner Status Tag */}
                                {!isTBD && (
                                  <div className="mt-3.5 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[9px] font-mono">
                                    <span className="text-gray-500">Pemenang:</span>
                                    <span className="text-emerald-400 font-bold flex items-center gap-1 uppercase">
                                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                                      {isHomeWinner ? match.home : match.away}
                                    </span>
                                  </div>
                                )}

                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
