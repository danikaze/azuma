import { MatchSimulatorUpdater } from '../sim/match-simulator-updater';
import { GoalData } from './goal';
import { MatchEndData } from './match-end';
import { MatchStartData } from './match-start';
import { PeriodEndData } from './period-end';
import { PeriodStartData } from './period-start';
import { SwitchPossessionData } from './switch-posession';
import { TieBreakData } from './tie-break';

export interface MatchActionDataMap {
  Goal: GoalData;
  MatchEnd: MatchEndData;
  MatchStart: MatchStartData;
  SwitchPossession: SwitchPossessionData;
  PeriodEnd: PeriodEndData;
  PeriodStart: PeriodStartData;
  TieBreak: TieBreakData;
}

export type MatchActionType = keyof MatchActionDataMap;

/*
 * NOTE: To make actions serializables, do NOT use objects such as
 * `SimPlayer` or `SimTeam`.
 * Use references like `SimPlayerRef` and `SimTeamRef` instead.
 */
export interface MatchActionBaseData<
  T extends MatchActionType = MatchActionType
> {
  /** Type of the action */
  type: T;
  /** Time when the action happened, in seconds from the start of that period */
  time: number;
}

export abstract class MatchAction<T extends MatchActionType> {
  public readonly data: MatchActionDataMap[T];

  constructor(data: MatchActionDataMap[T]) {
    this.data = data;
  }

  public abstract run(sim: MatchSimulatorUpdater): void;
}
