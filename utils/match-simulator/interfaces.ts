import { Match } from '@model/match/interfaces';
import { MatchActionDataMap, MatchActionType } from './actions';

export type MatchActionData = MatchActionDataMap[MatchActionType];

export type SimulateMatchResult = Required<
  Pick<Match, 'homeScore' | 'awayScore' | 'log'>
> & { actions: MatchActionData[] };

export const enum MatchTeamRef {
  HOME = 0,
  AWAY = 1,
}

export type MatchPlayerRef = [team: MatchTeamRef, player: number];
