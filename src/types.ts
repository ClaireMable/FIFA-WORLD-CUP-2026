export interface Team {
  id: string;
  name: string;
  code: string; // flagcdn country code (e.g. "mx", "za")
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface Group {
  name: string; // "GROUP A", "GROUP B", etc.
  teams: Team[];
}

export interface Player {
  rank: number;
  name: string;
  country: string;
  countryCode: string;
  teamFlagCode: string;
  avatarUrl: string;
  value: number; // Goals or Assists (used for main sorting display)
  goals?: number;
  assists?: number;
}

export interface TournamentStat {
  label: string;
  value: string | number;
  iconName: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  homeFlag: string;
  awayFlag: string;
  date: string;
  time: string;
  stadium: string;
  group: string;
  status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
}
