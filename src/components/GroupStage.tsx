import React, { useState } from 'react';
import { Award, Play, RotateCcw, Trophy, Globe, Compass, Star } from 'lucide-react';
import { TEAM_FLAG_MAP } from './Matches';

interface StandingRow {
  rank: number;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  form: string;
}

// Top European Standings from Legacy Code
const EUROPEAN_STANDINGS: Record<string, StandingRow[]> = {
  PL: [
    { rank: 1, name: 'Arsenal', played: 38, won: 26, drawn: 7, lost: 5, gf: 71, ga: 27, gd: 44, pts: 85, form: 'WWWWW' },
    { rank: 2, name: 'Manchester City', played: 38, won: 23, drawn: 9, lost: 6, gf: 77, ga: 35, gd: 42, pts: 78, form: 'DWWDL' },
    { rank: 3, name: 'Manchester United', played: 38, won: 20, drawn: 11, lost: 7, gf: 69, ga: 50, gd: 19, pts: 71, form: 'WWDWW' },
    { rank: 4, name: 'Aston Villa', played: 38, won: 19, drawn: 8, lost: 11, gf: 56, ga: 49, gd: 7, pts: 65, form: 'LLDWW' },
    { rank: 5, name: 'Liverpool', played: 38, won: 17, drawn: 9, lost: 12, gf: 63, ga: 53, gd: 10, pts: 60, form: 'WLDLD' },
    { rank: 6, name: 'Bournemouth', played: 38, won: 13, drawn: 18, lost: 7, gf: 58, ga: 54, gd: 4, pts: 57, form: 'DWWDD' },
    { rank: 7, name: 'Sunderland', played: 38, won: 14, drawn: 12, lost: 12, gf: 42, ga: 48, gd: -6, pts: 54, form: 'LDDWW' },
    { rank: 8, name: 'Brighton', played: 38, won: 14, drawn: 11, lost: 13, gf: 52, ga: 46, gd: 6, pts: 53, form: 'WLWLL' },
    { rank: 9, name: 'Brentford', played: 38, won: 14, drawn: 11, lost: 13, gf: 55, ga: 52, gd: 3, pts: 53, form: 'LWLDD' },
    { rank: 10, name: 'Chelsea', played: 38, won: 14, drawn: 10, lost: 14, gf: 58, ga: 52, gd: 6, pts: 52, form: 'LLDWL' },
    { rank: 11, name: 'Fulham', played: 38, won: 15, drawn: 7, lost: 16, gf: 47, ga: 51, gd: -4, pts: 52, form: 'WLLDW' },
    { rank: 12, name: 'Newcastle', played: 38, won: 14, drawn: 7, lost: 17, gf: 53, ga: 55, gd: -2, pts: 49, form: 'LWDWL' },
    { rank: 13, name: 'Everton', played: 38, won: 13, drawn: 10, lost: 15, gf: 47, ga: 50, gd: -3, pts: 49, form: 'LDDLL' },
    { rank: 14, name: 'Leeds', played: 38, won: 11, drawn: 14, lost: 13, gf: 49, ga: 56, gd: -7, pts: 47, form: 'DWDWL' },
    { rank: 15, name: 'Crystal Palace', played: 38, won: 11, drawn: 12, lost: 15, gf: 41, ga: 51, gd: -10, pts: 45, form: 'LDLDL' },
    { rank: 16, name: 'Nottm Forest', played: 38, won: 11, drawn: 11, lost: 16, gf: 48, ga: 51, gd: -3, pts: 44, form: 'WWDLD' },
    { rank: 17, name: 'Tottenham', played: 38, won: 10, drawn: 11, lost: 17, gf: 48, ga: 57, gd: -9, pts: 41, form: 'WWDLW' },
    { rank: 18, name: 'West Ham', played: 38, won: 10, drawn: 9, lost: 19, gf: 46, ga: 65, gd: -19, pts: 39, form: 'WLLLW' },
    { rank: 19, name: 'Burnley', played: 38, won: 4, drawn: 10, lost: 24, gf: 38, ga: 75, gd: -37, pts: 22, form: 'LLDLD' },
    { rank: 20, name: 'Wolves', played: 38, won: 3, drawn: 11, lost: 24, gf: 27, ga: 68, gd: -41, pts: 20, form: 'LDLDD' }
  ],
  PD: [
    { rank: 1, name: 'Barcelona', played: 38, won: 31, drawn: 1, lost: 6, gf: 95, ga: 36, gd: 59, pts: 94, form: 'WWLWL' },
    { rank: 2, name: 'Real Madrid', played: 38, won: 27, drawn: 5, lost: 6, gf: 77, ga: 35, gd: 42, pts: 86, form: 'WLWWW' },
    { rank: 3, name: 'Villarreal', played: 38, won: 22, drawn: 6, lost: 10, gf: 72, ga: 46, gd: 26, pts: 72, form: 'WDLLW' },
    { rank: 4, name: 'Atletico Madrid', played: 38, won: 21, drawn: 6, lost: 11, gf: 62, ga: 44, gd: 18, pts: 69, form: 'WLWWL' },
    { rank: 5, name: 'Real Betis', played: 38, won: 15, drawn: 15, lost: 8, gf: 59, ga: 48, gd: 11, pts: 60, form: 'WDWLW' },
    { rank: 6, name: 'Celta Vigo', played: 38, won: 14, drawn: 12, lost: 12, gf: 53, ga: 48, gd: 5, pts: 54, form: 'WWDLW' },
    { rank: 7, name: 'Getafe', played: 38, won: 15, drawn: 6, lost: 17, gf: 32, ga: 38, gd: -6, pts: 51, form: 'LDWLW' },
    { rank: 8, name: 'Rayo Vallecano', played: 38, won: 12, drawn: 14, lost: 12, gf: 41, ga: 44, gd: -3, pts: 50, form: 'WDDWW' },
    { rank: 9, name: 'Valencia', played: 38, won: 13, drawn: 10, lost: 15, gf: 46, ga: 55, gd: -9, pts: 49, form: 'LWDWW' },
    { rank: 10, name: 'Real Sociedad', played: 38, won: 11, drawn: 13, lost: 14, gf: 59, ga: 61, gd: -2, pts: 46, form: 'LDDLD' },
    { rank: 11, name: 'Espanyol', played: 38, won: 12, drawn: 10, lost: 16, gf: 43, ga: 55, gd: -12, pts: 46, form: 'LLWWD' },
    { rank: 12, name: 'Athletic Bilbao', played: 38, won: 13, drawn: 6, lost: 19, gf: 43, ga: 58, gd: -15, pts: 45, form: 'WLLDL' },
    { rank: 13, name: 'Sevilla', played: 38, won: 12, drawn: 7, lost: 19, gf: 46, ga: 60, gd: -14, pts: 43, form: 'WWWLL' },
    { rank: 14, name: 'Alaves', played: 38, won: 11, drawn: 10, lost: 17, gf: 44, ga: 56, gd: -12, pts: 43, form: 'LDWWL' },
    { rank: 15, name: 'Elche', played: 38, won: 10, drawn: 13, lost: 15, gf: 49, ga: 57, gd: -8, pts: 43, form: 'LDLWL' },
    { rank: 16, name: 'Levante', played: 38, won: 11, drawn: 9, lost: 18, gf: 47, ga: 61, gd: -14, pts: 42, form: 'LWWWL' },
    { rank: 17, name: 'Osasuna', played: 38, won: 11, drawn: 9, lost: 18, gf: 44, ga: 50, gd: -6, pts: 42, form: 'LLLLL' },
    { rank: 18, name: 'Mallorca', played: 38, won: 11, drawn: 9, lost: 18, gf: 47, ga: 57, gd: -10, pts: 42, form: 'WDLLW' },
    { rank: 19, name: 'Girona', played: 38, won: 9, drawn: 14, lost: 15, gf: 39, ga: 55, gd: -16, pts: 41, form: 'LDDLD' },
    { rank: 20, name: 'Real Oviedo', played: 38, won: 6, drawn: 11, lost: 21, gf: 26, ga: 60, gd: -34, pts: 29, form: 'LDLLL' }
  ],
  BL1: [
    { rank: 1, name: 'Bayern Munich', played: 34, won: 28, drawn: 5, lost: 1, gf: 122, ga: 36, gd: 86, pts: 89, form: 'WWDWW' },
    { rank: 2, name: 'Borussia Dortmund', played: 34, won: 22, drawn: 7, lost: 5, gf: 70, ga: 34, gd: 36, pts: 73, form: 'LWLWW' },
    { rank: 3, name: 'RB Leipzig', played: 34, won: 20, drawn: 5, lost: 9, gf: 66, ga: 47, gd: 19, pts: 65, form: 'WWLWL' },
    { rank: 4, name: 'VfB Stuttgart', played: 34, won: 18, drawn: 8, lost: 8, gf: 71, ga: 49, gd: 22, pts: 62, form: 'LDDWD' },
    { rank: 5, name: 'Hoffenheim', played: 34, won: 18, drawn: 7, lost: 9, gf: 65, ga: 52, gd: 13, pts: 61, form: 'WWDWL' },
    { rank: 6, name: 'Bayer Leverkusen', played: 34, won: 17, drawn: 8, lost: 9, gf: 68, ga: 47, gd: 21, pts: 59, form: 'LWWLD' },
    { rank: 7, name: 'Freiburg', played: 34, won: 13, drawn: 8, lost: 13, gf: 51, ga: 57, gd: -6, pts: 47, form: 'WLDLW' },
    { rank: 8, name: 'Eintracht Frankfurt', played: 34, won: 11, drawn: 11, lost: 12, gf: 61, ga: 65, gd: -4, pts: 44, form: 'LDLLD' },
    { rank: 9, name: 'Augsburg', played: 34, won: 12, drawn: 7, lost: 15, gf: 45, ga: 61, gd: -16, pts: 43, form: 'WDWWL' },
    { rank: 10, name: 'Mainz 05', played: 34, won: 10, drawn: 10, lost: 14, gf: 44, ga: 53, gd: -9, pts: 40, form: 'DLWLW' },
    { rank: 11, name: 'Union Berlin', played: 34, won: 10, drawn: 9, lost: 15, gf: 44, ga: 58, gd: -14, pts: 39, form: 'LLDWW' },
    { rank: 12, name: 'Borussia Moenchengladbach', played: 34, won: 9, drawn: 11, lost: 14, gf: 42, ga: 53, gd: -11, pts: 38, form: 'DDWLW' },
    { rank: 13, name: 'Hamburger SV', played: 34, won: 9, drawn: 11, lost: 14, gf: 40, ga: 54, gd: -14, pts: 38, form: 'LLWWD' },
    { rank: 14, name: 'FC Koeln', played: 34, won: 7, drawn: 11, lost: 16, gf: 49, ga: 63, gd: -14, pts: 32, form: 'DLDLL' },
    { rank: 15, name: 'Werder Bremen', played: 34, won: 8, drawn: 8, lost: 18, gf: 37, ga: 60, gd: -23, pts: 32, form: 'WDLLL' },
    { rank: 16, name: 'Wolfsburg', played: 34, won: 7, drawn: 8, lost: 19, gf: 45, ga: 69, gd: -24, pts: 29, form: 'WDDLW' },
    { rank: 17, name: 'FC Heidenheim', played: 34, won: 6, drawn: 8, lost: 20, gf: 41, ga: 72, gd: -31, pts: 26, form: 'LWDWL' },
    { rank: 18, name: 'St. Pauli', played: 34, won: 6, drawn: 8, lost: 20, gf: 29, ga: 60, gd: -31, pts: 26, form: 'DLLLL' }
  ],
  SA: [
    { rank: 1, name: 'Inter Milan', played: 38, won: 27, drawn: 6, lost: 5, gf: 89, ga: 35, gd: 54, pts: 87, form: 'DWWDD' },
    { rank: 2, name: 'SSC Napoli', played: 38, won: 23, drawn: 7, lost: 8, gf: 58, ga: 36, gd: 22, pts: 76, form: 'WDLWW' },
    { rank: 3, name: 'AS Roma', played: 38, won: 23, drawn: 4, lost: 11, gf: 59, ga: 31, gd: 28, pts: 73, form: 'WWWWW' },
    { rank: 4, name: 'Como 1907', played: 38, won: 20, drawn: 11, lost: 7, gf: 65, ga: 29, gd: 36, pts: 71, form: 'WDWWW' },
    { rank: 5, name: 'AC Milan', played: 38, won: 20, drawn: 10, lost: 8, gf: 53, ga: 35, gd: 18, pts: 70, form: 'DLLWL' },
    { rank: 6, name: 'Juventus FC', played: 38, won: 19, drawn: 12, lost: 7, gf: 61, ga: 34, gd: 27, pts: 69, form: 'DDWLD' },
    { rank: 7, name: 'Atalanta BC', played: 38, won: 15, drawn: 14, lost: 9, gf: 51, ga: 36, gd: 15, pts: 59, form: 'LDWLD' },
    { rank: 8, name: 'Bologna FC 1909', played: 38, won: 16, drawn: 8, lost: 14, gf: 49, ga: 46, gd: 3, pts: 56, form: 'LDWWD' },
    { rank: 9, name: 'S.S. Lazio', played: 38, won: 14, drawn: 12, lost: 12, gf: 41, ga: 40, gd: 1, pts: 54, form: 'DWLLW' },
    { rank: 10, name: 'Udinese Calcio', played: 38, won: 14, drawn: 8, lost: 16, gf: 45, ga: 48, gd: -3, pts: 50, form: 'DWWLL' },
    { rank: 11, name: 'U.S. Sassuolo Calcio', played: 38, won: 14, drawn: 7, lost: 17, gf: 46, ga: 50, gd: -4, pts: 49, form: 'DWLLL' },
    { rank: 12, name: 'Torino FC', played: 38, won: 12, drawn: 9, lost: 17, gf: 44, ga: 63, gd: -19, pts: 45, form: 'DLWLD' },
    { rank: 13, name: 'Parma Calcio 1913', played: 38, won: 11, drawn: 12, lost: 15, gf: 28, ga: 46, gd: -18, pts: 45, form: 'WLLLW' },
    { rank: 14, name: 'Cagliari Calcio', played: 38, won: 11, drawn: 10, lost: 17, gf: 40, ga: 53, gd: -13, pts: 43, form: 'WDLWW' },
    { rank: 15, name: 'ACF Fiorentina', played: 38, won: 9, drawn: 15, lost: 14, gf: 41, ga: 50, gd: -9, pts: 42, form: 'DLDWD' },
    { rank: 16, name: 'Genoa CFC', played: 38, won: 10, drawn: 11, lost: 17, gf: 41, ga: 51, gd: -10, pts: 41, form: 'LDDLL' },
    { rank: 17, name: 'U.S. Lecce', played: 38, won: 10, drawn: 8, lost: 20, gf: 28, ga: 50, gd: -22, pts: 38, form: 'DWLWW' },
    { rank: 18, name: 'US Cremonese', played: 38, won: 8, drawn: 10, lost: 20, gf: 32, ga: 57, gd: -25, pts: 34, form: 'LLWWL' },
    { rank: 19, name: 'Hellas Verona FC', played: 38, won: 3, drawn: 12, lost: 23, gf: 25, ga: 61, gd: -36, pts: 21, form: 'DDLDL' },
    { rank: 20, name: 'Pisa Sporting Club', played: 38, won: 2, drawn: 12, lost: 24, gf: 26, ga: 71, gd: -45, pts: 18, form: 'LLLLL' }
  ],
  FL1: [
    { rank: 1, name: 'PSG', played: 34, won: 24, drawn: 4, lost: 6, gf: 74, ga: 29, gd: 45, pts: 76, form: 'LWWDW' },
    { rank: 2, name: 'Lens', played: 34, won: 22, drawn: 4, lost: 8, gf: 66, ga: 35, gd: 31, pts: 70, form: 'WLWDD' },
    { rank: 3, name: 'Lille', played: 34, won: 18, drawn: 7, lost: 9, gf: 52, ga: 37, gd: 15, pts: 61, form: 'LWDWD' },
    { rank: 4, name: 'Lyon', played: 34, won: 18, drawn: 6, lost: 10, gf: 53, ga: 40, gd: 13, pts: 60, form: 'LLWWW' },
    { rank: 5, name: 'Marseille', played: 34, won: 18, drawn: 5, lost: 11, gf: 63, ga: 45, gd: 18, pts: 59, form: 'WWLDL' },
    { rank: 6, name: 'Rennes', played: 34, won: 17, drawn: 8, lost: 9, gf: 59, ga: 50, gd: 9, pts: 59, form: 'LWLWW' },
    { rank: 7, name: 'Monaco', played: 34, won: 16, drawn: 6, lost: 12, gf: 60, ga: 54, gd: 6, pts: 54, form: 'LLWDD' },
    { rank: 8, name: 'Strasbourg', played: 34, won: 15, drawn: 8, lost: 11, gf: 58, ga: 47, gd: 11, pts: 53, form: 'WWDLW' },
    { rank: 9, name: 'Lorient', played: 34, won: 11, drawn: 12, lost: 11, gf: 48, ga: 51, gd: -3, pts: 45, form: 'LWDLW' },
    { rank: 10, name: 'Toulouse', played: 33, won: 12, drawn: 8, lost: 13, gf: 47, ga: 46, gd: 1, pts: 44, form: 'WWDLL' },
    { rank: 11, name: 'Paris FC', played: 34, won: 11, drawn: 11, lost: 12, gf: 47, ga: 50, gd: -3, pts: 44, form: 'WLWLW' },
    { rank: 12, name: 'Brest', played: 34, won: 10, drawn: 9, lost: 15, gf: 43, ga: 55, gd: -12, pts: 39, form: 'DLLLD' },
    { rank: 13, name: 'Angers', played: 34, won: 9, drawn: 9, lost: 16, gf: 29, ga: 48, gd: -19, pts: 36, form: 'DDLLD' },
    { rank: 14, name: 'Le Havre', played: 34, won: 7, drawn: 14, lost: 13, gf: 32, ga: 44, gd: -12, pts: 35, form: 'WLDDD' },
    { rank: 15, name: 'Auxerre', played: 34, won: 8, drawn: 10, lost: 16, gf: 34, ga: 44, gd: -10, pts: 34, form: 'WWWLD' },
    { rank: 16, name: 'Nice', played: 34, won: 7, drawn: 11, lost: 16, gf: 37, ga: 60, gd: -23, pts: 32, form: 'DLDDD' },
    { rank: 17, name: 'Nantes', played: 33, won: 5, drawn: 8, lost: 20, gf: 29, ga: 52, gd: -23, pts: 23, form: 'LWLLD' },
    { rank: 18, name: 'Metz', played: 34, won: 3, drawn: 8, lost: 23, gf: 32, ga: 76, gd: -44, pts: 17, form: 'DLLDL' }
  ]
};

