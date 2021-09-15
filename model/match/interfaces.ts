import { PublicId, TimestampData, TimestampUtc } from '@model';
import { Court } from '@model/court/interfaces';
import { Team } from '@model/team/interfaces';
import { MatchActionData } from '@utils/match-simulator';

export type MatchState = 'pending' | 'playing' | 'finished' | 'cancelled';

export interface Match extends TimestampData {
  /** Unique ID of the match */
  matchId: PublicId;

  /** State of the match */
  state: MatchState;
  /** Starting time of the match in the real world (ms) */
  timestamp: TimestampUtc;
  /** Court where the match takes place */
  court: Court;
  /** Local Team */
  homeTeam: Team;
  /** Visiting Team */
  awayTeam: Team;

  /** Final score for the home team, if the match was finished */
  homeScore?: number;
  /** Final score for the visiting team, if the match was finished */
  awayScore?: number;

  /** List of happened actions per period (only in simulated matches) */
  log?: MatchActionData[][];
}
