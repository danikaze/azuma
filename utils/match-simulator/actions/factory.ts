import { Rng } from '@utils/rng';
import { MatchActionDataMap, MatchAction } from '.';
import { Goal } from './goal';
import { MatchEnd } from './match-end';
import { MatchStart } from './match-start';
import { Pass } from './pass';
import { PeriodEnd } from './period-end';
import { PeriodStart } from './period-start';
import { SwitchPossession } from './switch-posession';
import { TieBreak } from './tie-break';

const actionDef = {
  Goal,
  MatchEnd,
  MatchStart,
  Pass,
  PeriodEnd,
  PeriodStart,
  SwitchPossession,
  TieBreak,
} as const;

export type ActionCreator = <T extends keyof MatchActionDataMap>(
  data: MatchActionDataMap[T]
) => MatchAction<T>;

export function getActionFactory(rng: Rng): ActionCreator {
  /**
   * Creates a MatchAction based on the data type
   */
  return function createAction<T extends keyof MatchActionDataMap>(
    data: MatchActionDataMap[T]
  ): MatchAction<T> {
    const Action = actionDef[data.type];
    if (!Action) {
      throw new Error(`Action type "${data.type}" is not defined`);
    }
    const duration = rng.integer(
      (Action as typeof MatchAction).minDuration,
      (Action as typeof MatchAction).maxDuration
    );

    // tslint:disable-next-line:no-any
    return new Action(data as any, duration) as MatchAction<T>;
  };
}