const EUROPEAN_ZONES: Record<string, { ucl: number; uel: number; uecl: number; rel: number; relPlayoff?: number; uclQ?: number }> = {
  PL: { ucl: 5, uel: 5, uecl: 6, rel: 17 },
  PD: { ucl: 5, uel: 5, uecl: 6, rel: 17 },
  BL1: { ucl: 4, uel: 4, uecl: 5, relPlayoff: 15, rel: 16 },
  SA: { ucl: 4, uel: 4, uecl: 5, rel: 17 },
  FL1: { ucl: 3, uclQ: 3, uel: 4, uecl: 5, relPlayoff: 15, rel: 16 }
};

// World Cup 2026 Phase Groups Stage (Groups A to L)
const WORLD_CUP_GROUPS: Record<string, StandingRow[]> = {
  'A': [
    { rank: 1, name: 'Mexico', played: 3, won: 3, drawn: 0, lost: 0, gf: 6, ga: 0, gd: 6, pts: 9, form: 'WWW' },
    { rank: 2, name: 'South Africa', played: 3, won: 1, drawn: 1, lost: 1, gf: 2, ga: 3, gd: -1, pts: 4, form: 'LDW' },
    { rank: 3, name: 'South Korea', played: 3, won: 1, drawn: 0, lost: 2, gf: 2, ga: 3, gd: -1, pts: 3, form: 'WLL' },
    { rank: 4, name: 'Czechia', played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 6, gd: -4, pts: 1, form: 'LDL' }
  ],
  'B': [
    { rank: 1, name: 'Switzerland', played: 3, won: 2, drawn: 1, lost: 0, gf: 7, ga: 3, gd: 4, pts: 7, form: 'DWW' },
    { rank: 2, name: 'Canada', played: 3, won: 1, drawn: 1, lost: 1, gf: 8, ga: 3, gd: 5, pts: 4, form: 'DWL' },
    { rank: 3, name: 'Bosnia and Herzegovina', played: 3, won: 1, drawn: 1, lost: 1, gf: 5, ga: 6, gd: -1, pts: 4, form: 'DLW' },
    { rank: 4, name: 'Qatar', played: 3, won: 0, drawn: 1, lost: 2, gf: 2, ga: 10, gd: -8, pts: 1, form: 'DLL' }
  ],
  'C': [
    { rank: 1, name: 'Brazil', played: 3, won: 2, drawn: 1, lost: 0, gf: 7, ga: 1, gd: 6, pts: 7, form: 'DWW' },
    { rank: 2, name: 'Morocco', played: 3, won: 2, drawn: 1, lost: 0, gf: 6, ga: 3, gd: 3, pts: 7, form: 'DWW' },
    { rank: 3, name: 'Scotland', played: 3, won: 1, drawn: 0, lost: 2, gf: 1, ga: 4, gd: -3, pts: 3, form: 'WLL' },
    { rank: 4, name: 'Haiti', played: 3, won: 0, drawn: 0, lost: 3, gf: 2, ga: 8, gd: -6, pts: 0, form: 'LLL' }
  ],
  'D': [
    { rank: 1, name: 'USA', played: 3, won: 2, drawn: 0, lost: 1, gf: 8, ga: 4, gd: 4, pts: 6, form: 'WWL' },
    { rank: 2, name: 'Australia', played: 3, won: 1, drawn: 1, lost: 1, gf: 2, ga: 2, gd: 0, pts: 4, form: 'WLD' },
    { rank: 3, name: 'Paraguay', played: 3, won: 1, drawn: 1, lost: 1, gf: 2, ga: 4, gd: -2, pts: 4, form: 'LWD' },
    { rank: 4, name: 'Türkiye', played: 3, won: 1, drawn: 0, lost: 2, gf: 3, ga: 5, gd: -2, pts: 3, form: 'LLW' }
  ],
  'E': [
    { rank: 1, name: 'Germany', played: 3, won: 2, drawn: 0, lost: 1, gf: 10, ga: 4, gd: 6, pts: 6, form: 'WWL' },
    { rank: 2, name: 'Ivory Coast', played: 3, won: 2, drawn: 0, lost: 1, gf: 4, ga: 2, gd: 2, pts: 6, form: 'WLW' },
    { rank: 3, name: 'Ecuador', played: 3, won: 1, drawn: 1, lost: 1, gf: 2, ga: 2, gd: 0, pts: 4, form: 'LDW' },
    { rank: 4, name: 'Curaçao', played: 3, won: 0, drawn: 1, lost: 2, gf: 1, ga: 9, gd: -8, pts: 1, form: 'LDL' }
  ],
  'F': [
    { rank: 1, name: 'Netherlands', played: 3, won: 2, drawn: 1, lost: 0, gf: 10, ga: 4, gd: 6, pts: 7, form: 'DWW' },
    { rank: 2, name: 'Japan', played: 3, won: 1, drawn: 2, lost: 0, gf: 7, ga: 3, gd: 4, pts: 5, form: 'DWD' },
    { rank: 3, name: 'Sweden', played: 3, won: 1, drawn: 1, lost: 1, gf: 7, ga: 7, gd: 0, pts: 4, form: 'WLD' },
    { rank: 4, name: 'Tunisia', played: 3, won: 0, drawn: 0, lost: 3, gf: 2, ga: 12, gd: -10, pts: 0, form: 'LLL' }
  ],
  'G': [
    { rank: 1, name: 'Belgium', played: 3, won: 1, drawn: 2, lost: 0, gf: 6, ga: 2, gd: 4, pts: 5, form: 'DDW' },
    { rank: 2, name: 'Egypt', played: 3, won: 1, drawn: 2, lost: 0, gf: 5, ga: 3, gd: 2, pts: 5, form: 'DWD' },
    { rank: 3, name: 'Iran', played: 3, won: 0, drawn: 3, lost: 0, gf: 3, ga: 3, gd: 0, pts: 3, form: 'DDD' },
    { rank: 4, name: 'New Zealand', played: 3, won: 0, drawn: 1, lost: 2, gf: 4, ga: 10, gd: -6, pts: 1, form: 'DLL' }
  ],
  'H': [
    { rank: 1, name: 'Spain', played: 3, won: 2, drawn: 1, lost: 0, gf: 5, ga: 0, gd: 5, pts: 7, form: 'DWW' },
    { rank: 2, name: 'Cabo Verde', played: 3, won: 0, drawn: 3, lost: 0, gf: 2, ga: 2, gd: 0, pts: 3, form: 'DDD' },
    { rank: 3, name: 'Uruguay', played: 3, won: 0, drawn: 2, lost: 1, gf: 3, ga: 4, gd: -1, pts: 2, form: 'DDL' },
    { rank: 4, name: 'Saudi Arabia', played: 3, won: 0, drawn: 2, lost: 1, gf: 1, ga: 5, gd: -4, pts: 2, form: 'DLD' }
  ],
  'I': [
    { rank: 1, name: 'France', played: 3, won: 3, drawn: 0, lost: 0, gf: 10, ga: 2, gd: 8, pts: 9, form: 'WWW' },
    { rank: 2, name: 'Norway', played: 3, won: 2, drawn: 0, lost: 1, gf: 8, ga: 7, gd: 1, pts: 6, form: 'WWL' },
    { rank: 3, name: 'Senegal', played: 3, won: 1, drawn: 0, lost: 2, gf: 8, ga: 6, gd: 2, pts: 3, form: 'LLW' },
    { rank: 4, name: 'Iraq', played: 3, won: 0, drawn: 0, lost: 3, gf: 1, ga: 12, gd: -11, pts: 0, form: 'LLL' }
  ],
  'J': [
    { rank: 1, name: 'Argentina', played: 3, won: 3, drawn: 0, lost: 0, gf: 8, ga: 1, gd: 7, pts: 9, form: 'WWW' },
    { rank: 2, name: 'Austria', played: 3, won: 1, drawn: 1, lost: 1, gf: 6, ga: 6, gd: 0, pts: 4, form: 'WLD' },
    { rank: 3, name: 'Algeria', played: 3, won: 1, drawn: 1, lost: 1, gf: 5, ga: 7, gd: -2, pts: 4, form: 'LWD' },
    { rank: 4, name: 'Jordan', played: 3, won: 0, drawn: 0, lost: 3, gf: 3, ga: 8, gd: -5, pts: 0, form: 'LLL' }
  ],
  'K': [
    { rank: 1, name: 'Colombia', played: 3, won: 2, drawn: 1, lost: 0, gf: 4, ga: 1, gd: 3, pts: 7, form: 'WWD' },
    { rank: 2, name: 'Portugal', played: 3, won: 1, drawn: 2, lost: 0, gf: 6, ga: 1, gd: 5, pts: 5, form: 'DWD' },
    { rank: 3, name: 'DR Congo', played: 3, won: 1, drawn: 1, lost: 1, gf: 4, ga: 3, gd: 1, pts: 4, form: 'DLW' },
    { rank: 4, name: 'Uzbekistan', played: 3, won: 0, drawn: 0, lost: 3, gf: 2, ga: 11, gd: -9, pts: 0, form: 'LLL' }
  ],
  'L': [
    { rank: 1, name: 'England', played: 3, won: 2, drawn: 1, lost: 0, gf: 6, ga: 2, gd: 4, pts: 7, form: 'WDW' },
    { rank: 2, name: 'Croatia', played: 3, won: 2, drawn: 0, lost: 1, gf: 5, ga: 5, gd: 0, pts: 6, form: 'LWW' },
    { rank: 3, name: 'Ghana', played: 3, won: 1, drawn: 1, lost: 1, gf: 2, ga: 2, gd: 0, pts: 4, form: 'WDL' },
    { rank: 4, name: 'Panama', played: 3, won: 0, drawn: 0, lost: 3, gf: 0, ga: 4, gd: -4, pts: 0, form: 'LLL' }
  ]
};

