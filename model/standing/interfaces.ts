import { PrivateId, TimestampData, TimestampUtc } from '@model';
import { Team } from '@model/team/interfaces';

export type StandingTeamData = Pick<
  Team,
  'teamId' | 'name' | 'pos' | 'wins' | 'losses' | 'gb' | 'ppg' | 'oppg'
>;

export interface Standing extends TimestampData {
  /** Unique ID of the standing */
  standingId: PrivateId;

  /** Time where this standing applied */
  timestamp: TimestampUtc;

  /** Order of the teams and their stats */
  teams: StandingTeamData[];
}
