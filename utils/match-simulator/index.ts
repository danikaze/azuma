import { Match } from '@model/match/interfaces';
import { MatchActionDataMap, MatchActionType } from './actions';
import { MatchSimulator } from './sim';

export type MatchActionData = MatchActionDataMap[MatchActionType];

export type SimulateMatchResult = Required<
  Pick<Match, 'homeScore' | 'awayScore' | 'log'>
> & { actions: MatchActionData[] };

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
