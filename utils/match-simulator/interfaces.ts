import { Match } from '@model/match/interfaces';
import { MatchActionData } from './actions';

export type SimulateMatchResult = Required<
  Pick<Match, 'homeScore' | 'awayScore' | 'log'>
> & { actions: MatchAction[] };

export type MatchAction<
  T extends keyof MatchActionData = keyof MatchActionData
> = MatchActionData[T] & {
  /** Type of the action */
  type: T;
  /** Time when the action happened, in seconds from the start of that period */
  time: number;
};

export type MatchTeam = 0 | 1;

export type MatchPlayer = [team: 0 | 1, player: number];
