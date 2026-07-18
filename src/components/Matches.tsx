import React, { useState } from 'react';
import { Calendar, MapPin, Award, CheckCircle2, ChevronRight, HelpCircle, Trophy, Search, Sparkles } from 'lucide-react';
import { Match } from '../types';

// Comprehensive lookup for country flag codes
export const TEAM_FLAG_MAP: Record<string, string> = {
  // UEFA
  'Albania': 'al', 'Andorra': 'ad', 'Armenia': 'am', 'Austria': 'at', 'Azerbaijan': 'az',
  'Belarus': 'by', 'Belgium': 'be', 'Bosnia and Herzegovina': 'ba', 'Bulgaria': 'bg',
  'Croatia': 'hr', 'Cyprus': 'cy', 'Czechia': 'cz', 'Denmark': 'dk', 'England': 'gb-eng',
  'Estonia': 'ee', 'Faroe Islands': 'fo', 'Finland': 'fi', 'France': 'fr', 'Georgia': 'ge',
  'Germany': 'de', 'Gibraltar': 'gi', 'Greece': 'gr', 'Hungary': 'hu', 'Iceland': 'is',
  'Israel': 'il', 'Italy': 'it', 'Kazakhstan': 'kz', 'Kosovo': 'xk', 'Latvia': 'lv',
  'Liechtenstein': 'li', 'Lithuania': 'lt', 'Luxembourg': 'lu', 'Malta': 'mt',
  'Moldova': 'md', 'Montenegro': 'me', 'Netherlands': 'nl', 'North Macedonia': 'mk',
  'Northern Ireland': 'gb-nir', 'Norway': 'no', 'Poland': 'pl', 'Portugal': 'pt',
  'Republic of Ireland': 'ie', 'Romania': 'ro', 'Russia': 'ru', 'San Marino': 'sm',
  'Scotland': 'gb-sct', 'Serbia': 'rs', 'Slovakia': 'sk', 'Slovenia': 'si',
  'Spain': 'es', 'Sweden': 'se', 'Switzerland': 'ch', 'Türkiye': 'tr', 'Ukraine': 'ua',
  'Wales': 'gb-wls',

  // CONMEBOL
  'Argentina': 'ar', 'Bolivia': 'bo', 'Brazil': 'br', 'Chile': 'cl', 'Colombia': 'co',
  'Ecuador': 'ec', 'Paraguay': 'py', 'Peru': 'pe', 'Uruguay': 'uy', 'Venezuela': 've',

  // CONCACAF
  'Antigua and Barbuda': 'ag', 'Bahamas': 'bs', 'Barbados': 'bb', 'Belize': 'bz',
  'Bermuda': 'bm', 'British Virgin Islands': 'vg', 'Canada': 'ca', 'Costa Rica': 'cr',
  'Cuba': 'cu', 'Curaçao': 'cw', 'Dominican Republic': 'do', 'El Salvador': 'sv',
  'Grenada': 'gd', 'Guatemala': 'gt', 'Guyana': 'gy', 'Haiti': 'ht', 'Honduras': 'hn',
  'Jamaica': 'jm', 'Mexico': 'mx', 'Nicaragua': 'ni', 'Panama': 'pa', 'Puerto Rico': 'pr',
  'Saint Kitts and Nevis': 'kn', 'Saint Lucia': 'lc',
  'Saint Vincent and the Grenadines': 'vc', 'Suriname': 'sr',
  'Trinidad and Tobago': 'tt', 'United States': 'us', 'US Virgin Islands': 'vi',
  'USA': 'us', 'Cayman Islands': 'ky',

  // CAF
  'Algeria': 'dz', 'Angola': 'ao', 'Benin': 'bj', 'Botswana': 'bw',
  'Burkina Faso': 'bf', 'Burundi': 'bi', 'Cameroon': 'cm', 'Cabo Verde': 'cv',
  'Central African Republic': 'cf', 'Chad': 'td', 'Comoros': 'km', 'Congo': 'cg',
  'DR Congo': 'cd', 'Egypt': 'eg', 'Equatorial Guinea': 'gq', 'Eritrea': 'er',
  'Eswatini': 'sz', 'Ethiopia': 'et', 'Gabon': 'ga', 'Gambia': 'gm', 'Ghana': 'gh',
  'Guinea': 'gn', 'Guinea-Bissau': 'gw', 'Ivory Coast': 'ci', 'Kenya': 'ke',
  'Lesotho': 'ls', 'Liberia': 'lr', 'Libya': 'ly', 'Madagascar': 'mg', 'Malawi': 'mw',
  'Mali': 'ml', 'Mauritania': 'mr', 'Mauritius': 'mu', 'Morocco': 'ma', 'Mozambique': 'mz',
  'Namibia': 'na', 'Nigeria': 'ng', 'Rwanda': 'rw', 'Senegal': 'sn',
  'Sierra Leone': 'sl', 'Somalia': 'so', 'South Africa': 'za', 'South Sudan': 'ss',
  'Sudan': 'sd', 'Tanzania': 'tz', 'Togo': 'tg', 'Tunisia': 'tn', 'Uganda': 'ug',
  'Zambia': 'zm', 'Zimbabwe': 'zw',

  // AFC
  'Afghanistan': 'af', 'Australia': 'au', 'Bahrain': 'bh', 'Bangladesh': 'bd',
  'Cambodia': 'kh', 'China': 'cn', 'Chinese Taipei': 'tw', 'Guam': 'gu', 'India': 'in',
  'Indonesia': 'id', 'Iraq': 'iq', 'Iran': 'ir', 'Japan': 'jp', 'Jordan': 'jo',
  'Korea DPR': 'kp', 'South Korea': 'kr', 'Kuwait': 'kw', 'Kyrgyzstan': 'kg',
  'Laos': 'la', 'Lebanon': 'lb', 'Macau': 'mo', 'Malaysia': 'my', 'Maldives': 'mv',
  'Mongolia': 'mn', 'Myanmar': 'mm', 'Nepal': 'np', 'Northern Mariana Islands': 'mp',
  'Oman': 'om', 'Pakistan': 'pk', 'Palestine': 'ps', 'Philippines': 'ph', 'Qatar': 'qa',
  'Saudi Arabia': 'sa', 'Singapore': 'sg', 'Sri Lanka': 'lk', 'Syria': 'sy',
  'Tajikistan': 'tj', 'Thailand': 'th', 'Timor-Leste': 'tl', 'Turkmenistan': 'tm',
  'United Arab Emirates': 'ae', 'Uzbekistan': 'uz', 'Vietnam': 'vn', 'Yemen': 'ye',

  // OFC
  'American Samoa': 'as', 'Cook Islands': 'ck', 'Fiji': 'fj', 'New Caledonia': 'nc',
  'New Zealand': 'nz', 'Papua New Guinea': 'pg', 'Samoa': 'ws',
  'Solomon Islands': 'sb', 'Tahiti': 'pf', 'Tonga': 'to', 'Vanuatu': 'vu',

  // Varian & Youth Teams
  'Australia [n]': 'au',
  'Australia U19': 'au', 'Australia U20': 'au', 'Australia U23': 'au',
  'Belgium U19': 'be', 'Belgium U20': 'be', 'Belgium U21': 'be', 'Belgium U23': 'be',
  'Brazil [n]': 'br',
  'Brazil U19': 'br', 'Brazil U20': 'br', 'Brazil U21': 'br', 'Brazil U23': 'br',
  'Cambodia U19': 'kh', 'Canada U20': 'ca', 'Colombia U19': 'co', 'Colombia U20': 'co', 'Colombia U21': 'co', 'Colombia U23': 'co',
  'Croatia U19': 'hr', 'Croatia U20': 'hr', 'Croatia U21': 'hr', 'Croatia U23': 'hr',
  'Denmark U19': 'dk', 'Denmark U20': 'dk', 'Denmark U21': 'dk', 'Denmark U23': 'dk',
  'Denmark [n]': 'dk',
  'England [n]': 'gb-eng',
  'England U19': 'gb-eng', 'England U20': 'gb-eng', 'England U21': 'gb-eng', 'England U23': 'gb-eng',
  'France U19': 'fr', 'France U20': 'fr', 'France U21': 'fr', 'France U23': 'fr',
  'Germany U19': 'de', 'Germany U20': 'de', 'Germany U21': 'de', 'Germany U23': 'de',
  'Ghana U19': 'gh', 'Ghana U20': 'gh', 'Ghana U21': 'gh', 'Ghana U23': 'gh',
  'Iran U19': 'ir', 'Iran U20': 'ir', 'Iran U21': 'ir', 'Iran U23': 'ir',
  'Ireland U19': 'ie', 'Ireland U20': 'ie', 'Ireland U21': 'ie', 'Ireland U23': 'ie',
  'Ivory Coast U19': 'ci', 'Ivory Coast U20': 'ci', 'Ivory Coast U23': 'ci',
  'Italy U19': 'it', 'Italy U20': 'it', 'Italy U21': 'it', 'Italy U23': 'it',
  'Japan U19': 'jp', 'Japan U20': 'jp', 'Japan U21': 'jp', 'Japan U23': 'jp',
  'South Korea [n]': 'kr', 'South Korea U19': 'kr', 'South Korea U20': 'kr', 'South Korea U23': 'kr',
  'Malaysia U19': 'my', 'Malaysia U20': 'my', 'Malaysia U23': 'my',
  'Mexico U19': 'mx', 'Mexico U20': 'mx', 'Mexico U21': 'mx', 'Mexico U23': 'mx',
  'Morocco U19': 'ma', 'Morocco U20': 'ma', 'Morocco U21': 'ma', 'Morocco U23': 'ma',
  'Netherlands U19': 'nl', 'Netherlands U20': 'nl', 'Netherlands U21': 'nl', 'Netherlands U23': 'nl',
  'Nigeria U19': 'ng', 'Nigeria U20': 'ng', 'Nigeria U21': 'ng', 'Nigeria U23': 'ng',
  'Northern Ireland U21': 'gb-nir',
  'Norway U19': 'no', 'Norway U20': 'no', 'Norway U21': 'no', 'Norway U23': 'no',
  'Norway [w] U23': 'no',
  'Panama U19': 'pa', 'Panama U20': 'pa', 'Panama U21': 'pa', 'Panama U23': 'pa',
  'Peru U19': 'pe', 'Peru U20': 'pe', 'Peru U21': 'pe', 'Peru U23': 'pe',
  'Philippines U19': 'ph', 'Philippines U20': 'ph', 'Philippines U23': 'ph',
  'Poland U19': 'pl', 'Poland U20': 'pl', 'Poland U21': 'pl', 'Poland U23': 'pl',
  'Portugal U19': 'pt', 'Portugal U20': 'pt', 'Portugal U21': 'pt', 'Portugal U23': 'pt',
  'Saudi Arabia U19': 'sa', 'Saudi Arabia U20': 'sa', 'Saudi Arabia U23': 'sa', 'Saudi Arabia U21': 'sa',
  'Senegal U19': 'sn', 'Senegal U20': 'sn', 'Senegal U21': 'sn', 'Senegal U23': 'sn',
  'Singapore U19': 'sg', 'Singapore U20': 'sg', 'Singapore U23': 'sg',
  'Spain U19': 'es', 'Spain U20': 'es', 'Spain U21': 'es', 'Spain U23': 'es',
  'Sweden U19': 'se', 'Sweden U20': 'se', 'Sweden U21': 'se', 'Sweden U23': 'se',
  'Sweden [w] U23': 'se',
  'Switzerland U19': 'ch', 'Switzerland U20': 'ch', 'Switzerland U21': 'ch', 'Switzerland U23': 'ch',
  'Türkiye U19': 'tr', 'Türkiye U20': 'tr', 'Türkiye U21': 'tr', 'Türkiye U23': 'tr',
  'Ukraine U19': 'ua', 'Ukraine U20': 'ua', 'Ukraine U21': 'ua', 'Ukraine U23': 'ua',
  'United States U19': 'us', 'United States U20': 'us', 'United States U23': 'us',
  'Uruguay U19': 'uy', 'Uruguay U20': 'uy', 'Uruguay U21': 'uy', 'Uruguay U23': 'uy',
  'Venezuela [n]': 've',
  'Venezuela U19': 've', 'Venezuela U20': 've', 'Venezuela U23': 've',
  'Wales U19': 'gb-wls', 'Wales U20': 'gb-wls', 'Wales U21': 'gb-wls', 'Wales U23': 'gb-wls',
  'Kosovo U19': 'xk', 'Kosovo U20': 'xk', 'Kosovo U21': 'xk', 'Kosovo U23': 'xk',
  'Algeria U19': 'dz', 'Algeria U20': 'dz', 'Algeria U21': 'dz', 'Algeria U23': 'dz',
  'Tunisia U19': 'tn', 'Tunisia U20': 'tn', 'Tunisia U21': 'tn', 'Tunisia U23': 'tn',
  'Egypt U19': 'eg', 'Egypt U20': 'eg', 'Egypt U21': 'eg', 'Egypt U23': 'eg',
  'China U19': 'cn', 'China U20': 'cn', 'China U23': 'cn',
  'Thailand U19': 'th', 'Thailand U23': 'th',
  'Indonesia U19': 'id', 'Indonesia U23': 'id',
  'Iraq U19': 'iq', 'Iraq U20': 'iq', 'Iraq U23': 'iq',
  'UAE U19': 'ae', 'UAE U23': 'ae',
  'Oman U19': 'om', 'Oman U23': 'om',
  'Jordan U19': 'jo', 'Jordan U23': 'jo',
  'Syria U19': 'sy', 'Syria U23': 'sy',
  'Guam U19': 'gu', 'DR Congo U23': 'cd',
  'Bolivia [n]': 'bo', 'Argentina [n]': 'ar', 'Netherlands [n]': 'nl', 'Peru [n]': 'pe',
  'Vaasa VPS': 'fi', 'Seinajoen JK': 'fi', 'Shandong Taishan': 'cn', 'Yunnan Yukun': 'cn',
  'Suwon FC': 'kr', 'Jeonnam Dragons': 'kr', 'Cheonan City': 'kr', 'Gimhae FC': 'kr',
  'Dundalk': 'ie', 'Drogheda United': 'ie', 'Waterford FC': 'ie', 'St. Patricks Athletic': 'ie',
  'Green Gully Cavaliers': 'au', 'Altona Magic': 'au', 'Dandenong City SC': 'au', 'South Melbourne': 'au',
  'Oakleigh Cannons': 'au', 'Avondale FC': 'au', 'Preston Lions': 'au', 'Hume City': 'au',
  'FC KTP': 'fi', 'JaPS': 'fi', 'PK-35 Helsinki': 'fi', 'KaPa Helsinki': 'fi',
  'IR Reykjavik': 'is', 'Throttur Reykjavik': 'is', 'UMF Njardvik': 'is', 'Grindavik': 'is',
  'Leiknir Reykjavik': 'is', 'Grotta': 'is', 'Aegir Thorlakshofn': 'is', 'HK Kopavogur': 'is',
  'Athlone Town': 'ie', 'Cobh Ramblers': 'ie', 'Wexford FC': 'ie', 'Kerry FC': 'ie',
  'Finn Harps': 'ie', 'Treaty United': 'ie', 'Bray Wanderers': 'ie', 'UC Dublin': 'ie',
  'Cork City': 'ie', 'Longford Town': 'ie', 'Inter Turku 2': 'fi', 'RoPS Rovaniemi': 'fi',
  'Tampere United': 'fi', 'Salon Palloilijat': 'fi', 'Peninsula Power': 'au', 'Wynnum Wolves FC': 'au',
  'Brisbane Roar FC B': 'au', 'Rochedale Rovers': 'au', 'Dnepr Mogilev': 'by', 'FC Minsk': 'by',
  'Holland Park Hawks': 'au', 'North Star': 'au', 'Northcote City': 'au', 'Melbourne Knights': 'au',
  'Brunswick Juventus FC': 'au', 'Western United [Youth]': 'au', 'Langwarrin SC': 'au', 'Melbourne Victory [Youth]': 'au',
  'Macarthur Rams': 'au', 'Bankstown City Lions': 'au', 'Harju JK Laagri': 'ee', 'Narva Trans': 'ee',
  'Germany [w] U19': 'de', 'Spain [w] U19': 'es', 'Timor Leste [w]': 'tl', 'Indonesia [w]': 'id',
  'Malaysia [w]': 'my', 'Laos [w]': 'la', 'Juventude RS': 'br', 'Vila Nova GO': 'br',
  'Sport Club do Recife PE': 'br', 'Botafogo SP': 'br', 'Leones FC Quito': 'ec', 'Universidad Catolica del Ecuador': 'ec',
  'Tecnico Universitario': 'ec', 'Macara': 'ec', 'Deportivo Maldonado': 'uy', 'Albion FC': 'uy',
  'Cienciano': 'pe', 'AD Tarma': 'pe', 'Alianza Atletico': 'pe', 'Pirata FC': 'pe',
  'Sport Boys Association': 'pe', 'Comerciantes FC': 'pe', 'Launceston United SC': 'au', 'Riverside Olympic FC': 'au',
  'Glenorchy Knights': 'au', 'Kingborough Lions United': 'au',
  'Craiova': 'ro', 'FC Maxline Vitebsk': 'by', 'FC Atert Bissen': 'lu', 'KI Klaksvik': 'fo',
  'KF Egnatia': 'al', 'FC Petrocub': 'md', 'Sutjeska Niksic': 'me', 'Kairat Almaty': 'kz',
  'KF Malisheva [n]': 'xk', 'KF Malisheva': 'xk', 'KF Vllaznia': 'al', 'Decic Tuzi': 'me',
  'FK Liepaja': 'lv', 'JIPPO Joensuu': 'fi', 'MP Mikkeli': 'fi', 'Libertad FC de Loja': 'ec',
  'Deportivo Cuenca': 'ec', 'LDU Quito': 'ec', 'Barcelona SC': 'ec', 'Guayaquil City': 'ec',
  'Real Potosi': 'bo', 'CD San Antonio Bulo Bulo': 'bo', 'The Strongest': 'bo', 'Oriente Petrolero': 'bo',
  'Vinotinto del Ecuador': 'ec', 'El Nacional': 'ec', 'Miami FC': 'us', 'Indy Eleven': 'us',
  'Lexington SC': 'us', 'New Mexico United': 'us', 'Sporting JAX': 'us', 'Pittsburgh Riverhounds': 'us'
};

