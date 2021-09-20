import { MatchActionLog, MatchActionLogDataMap } from '../action-log';
import { MatchSimulatorQuerier } from '../sim/match-simulator-querier';

export abstract class MatchActionBase {
  public abstract run<T extends keyof MatchActionLogDataMap>(
    sim: MatchSimulatorQuerier
  ): MatchActionLog<T>[];
}

export function chooseAction() {}
