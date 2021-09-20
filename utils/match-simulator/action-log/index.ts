import { MatchSimulatorQuerier } from '../sim/match-simulator-querier';
import { MatchSimulatorUpdater } from '../sim/match-simulator-updater';
import { GoalData } from './goal';
import { MatchEndData } from './match-end';
import { MatchStartData } from './match-start';
import { PassData } from './pass';
import { PeriodEndData } from './period-end';
import { PeriodStartData } from './period-start';
import { SwitchPossessionData } from './switch-posession';
import { TieBreakData } from './tie-break';

export interface MatchActionLogDataMap {
  Goal: GoalData;
  MatchEnd: MatchEndData;
  MatchStart: MatchStartData;
  Pass: PassData;
  PeriodEnd: PeriodEndData;
  PeriodStart: PeriodStartData;
  SwitchPossession: SwitchPossessionData;
  TieBreak: TieBreakData;
}

export type MatchActionLogType = keyof MatchActionLogDataMap;

/*
 * NOTE: To make actions serializables, do NOT use objects such as
 * `SimPlayer` or `SimTeam`.
 * Use references like `SimPlayerRef` and `SimTeamRef` instead.
 */
export interface MatchActionBaseData<
  T extends MatchActionLogType = MatchActionLogType
> {
  /** Type of the action */
  type: T;
  /** Time when the action happened, in seconds from the start of that period */
  time: number;
}

export abstract class MatchActionLog<T extends MatchActionLogType> {
  /** Minimum duration of the action in seconds */
  public static readonly minDuration: number = -1;
  /** Maximum duration of the action in seconds */
  public static readonly maxDuration: number = -1;

  protected static readonly DEFAULT_ACTION_CHANCES = 100;

  public readonly data: MatchActionLogDataMap[T];
  public readonly duration: number;

  constructor(data: MatchActionLogDataMap[T], duration: number) {
    if (
      !IS_PRODUCTION &&
      ((this.constructor as typeof MatchActionLog).minDuration === -1 ||
        (this.constructor as typeof MatchActionLog).maxDuration === -1)
    ) {
      throw new Error(
        `Action "${data.type}" doesn't have proper duration defined`
      );
    }

    this.data = data;
    this.duration = duration;
  }

  /**
   * By default all actions have a chance of "100" to get picked but overriding
   * this method gives the opportunity to customize it depending on the state
   * of the match.
   * i.e. players shouldn't score a goal if they are in their field, so it
   * returns `0` in that cases
   */
  public static getChances(sim: MatchSimulatorQuerier): number {
    return MatchActionLog.DEFAULT_ACTION_CHANCES;
  }

  public abstract run(sim: MatchSimulatorUpdater): void;
}