const LEAGUE_TABS = [
  { id: 'PL', label: 'Premier League', flag: 'gb-eng' },
  { id: 'PD', label: 'La Liga', flag: 'es' },
  { id: 'BL1', label: 'Bundesliga', flag: 'de' },
  { id: 'SA', label: 'Serie A', flag: 'it' },
  { id: 'FL1', label: 'Ligue 1', flag: 'fr' }
];

export default function GroupStage() {
  const [activeMainTab, setActiveMainTab] = useState<'WORLD_CUP' | 'EURO_LEAGUES'>('WORLD_CUP');
  const [selectedWCGroup, setSelectedWCGroup] = useState('A');
  const [selectedEuroLeague, setSelectedEuroLeague] = useState('PL');

  const [wcGroupsState, setWCGroupsState] = useState<Record<string, StandingRow[]>>(WORLD_CUP_GROUPS);
  const [isWCSimulated, setIsWCSimulated] = useState(false);

  // Simulation of World Cup stage groups
  const handleSimulateWC = () => {
    const simulated = { ...WORLD_CUP_GROUPS };
    Object.keys(simulated).forEach((grpKey) => {
      const list = [...simulated[grpKey]];
      // Randomize slightly
      const randomized = list.map((team, idx) => {
        let played = 3;
        let won = team.won;
        let drawn = team.drawn;
        let lost = team.lost;
        let gf = team.gf;
        let ga = team.ga;

        // Introduce minor random variance
        if (Math.random() > 0.5) {
          const shift = Math.floor(Math.random() * 2);
          if (shift === 1 && won > 0) {
            won -= 1;
            drawn += 1;
          } else if (shift === 1 && lost > 0) {
            lost -= 1;
            drawn += 1;
          }
        }

        const pts = (won * 3) + drawn;
        const gd = gf - ga;

        return {
          ...team,
          played,
          won,
          drawn,
          lost,
          pts,
          gd
        };
      });

      // Sort by PTS, then GD, then GF
      randomized.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
      // Re-assign ranks
      randomized.forEach((t, i) => { t.rank = i + 1; });

      simulated[grpKey] = randomized;
    });

    setWCGroupsState(simulated);
    setIsWCSimulated(true);
  };

  const handleResetWC = () => {
    setWCGroupsState(WORLD_CUP_GROUPS);
    setIsWCSimulated(false);
  };

  // UI rendering zone helpers
  const getZoneHighlightColor = (rank: number, code: string, isEuro: boolean) => {
    if (isEuro) {
      const z = EUROPEAN_ZONES[code];
      if (!z) return '';
      if (rank >= z.rel) return 'border-l-4 border-red-500 bg-red-500/5';
      if (z.relPlayoff && rank === z.relPlayoff) return 'border-l-4 border-amber-500 bg-amber-500/5';
      if (rank <= z.ucl) return 'border-l-4 border-indigo-500 bg-indigo-500/5';
      if (rank === z.uel) return 'border-l-4 border-orange-500 bg-orange-500/5';
      if (rank === z.uecl) return 'border-l-4 border-green-500 bg-green-500/5';
      if (z.uclQ && rank === z.uclQ) return 'border-l-4 border-purple-500 bg-purple-500/5';
    } else {
      // World Cup 2026: top 2 qualify directly
      if (rank <= 2) return 'border-l-4 border-green-500 bg-green-500/5';
      if (rank === 3) return 'border-l-4 border-orange-500 bg-orange-500/5'; // Playoff spot potential
      return 'border-l-4 border-red-500 bg-red-500/5';
    }
    return '';
  };

  const renderFormDots = (formStr: string) => {
    return (
      <div className="flex items-center gap-1 justify-center">
        {formStr.split('').map((char, i) => {
          let dotColor = 'bg-gray-700';
          if (char === 'W') dotColor = 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]';
          if (char === 'D') dotColor = 'bg-gray-400';
          if (char === 'L') dotColor = 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]';
          return (
            <span key={i} className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
          );
        })}
      </div>
    );
  };

  return (
    <section id="grup" className="py-4 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121316] border border-gray-800/80 rounded-[32px] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Main Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-8 bg-brand rounded-full shadow-[0_0_8px_rgba(173,255,47,0.8)]" />
            <h2 className="font-display italic font-extrabold text-3xl tracking-wider text-white uppercase">
              GRUP & <span className="text-gray-300">KLASEMEN</span>
            </h2>
          </div>

          {/* Master Tabs Controller */}
          <div className="inline-flex p-1 bg-neutral-800 border border-neutral-700 rounded-2xl shrink-0">
            <button
              onClick={() => setActiveMainTab('WORLD_CUP')}
              className={`flex items-center gap-2 text-xs font-bold px-5 py-3 rounded-xl transition-all cursor-pointer ${
                activeMainTab === 'WORLD_CUP'
                  ? 'bg-brand text-black shadow-md font-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              WORLD CUP 2026
            </button>
            <button
              onClick={() => setActiveMainTab('EURO_LEAGUES')}
              className={`flex items-center gap-2 text-xs font-bold px-5 py-3 rounded-xl transition-all cursor-pointer ${
                activeMainTab === 'EURO_LEAGUES'
                  ? 'bg-brand text-black shadow-md font-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              LIGA TOP EROPA
            </button>
          </div>
        </div>

        {/* ==================== WORLD CUP 2026 TAB PANEL ==================== */}
        {activeMainTab === 'WORLD_CUP' && (
          <div className="space-y-6">
            
            {/* Simulation controls & Group tags */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#1c1c1c] p-4 border border-neutral-800 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 flex-wrap">
                {Object.keys(wcGroupsState).map((grp) => (
                  <button
                    key={grp}
                    onClick={() => setSelectedWCGroup(grp)}
                    className={`w-9 h-9 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      selectedWCGroup === grp
                        ? 'bg-brand text-black border-transparent shadow-sm font-extrabold'
                        : 'bg-neutral-800 border-neutral-700 text-gray-300 hover:text-white hover:border-neutral-500'
                    }`}
                  >
                    {grp}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {!isWCSimulated ? (
                  <button
                    onClick={handleSimulateWC}
                    className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-900/50 hover:bg-emerald-950/70 text-emerald-300 font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-emerald-300 text-emerald-300" />
                    SIMULASIKAN SKOR
                  </button>
                ) : (
                  <button
                    onClick={handleResetWC}
                    className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-gray-300" />
                    RESET DATA
                  </button>
                )}
              </div>
            </div>

            {/* Display World Cup Group Table */}
            <div className="bg-[#1c1c1c] border border-neutral-800 rounded-3xl p-4 sm:p-6 relative overflow-hidden shadow-sm">
              <div className="w-full overflow-x-auto no-scrollbar">
                <div className="min-w-[500px] pr-1">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-black text-xl text-white tracking-wider uppercase">GROUP {selectedWCGroup}</span>
                      <span className="text-[10px] font-mono text-gray-400 bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">FIFA STANDINGS</span>
                    </div>
                    <div className="flex gap-4 text-[10px] font-mono font-bold text-gray-400">
                      <div className="flex gap-4 sm:gap-6 pr-6">
                        <span className="w-6 text-center">P</span>
                        <span className="w-6 text-center">W</span>
                        <span className="w-6 text-center">D</span>
                        <span className="w-6 text-center">L</span>
                        <span className="w-8 text-center">GD</span>
                      </div>
                      <span className="w-10 text-center text-emerald-400">PTS</span>
                      <span className="w-16 text-center hidden sm:block">FORM</span>
                    </div>
                  </div>

                  {/* Rows */}
                  <div className="flex flex-col gap-2.5">
                    {(wcGroupsState[selectedWCGroup] || []).map((team) => {
                      const flag = TEAM_FLAG_MAP[team.name] || 'un';
                      const gdClass = team.gd > 0 ? 'text-emerald-400 font-extrabold' : team.gd < 0 ? 'text-red-400 font-extrabold' : 'text-gray-400';
                      const gdText = team.gd > 0 ? `+${team.gd}` : `${team.gd}`;

                      return (
                        <div
                          key={team.name}
                          className={`flex items-center justify-between py-3 px-4 rounded-xl border border-transparent hover:border-neutral-700 transition-colors ${getZoneHighlightColor(team.rank, selectedWCGroup, false)}`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`font-mono text-xs font-bold w-4 ${
                              team.rank <= 2 ? 'text-emerald-400 font-extrabold' : 'text-gray-500'
                            }`}>
                              {team.rank}
                            </span>
                            
                            <img
                              src={`https://flagcdn.com/w40/${flag}.png`}
                              alt={`${team.name} flag`}
                              className="w-6.5 h-4.5 object-cover rounded shadow-sm border border-neutral-800 shrink-0"
                              referrerPolicy="no-referrer"
                            />

                            <span className="font-semibold text-xs text-gray-200 truncate max-w-[140px] sm:max-w-none">
                              {team.name}
                            </span>
                          </div>

                          {/* Stats Numbers */}
                          <div className="flex gap-4 text-xs font-semibold font-mono text-gray-400">
                            <div className="flex gap-4 sm:gap-6 pr-6">
                              <span className="w-6 text-center text-gray-500">{team.played}</span>
                              <span className="w-6 text-center text-gray-200">{team.won}</span>
                              <span className="w-6 text-center text-gray-200">{team.drawn}</span>
                              <span className="w-6 text-center text-gray-200">{team.lost}</span>
                              <span className={`w-8 text-center ${gdClass}`}>{gdText}</span>
                            </div>
                            <span className="w-10 text-center font-black text-emerald-400 text-sm">{team.pts}</span>
                            <div className="w-16 hidden sm:block shrink-0">
                              {renderFormDots(team.form)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Legend indicator */}
              <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-[10px] text-gray-400 font-mono">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-green-500 shrink-0" />
                    Lolos Babak 16 Besar (Peringkat 1 & 2)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-orange-500 shrink-0" />
                    Peluang Playoff Peringkat 3 Terbaik
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-red-500 shrink-0" />
                    Tersingkir
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-neutral-900/60 px-3 py-1.5 rounded-lg border border-neutral-800/80">
                  <span className="text-[10px] font-bold text-gray-400">LAST MATCH:</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.4)]" />
                    <span className="text-gray-300 text-[10px]">Menang</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-neutral-500" />
                    <span className="text-gray-300 text-[10px]">Seri</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.4)]" />
                    <span className="text-gray-300 text-[10px]">Kalah</span>
                  </span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ==================== EUROPEAN LEAGUES TAB PANEL ==================== */}
        {activeMainTab === 'EURO_LEAGUES' && (
          <div className="space-y-6">
            
            {/* League Switch Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none flex-nowrap scrollbar-thin">
              {LEAGUE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedEuroLeague(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold tracking-wider shrink-0 transition-all cursor-pointer ${
                    selectedEuroLeague === tab.id
                      ? 'bg-brand text-black border-transparent shadow-sm'
                      : 'bg-[#1c1c1c] border-neutral-800 text-gray-300 hover:text-white hover:border-neutral-600'
                  }`}
                >
                  <img
                    src={`https://flagcdn.com/w20/${tab.flag}.png`}
                    className="w-4 h-3.5 object-cover rounded-sm"
                    alt={tab.label}
                  />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Render European League Table */}
            <div className="bg-[#1c1c1c] border border-neutral-800 rounded-3xl p-4 sm:p-6 relative overflow-hidden shadow-sm">
              <div className="w-full overflow-x-auto no-scrollbar">
                <div className="min-w-[500px] pr-1">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-black text-xl text-white tracking-wider uppercase">
                        {LEAGUE_TABS.find(t => t.id === selectedEuroLeague)?.label}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">MUSIM 2025/2026</span>
                    </div>
                    <div className="flex gap-4 text-[10px] font-mono font-bold text-gray-400">
                      <div className="flex gap-4 sm:gap-6 pr-6">
                        <span className="w-6 text-center">P</span>
                        <span className="w-6 text-center">W</span>
                        <span className="w-6 text-center">D</span>
                        <span className="w-6 text-center">L</span>
                        <span className="w-8 text-center">GD</span>
                      </div>
                      <span className="w-10 text-center text-emerald-400">PTS</span>
                      <span className="w-16 text-center hidden sm:block">FORM</span>
                    </div>
                  </div>

                  {/* Rows */}
                  <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
                    {(EUROPEAN_STANDINGS[selectedEuroLeague] || []).map((team) => {
                      const flag = selectedEuroLeague === 'PL' ? 'gb-eng' :
                                   selectedEuroLeague === 'PD' ? 'es' :
                                   selectedEuroLeague === 'BL1' ? 'de' :
                                   selectedEuroLeague === 'SA' ? 'it' : 'fr';
                      const gdClass = team.gd > 0 ? 'text-emerald-400 font-extrabold' : team.gd < 0 ? 'text-red-400 font-extrabold' : 'text-gray-500';
                      const gdText = team.gd > 0 ? `+${team.gd}` : `${team.gd}`;

                      return (
                        <div
                          key={team.name}
                          className={`flex items-center justify-between py-2.5 px-4 rounded-xl border border-transparent hover:border-neutral-700 transition-colors ${getZoneHighlightColor(team.rank, selectedEuroLeague, true)}`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`font-mono text-xs font-bold w-4 ${
                              team.rank <= 4 ? 'text-emerald-400 font-extrabold' : 'text-gray-400'
                            }`}>
                              {team.rank}
                            </span>
                            
                            <div className="w-6 h-6 bg-neutral-800 rounded-full flex items-center justify-center font-bold font-display text-[9px] text-gray-300 shadow-sm shrink-0 uppercase border border-neutral-700">
                              {team.name.substring(0, 2)}
                            </div>

                            <span className="font-semibold text-xs text-gray-200 truncate max-w-[140px] sm:max-w-none">
                              {team.name}
                            </span>
                          </div>

                          {/* Stats Numbers */}
                          <div className="flex gap-4 text-xs font-semibold font-mono text-gray-400">
                            <div className="flex gap-4 sm:gap-6 pr-6">
                              <span className="w-6 text-center text-gray-500">{team.played}</span>
                              <span className="w-6 text-center text-gray-200">{team.won}</span>
                              <span className="w-6 text-center text-gray-200">{team.drawn}</span>
                              <span className="w-6 text-center text-gray-200">{team.lost}</span>
                              <span className={`w-8 text-center ${gdClass}`}>{gdText}</span>
                            </div>
                            <span className="w-10 text-center font-black text-emerald-400 text-sm">{team.pts}</span>
                            <div className="w-16 hidden sm:block shrink-0">
                              {renderFormDots(team.form)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Legend Indicators for Europe */}
              <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-[10px] text-gray-400 font-mono">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-indigo-500 shrink-0" />
                    Liga Champions
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-orange-500 shrink-0" />
                    Liga Eropa
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-green-500 shrink-0" />
                    Liga Konferensi
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-red-500 shrink-0" />
                    Zona Degradasi
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-neutral-900/60 px-3 py-1.5 rounded-lg border border-neutral-800/80">
                  <span className="text-[10px] font-bold text-gray-400">LAST MATCH:</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.4)]" />
                    <span className="text-gray-300 text-[10px]">Menang</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-neutral-500" />
                    <span className="text-gray-300 text-[10px]">Seri</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.4)]" />
                    <span className="text-gray-300 text-[10px]">Kalah</span>
                  </span>
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
