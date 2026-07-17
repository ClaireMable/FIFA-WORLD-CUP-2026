import React, { useState } from 'react';
import { Award, Zap, Shield, Target, Plus, Star, Compass, Play, CircleDot, Footprints, Square, Hand, RectangleHorizontal, Dribbble } from 'lucide-react';
import { Player, TournamentStat } from '../types';

export const TOP_PLAYERS = [
  { rank: 1, name: 'Lionel Messi', country: 'Argentina', countryCode: 'ar', teamFlagCode: 'https://flagcdn.com/w40/ar.png', avatarUrl: 'https://digitalhub.fifa.com/transform/19823774-fac0-485a-8a8f-572e7324c6c2/MESSI-Lionel_229397?&io=transform:crop,height:850,width:850&quality=75', value: 8, goals: 8, assists: 4 },
  { rank: 2, name: 'Kylian Mbappé', country: 'Prancis', countryCode: 'fr', teamFlagCode: 'https://flagcdn.com/w40/fr.png', avatarUrl: 'https://digitalhub.fifa.com/transform/66f6087d-9563-4644-8f10-5614ef6e1e51/MBAPPE-Kylian_389867?&io=transform:crop,height:850,width:850&quality=75', value: 8, goals: 8, assists: 3 },
  { rank: 3, name: 'Erling Haaland', country: 'Norwegia', countryCode: 'no', teamFlagCode: 'https://flagcdn.com/w40/no.png', avatarUrl: 'https://digitalhub.fifa.com/transform/ee269811-9f84-401f-99b8-e953a2704ebb/HAALAND-Erling_419652?&io=transform:crop,height:850,width:850&quality=75', value: 7, goals: 7, assists: 0 },
  { rank: 4, name: 'Jude Bellingham', country: 'Inggris', countryCode: 'gb-eng', teamFlagCode: 'https://flagcdn.com/w40/gb-eng.png', avatarUrl: 'https://digitalhub.fifa.com/transform/d711b37f-ec06-4ea7-bb52-50ba0a42ef67/BELLINGHAM-Jude_448202?&io=transform:crop,height:850,width:850&quality=75', value: 6, goals: 6, assists: 0 },
  { rank: 5, name: 'Harry Kane', country: 'Inggris', countryCode: 'gb-eng', teamFlagCode: 'https://flagcdn.com/w40/gb-eng.png', avatarUrl: 'https://digitalhub.fifa.com/transform/5ad83fe6-1139-4f92-a97c-669052eb1755/KANE-Harry_369419?&io=transform:crop,height:850,width:850&quality=75', value: 6, goals: 6, assists: 0 },
  { rank: 6, name: 'Ousmane Dembélé', country: 'Prancis', countryCode: 'fr', teamFlagCode: 'https://flagcdn.com/w40/fr.png', avatarUrl: 'https://digitalhub.fifa.com/transform/e6eee717-fd8c-4f8f-a7e0-c4f978fe327f/DEMBELE-Ousmane_398680?&io=transform:crop,height:850,width:850&quality=75', value: 5, goals: 5, assists: 2 },
  { rank: 7, name: 'Mikel Oyarzabal', country: 'Spanyol', countryCode: 'es', teamFlagCode: 'https://flagcdn.com/w40/es.png', avatarUrl: 'https://digitalhub.fifa.com/transform/2f46ed20-b155-4201-8b97-badbc3619450/OYARZABAL-Mikel_430751?&io=transform:crop,height:850,width:850&quality=75', value: 5, goals: 5, assists: 0 },
  { rank: 8, name: 'Ismaïla Sarr', country: 'Senegal', countryCode: 'sn', teamFlagCode: 'https://flagcdn.com/w40/sn.png', avatarUrl: 'https://digitalhub.fifa.com/transform/695226c6-92b8-4aa6-995e-dcdd2d08eb96/SARR-Ismaila_401889?&io=transform:crop,height:850,width:850&quality=75', value: 4, goals: 4, assists: 0 },
  { rank: 9, name: 'Julián Quiñones', country: 'Meksiko', countryCode: 'mx', teamFlagCode: 'https://flagcdn.com/w40/mx.png', avatarUrl: 'https://digitalhub.fifa.com/transform/ea06becb-97b2-4f89-8464-5e0854cb7f81/QUINONES-Julian_429157?&io=transform:crop,height:850,width:850&quality=75', value: 4, goals: 4, assists: 0 },
  { rank: 10, name: 'Vinícius Junior', country: 'Brasil', countryCode: 'br', teamFlagCode: 'https://flagcdn.com/w40/br.png', avatarUrl: 'https://digitalhub.fifa.com/transform/1c2722c3-a70b-49d8-bdb4-77109161f533/VINICIUS-JUNIOR_405742?&io=transform:crop,height:850,width:850&quality=75', value: 4, goals: 4, assists: 0 },
  { rank: 11, name: 'Deniz Undav', country: 'Jerman', countryCode: 'de', teamFlagCode: 'https://flagcdn.com/w40/de.png', avatarUrl: 'https://digitalhub.fifa.com/transform/3ec30e08-a7eb-4781-aea8-0e9ff86ebef1/UNDAV-Deniz_484851?&io=transform:crop,height:850,width:850&quality=75', value: 3, goals: 3, assists: 2 },
  { rank: 12, name: 'Johan Manzambi', country: 'Swiss', countryCode: 'ch', teamFlagCode: 'https://flagcdn.com/w40/ch.png', avatarUrl: 'https://digitalhub.fifa.com/transform/a0cb9413-32ea-4b8f-9801-55474cb12b77/MANZAMBI-Johan_502727?&io=transform:crop,height:850,width:850&quality=75', value: 3, goals: 3, assists: 2 },
  { rank: 13, name: 'Romelu Lukaku', country: 'Belgia', countryCode: 'be', teamFlagCode: 'https://flagcdn.com/w40/be.png', avatarUrl: 'https://digitalhub.fifa.com/transform/302b7fb7-6964-4a52-8db4-9c12778b80fa/LUKAKU-Romelu_358112?&io=transform:crop,height:850,width:850&quality=75', value: 3, goals: 3, assists: 0 },
  { rank: 14, name: 'Lautaro Martínez', country: 'Argentina', countryCode: 'ar', teamFlagCode: 'https://flagcdn.com/w40/ar.png', avatarUrl: 'https://digitalhub.fifa.com/transform/4802c672-04e3-46aa-bc63-125c1a7114bd/MARTINEZ-Lautaro_328717?&io=transform:crop,height:850,width:850&quality=75', value: 3, goals: 3, assists: 0 },
  { rank: 15, name: 'Charles De Ketelaere', country: 'Belgia', countryCode: 'be', teamFlagCode: 'https://flagcdn.com/w40/be.png', avatarUrl: 'https://digitalhub.fifa.com/transform/2ce231c2-05f7-4353-921c-242c863a8d54/DE-KETELAERE-Charles_448362?&io=transform:crop,height:850,width:850&quality=75', value: 3, goals: 3, assists: 0 },
  { rank: 16, name: 'Cody Gakpo', country: 'Belanda', countryCode: 'nl', teamFlagCode: 'https://flagcdn.com/w40/nl.png', avatarUrl: 'https://digitalhub.fifa.com/transform/bbb5637f-0587-4ddd-8a82-604c0d921bb3/GAKPO-Cody_448152?&io=transform:crop,height:850,width:850&quality=75', value: 3, goals: 3, assists: 0 },
  { rank: 17, name: 'Brian Brobbey', country: 'Belanda', countryCode: 'nl', teamFlagCode: 'https://flagcdn.com/w40/nl.png', avatarUrl: 'https://digitalhub.fifa.com/transform/15246275-ff97-404c-bac3-ce793d98c744/BROBBEY-Brian_424051?&io=transform:crop,height:850,width:850&quality=75', value: 3, goals: 3, assists: 0 },
  { rank: 18, name: 'Elijah Just', country: 'Selandia Baru', countryCode: 'nz', teamFlagCode: 'https://flagcdn.com/w40/nz.png', avatarUrl: 'https://digitalhub.fifa.com/transform/fe32736f-5d5f-4870-8db3-5b4560835f53/JUST-Elijah_405454?&io=transform:crop,height:850,width:850&quality=75', value: 3, goals: 3, assists: 0 },
  { rank: 19, name: 'Matheus Cunha', country: 'Brasil', countryCode: 'br', teamFlagCode: 'https://flagcdn.com/w40/br.png', avatarUrl: 'https://digitalhub.fifa.com/transform/9189da72-e1b5-4e7b-800d-7eeca119f08c/MATHEUS-CUNHA_430609?&io=transform:crop,height:850,width:850&quality=75', value: 3, goals: 3, assists: 0 },
  { rank: 20, name: 'Folarin Balogun', country: 'Amerika Serikat', countryCode: 'us', teamFlagCode: 'https://flagcdn.com/w40/us.png', avatarUrl: 'https://digitalhub.fifa.com/transform/bd47db79-966e-4eba-a8da-f6ba01148f27/BALOGUN-Folarin_466624?&io=transform:crop,height:850,width:850&quality=75', value: 3, goals: 3, assists: 0 }
];

