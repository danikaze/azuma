import { Rng } from '@utils/rng';
import { MatchActionLog, MatchActionLogDataMap, MatchActionLogType } from '.';
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

type ManuallySelectedMatchActionLogType =
  | 'MatchStart'
  | 'MatchEnd'
  | 'PeriodStart'
  | 'PeriodEnd'
  | 'TieBreak';

export type ActionLogCreator = <T extends MatchActionLogType>(
  data: MatchActionLogDataMap[T]
) => MatchActionLog<T>;

export type PossibleRandomMatchActionType = Exclude<
  MatchActionLogType,
  ManuallySelectedMatchActionLogType
>;

/**
 * Creates a MatchActionLog based on the data type
 */
export function createActionLog<T extends MatchActionLogType>(
  rng: Rng,
  data: MatchActionLogDataMap[T]
): MatchActionLog<T> {
  const Action = actionDef[data.type];
  if (!Action) {
    throw new Error(`Action type "${data.type}" is not defined`);
  }
  const duration = rng.integer(
    (Action as typeof MatchActionLog).minDuration,
    (Action as typeof MatchActionLog).maxDuration
  );

  // tslint:disable-next-line:no-any
  return new Action(data as any, duration) as MatchActionLog<T>;
}
