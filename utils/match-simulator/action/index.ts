import { AlteredState } from '@model/player/interfaces';
import { Rng } from '@utils/rng';
import { MatchActionLogDataMap, MatchActionLogType } from '../action-log';
import { MatchSimulatorQuerier } from '../sim/match-simulator-querier';

export type ActionLogDataWithoutTime<
  T extends MatchActionLogType = MatchActionLogType
> = Omit<MatchActionLogDataMap[T], 'time'>;

export abstract class MatchAction {
  protected static readonly DEFAULT_ACTION_CHANCES = 100;

  /**
   * When doing a rough play, the prob to be faul
   */
  protected static readonly DC_FAUL = 60;
  /**
   * When doing a rough play, the DC to avoid a injury
   */
  protected static readonly DC_AVOID_INJURY = 25;

  /**
   * DC for shooting and putting the ball in the goal from short distance
   */
  protected static readonly DC_SHOOT_SHORT_IN_GOAL = 35;
  /**
   * DC for shooting and putting the ball in the goal from long distance
   */
  protected static readonly DC_SHOOT_LONG_IN_GOAL = 50;
  /**
   * In a skill shoot vs goalkeeper skill contest
   * Shoot > GK -> Goal
   * Shoot < GK < Shoot + DC_DIFF_SHOOT_BLOCK -> Rejected
   * Shoot + DC_DIFF_SHOOT_BLOCK < GK -> Catch
   */
  protected static readonly DC_DIFF_SHOOT_BLOCK = 15;

  /**
   * [Min, Max] time in seconds for the duration of each player altered state
   */
  protected static readonly ALTERED_STATE_DURATIONS: Record<
    AlteredState,
    [number, number]
  > = {
    // tslint:disable:no-magic-numbers
    injury: [300, 3000],
    // tslint:enable:no-magic-numbers
  };

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