export const TOP_ASSISTS = [
  { rank: 1, name: 'Michael Olise', country: 'Prancis', countryCode: 'fr', teamFlagCode: 'https://flagcdn.com/w40/fr.png', avatarUrl: 'https://digitalhub.fifa.com/transform/979cc206-e23b-4b21-8d40-843607ba8964/OLISE-Michael_485655?&io=transform:crop,height:850,width:850&quality=75', value: 5, goals: 0, assists: 5 },
  { rank: 2, name: 'Lionel Messi', country: 'Argentina', countryCode: 'ar', teamFlagCode: 'https://flagcdn.com/w40/ar.png', avatarUrl: 'https://digitalhub.fifa.com/transform/19823774-fac0-485a-8a8f-572e7324c6c2/MESSI-Lionel_229397?&io=transform:crop,height:850,width:850&quality=75', value: 4, goals: 8, assists: 4 },
  { rank: 3, name: 'Bruno Guimarães', country: 'Brasil', countryCode: 'br', teamFlagCode: 'https://flagcdn.com/w40/br.png', avatarUrl: 'https://digitalhub.fifa.com/transform/0215cb23-c389-4c5a-9bb0-c7044ae7059a/BRUNO-GUIMARAES_430605?&io=transform:crop,height:850,width:850&quality=75', value: 4, goals: 0, assists: 4 },
  { rank: 4, name: 'Brahim Díaz', country: 'Maroko', countryCode: 'ma', teamFlagCode: 'https://flagcdn.com/w40/ma.png', avatarUrl: 'https://digitalhub.fifa.com/transform/b05c2233-cb0a-4abc-9413-e56ad25f0899/DIAZ-Brahim_430740?&io=transform:crop,height:850,width:850&quality=75', value: 4, goals: 0, assists: 4 },
  { rank: 5, name: 'Martin Ødegaard', country: 'Norwegia', countryCode: 'no', teamFlagCode: 'https://flagcdn.com/w40/no.png', avatarUrl: 'https://digitalhub.fifa.com/transform/2b895db6-7f67-4436-b8da-54bdf0dd2e2b/ODEGAARD-Martin_400716?&io=transform:crop,height:850,width:850&quality=75', value: 4, goals: 0, assists: 4 },
  { rank: 6, name: 'Kylian Mbappé', country: 'Prancis', countryCode: 'fr', teamFlagCode: 'https://flagcdn.com/w40/fr.png', avatarUrl: 'https://digitalhub.fifa.com/transform/66f6087d-9563-4644-8f10-5614ef6e1e51/MBAPPE-Kylian_389867?&io=transform:crop,height:850,width:850&quality=75', value: 3, goals: 8, assists: 3 },
  { rank: 7, name: 'Andreas Schjelderup', country: 'Norwegia', countryCode: 'no', teamFlagCode: 'https://flagcdn.com/w40/no.png', avatarUrl: 'https://digitalhub.fifa.com/transform/22f44194-f9c4-46c1-8621-f9680f7d73bc/SCHJELDERUP-Andreas_494626?&io=transform:crop,height:850,width:850&quality=75', value: 3, goals: 1, assists: 3 },
  { rank: 8, name: 'Alexander Isak', country: 'Swedia', countryCode: 'se', teamFlagCode: 'https://flagcdn.com/w40/se.png', avatarUrl: 'https://digitalhub.fifa.com/transform/c6ffe63b-aefd-43b8-bd9d-3c6e31a8f418/ISAK-Alexander_430150?&io=transform:crop,height:850,width:850&quality=75', value: 3, goals: 1, assists: 3 },
  { rank: 9, name: 'Anthony Gordon', country: 'Inggris', countryCode: 'gb-eng', teamFlagCode: 'https://flagcdn.com/w40/gb-eng.png', avatarUrl: 'https://digitalhub.fifa.com/transform/bb7bbfe0-791d-408e-a2c2-f33156fce3e8/GORDON-Anthony_448189?&io=transform:crop,height:850,width:850&quality=75', value: 3, goals: 1, assists: 3 },
  { rank: 10, name: 'Bukayo Saka', country: 'Inggris', countryCode: 'gb-eng', teamFlagCode: 'https://flagcdn.com/w40/gb-eng.png', avatarUrl: 'https://digitalhub.fifa.com/transform/b1182d25-62ad-4ad8-8bae-2b7577569484/MUMIN-Abdul_441336?&io=transform:crop,height:850,width:850&quality=75', value: 3, goals: 0, assists: 3 },
  { rank: 11, name: 'Florian Wirtz', country: 'Jerman', countryCode: 'de', teamFlagCode: 'https://flagcdn.com/w40/de.png', avatarUrl: 'https://digitalhub.fifa.com/transform/3a120189-62cc-441f-b862-7fdd2a9abfa4/WIRTZ-Florian_430669?&io=transform:crop,height:850,width:850&quality=75', value: 3, goals: 0, assists: 3 },
  { rank: 12, name: 'Roberto Alvarado', country: 'Meksiko', countryCode: 'mx', teamFlagCode: 'https://flagcdn.com/w40/mx.png', avatarUrl: 'https://digitalhub.fifa.com/transform/b1a8a14a-2a27-4524-a6ed-679aca39d35d/ALVARADO-Roberto_403585?&io=transform:crop,height:850,width:850&quality=75', value: 3, goals: 0, assists: 3 },
  { rank: 13, name: 'Ousmane Dembélé', country: 'Prancis', countryCode: 'fr', teamFlagCode: 'https://flagcdn.com/w40/fr.png', avatarUrl: 'https://digitalhub.fifa.com/transform/e6eee717-fd8c-4f8f-a7e0-c4f978fe327f/DEMBELE-Ousmane_398680?&io=transform:crop,height:850,width:850&quality=75', value: 2, goals: 5, assists: 2 },
  { rank: 14, name: 'Deniz Undav', country: 'Jerman', countryCode: 'de', teamFlagCode: 'https://flagcdn.com/w40/de.png', avatarUrl: 'https://digitalhub.fifa.com/transform/3ec30e08-a7eb-4781-aea8-0e9ff86ebef1/UNDAV-Deniz_484851?&io=transform:crop,height:850,width:850&quality=75', value: 2, goals: 3, assists: 2 },
  { rank: 15, name: 'Johan Manzambi', country: 'Swiss', countryCode: 'ch', teamFlagCode: 'https://flagcdn.com/w40/ch.png', avatarUrl: 'https://digitalhub.fifa.com/transform/a0cb9413-32ea-4b8f-9801-55474cb12b77/MANZAMBI-Johan_502727?&io=transform:crop,height:850,width:850&quality=75', value: 2, goals: 3, assists: 2 },
  { rank: 16, name: 'Crysencio Summerville', country: 'Belanda', countryCode: 'nl', teamFlagCode: 'https://flagcdn.com/w40/nl.png', avatarUrl: 'https://digitalhub.fifa.com/transform/86e9f724-fc5f-4969-92e3-ac658dafacdd/SUMMERVILLE-Crysencio_489518?&io=transform:crop,height:850,width:850&quality=75', value: 2, goals: 2, assists: 2 },
  { rank: 17, name: 'Breel Embolo', country: 'Swiss', countryCode: 'ch', teamFlagCode: 'https://flagcdn.com/w40/ch.png', avatarUrl: 'https://digitalhub.fifa.com/transform/b2483096-041c-489b-a1c5-6d930f380909/EMBOLO-Breel_393480?&io=transform:crop,height:850,width:850&quality=75', value: 2, goals: 2, assists: 2 },
  { rank: 18, name: 'Leandro Trossard', country: 'Belgia', countryCode: 'be', teamFlagCode: 'https://flagcdn.com/w40/be.png', avatarUrl: 'https://digitalhub.fifa.com/transform/78476568-5abb-4047-b6c0-fd9651e0f39d/TROSSARD-Leandro_448355?&io=transform:crop,height:850,width:850&quality=75', value: 2, goals: 2, assists: 2 },
  { rank: 19, name: 'Iliman Ndiaye', country: 'Senegal', countryCode: 'sn', teamFlagCode: 'https://flagcdn.com/w40/sn.png', avatarUrl: 'https://digitalhub.fifa.com/transform/6e228075-d552-4471-80b9-6beb5f574ac6/NDIAYE-Iliman_448815?&io=transform:crop,height:850,width:850&quality=75', value: 2, goals: 1, assists: 2 },
  { rank: 20, name: 'Nathan Saliba', country: 'Kanada', countryCode: 'ca', teamFlagCode: 'https://flagcdn.com/w40/ca.png', avatarUrl: 'https://digitalhub.fifa.com/transform/1da64224-0271-489f-bea3-2aaa2e4cdf14/SALIBA-Nathan_423941?&io=transform:crop,height:850,width:850&quality=75', value: 2, goals: 1, assists: 2 }
];


