import { Rng } from '@utils/rng';
import { MatchActionLogDataMap, MatchActionLogType } from '../action-log';
import { MatchSimulatorQuerier } from '../sim/match-simulator-querier';

export type ActionLogDataWithoutTime<
  T extends MatchActionLogType = MatchActionLogType
> = Omit<MatchActionLogDataMap[T], 'time'>;

export abstract class MatchAction {
  protected static readonly DEFAULT_ACTION_CHANCES = 100;

  /**
   * By default all actions have a chance of "100" to get picked but overriding
   * this method gives the opportunity to customize it depending on the state
   * of the match.
   * i.e. players shouldn't score a goal if they are in their field, so it
   * returns `0` in that cases
   */
  public static getChances(sim: MatchSimulatorQuerier): number {
    return MatchAction.DEFAULT_ACTION_CHANCES;
  }

  public abstract run(
    sim: MatchSimulatorQuerier,
    rng: Rng
  ): ActionLogDataWithoutTime[];
}
