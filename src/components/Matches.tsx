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
  { id: 'm-1', date: '20/07', time: '02:00', league: 'WORLD CUP 2026 [ IN CANADA, MEXICO & USA ]', flag: 'world', homeTeam: 'Spain', awayTeam: 'Argentina', handicap: '0 : 1/4', predictedScore: '2 - 3' },
  { id: 'm-2', date: '19/07', time: '21:30', league: 'SWEDEN ALLSVENSKAN', flag: 'se', homeTeam: '[8] Elfsborg', awayTeam: '[1] IK Sirius FK', handicap: '1/2 : 0', predictedScore: '2 - 1' },
  { id: 'm-3', date: '19/07', time: '21:30', league: 'SWEDEN ALLSVENSKAN', flag: 'se', homeTeam: '[2] Hammarby', awayTeam: '[14] Degerfors', handicap: '0 : 1 3/4', predictedScore: '3 - 0' },
  { id: 'm-4', date: '19/07', time: '21:30', league: 'SWEDEN ALLSVENSKAN', flag: 'se', homeTeam: '[16] Halmstads', awayTeam: '[3] BK Hacken', handicap: '1 : 0', predictedScore: '1 - 2' },
  { id: 'm-5', date: '19/07', time: '22:30', league: 'FINLAND VEIKKAUSLIIGA', flag: 'fi', homeTeam: '[11] Jaro', awayTeam: '[2] Inter Turku', handicap: '1 : 0', predictedScore: '0 - 2' },
  { id: 'm-6', date: '19/07', time: '18:00', league: 'SWEDEN SUPERETTAN', flag: 'se', homeTeam: '[3] IFK Norrkoping', awayTeam: '[10] Sandvikens IF', handicap: '0 : 1', predictedScore: '1 - 0' },
  { id: 'm-7', date: '19/07', time: '20:00', league: 'SWEDEN SUPERETTAN', flag: 'se', homeTeam: 'IFK Varnamo [n]', awayTeam: '[12] Ljungskile', handicap: '0 : 0', predictedScore: '2 - 2' },
  { id: 'm-8', date: '19/07', time: '20:00', league: 'SWEDEN SUPERETTAN', flag: 'se', homeTeam: '[6] Nordic United FC', awayTeam: '[14] Orebro', handicap: '0 : 1/2', predictedScore: '3 - 1' },
  { id: 'm-9', date: '19/07', time: '17:30', league: 'KOREA K-LEAGUE 1', flag: 'kr', homeTeam: '[6] FC Anyang', awayTeam: '[12] Gwangju FC', handicap: '0 : 3/4', predictedScore: '2 - 0' },
  { id: 'm-10', date: '19/07', time: '17:30', league: 'KOREA K-LEAGUE 1', flag: 'kr', homeTeam: '[9] Bucheon FC 1995', awayTeam: '[1] FC Seoul', handicap: '3/4 : 0', predictedScore: '1 - 3' },
  { id: 'm-11', date: '19/07', time: '17:30', league: 'KOREA K-LEAGUE 2', flag: 'kr', homeTeam: '[9] Gyeongnam', awayTeam: 'Ansan Greeners', handicap: '0 : 1/2', predictedScore: '2 - 1' },
  { id: 'm-12', date: '19/07', time: '17:30', league: 'KOREA K-LEAGUE 2', flag: 'kr', homeTeam: '[11] Yongin FC', awayTeam: '[6] Hwaseong FC', handicap: '1/4 : 0', predictedScore: '1 - 0' },
  { id: 'm-13', date: '19/07', time: '17:30', league: 'KOREA K-LEAGUE 2', flag: 'kr', homeTeam: '[14] Chungbuk Cheongju FC', awayTeam: '[10] Cheonan City', handicap: '0 : 0', predictedScore: '0 - 0' },
  { id: 'm-14', date: '19/07', time: '17:30', league: 'KOREA K-LEAGUE 2', flag: 'kr', homeTeam: '[2] Suwon Bluewings', awayTeam: '[12] Paju Frontier FC', handicap: '0 : 1 1/4', predictedScore: '3 - 1' },
  { id: 'm-15', date: '19/07', time: '21:00', league: 'ICELAND PREMIER LEAGUE', flag: 'is', homeTeam: '[8] IBV Vestmannaeyjar', awayTeam: '[10] KA Akureyri', handicap: '0 : 1/4', predictedScore: '2 - 1' },
  { id: 'm-16', date: '19/07', time: '23:00', league: 'ICELAND PREMIER LEAGUE', flag: 'is', homeTeam: '[2] KR Reykjavik', awayTeam: '[7] Stjarnan Gardabaer', handicap: '0 : 1', predictedScore: '1 - 0' },
  { id: 'm-17', date: '19/07', time: '21:00', league: 'ROMANIA SUPERLIGA', flag: 'ro', homeTeam: 'Universitatea Cluj', awayTeam: 'Farul Constanta', handicap: '0 : 1/4', predictedScore: '2 - 0' },
  { id: 'm-18', date: '19/07', time: '23:30', league: 'ROMANIA SUPERLIGA', flag: 'ro', homeTeam: 'Petrolul Ploiesti', awayTeam: 'Dinamo Bucuresti', handicap: '1/4 : 0', predictedScore: '1 - 1' },
  { id: 'm-19', date: '19/07', time: '12:00', league: 'AUSTRALIA NEW SOUTH WALES PREMIER LEAGUE', flag: 'au', homeTeam: '[14] Blacktown City', awayTeam: '[13] St George City FA', handicap: '0 : 1/4', predictedScore: '1 - 2' },
  { id: 'm-20', date: '19/07', time: '12:00', league: 'AUSTRALIA NEW SOUTH WALES PREMIER LEAGUE', flag: 'au', homeTeam: '[1] Marconi Stallions', awayTeam: '[3] Sydney United 58', handicap: '0 : 1/4', predictedScore: '2 - 1' },
  { id: 'm-21', date: '19/07', time: '15:30', league: 'SOUTH AUSTRALIA NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: '[4] FK Beograd Adelaide', awayTeam: '[8] Adelaide United [Youth]', handicap: '0 : 1/4', predictedScore: '3 - 0' },
  { id: 'm-22', date: '20/07', time: '23:30', league: 'BULGARIA FIRST PROFESSIONAL FOOTBALL LEAGUE', flag: 'bg', homeTeam: 'Botev Vratsa', awayTeam: 'Cherno More Varna', handicap: '0 : 0', predictedScore: '0 - 1' },
  { id: 'm-23', date: '20/07', time: '00:00', league: 'SERBIA SUPERLIGA', flag: 'rs', homeTeam: 'FK Cukaricki', awayTeam: 'IMT Novi Beograd', handicap: '0 : 1/2', predictedScore: '2 - 1' },
  { id: 'm-24', date: '20/07', time: '00:00', league: 'SERBIA SUPERLIGA', flag: 'rs', homeTeam: 'FK Radnik Surdulica', awayTeam: 'Mladost Lucani', handicap: '0 : 1/2', predictedScore: '1 - 2' },
  { id: 'm-25', date: '20/07', time: '00:00', league: 'SERBIA SUPERLIGA', flag: 'rs', homeTeam: 'FK Vojvodina', awayTeam: 'OFK Beograd', handicap: '0 : 1', predictedScore: '3 - 0' },
  { id: 'm-26', date: '19/07', time: '13:00', league: 'AUSTRALIA QUEENSLAND NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: '[8] Brisbane Olympic FC', awayTeam: '[11] Brisbane Roar FC B', handicap: '0 : 1/2', predictedScore: '2 - 1' },
  { id: 'm-27', date: '19/07', time: '19:00', league: 'RUSSIA FIRST LEAGUE', flag: 'ru', homeTeam: 'Ural Sverdlovsk Oblast', awayTeam: 'Yenisey Krasnoyarsk', handicap: '0 : 1/4', predictedScore: '2 - 0' },
  { id: 'm-28', date: '19/07', time: '20:00', league: 'RUSSIA FIRST LEAGUE', flag: 'ru', homeTeam: 'KAMAZ Naberezhnye Chelny', awayTeam: 'Nizhny Novgorod', handicap: '1/4 : 0', predictedScore: '1 - 0' },
  { id: 'm-29', date: '19/07', time: '21:00', league: 'RUSSIA FIRST LEAGUE', flag: 'ru', homeTeam: 'Tekstilshchik Ivanovo', awayTeam: 'FC Ufa', handicap: '0 : 0', predictedScore: '1 - 1' },
  { id: 'm-30', date: '19/07', time: '21:00', league: 'RUSSIA FIRST LEAGUE', flag: 'ru', homeTeam: 'FC Veles Moscow', awayTeam: 'FK Chelyabinsk', handicap: '0 : 0', predictedScore: '0 - 0' },
  { id: 'm-31', date: '19/07', time: '21:00', league: 'RUSSIA FIRST LEAGUE', flag: 'ru', homeTeam: 'Shinnik Yaroslavl', awayTeam: 'FC Leningradets', handicap: '0 : 1/2', predictedScore: '2 - 1' },
  { id: 'm-32', date: '19/07', time: '22:00', league: 'RUSSIA FIRST LEAGUE', flag: 'ru', homeTeam: 'PFC Sochi', awayTeam: 'Spartak Kostroma', handicap: '0 : 1/2', predictedScore: '3 - 2' },
  { id: 'm-33', date: '19/07', time: '22:30', league: 'RUSSIA FIRST LEAGUE', flag: 'ru', homeTeam: 'Torpedo Moscow', awayTeam: 'Volga Ulyanovsk', handicap: '0 : 3/4', predictedScore: '2 - 1' },
  { id: 'm-34', date: '19/07', time: '23:00', league: 'RUSSIA FIRST LEAGUE', flag: 'ru', homeTeam: 'Arsenal Tula', awayTeam: 'FC Neftekhimik Nizhnekamsk', handicap: '0 : 3/4', predictedScore: '1 - 0' },
  { id: 'm-35', date: '19/07', time: '23:00', league: 'SLOVENIA PRVA LIGA', flag: 'si', homeTeam: 'NK Aluminij', awayTeam: 'NK Maribor', handicap: '3/4 : 0', predictedScore: '1 - 2' },
  { id: 'm-36', date: '19/07', time: '22:45', league: 'LITHUANIA A LEAGUE', flag: 'lt', homeTeam: '[4] Dziugas Telsiai', awayTeam: '[3] Banga Gargzdai', handicap: '0 : 0', predictedScore: '1 - 1' },
  { id: 'm-37', date: '19/07', time: '23:00', league: 'LITHUANIA A LEAGUE', flag: 'lt', homeTeam: '[6] Zalgiris Vilnius', awayTeam: '[5] FK Transinvest', handicap: '0 : 1/4', predictedScore: '2 - 0' },
  { id: 'm-38', date: '19/07', time: '11:30', league: 'AUSTRALIA FOOTBALL QUEENSLAND PREMIER LEAGUE 1', flag: 'au', homeTeam: 'Robina City SC', awayTeam: 'Redlands United', handicap: '0 : 1/2', predictedScore: '1 - 2' },
  { id: 'm-39', date: '19/07', time: '13:00', league: 'AUSTRALIA FOOTBALL QUEENSLAND PREMIER LEAGUE 1', flag: 'au', homeTeam: 'Capalaba Bulldogs', awayTeam: 'Holland Park Hawks', handicap: '3/4 : 0', predictedScore: '2 - 1' },
  { id: 'm-40', date: '19/07', time: '21:00', league: 'LATVIA VIRSLIGA', flag: 'lv', homeTeam: '[10] Ogre United', awayTeam: '[5] BFC Daugavpils', handicap: '3/4 : 0', predictedScore: '1 - 0' },
  { id: 'm-41', date: '19/07', time: '11:00', league: 'AUSTRALIA VICTORIA PREMIER LEAGUE 1', flag: 'au', homeTeam: 'Western United [Youth]', awayTeam: 'FC Bulleen Lions', handicap: '3/4 : 0', predictedScore: '2 - 1' },
  { id: 'm-42', date: '19/07', time: '12:00', league: 'AUSTRALIA FOOTBALL NEW SOUTH WALES LEAGUE 1', flag: 'au', homeTeam: 'Central Coast Mariners Academy', awayTeam: 'Northern Tigers', handicap: '3/4 : 0', predictedScore: '1 - 0' },
  { id: 'm-43', date: '19/07', time: '21:00', league: 'ESTONIA PREMIUM LIGA', flag: 'ee', homeTeam: 'FC Kuressaare', awayTeam: 'Nomme Kalju FC', handicap: '1 : 0', predictedScore: '2 - 1' },
  { id: 'm-44', date: '19/07', time: '22:15', league: 'ESTONIA PREMIUM LIGA', flag: 'ee', homeTeam: 'Harju JK Laagri', awayTeam: 'Paide Linnameeskond', handicap: '1/2 : 0', predictedScore: '1 - 0' },
  { id: 'm-45', date: '19/07', time: '15:45', league: 'AFF WOMEN CUP 2026 [ IN MALAYSIA ]', flag: 'my', homeTeam: 'Cambodia [W]', awayTeam: 'Laos [W]', handicap: '0 : 3/4', predictedScore: '1 - 2' },
  { id: 'm-46', date: '19/07', time: '19:45', league: 'AFF WOMEN CUP 2026 [ IN MALAYSIA ]', flag: 'my', homeTeam: 'Singapore [W]', awayTeam: 'Indonesia [W]', handicap: '3/4 : 0', predictedScore: '0 - 3' },
  { id: 'm-47', date: '20/07', time: '04:45', league: 'ECUADOR LIGA PRO SERIE A', flag: 'ec', homeTeam: '[12] Guayaquil City', awayTeam: '[16] Manta FC', handicap: '0 : 1/4', predictedScore: '1 - 2' },
  { id: 'm-48', date: '19/07', time: '23:45', league: 'ECUADOR LIGA PRO SERIE A', flag: 'ec', homeTeam: '[10] Tecnico Universitario', awayTeam: '[2] SD Aucas', handicap: '1/4 : 0', predictedScore: '2 - 1' },
  { id: 'm-49', date: '20/07', time: '07:15', league: 'ECUADOR LIGA PRO SERIE A', flag: 'ec', homeTeam: '[1] Independiente del Valle', awayTeam: '[8] CS Emelec', handicap: '0 : 1 1/4', predictedScore: '3 - 0' },
  { id: 'm-50', date: '19/07', time: '22:00', league: 'BOLIVIA PROFESSIONAL FOOTBALL LEAGUE', flag: 'bo', homeTeam: 'GV Deportivo San Jose de Oruro', awayTeam: 'The Strongest', handicap: '1/2 : 0', predictedScore: '2 - 1' },
  { id: 'm-51', date: '20/07', time: '07:30', league: 'BOLIVIA PROFESSIONAL FOOTBALL LEAGUE', flag: 'bo', homeTeam: 'Blooming Santa Cruz', awayTeam: 'CD Real Tomayapo', handicap: '0 : 1 1/4', predictedScore: '1 - 3' },
  { id: 'm-52', date: '19/07', time: '23:00', league: 'PERU LIGA 1', flag: 'pe', homeTeam: 'CD Los Chankas', awayTeam: 'Sport Boys Association', handicap: '0 : 1', predictedScore: '2 - 1' },
  { id: 'm-53', date: '20/07', time: '07:00', league: 'PERU LIGA 1', flag: 'pe', homeTeam: 'Alianza Lima', awayTeam: 'Sport Huancayo', handicap: '0 : 1 1/4', predictedScore: '3 - 1' },
  { id: 'm-54', date: '19/07', time: '20:00', league: 'URUGUAY TORNEO INTERMEDIO', flag: 'uy', homeTeam: 'Central Espanol', awayTeam: 'Cerro Largo', handicap: '0 : 0', predictedScore: '1 - 1' },
  { id: 'm-55', date: '20/07', time: '23:00', league: 'URUGUAY TORNEO INTERMEDIO', flag: 'uy', homeTeam: 'CA Cerro', awayTeam: 'Racing Club Montevideo', handicap: '3/4 : 0', predictedScore: '2 - 0' },
  { id: 'm-56', date: '20/07', time: '23:00', league: 'CHILE PRIMERA B', flag: 'cl', homeTeam: 'CD Magallanes', awayTeam: 'Curico Unido', handicap: '0 : 1/4', predictedScore: '1 - 2' },
  { id: 'm-57', date: '20/07', time: '06:00', league: 'CHILE PRIMERA B', flag: 'cl', homeTeam: 'San Luis de Quillota', awayTeam: 'Union Espanola', handicap: '0 : 1/4', predictedScore: '0 - 1' },
  { id: 'm-58', date: '19/07', time: '20:00', league: 'PARAGUAY DIVISION INTERMEDIA', flag: 'py', homeTeam: 'Club Atletico Tembetary', awayTeam: 'Sol de America', handicap: '0 : 0', predictedScore: '2 - 2' },
  { id: 'm-59', date: '19/07', time: '20:00', league: 'PARAGUAY DIVISION INTERMEDIA', flag: 'py', homeTeam: 'Encarnacion FC', awayTeam: '3 de Noviembre', handicap: '0 : 1/4', predictedScore: '1 - 0' },
  { id: 'm-60', date: '19/07', time: '20:30', league: 'URUGUAY SEGUNDA DIVISION', flag: 'uy', homeTeam: 'Tacuarembo', awayTeam: 'Plaza Colonia', handicap: '1/4 : 0', predictedScore: '2 - 1' },
  { id: 'm-61', date: '20/07', time: '23:30', league: 'URUGUAY SEGUNDA DIVISION', flag: 'uy', homeTeam: 'Centro Atletico Fenix', awayTeam: 'Atenas de San Carlos', handicap: '0 : 1/2', predictedScore: '1 - 2' },
  { id: 'm-62', date: '20/07', time: '05:30', league: 'URUGUAY SEGUNDA DIVISION', flag: 'uy', homeTeam: 'Miramar Misiones', awayTeam: 'La Luz FC', handicap: '0 : 0', predictedScore: '0 - 0' },
  { id: 'm-63', date: '20/07', time: '05:30', league: 'URUGUAY SEGUNDA DIVISION', flag: 'uy', homeTeam: 'Colon FC', awayTeam: 'Paysandu FC', handicap: '0 : 1/4', predictedScore: '1 - 2' },
  { id: 'm-64', date: '19/07', time: '11:30', league: 'AUSTRALIA TASMANIA NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: 'South East United FC', awayTeam: 'Launceston United SC', handicap: '0 : 1/2', predictedScore: '2 - 1' },
  { id: 'm-65', date: '19/07', time: '11:30', league: 'AUSTRALIA TASMANIA NATIONAL PREMIER LEAGUE', flag: 'au', homeTeam: 'Ulverstone SC', awayTeam: 'Glenorchy Knights', handicap: '1 : 0', predictedScore: '1 - 0' }
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