export default function StatisticsAndPlayers() {
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);
  const [viewAllMode, setViewAllMode] = useState<'goals' | 'assists' | null>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    
    const tiltX = -(dy / yc) * 15;
    const tiltY = (dx / xc) * 15;
    
    setTiltStyle({
      transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'rotateX(0deg) rotateY(0deg)',
    });
    setIsHovered(false);
    setIsMouseDown(false);
  };

  const stats: TournamentStat[] = [
    { label: 'PERTANDINGAN', value: '100', iconName: 'matches' },
    { label: 'GOL', value: '292', iconName: 'goals' },
    { label: 'KARTU MERAH', value: '13', iconName: 'redcards' },
    { label: 'CLEAN SHEET', value: '45', iconName: 'cleansheets' }
  ];


  const renderPlayerCard = (player: Player) => (
    <div
      key={player.rank}
      onClick={() => setActivePlayer(player)}
      className="flex items-center justify-between py-3 px-4 bg-neutral-900/60 border border-neutral-800/80 hover:border-brand/70 hover:shadow-[0_0_18px_rgba(173,255,47,0.35)] hover:-translate-y-1 hover:scale-[1.03] active:scale-95 group transition-all duration-300 cursor-pointer relative rounded-2xl"
    >
      <div className="flex items-center gap-4 min-w-0">
        <span className="font-mono text-base font-black text-gray-500 group-hover:text-brand-hover transition-colors w-6 text-center">
          {player.rank}
        </span>
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-neutral-300 bg-gray-100 group-hover:border-brand/40 transition-all flex-shrink-0 shadow-inner">
          <img
            src={player.avatarUrl}
            alt={player.name}
            className="w-full h-full object-cover scale-110 mt-1"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <h4 className="font-display font-bold text-white text-sm truncate pr-2 group-hover:text-brand-hover transition-colors">
            {player.name}
          </h4>
          <div className="flex items-center gap-1.5 mt-0.5">
            <img 
              src={player.teamFlagCode} 
              alt={player.country} 
              className="w-4 h-3 object-cover rounded-sm border border-neutral-800"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs font-medium text-gray-400">
              {player.country}
            </span>
          </div>
        </div>
      </div>
      <span className="font-display font-black text-sm text-black bg-brand border border-transparent px-3 py-1.5 rounded-lg group-hover:bg-brand-hover transition-all shadow-sm">
        {player.value} {viewAllMode === 'goals' ? 'Gol' : 'Assist'}
      </span>
    </div>
  );

  return (
    <section id="statistik" className="py-4 bg-[#030712]">
      {viewAllMode ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#121316] border border-gray-800/80 rounded-[32px] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-brand rounded-full shadow-[0_0_8px_rgba(173,255,47,0.8)]" />
                <h3 className="font-display italic font-extrabold text-xl tracking-wider text-white uppercase">
                  TOP 20 <span className="text-gray-300">{viewAllMode === 'goals' ? 'GOALS' : 'ASSISTS'}</span>
                </h3>
              </div>
              <button 
                onClick={() => setViewAllMode(null)} 
                className="text-xs font-bold tracking-wider text-black bg-brand hover:bg-brand-hover px-4 py-2 rounded-xl transition-colors uppercase"
              >
                KEMBALI
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="flex flex-col gap-4">
                {(viewAllMode === 'goals' ? TOP_PLAYERS : TOP_ASSISTS).slice(0, 10).map(renderPlayerCard)}
              </div>
              <div className="flex flex-col gap-4">
                {(viewAllMode === 'goals' ? TOP_PLAYERS : TOP_ASSISTS).slice(10, 20).map(renderPlayerCard)}
              </div>
            </div>
          </div>
        </div>
      ) : (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121316] border border-gray-800/80 rounded-[32px] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Top Players */}
          <div className="lg:col-span-4 uiverse-music-container p-5 flex flex-col justify-between h-full group">
            <div className="uiverse-music-shadow" />
            <div className="relative z-10 flex flex-col justify-between h-full w-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-5.5 bg-brand rounded-full shadow-[0_0_8px_rgba(173,255,47,0.8)]" />
                  <h3 className="font-display italic font-extrabold text-base tracking-wider text-white uppercase">
                    TOP <span className="text-gray-300">SCORE</span>
                  </h3>
                </div>
                <button onClick={() => setViewAllMode('goals')} className="text-[10px] font-bold tracking-wider text-brand hover:text-brand-hover transition-colors flex items-center gap-1 border border-brand/20 px-2 py-1 rounded hover:bg-brand/10 uppercase">LIHAT SEMUA <span>&gt;</span></button>
              </div>

              <div className="flex flex-col gap-2">
                {TOP_PLAYERS.slice(0, 6).map((player) => (
                  <div
                    key={player.rank}
                    onClick={() => setActivePlayer(player)}
                    className="flex items-center justify-between py-2 px-3 bg-neutral-900/60 border border-neutral-800/80 hover:border-brand/70 hover:shadow-[0_0_15px_rgba(173,255,47,0.35)] hover:-translate-y-0.5 hover:scale-[1.03] active:scale-95 group transition-all duration-300 cursor-pointer relative rounded-2xl"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Rank number */}
                      <span className="font-mono text-xs font-black text-gray-500 group-hover:text-brand-hover transition-colors w-4 text-center">
                        {player.rank}
                      </span>
                      
                      {/* Avatar */}
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-neutral-300 bg-gray-100 group-hover:border-brand/40 transition-all flex-shrink-0">
                        <img
                          src={player.avatarUrl}
                          alt={player.name}
                          className="w-full h-full object-cover scale-110 mt-0.5 group-hover:scale-110 transition-all"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info text */}
                      <div className="min-w-0">
                        <span className="block font-bold text-xs text-gray-200 truncate group-hover:text-white transition-colors">
                          {player.name}
                        </span>
                        
                        {/* Country tag with mini flag */}
                        <div className="flex items-center gap-1 mt-0.5">
                          <img 
                            src={player.teamFlagCode} 
                            alt={player.country} 
                            className="w-3 h-2 object-cover rounded-sm border border-neutral-800"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[9px] font-medium text-gray-400">
                            {player.country}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Goals badge */}
                    <span className="font-display font-black text-[10px] text-black bg-brand border border-transparent px-2.5 py-1 rounded-lg group-hover:bg-brand-hover transition-all shadow-sm">
                      {player.value} Gol
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

          {/* Column 2: Tournament Statistics & Banner */}
          <div className="lg:col-span-4 uiverse-music-container p-5 flex flex-col justify-between gap-4 h-full group">
            <div className="uiverse-music-shadow" />
            <div className="relative z-10 flex flex-col justify-between gap-4 h-full w-full">
              {/* Stats Card */}
              <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-1.5 h-5.5 bg-brand rounded-full shadow-[0_0_8px_rgba(173,255,47,0.8)]" />
                <h3 className="font-display italic font-extrabold text-base tracking-wider text-white uppercase">
                  STATISTIK <span className="text-gray-300">TURNAMEN</span>
                </h3>
              </div>

              {/* Tournament stats grid */}
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat, idx) => {
                  return (
                    <div 
                      key={idx} 
                      className="bg-neutral-900/60 border border-neutral-800/80 hover:border-brand-hover/50 hover:shadow-sm p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all group shadow-sm"
                    >
                      {/* Round circle visual for icon representation */}
                      <div className="w-9 h-9 bg-neutral-800/80 border border-neutral-700/80 rounded-full flex items-center justify-center text-gray-400 group-hover:border-brand-hover group-hover:text-brand-hover mb-1.5 transition-all">
                        {stat.iconName === 'matches' && <RectangleHorizontal className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300" />}
                        {stat.iconName === 'goals' && <Dribbble className="w-4 h-4 text-white group-hover:text-brand-hover" />}
                        {stat.iconName === 'redcards' && <Square className="w-4 h-4 text-red-500 fill-red-500 group-hover:text-red-400 group-hover:fill-red-400" />}
                        {stat.iconName === 'cleansheets' && <Hand className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />}
                      </div>

                      <span className="font-display font-black text-xl text-white tracking-tight group-hover:text-brand-hover transition-colors">
                        {stat.value}
                      </span>
                      
                      <span className="text-[8px] font-mono tracking-wider text-gray-400 mt-0.5 uppercase font-semibold">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stadium/World Cup Themed Banner with background image */}
            <a 
              href="https://shortq.net/login-kapsul4d"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden bg-gray-950 border border-neutral-800 hover:border-brand/60 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(173,255,47,0.35)] active:scale-[0.98] p-4 rounded-2xl flex flex-col justify-between min-h-[120px] group cursor-pointer transition-all duration-300 ease-out block"
            >
              {/* Background Image of the Banner */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/50 to-transparent z-10" />
                {/* Online image link (Unsplash Stadium/Sport) - You can modify this URL easily */}
                <img 
                  src="https://ik.imagekit.io/srri8ez3b/pialadunia2026"
                  className="w-full h-full object-cover object-right opacity-85 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="relative z-10">
                <span className="text-[9px] font-mono text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                  Official Kapsul4d
                </span>
                
                <h4 className="font-display italic font-black text-base text-white tracking-wide mt-2 uppercase">
                  THE DREAM IS REAL
                </h4>
                
                <p className="text-[9px] text-gray-400 font-mono tracking-wide mt-0.5 uppercase">
                  ONE WORLD. ONE TROPHY. BILLIONS OF DREAMS.
                </p>
              </div>

              <div className="flex items-center gap-1.5 mt-3 relative z-10">
                <div className="w-2 h-2 bg-brand rounded-full animate-ping" />
                <span className="text-[8px] font-bold text-gray-400 font-mono tracking-wider uppercase">
                  Live Update 2026
                </span>
              </div>
            </a>
          </div>
        </div>

          {/* Column 3: Top Assists */}
          <div className="lg:col-span-4 uiverse-music-container p-5 flex flex-col justify-between h-full group">
            <div className="uiverse-music-shadow" />
            <div className="relative z-10 flex flex-col justify-between h-full w-full">
              <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-5.5 bg-brand rounded-full shadow-[0_0_8px_rgba(173,255,47,0.8)]" />
                  <h3 className="font-display italic font-extrabold text-base tracking-wider text-white uppercase">
                    TOP <span className="text-gray-300">ASSISTS</span>
                  </h3>
                </div>
                <button onClick={() => setViewAllMode('assists')} className="text-[10px] font-bold tracking-wider text-brand hover:text-brand-hover transition-colors flex items-center gap-1 border border-brand/20 px-2 py-1 rounded hover:bg-brand/10 uppercase">LIHAT SEMUA <span>&gt;</span></button>
              </div>

              <div className="flex flex-col gap-2">
                {TOP_ASSISTS.slice(0, 6).map((player) => (
                  <div
                    key={player.rank}
                    onClick={() => setActivePlayer(player)}
                    className="flex items-center justify-between py-2 px-3 bg-neutral-900/60 border border-neutral-800/80 hover:border-brand/70 hover:shadow-[0_0_15px_rgba(173,255,47,0.35)] hover:-translate-y-0.5 hover:scale-[1.03] active:scale-95 group transition-all duration-300 cursor-pointer relative rounded-2xl"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Rank number */}
                      <span className="font-mono text-xs font-black text-gray-500 group-hover:text-brand-hover transition-colors w-4 text-center">
                        {player.rank}
                      </span>
                      
                      {/* Avatar */}
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-neutral-300 bg-gray-100 group-hover:border-brand/40 transition-all flex-shrink-0">
                        <img
                          src={player.avatarUrl}
                          alt={player.name}
                          className="w-full h-full object-cover scale-110 mt-0.5 group-hover:scale-110 transition-all"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info text */}
                      <div className="min-w-0">
                        <span className="block font-bold text-xs text-gray-200 truncate group-hover:text-white transition-colors">
                          {player.name}
                        </span>
                        
                        {/* Country tag with mini flag */}
                        <div className="flex items-center gap-1 mt-0.5">
                          <img 
                            src={player.teamFlagCode} 
                            alt={player.country} 
                            className="w-3 h-2 object-cover rounded-sm border border-neutral-800"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[9px] font-medium text-gray-400">
                            {player.country}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Assists badge */}
                    <span className="font-display font-black text-[10px] text-black bg-brand border border-transparent px-2.5 py-1 rounded-lg group-hover:bg-brand-hover transition-all shadow-sm">
                      {player.value} Assist
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        </div>
        </div>
      </div>

      )}

      {/* Player Bio Modal Overlay */}
      {activePlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/85 backdrop-blur-md animate-fadeIn">
          <div 
            className="tilt-container relative w-full max-w-sm h-[520px] select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => setIsMouseDown(true)}
            onMouseUp={() => setIsMouseDown(false)}
            onTouchStart={() => setIsMouseDown(true)}
            onTouchEnd={() => setIsMouseDown(false)}
          >
            {/* Ambient Background Glow behind the card */}
            <div className={`tilt-ambient-glow ${
              isMouseDown 
                ? 'glow-active' 
                : isHovered 
                  ? 'glow-hovered' 
                  : 'glow-unhovered'
            }`} />

            {/* The actual Card that tilts */}
            <div 
              id="tilt-card" 
              style={tiltStyle}
              className={`absolute inset-0 rounded-[24px] p-6 shadow-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                isHovered ? 'tilt-hovered' : 'tilt-unhovered'
              }`}
            >
              {/* Default (unhovered) background overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br from-[#0a1607] via-[#050b03] to-[#121316] transition-opacity duration-500 z-0 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
              
              {/* Hovered background overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br from-[#1b3d0e] via-[#0b1b06] to-[#0c0d10] transition-opacity duration-500 z-0 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

              {/* Ambient Background Top Glow inside the card */}
              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-brand/20 to-transparent pointer-events-none z-[1]" />

              <div className="relative z-10 flex flex-col items-center text-center h-full justify-between">
                
                {/* Close Button - elevated z-index & completely clickable */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePlayer(null);
                  }}
                  className={`absolute top-0 right-0 p-2 text-brand bg-neutral-950 border-2 rounded-full transition-all duration-300 z-[40] cursor-pointer ${
                    isHovered 
                      ? 'border-brand shadow-[0_0_18px_rgba(173,255,47,0.7)] scale-110' 
                      : 'border-brand/40 shadow-[0_0_8px_rgba(173,255,47,0.2)]'
                  }`}
                >
                  <Plus className="w-4 h-4 rotate-45" strokeWidth={3.5} />
                </button>

                <div className="flex flex-col items-center mt-2">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-brand bg-gray-100 shadow-inner shadow-lg mb-4">
                    <img 
                      src={activePlayer.avatarUrl} 
                      alt={activePlayer.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <img 
                      src={activePlayer.teamFlagCode} 
                      alt={activePlayer.country} 
                      className="w-5 h-3.5 object-cover rounded shadow-sm border border-neutral-700"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">
                      {activePlayer.country}
                    </span>
                  </div>

                  <h4 className="font-display font-black text-2xl text-white mt-2">
                    {activePlayer.name}
                  </h4>
                </div>

                <div className="w-full grid grid-cols-3 gap-2 mt-4">
                  <div className={`bg-neutral-950 border-2 rounded-2xl flex flex-col items-center p-3 shadow-inner transition-all duration-300 ${
                    isHovered 
                      ? 'border-brand shadow-[0_0_15px_rgba(173,255,47,0.5)] scale-[1.03]' 
                      : 'border-brand/20 shadow-[0_0_8px_rgba(173,255,47,0.1)] scale-100'
                  }`}>
                    <span className="text-lg mb-1">⚽</span>
                    <span className="text-[10px] font-bold text-gray-400">Gol</span>
                    <span className="font-display font-black text-sm text-white mt-0.5">{activePlayer.goals || 0}</span>
                  </div>
                  <div className={`bg-neutral-950 border-2 rounded-2xl flex flex-col items-center p-3 shadow-inner transition-all duration-300 ${
                    isHovered 
                      ? 'border-brand shadow-[0_0_15px_rgba(173,255,47,0.5)] scale-[1.03]' 
                      : 'border-brand/20 shadow-[0_0_8px_rgba(173,255,47,0.1)] scale-100'
                  }`}>
                    <span className="text-lg mb-1">👟</span>
                    <span className="text-[10px] font-bold text-gray-400">Assist</span>
                    <span className="font-display font-black text-sm text-white mt-0.5">{activePlayer.assists || 0}</span>
                  </div>
                  <div className={`bg-neutral-950 border-2 rounded-2xl flex flex-col items-center p-3 shadow-inner transition-all duration-300 ${
                    isHovered 
                      ? 'border-brand shadow-[0_0_15px_rgba(173,255,47,0.5)] scale-[1.03]' 
                      : 'border-brand/20 shadow-[0_0_8px_rgba(173,255,47,0.1)] scale-100'
                  }`}>
                    <Target className={`w-5 h-5 mb-1 transition-all duration-300 ${isHovered ? 'text-brand scale-110 drop-shadow-[0_0_6px_rgba(173,255,47,0.8)]' : 'text-brand/50'}`} />
                    <span className="text-[10px] font-bold text-gray-400 text-center">Kontribusi</span>
                    <span className="font-display font-black text-sm text-white mt-0.5 whitespace-nowrap">
                      {(activePlayer.goals || 0) + (activePlayer.assists || 0)} G/A
                    </span>
                  </div>
                </div>

                {/* KEMBALI Button - elevated z-index & completely clickable */}
                <button
                  onClick={() => setActivePlayer(null)}
                  className="w-full mt-6 bg-brand text-black font-bold font-display text-xs py-3 rounded-xl shadow-md hover:bg-brand-hover transition-all z-[30] cursor-pointer"
                >
                  KEMBALI
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
