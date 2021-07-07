// tslint:disable: no-magic-numbers
export type PlayersPerTeam = 7;
export type TeamsPerLeague = 8;
// tslint:enable: no-magic-numbers

// tslint:disable: no-unnecessary-type-annotation
export const TEAM_PLAYERS: PlayersPerTeam = 7;
export const LEAGUE_TEAMS: TeamsPerLeague = 8;
// tslint:enable: no-unnecessary-type-annotation
export const PLAYOFF_TEAMS = 4;
export const DROP_TEAMS = 1;
export const MATCH_PERIODS = 2;
export const MATCH_PERIOD_MS = 1800000;
export const MATCH_BREAK_MS = 600000;
export const MATCH_FULL_DURATION_MS =
  MATCH_PERIODS * MATCH_PERIOD_MS + (MATCH_PERIODS - 1) * MATCH_BREAK_MS;
export const GOAL_SCORE = 10;
