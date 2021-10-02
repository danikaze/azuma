import { Match } from '@model/match/interfaces';
import { AnyActionComment } from './action-log/comments';
import {
  MatchActionLogData,
  MatchActionLogMetaData,
  MatchActionLogType,
} from './action-log/interfaces';
import { MatchSimulator } from './sim';

export interface MatchActionCreationData<
  T extends MatchActionLogType = MatchActionLogType
> {
  data: MatchActionLogData[T];
  meta: MatchActionLogMetaData;
}

export type SimulateMatchResult = Required<
  Pick<Match, 'homeScore' | 'awayScore' | 'log'>
> & {
  actions: MatchActionCreationData[];
  comments: AnyActionComment[];
};

export function simulateFullMatch(match: Match): Readonly<SimulateMatchResult> {
  const simulator = new MatchSimulator(match);
  simulator.run();
  return simulator.getResult();
}

export function simulateOngoingMatch(
  match: Match,
  millisecondsPlayed: number
): Readonly<SimulateMatchResult> {
  const sim = new MatchSimulator(match);
  sim.replay(millisecondsPlayed);
  return sim.getResult();
}
