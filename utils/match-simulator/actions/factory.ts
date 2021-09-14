import { MatchActionDataMap, MatchAction } from '.';
import { Goal } from './goal';
import { MatchEnd } from './match-end';
import { MatchStart } from './match-start';
import { PeriodEnd } from './period-end';
import { PeriodStart } from './period-start';
import { SwitchPossession } from './switch-posession';
import { TieBreak } from './tie-break';

const actionDef = {
  Goal,
  MatchEnd,
  MatchStart,
  SwitchPossession,
  PeriodEnd,
  PeriodStart,
  TieBreak,
} as const;

/**
 * Creates a MatchAction based on the data type
 */
export function createAction<T extends keyof MatchActionDataMap>(
  data: MatchActionDataMap[T]
) {
  // tslint:disable-next-line:no-any
  return new actionDef[data.type](data as any) as MatchAction<T>;
}