export interface MatchWithHC {
  id: string;
  date: string;
  time: string;
  league: string;
  flag: string;
  homeTeam: string;
  awayTeam: string;
  handicap: string;
  predictedScore?: string;
}

const FULL_MATCHES: MatchWithHC[] = [
  { id: 'm-1', date: '19/07', time: '04:00', league: 'WORLD CUP 2026 [ IN CANADA, MEXICO & USA ]', flag: 'world', homeTeam: 'France', awayTeam: 'England', handicap: '0 : 1/2', predictedScore: '0 - 2' },
  { id: 'm-2', date: '18/07', time: '19:00', league: 'NORWAY ELITESERIEN', flag: 'no', homeTeam: '[6] Ham-Kam', awayTeam: '[1] Tromso', handicap: '1/4 : 0', predictedScore: '2 - 1' },
  { id: 'm-3', date: '18/07', time: '21:00', league: 'NORWAY ELITESERIEN', flag: 'no', homeTeam: '[15] Kristiansund', awayTeam: '[7] Sarpsborg 08', handicap: '1/4 : 0', predictedScore: '1 - 3' },
  { id: 'm-4', date: '18/07', time: '21:00', league: 'NORWAY ELITESERIEN', flag: 'no', homeTeam: '[4] Lillestrom', awayTeam: '[13] KFUM Oslo', handicap: '0 : 3/4', predictedScore: '2 - 0' },
  { id: 'm-5', date: '18/07', time: '21:00', league: 'NORWAY ELITESERIEN', flag: 'no', homeTeam: '[16] Start IK', awayTeam: '[12] Rosenborg', handicap: '1/4 : 0', predictedScore: '0 - 1' },
  { id: 'm-6', date: '18/07', time: '23:00', league: 'NORWAY ELITESERIEN', flag: 'no', homeTeam: '[2] Viking', awayTeam: '[10] Sandefjord', handicap: '0 : 1 3/4', predictedScore: '3 - 1' },
  { id: 'm-7', date: '18/07', time: '23:00', league: 'NORWAY ELITESERIEN', flag: 'no', homeTeam: '[5] Molde', awayTeam: '[9] Brann', handicap: '0 : 1/4', predictedScore: '2 - 2' },
  { id: 'm-8', date: '18/07', time: '20:00', league: 'SWEDEN ALLSVENSKAN', flag: 'se', homeTeam: '[5] AIK Fotboll', awayTeam: '[7] GAIS Goteborg', handicap: '0 : 1/4', predictedScore: '1 - 0' },
  { id: 'm-9', date: '18/07', time: '19:00', league: 'FINLAND VEIKKAUSLIIGA', flag: 'fi', homeTeam: '[5] HJK Helsinki', awayTeam: '[3] Vaasa VPS', handicap: '0 : 1/2', predictedScore: '2 - 1' },
  { id: 'm-10', date: '18/07', time: '21:00', league: 'FINLAND VEIKKAUSLIIGA', flag: 'fi', homeTeam: '[10] Seinajoen JK', awayTeam: '[1] KuPS', handicap: '1/4 : 0', predictedScore: '0 - 2' },
  { id: 'm-11', date: '18/07', time: '21:00', league: 'FINLAND VEIKKAUSLIIGA', flag: 'fi', homeTeam: '[4] AC Oulu', awayTeam: '[6] Gnistan Helsinki', handicap: '0 : 1/4', predictedScore: '1 - 1' },
  { id: 'm-12', date: '18/07', time: '23:30', league: 'RUSSIA SUPER CUP', flag: 'ru', homeTeam: 'Zenit St. Petersburg [n]', awayTeam: 'Spartak Moscow', handicap: '0 : 1/4', predictedScore: '2 - 1' },
  { id: 'm-13', date: '18/07', time: '18:00', league: 'SWEDEN SUPERETTAN', flag: 'se', homeTeam: '[7] IK Oddevold', awayTeam: '[2] Varbergs BoIS', handicap: '0 : 1/4', predictedScore: '0 - 1' },
  { id: 'm-14', date: '18/07', time: '20:00', league: 'SWEDEN SUPERETTAN', flag: 'se', homeTeam: '[5] Ostersunds FK', awayTeam: '[4] Landskrona BoIS', handicap: '0 : 1/4', predictedScore: '2 - 2' },
  { id: 'm-15', date: '18/07', time: '22:00', league: 'SWEDEN SUPERETTAN', flag: 'se', homeTeam: '[8] Osters', awayTeam: '[11] IK Brage', handicap: '0 : 1/4', predictedScore: '3 - 1' },
  { id: 'm-16', date: '18/07', time: '18:00', league: 'CHINA FOOTBALL SUPER LEAGUE', flag: 'cn', homeTeam: '[2] Chongqing Tonglianglong', awayTeam: '[8] Zhejiang Professional FC', handicap: '1/4 : 0', predictedScore: '2 - 0' },
  { id: 'm-17', date: '18/07', time: '18:35', league: 'CHINA FOOTBALL SUPER LEAGUE', flag: 'cn', homeTeam: '[3] Dalian Yingbo', awayTeam: '[4] Shandong Taishan', handicap: '0 : 1/4', predictedScore: '1 - 2' },
  { id: 'm-18', date: '18/07', time: '18:35', league: 'CHINA FOOTBALL SUPER LEAGUE', flag: 'cn', homeTeam: '[11] Shanghai Shenhua', awayTeam: '[15] Tianjin Jinmen Tiger', handicap: '0 : 1 1/4', predictedScore: '3 - 0' },
  { id: 'm-19', date: '18/07', time: '19:00', league: 'CHINA FOOTBALL SUPER LEAGUE', flag: 'cn', homeTeam: '[16] Wuhan Three Towns', awayTeam: '[10] Shenzhen Peng City', handicap: '0 : 1/4', predictedScore: '1 - 1' },
  { id: 'm-20', date: '18/07', time: '17:30', league: 'KOREA K-LEAGUE 1', flag: 'kr', homeTeam: '[10] Daejeon Hana Citizen', awayTeam: '[5] Ulsan HD FC', handicap: '0 : 1/4', predictedScore: '0 - 3' },
  { id: 'm-21', date: '18/07', time: '17:30', league: 'KOREA K-LEAGUE 1', flag: 'kr', homeTeam: '[3] Gangwon FC', awayTeam: '[11] Gimcheon Sangmu FC', handicap: '0 : 1/2', predictedScore: '2 - 1' },
  { id: 'm-22', date: '18/07', time: '17:30', league: 'KOREA K-LEAGUE 1', flag: 'kr', homeTeam: '[7] Incheon United', awayTeam: '[2] Jeonbuk Hyundai Motors', handicap: '1/4 : 0', predictedScore: '1 - 2' },
  { id: 'm-23', date: '18/07', time: '17:30', league: 'KOREA K-LEAGUE 1', flag: 'kr', homeTeam: '[8] Jeju SK FC', awayTeam: '[4] Pohang Steelers', handicap: '0 : 0', predictedScore: '0 - 0' },
  { id: 'm-24', date: '18/07', time: '17:30', league: 'KOREA K-LEAGUE 2', flag: 'kr', homeTeam: '[4] Suwon FC', awayTeam: '[5] Seoul E-Land FC', handicap: '1/4 : 0', predictedScore: '2 - 0' },
  { id: 'm-25', date: '18/07', time: '17:30', league: 'KOREA K-LEAGUE 2', flag: 'kr', homeTeam: '[8] Gimpo FC', awayTeam: '[3] Daegu FC', handicap: '1/4 : 0', predictedScore: '1 - 3' },
  { id: 'm-26', date: '18/07', time: '17:30', league: 'KOREA K-LEAGUE 2', flag: 'kr', homeTeam: '[11] Seongnam FC', awayTeam: '[1] Busan I.Park', handicap: '1/4 : 0', predictedScore: '0 - 2' },
  { id: 'm-27', date: '18/07', time: '17:30', league: 'KOREA K-LEAGUE 2', flag: 'kr', homeTeam: '[16] Jeonnam Dragons', awayTeam: '[7] Chungnam Asan', handicap: '0 : 0', predictedScore: '1 - 1' },
  { id: 'm-28', date: '18/07', time: '11:00', league: 'AUSTRALIA VICTORIA NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: '[2] Hume City', awayTeam: '[1] Oakleigh Cannons', handicap: '1/4 : 0', predictedScore: '1 - 0' },
  { id: 'm-29', date: '18/07', time: '12:00', league: 'AUSTRALIA VICTORIA NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: '[3] Avondale FC', awayTeam: '[9] St Albans Dinamo', handicap: '0 : 1 1/4', predictedScore: '3 - 1' },
  { id: 'm-30', date: '18/07', time: '12:15', league: 'AUSTRALIA VICTORIA NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: '[11] Altona Magic', awayTeam: '[5] Heidelberg United', handicap: '3/4 : 0', predictedScore: '0 - 2' },
  { id: 'm-31', date: '18/07', time: '12:15', league: 'AUSTRALIA VICTORIA NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: '[6] South Melbourne', awayTeam: '[4] Preston Lions', handicap: '0 : 0', predictedScore: '2 - 2' },
  { id: 'm-32', date: '18/07', time: '15:00', league: 'AUSTRALIA VICTORIA NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: '[8] Caroline Springs George Cross FC', awayTeam: '[7] Melbourne City FC [Youth]', handicap: '0 : 0', predictedScore: '1 - 2' },
  { id: 'm-33', date: '18/07', time: '23:00', league: 'ICELAND PREMIER LEAGUE', flag: 'is', homeTeam: '[12] Thor Akureyri', awayTeam: '[1] Vikingur Reykjavik', handicap: '2 1/2 : 0', predictedScore: '0 - 3' },
  { id: 'm-34', date: '19/07', time: '02:15', league: 'ICELAND PREMIER LEAGUE', flag: 'is', homeTeam: '[5] Valur Reykjavik', awayTeam: '[3] Fram Reykjavik', handicap: '3/4 : 0', predictedScore: '2 - 1' },
  { id: 'm-35', date: '18/07', time: '22:30', league: 'ROMANIA SUPERLIGA', flag: 'ro', homeTeam: 'Otelul Galati', awayTeam: 'CFR Cluj', handicap: '1/4 : 0', predictedScore: '1 - 1' },
  { id: 'm-36', date: '19/07', time: '01:15', league: 'ROMANIA SUPERLIGA', flag: 'ro', homeTeam: 'CS Universitatea Craiova', awayTeam: 'UTA Arad', handicap: '0 : 1 1/4', predictedScore: '3 - 0' },
  { id: 'm-37', date: '18/07', time: '20:00', league: 'FINLAND YKKOSLIIGA', flag: 'fi', homeTeam: '[7] Ekenas IF', awayTeam: '[5] JaPS', handicap: '0 : 1/2', predictedScore: '2 - 1' },
  { id: 'm-38', date: '18/07', time: '21:00', league: 'FINLAND YKKOSLIIGA', flag: 'fi', homeTeam: '[1] FC KTP', awayTeam: '[2] PK-35 Helsinki', handicap: '0 : 3/4', predictedScore: '1 - 0' },
  { id: 'm-39', date: '18/07', time: '12:00', league: 'AUSTRALIA NEW SOUTH WALES PREMIER LEAGUE', flag: 'au', homeTeam: '[10] Western Sydney Wanderers [Youth]', awayTeam: '[2] APIA Leichhardt FC', handicap: '3/4 : 0', predictedScore: '0 - 2' },
  { id: 'm-40', date: '18/07', time: '14:15', league: 'AUSTRALIA NEW SOUTH WALES PREMIER LEAGUE', flag: 'au', homeTeam: '[11] UNSW FC', awayTeam: '[8] NWS Spirit FC', handicap: '0 : 0', predictedScore: '1 - 1' },
  { id: 'm-41', date: '18/07', time: '14:30', league: 'AUSTRALIA NEW SOUTH WALES PREMIER LEAGUE', flag: 'au', homeTeam: '[5] Sutherland Sharks', awayTeam: '[16] Sydney Olympic', handicap: '0 : 1/4', predictedScore: '2 - 0' },
  { id: 'm-42', date: '18/07', time: '15:30', league: 'AUSTRALIA NEW SOUTH WALES PREMIER LEAGUE', flag: 'au', homeTeam: '[15] St George FC', awayTeam: '[4] Rockdale Ilinden FC', handicap: '3/4 : 0', predictedScore: '1 - 3' },
  { id: 'm-43', date: '18/07', time: '23:00', league: 'BULGARIA FIRST PROFESSIONAL FOOTBALL LEAGUE', flag: 'bg', homeTeam: 'FC Septemvri Sofia', awayTeam: 'FC Arda Kardzhali', handicap: '1/4 : 0', predictedScore: '0 - 2' },
  { id: 'm-44', date: '19/07', time: '01:15', league: 'BULGARIA FIRST PROFESSIONAL FOOTBALL LEAGUE', flag: 'bg', homeTeam: 'Ludogorets Razgrad', awayTeam: 'Lokomotiv Plovdiv', handicap: '0 : 1 1/2', predictedScore: '3 - 1' },
  { id: 'm-45', date: '18/07', time: '21:00', league: 'ICELAND 1ST DIV', flag: 'is', homeTeam: '[8] Grotta', awayTeam: '[12] Aegir Thorlakshofn', handicap: '0 : 1', predictedScore: '2 - 0' },
  { id: 'm-46', date: '18/07', time: '21:00', league: 'ICELAND 1ST DIV', flag: 'is', homeTeam: '[9] Grindavik', awayTeam: '[10] IR Reykjavik', handicap: '0 : 1/4', predictedScore: '1 - 1' },
  { id: 'm-47', date: '18/07', time: '23:00', league: 'ICELAND 1ST DIV', flag: 'is', homeTeam: '[4] Throttur Reykjavik', awayTeam: '[11] Volsungur', handicap: '0 : 2 1/4', predictedScore: '3 - 2' },
  { id: 'm-48', date: '18/07', time: '14:00', league: 'WESTERN AUSTRALIA NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: '[1] Perth Redstar FC', awayTeam: '[5] Fremantle City FC', handicap: '0 : 1/2', predictedScore: '2 - 1' },
  { id: 'm-49', date: '18/07', time: '14:00', league: 'WESTERN AUSTRALIA NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: '[12] Balcatta Etna FC', awayTeam: '[6] Stirling Macedonia', handicap: '3/4 : 0', predictedScore: '1 - 2' },
  { id: 'm-50', date: '18/07', time: '14:00', league: 'WESTERN AUSTRALIA NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: '[11] Perth Glory [Youth]', awayTeam: '[10] Armadale SC', handicap: '1/4 : 0', predictedScore: '0 - 1' },
  { id: 'm-51', date: '18/07', time: '16:00', league: 'WESTERN AUSTRALIA NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: '[8] Dianella White Eagles', awayTeam: '[3] Olympic Kingsway SC', handicap: '1/2 : 0', predictedScore: '1 - 3' },
  { id: 'm-52', date: '19/07', time: '01:00', league: 'SERBIA SUPERLIGA', flag: 'rs', homeTeam: 'FK Novi Pazar', awayTeam: 'FK Radnicki 1923', handicap: '0 : 0', predictedScore: '2 - 2' },
  { id: 'm-53', date: '19/07', time: '01:00', league: 'SERBIA SUPERLIGA', flag: 'rs', homeTeam: 'FK Zemun', awayTeam: 'FK Partizan', handicap: '1 1/4 : 0', predictedScore: '0 - 3' },
  { id: 'm-54', date: '18/07', time: '12:00', league: 'AUSTRALIA QUEENSLAND NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: '[10] Gold Coast United', awayTeam: '[2] Lions FC', handicap: '1 3/4 : 0', predictedScore: '1 - 2' },
  { id: 'm-55', date: '18/07', time: '13:00', league: 'AUSTRALIA QUEENSLAND NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: '[4] Gold Coast Knights', awayTeam: '[7] Wynnum Wolves FC', handicap: '0 : 3/4', predictedScore: '3 - 1' },
  { id: 'm-56', date: '18/07', time: '13:30', league: 'AUSTRALIA QUEENSLAND NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: '[3] Moreton City Excelsior', awayTeam: '[1] Peninsula Power', handicap: '0 : 0', predictedScore: '2 - 2' },
  { id: 'm-57', date: '18/07', time: '14:00', league: 'AUSTRALIA QUEENSLAND NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: '[9] Rochedale Rovers', awayTeam: '[6] Brisbane City FC', handicap: '1/2 : 0', predictedScore: '0 - 1' },
  { id: 'm-58', date: '18/07', time: '15:00', league: 'AUSTRALIA QUEENSLAND NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: '[5] Eastern Suburbs', awayTeam: '[12] Magic United TFA', handicap: '0 : 1 3/4', predictedScore: '3 - 0' },
  { id: 'm-59', date: '18/07', time: '23:00', league: 'SLOVENIA PRVA LIGA', flag: 'si', homeTeam: 'NK Radomlje', awayTeam: 'NK Brinje Grosuplje', handicap: '0 : 1/4', predictedScore: '2 - 0' },
  { id: 'm-60', date: '19/07', time: '01:15', league: 'SLOVENIA PRVA LIGA', flag: 'si', homeTeam: 'Olimpija Ljubljana', awayTeam: 'NK Bravo', handicap: '0 : 1/4', predictedScore: '1 - 0' },
  { id: 'm-61', date: '18/07', time: '23:00', league: 'LITHUANIA A LEAGUE', flag: 'lt', homeTeam: '[1] Kauno Zalgiris', awayTeam: '[9] FA Siauliai', handicap: '0 : 1 3/4', predictedScore: '3 - 1' },
  { id: 'm-62', date: '18/07', time: '14:30', league: 'AUSTRALIA FOOTBALL QUEENSLAND PREMIER LEAGUE 1', flag: 'au', homeTeam: 'Ipswich FC', awayTeam: 'North Star', handicap: '0 : 3/4', predictedScore: '1 - 2' },
  { id: 'm-63', date: '18/07', time: '15:00', league: 'AUSTRALIA FOOTBALL QUEENSLAND PREMIER LEAGUE 1', flag: 'au', homeTeam: 'Brisbane Strikers', awayTeam: 'Broadbeach United', handicap: '0 : 0', predictedScore: '2 - 2' },
  { id: 'm-64', date: '18/07', time: '15:00', league: 'AUSTRALIA FOOTBALL QUEENSLAND PREMIER LEAGUE 1', flag: 'au', homeTeam: 'St George Willawong FC', awayTeam: 'Caboolture FC', handicap: '3/4 : 0', predictedScore: '3 - 1' },
  { id: 'm-65', date: '18/07', time: '15:15', league: 'AUSTRALIA FOOTBALL QUEENSLAND PREMIER LEAGUE 1', flag: 'au', homeTeam: 'Logan Lightning', awayTeam: 'Sunshine Coast Wanderers', handicap: '1/4 : 0', predictedScore: '0 - 1' },
  { id: 'm-66', date: '18/07', time: '23:00', league: 'LATVIA VIRSLIGA', flag: 'lv', homeTeam: '[2] Riga FC', awayTeam: '[9] FK Tukums 2000', handicap: '0 : 2 1/2', predictedScore: '2 - 0' },
  { id: 'm-67', date: '18/07', time: '12:00', league: 'AUSTRALIA VICTORIA PREMIER LEAGUE 1', flag: 'au', homeTeam: 'North Sunshine Eagles', awayTeam: 'Eltham Redbacks FC', handicap: '0 : 0', predictedScore: '1 - 1' },
  { id: 'm-68', date: '18/07', time: '12:00', league: 'AUSTRALIA VICTORIA PREMIER LEAGUE 1', flag: 'au', homeTeam: 'Langwarrin SC', awayTeam: 'Brunswick Juventus FC', handicap: '1/2 : 0', predictedScore: '2 - 0' },
  { id: 'm-69', date: '18/07', time: '14:00', league: 'AUSTRALIA VICTORIA PREMIER LEAGUE 1', flag: 'au', homeTeam: 'North Geelong Warriors', awayTeam: 'Melbourne Victory [Youth]', handicap: '1/4 : 0', predictedScore: '1 - 2' },
  { id: 'm-70', date: '18/07', time: '15:15', league: 'AUSTRALIA VICTORIA PREMIER LEAGUE 1', flag: 'au', homeTeam: 'FC Melbourne Srbija', awayTeam: 'Port Melbourne Sharks', handicap: '0 : 1 3/4', predictedScore: '0 - 3' },
  { id: 'm-71', date: '18/07', time: '14:00', league: 'AUSTRALIA FOOTBALL NEW SOUTH WALES LEAGUE 1', flag: 'au', homeTeam: 'Inter Lions FC', awayTeam: 'Rydalmere Lions FC', handicap: '0 : 1/4', predictedScore: '1 - 0' },
  { id: 'm-72', date: '18/07', time: '14:00', league: 'AUSTRALIA FOOTBALL NEW SOUTH WALES LEAGUE 1', flag: 'au', homeTeam: 'Canterbury Bankstown FC', awayTeam: 'Blacktown Spartans', handicap: '1/4 : 0', predictedScore: '2 - 1' },
  { id: 'm-73', date: '18/07', time: '14:00', league: 'AUSTRALIA FOOTBALL NEW SOUTH WALES LEAGUE 1', flag: 'au', homeTeam: 'Hills United', awayTeam: 'Hakoah Sydney City East FC', handicap: '0 : 1/4', predictedScore: '0 - 2' },
  { id: 'm-74', date: '18/07', time: '15:00', league: 'AUSTRALIA FOOTBALL NEW SOUTH WALES LEAGUE 1', flag: 'au', homeTeam: 'Western City Rangers FC', awayTeam: 'Newcastle Jets [Youth]', handicap: '1/4 : 0', predictedScore: '3 - 2' },
  { id: 'm-75', date: '18/07', time: '16:00', league: 'AUSTRALIA FOOTBALL NEW SOUTH WALES LEAGUE 1', flag: 'au', homeTeam: 'Bulls FC Academy', awayTeam: 'Bankstown City Lions', handicap: '0 : 0', predictedScore: '1 - 1' },
  { id: 'm-76', date: '18/07', time: '21:00', league: 'ESTONIA PREMIUM LIGA', flag: 'ee', homeTeam: 'Narva Trans', awayTeam: 'Parnu JK Vaprus', handicap: '1/4 : 0', predictedScore: '2 - 1' },
  { id: 'm-77', date: '18/07', time: '12:30', league: 'SOUTH AUSTRALIA STATE LEAGUE 1', flag: 'au', homeTeam: 'Salisbury United', awayTeam: 'Modbury Jets', handicap: '1 : 0', predictedScore: '3 - 1' },
  { id: 'm-79', date: '18/07', time: '12:30', league: 'SOUTH AUSTRALIA STATE LEAGUE 1', flag: 'au', homeTeam: 'Adelaide Atletico VSC', awayTeam: 'Adelaide Olympic', handicap: '0 : 1/4', predictedScore: '0 - 2' },
  { id: 'm-79', date: '18/07', time: '12:30', league: 'SOUTH AUSTRALIA STATE LEAGUE 1', flag: 'au', homeTeam: 'Adelaide Croatia Raiders', awayTeam: 'Eastern United FC', handicap: '0 : 1 1/4', predictedScore: '1 - 3' },
  { id: 'm-80', date: '18/07', time: '12:30', league: 'SOUTH AUSTRALIA STATE LEAGUE 1', flag: 'au', homeTeam: 'Adelaide Blue Eagles', awayTeam: 'Adelaide Cobras', handicap: '0 : 1 1/4', predictedScore: '2 - 1' },
  { id: 'm-81', date: '18/07', time: '12:30', league: 'SOUTH AUSTRALIA STATE LEAGUE 1', flag: 'au', homeTeam: 'South Adelaide Panthers', awayTeam: 'The Cove FC', handicap: '3/4 : 0', predictedScore: '1 - 0' },
  { id: 'm-82', date: '19/07', time: '06:00', league: 'MEXICO PRIMERA DIVISION', flag: 'mx', homeTeam: 'Pumas UNAM', awayTeam: 'Pachuca', handicap: '0 : 1/4', predictedScore: '2 - 1' },
  { id: 'm-83', date: '19/07', time: '08:00', league: 'MEXICO PRIMERA DIVISION', flag: 'mx', homeTeam: 'Monterrey', awayTeam: 'Santos Laguna', handicap: '0 : 1', predictedScore: '3 - 0' },
  { id: 'm-84', date: '19/07', time: '08:07', league: 'MEXICO PRIMERA DIVISION', flag: 'mx', homeTeam: 'Guadalajara Chivas', awayTeam: 'Deportivo Toluca', handicap: '0 : 1/4', predictedScore: '1 - 2' },
  { id: 'm-85', date: '19/07', time: '10:00', league: 'MEXICO PRIMERA DIVISION', flag: 'mx', homeTeam: 'Queretaro', awayTeam: 'Club America', handicap: '1/2 : 0', predictedScore: '0 - 1' },
  { id: 'm-86', date: '19/07', time: '02:00', league: 'BRAZIL SERIE B', flag: 'br', homeTeam: '[1] Criciuma EC SC', awayTeam: '[2] Vila Nova GO', handicap: '0 : 3/4', predictedScore: '2 - 1' },
  { id: 'm-87', date: '19/07', time: '02:00', league: 'BRAZIL SERIE B', flag: 'br', homeTeam: '[8] Sport Club do Recife PE', awayTeam: '[3] Operario Ferroviario EC', handicap: '0 : 1/2', predictedScore: '1 - 0' },
  { id: 'm-88', date: '19/07', time: '02:00', league: 'BRAZIL SERIE B', flag: 'br', homeTeam: '[19] Ponte Preta SP', awayTeam: '[9] Goias GO', handicap: '3/4 : 0', predictedScore: '0 - 2' },
  { id: 'm-89', date: '19/07', time: '04:00', league: 'BRAZIL SERIE B', flag: 'br', homeTeam: '[10] AC Goianiense GO', awayTeam: '[13] Athletic Club MG', handicap: '0 : 1/2', predictedScore: '3 - 2' },
  { id: 'm-90', date: '19/07', time: '02:00', league: 'ECUADOR LIGA PRO SERIE A', flag: 'ec', homeTeam: '[7] Deportivo Cuenca', awayTeam: '[4] Universidad Catolica del Ecuador', handicap: '0 : 0', predictedScore: '1 - 1' },
  { id: 'm-91', date: '19/07', time: '04:30', league: 'ECUADOR LIGA PRO SERIE A', flag: 'ec', homeTeam: '[6] LDU Quito', awayTeam: '[9] Leones FC Quito', handicap: '0 : 1', predictedScore: '2 - 0' },
  { id: 'm-92', date: '19/07', time: '07:00', league: 'ECUADOR LIGA PRO SERIE A', flag: 'ec', homeTeam: '[3] Barcelona SC', awayTeam: '[14] Libertad FC de Loja', handicap: '0 : 1 1/4', predictedScore: '3 - 1' },
  { id: 'm-93', date: '18/07', time: '23:00', league: 'PERU LIGA 1', flag: 'pe', homeTeam: 'Deportivo Moquegua', awayTeam: 'Comerciantes Unidos', handicap: '0 : 1/4', predictedScore: '2 - 1' },
  { id: 'm-94', date: '19/07', time: '01:15', league: 'PERU LIGA 1', flag: 'pe', homeTeam: 'AD Tarma', awayTeam: 'Universitario Deportes', handicap: '1/4 : 0', predictedScore: '1 - 0' },
  { id: 'm-95', date: '19/07', time: '03:30', league: 'PERU LIGA 1', flag: 'pe', homeTeam: 'Atletico Grau', awayTeam: 'UTC Cajamarca', handicap: '0 : 3/4', predictedScore: '2 - 2' },
  { id: 'm-96', date: '19/07', time: '06:30', league: 'PERU LIGA 1', flag: 'pe', homeTeam: 'Cusco FC', awayTeam: 'Alianza Atletico', handicap: '0 : 3/4', predictedScore: '3 - 2' },
  { id: 'm-97', date: '18/07', time: '22:30', league: 'URUGUAY TORNEO INTERMEDIO', flag: 'uy', homeTeam: 'CA Progreso', awayTeam: 'Deportivo Maldonado', handicap: '1/2 : 0', predictedScore: '1 - 0' },
  { id: 'm-98', date: '19/07', time: '02:00', league: 'URUGUAY TORNEO INTERMEDIO', flag: 'uy', homeTeam: 'Penarol', awayTeam: 'CA Boston River', handicap: '0 : 1', predictedScore: '2 - 1' },
  { id: 'm-99', date: '18/07', time: '23:30', league: 'CHILE PRIMERA B', flag: 'cl', homeTeam: 'Deportes Copiapo', awayTeam: 'Deportes Puerto Montt', handicap: '0 : 1/4', predictedScore: '1 - 0' },
  { id: 'm-100', date: '18/07', time: '23:30', league: 'CHILE PRIMERA B', flag: 'cl', homeTeam: 'Union San Felipe', awayTeam: 'Deportes Iquique', handicap: '1/4 : 0', predictedScore: '2 - 1' },
  { id: 'm-101', date: '19/07', time: '02:00', league: 'CHILE PRIMERA B', flag: 'cl', homeTeam: 'Deportes Recoleta', awayTeam: 'Santiago Wanderers', handicap: '0 : 0', predictedScore: '0 - 0' },
  { id: 'm-102', date: '19/07', time: '02:00', league: 'CHILE PRIMERA B', flag: 'cl', homeTeam: 'Deportes Temuco', awayTeam: 'Cobreloa', handicap: '0 : 1/4', predictedScore: '1 - 2' },
  { id: 'm-103', date: '18/07', time: '23:00', league: 'USL CHAMPIONSHIP', flag: 'us', homeTeam: 'Pittsburgh Riverhounds', awayTeam: 'Louisville City FC', handicap: '1/4 : 0', predictedScore: '2 - 1' },
  { id: 'm-104', date: '19/07', time: '06:00', league: 'USL CHAMPIONSHIP', flag: 'us', homeTeam: 'Loudoun United FC', awayTeam: 'FC Tampa Bay Rowdies', handicap: '1 : 0', predictedScore: '3 - 1' },
  { id: 'm-105', date: '19/07', time: '06:00', league: 'USL CHAMPIONSHIP', flag: 'us', homeTeam: 'Sporting JAX', awayTeam: 'Brooklyn FC', handicap: '1/4 : 0', predictedScore: '2 - 0' },
  { id: 'm-106', date: '19/07', time: '06:00', league: 'USL CHAMPIONSHIP', flag: 'us', homeTeam: 'Detroit City', awayTeam: 'Indy Eleven', handicap: '0 : 3/4', predictedScore: '1 - 2' },
  { id: 'm-107', date: '19/07', time: '06:30', league: 'USL CHAMPIONSHIP', flag: 'us', homeTeam: 'Charleston Battery', awayTeam: 'Sacramento Republic FC', handicap: '0 : 1/2', predictedScore: '2 - 1' },
  { id: 'm-108', date: '19/07', time: '06:30', league: 'USL CHAMPIONSHIP', flag: 'us', homeTeam: 'Rhode Island FC', awayTeam: 'Hartford Athletic', handicap: '0 : 3/4', predictedScore: '1 - 0' },
  { id: 'm-109', date: '19/07', time: '07:30', league: 'USL CHAMPIONSHIP', flag: 'us', homeTeam: 'FC Tulsa', awayTeam: 'El Paso Locomotive FC', handicap: '0 : 1/4', predictedScore: '0 - 3' },
  { id: 'm-110', date: '19/07', time: '08:00', league: 'USL CHAMPIONSHIP', flag: 'us', homeTeam: 'San Antonio FC', awayTeam: 'Las Vegas Lights FC', handicap: '0 : 1/2', predictedScore: '2 - 1' },
  { id: 'm-111', date: '19/07', time: '09:30', league: 'USL CHAMPIONSHIP', flag: 'us', homeTeam: 'Phoenix Rising FC', awayTeam: 'Monterey Bay FC', handicap: '0 : 3/4', predictedScore: '1 - 3' },
  { id: 'm-112', date: '18/07', time: '21:00', league: 'URUGUAY SEGUNDA DIVISION', flag: 'uy', homeTeam: 'Uruguay Montevideo FC', awayTeam: 'River Plate Montevideo', handicap: '0 : 0', predictedScore: '1 - 1' },
  { id: 'm-113', date: '19/07', time: '00:00', league: 'URUGUAY SEGUNDA DIVISION', flag: 'uy', homeTeam: 'Rentistas', awayTeam: 'Cerrito', handicap: '0 : 0', predictedScore: '2 - 0' },
  { id: 'm-114', date: '19/07', time: '05:30', league: 'URUGUAY SEGUNDA DIVISION', flag: 'uy', homeTeam: 'Club Oriental de Football', awayTeam: 'Huracan Paso de La Arena', handicap: '0 : 1/4', predictedScore: '1 - 2' },
  { id: 'm-115', date: '19/07', time: '02:00', league: 'CANADIAN PREMIER LEAGUE', flag: 'ca', homeTeam: '[2] Cavalry FC', awayTeam: '[4] HFX Wanderers FC', handicap: '0 : 1 1/4', predictedScore: '3 - 2' },
  { id: 'm-116', date: '18/07', time: '11:00', league: 'AUSTRALIA NORTHERN NEW SOUTH WALES PREMIER LEAGUE', flag: 'au', homeTeam: 'Adamstown Rosebud', awayTeam: 'Valentine FC', handicap: '0 : 1/2', predictedScore: '2 - 0' },
  { id: 'm-117', date: '18/07', time: '11:30', league: 'AUSTRALIA NORTHERN NEW SOUTH WALES PREMIER LEAGUE', flag: 'au', homeTeam: 'Lambton Jaffas FC', awayTeam: 'Maitland FC', handicap: '0 : 1/4', predictedScore: '1 - 2' },
  { id: 'm-118', date: '18/07', time: '13:30', league: 'AUSTRALIA NORTHERN NEW SOUTH WALES PREMIER LEAGUE', flag: 'au', homeTeam: 'Weston Workers Bears', awayTeam: 'Kahibah FC', handicap: '0 : 1 3/4', predictedScore: '3 - 1' },
  { id: 'm-119', date: '19/07', time: '10:00', league: 'AUSTRALIA NORTHERN NEW SOUTH WALES PREMIER LEAGUE', flag: 'au', homeTeam: 'Newcastle Olympic FC', awayTeam: 'Belmont Swansea United FC', handicap: '1/4 : 0', predictedScore: '2 - 1' },
  { id: 'm-120', date: '18/07', time: '11:30', league: 'AUSTRALIA TASMANIA NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: 'Riverside Olympic FC', awayTeam: 'Clarence Zebras', handicap: '0 : 0', predictedScore: '1 - 1' },
  { id: 'm-121', date: '18/07', time: '11:30', league: 'AUSTRALIA TASMANIA NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: 'Devonport City Strikers', awayTeam: 'South Hobart FC', handicap: '1/2 : 0', predictedScore: '2 - 1' },
  { id: 'm-122', date: '18/07', time: '13:45', league: 'AUSTRALIA TASMANIA NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: 'Launceston City FC', awayTeam: 'Kingborough Lions United', handicap: '1/2 : 0', predictedScore: '3 - 0' }
];

const getTeamInitials = (name: string): string => {
  if (!name) return 'TM';
  const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
  const words = cleanName.split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return 'TM';

  // Special known mappings for absolute perfection:
  const lowerName = name.toLowerCase();
  if (lowerName.includes('shandong')) return 'SD';
  if (lowerName.includes('yunnan')) return 'YN';
  if (lowerName.includes('suwon')) return 'SW';
  if (lowerName.includes('jeonnam')) return 'JN';
  if (lowerName.includes('cheonan')) return 'CA';
  if (lowerName.includes('gimhae')) return 'GH';
  if (lowerName.includes('dundalk')) return 'DUN';
  if (lowerName.includes('drogheda')) return 'DRO';
  if (lowerName.includes('vaasa')) return 'VPS';
  if (lowerName.includes('seinajoen')) return 'SJK';

  // Check if any word is 2-4 chars and fully uppercase (excluding common words like VS, FC)
  for (const word of words) {
    if (word.length >= 2 && word.length <= 4 && word === word.toUpperCase() && word !== 'VS' && word !== 'FC') {
      return word;
    }
  }

  if (words.length === 1) {
    return words[0].substring(0, Math.min(3, words[0].length)).toUpperCase();
  }

  // Combine first letter of each word
  let initials = '';
  for (const word of words) {
    if (word.toLowerCase() !== 'fc' && word.toLowerCase() !== 'united' && word.toLowerCase() !== 'city' && word.toLowerCase() !== 'football') {
      initials += word[0];
    }
  }
  if (initials.length >= 2) {
    return initials.substring(0, 3).toUpperCase();
  }

  // Fallback: just first letter of first two words
  return (words[0][0] + (words[1] ? words[1][0] : '')).substring(0, 3).toUpperCase();
};

const getTeamColorClass = (name: string): string => {
  if (!name) return 'bg-gray-600 text-white';
  
  // High contrast vibrant background colors
  const colors = [
    'bg-red-600 text-white border border-red-500/30',
    'bg-blue-600 text-white border border-blue-500/30',
    'bg-emerald-600 text-white border border-emerald-500/30',
    'bg-amber-600 text-white border border-amber-500/30',
    'bg-indigo-600 text-white border border-indigo-500/30',
    'bg-purple-600 text-white border border-purple-500/30',
    'bg-pink-600 text-white border border-pink-500/30',
    'bg-cyan-600 text-white border border-cyan-500/30',
    'bg-teal-600 text-white border border-teal-500/30',
    'bg-rose-600 text-white border border-rose-500/30',
  ];

  // Hash team name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

interface MatchesProps {
  activeTab: 'JADWAL' | 'PREDIKSI';
  setActiveTab: (tab: 'JADWAL' | 'PREDIKSI') => void;
  showAll: boolean;
  setShowAll: (showAll: boolean) => void;
}

export default function Matches({ activeTab, setActiveTab, showAll, setShowAll }: MatchesProps) {
  const [leagueFilter, setLeagueFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [userPredictions, setUserPredictions] = useState<Record<string, { home: string; away: string }>>({});
  const [savedUserPreds, setSavedUserPreds] = useState<Record<string, boolean>>({});

  const handlePredictScore = (matchId: string, type: 'home' | 'away', val: string) => {
    const cleaned = val.replace(/\D/g, '');
    setUserPredictions(prev => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        [type]: cleaned
      }
    }));
  };

  const handleSavePrediction = (matchId: string) => {
    const pred = userPredictions[matchId];
    if (pred?.home !== undefined && pred?.away !== undefined && pred.home !== '' && pred.away !== '') {
      setSavedUserPreds(prev => ({
        ...prev,
        [matchId]: true
      }));
    }
  };

  // Get distinct list of leagues for filtering
  const distinctLeagues = Array.from(new Set(FULL_MATCHES.map(m => m.league))).sort();

  // Filter logic
  const filteredMatches = FULL_MATCHES.filter(m => {
    const matchesLeague = leagueFilter === 'ALL' || m.league === leagueFilter;
    const matchesSearch = searchQuery === '' || 
      m.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.league.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLeague && matchesSearch;
  });

  const getResultTag = (scoreStr: string) => {
    const parts = scoreStr.split('-').map(x => parseInt(x.trim()));
    if (parts[0] > parts[1]) return { label: 'Home Win', cls: 'bg-green-500/10 text-green-400 border border-green-500/20' };
    if (parts[0] < parts[1]) return { label: 'Away Win', cls: 'bg-red-500/10 text-red-400 border border-red-500/20' };
    return { label: 'Draw', cls: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' };
  };

  const getScoreColorClass = (scoreStr: string) => {
    const parts = scoreStr.split('-').map(x => parseInt(x.trim()));
    if (parts[0] > parts[1]) return 'text-emerald-400 font-extrabold';
    if (parts[0] < parts[1]) return 'text-red-400 font-extrabold';
    return 'text-amber-400 font-extrabold';
  };

  const getTeamFlag = (teamName: string, fallbackFlag: string) => {
    // Remove ranking prefixes like "[13] "
    const cleanName = teamName.replace(/\[\d+\]\s*/g, '').trim();
    if (TEAM_FLAG_MAP[cleanName]) {
      return TEAM_FLAG_MAP[cleanName];
    }
    return fallbackFlag;
  };

  // Limit display to 6 unless showAll is true
  const displayedMatches = showAll ? filteredMatches : filteredMatches.slice(0, 6);

  return (
    <section id="pertandingan" className="py-4 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121316] border border-gray-800/80 rounded-[32px] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-8 bg-brand rounded-full shadow-[0_0_8px_rgba(173,255,47,0.8)]" />
            <h2 className="font-display italic font-extrabold text-3xl tracking-wider text-white uppercase">
              {activeTab === 'JADWAL' ? 'JADWAL' : 'PREDIKSI'} <span className="text-gray-300">PERTANDINGAN</span>
            </h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="inline-flex p-1 bg-neutral-800 border border-neutral-700 rounded-xl">
              <button
                onClick={() => {
                  setActiveTab('JADWAL');
                  setShowAll(false);
                }}
                className={`text-[10px] sm:text-xs font-bold font-display px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'JADWAL'
                    ? 'bg-brand text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                JADWAL & HANDICAP
              </button>
              <button
                onClick={() => {
                  setActiveTab('PREDIKSI');
                  setShowAll(false);
                }}
                className={`text-[10px] sm:text-xs font-bold font-display px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'PREDIKSI'
                    ? 'bg-brand text-black shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                PREDIKSI KAPSUL4D
              </button>
            </div>
            
            <span className="text-[10px] font-mono text-gray-300 bg-neutral-800 border border-neutral-700 px-3 py-1.5 rounded-full font-bold shadow-sm">
              {filteredMatches.length} MATCHES FOUND
            </span>
          </div>
        </div>

        {/* Filters Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          
          {/* League Select Dropdown */}
          <div className="md:col-span-6">
            <label className="block text-[10px] font-mono font-bold text-gray-300 mb-2 uppercase tracking-wider">FILTER TURNAMEN / LIGA</label>
            <select
              value={leagueFilter}
              onChange={(e) => setLeagueFilter(e.target.value)}
              className={`w-full bg-neutral-900 border text-xs text-white px-4 py-3 rounded-xl outline-none transition-all duration-300 shadow-sm cursor-pointer ${
                leagueFilter !== 'ALL' 
                  ? 'border-brand/70 shadow-[0_0_12px_rgba(173,255,47,0.25)]' 
                  : 'border-neutral-700 hover:border-neutral-600'
              } focus:border-brand focus:shadow-[0_0_15px_rgba(173,255,47,0.45)] focus:ring-1 focus:ring-brand/30`}
            >
              <option value="ALL" className="bg-neutral-900 text-white">Semua Kompetisi ({distinctLeagues.length} Liga)</option>
              {distinctLeagues.map((lg) => (
                <option key={lg} value={lg} className="bg-neutral-900 text-white">{lg}</option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          <div className="md:col-span-6">
            <label className="block text-[10px] font-mono font-bold text-gray-300 mb-2 uppercase tracking-wider">CARI TIM ATAU KOMPETISI</label>
            <div className="relative">
              <Search className={`absolute left-3.5 top-3.5 w-4 h-4 transition-colors duration-300 ${searchQuery !== '' ? 'text-brand' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Ketik nama negara atau klub..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-neutral-900 border text-xs text-white pl-10 pr-4 py-3 rounded-xl outline-none transition-all duration-300 placeholder:text-gray-500 shadow-sm ${
                  searchQuery !== '' 
                    ? 'border-brand/70 shadow-[0_0_12px_rgba(173,255,47,0.25)]' 
                    : 'border-neutral-700 hover:border-neutral-600'
                } focus:border-brand focus:shadow-[0_0_15px_rgba(173,255,47,0.45)] focus:ring-1 focus:ring-brand/30`}
              />
            </div>
          </div>

        </div>

        {/* Match cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {displayedMatches.map((match) => {
            const hasPredicted = savedUserPreds[match.id];
            const pred = userPredictions[match.id] || { home: '', away: '' };

            return (
              <div 
                key={match.id}
                className="neon-match-card p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden shadow-lg group"
              >
                {/* Horizontal progress highlight indicator */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand/20 to-transparent group-hover:via-brand/85 transition-all" />

                {/* Card Top Details */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800 text-[10px] font-mono text-gray-400">
                  <span className="font-bold text-gray-300 bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700 truncate max-w-[220px]">
                    {match.league}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0 text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span>{match.date} • {match.time} WIB</span>
                  </div>
                </div>

                {/* Match Teams Row */}
                <div className="flex items-center justify-between gap-4 py-2 mb-4">
                  
                  {/* Home Team */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden shrink-0 select-none shadow-md border border-neutral-800 bg-neutral-900">
                      <img 
                        src={`https://flagcdn.com/w80/${getTeamFlag(match.homeTeam, match.flag)}.png`} 
                        alt={match.homeTeam} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to generic if flag doesn't load
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(getTeamInitials(match.homeTeam))}&background=random`;
                        }}
                      />
                    </div>
                    <span className="font-display font-black text-sm text-white truncate text-center sm:text-left">
                      {match.homeTeam}
                    </span>
                  </div>

                  {/* VS Badge / Scores / Handicap */}
                  <div className="flex flex-col items-center justify-center min-w-[90px] px-2 shrink-0">
                    {activeTab === 'PREDIKSI' ? (
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-xl font-black font-mono tracking-wider ${getScoreColorClass(match.predictedScore || '0-0')}`}>
                          {match.predictedScore}
                        </span>
                        <span className={`text-[8px] font-bold uppercase tracking-wider rounded-md px-1.5 py-0.5 ${getResultTag(match.predictedScore || '0-0').cls}`}>
                          {getResultTag(match.predictedScore || '0-0').label}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-bold text-gray-300 bg-neutral-800 border border-neutral-700 px-3 py-1 rounded-full uppercase tracking-wider">
                          VS
                        </span>
                        <span className="text-[9px] font-mono text-amber-400 font-black tracking-wide">
                          HDP {match.handicap}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="flex flex-col sm:flex-row-reverse items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden shrink-0 select-none shadow-md border border-neutral-800 bg-neutral-900">
                      <img 
                        src={`https://flagcdn.com/w80/${getTeamFlag(match.awayTeam, match.flag)}.png`} 
                        alt={match.awayTeam} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(getTeamInitials(match.awayTeam))}&background=random`;
                        }}
                      />
                    </div>
                    <span className="font-display font-black text-sm text-white truncate text-center sm:text-right">
                      {match.awayTeam}
                    </span>
                  </div>

                </div>

                {/* Card Bottom / Prediction Widget */}
                <div className="pt-3 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Market info */}
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-brand-hover shrink-0" />
                    <span className="truncate">Analisis Handicap Pasaran Kapsul4D</span>
                  </div>

                  {/* Score Prediction input */}
                  <div className="shrink-0">
                    {hasPredicted ? (
                      <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Tebakan Anda: {pred.home} - {pred.away}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          maxLength={2}
                          value={pred.home}
                          placeholder="0"
                          onChange={(e) => handlePredictScore(match.id, 'home', e.target.value)}
                          className="w-7 h-7 bg-neutral-800 border border-neutral-700 focus:border-brand-hover text-center text-xs text-white rounded font-mono outline-none shadow-inner placeholder:text-gray-600"
                        />
                        <span className="text-gray-600 text-xs">-</span>
                        <input
                          type="text"
                          maxLength={2}
                          value={pred.away}
                          placeholder="0"
                          onChange={(e) => handlePredictScore(match.id, 'away', e.target.value)}
                          className="w-7 h-7 bg-neutral-800 border border-neutral-700 focus:border-brand-hover text-center text-xs text-white rounded font-mono outline-none shadow-inner placeholder:text-gray-600"
                        />
                        
                        <button
                          onClick={() => handleSavePrediction(match.id)}
                          disabled={pred.home === '' || pred.away === ''}
                          className="flex items-center gap-1 bg-brand text-black font-extrabold font-display text-[9px] tracking-wider px-2.5 py-1.5 rounded hover:bg-brand-hover disabled:bg-neutral-800 disabled:text-gray-500 disabled:border disabled:border-neutral-700 disabled:cursor-not-allowed transition-all uppercase shadow-sm cursor-pointer"
                        >
                          Tebak
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {filteredMatches.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <HelpCircle className="w-12 h-12 text-gray-400" />
            <span className="text-gray-400 text-sm">Tidak ditemukan pertandingan yang cocok dengan pencarian Anda.</span>
          </div>
        )}

        {/* View All / Hide Remaining Controls */}
        {filteredMatches.length > 6 && (
          <div className="flex justify-center mt-10">
            {!showAll ? (
              <button
                onClick={() => setShowAll(true)}
                className="bg-brand text-black font-black font-display text-xs tracking-wider px-8 py-4 rounded-xl shadow-lg hover:bg-brand-hover hover:scale-105 active:scale-95 transition-all uppercase cursor-pointer"
              >
                LIHAT SEMUA {activeTab === 'JADWAL' ? 'JADWAL' : 'PREDIKSI'} ({filteredMatches.length} Match)
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowAll(false);
                  const el = document.getElementById('pertandingan');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 font-bold font-display text-xs tracking-wide px-8 py-4 rounded-xl active:scale-95 transition-all uppercase shadow-sm cursor-pointer"
              >
                SEMBUNYIKAN SEBAGIAN (TAMPILKAN 6 MATCH SAJA)
              </button>
            )}
          </div>
        )}

        </div>
      </div>
    </section>
  );
}
