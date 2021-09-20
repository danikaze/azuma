import { Rng } from '@utils/rng';
import { WeightedOptions } from '@utils/rng/weighted-options';
import { MatchActionLogDataMap, MatchActionLog, MatchActionLogType } from '.';
import { MatchSimulatorQuerier } from '../sim/match-simulator-querier';
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

const randomActionDefTypes = Object.keys(actionDef).filter(
  (type) =>
    ![
      'MatchStart',
      'MatchEnd',
      'PeriodStart',
      'PeriodEnd',
      'TieBreak',
    ].includes(type)
);

type ManuallySelectedMatchActionLogType =
  | 'MatchStart'
  | 'MatchEnd'
  | 'PeriodStart'
  | 'PeriodEnd'
  | 'TieBreak';

export type ActionLogCreator = <T extends keyof MatchActionLogDataMap>(
  data: MatchActionLogDataMap[T]
) => MatchActionLog<T>;

export type PossibleRandomMatchActionType = Exclude<
  MatchActionLogType,
  ManuallySelectedMatchActionLogType
>;

export function getActionLogFactory(rng: Rng): ActionLogCreator {
  /**
   * Creates a MatchAction based on the data type
   */
  const createActionLog = <T extends keyof MatchActionLogDataMap>(
    data: MatchActionLogDataMap[T]
  ) => {
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
  };

  return createActionLog;
}

export function getActionLogChances(
  sim: MatchSimulatorQuerier
): WeightedOptions<PossibleRandomMatchActionType> {
  const weights = randomActionDefTypes.map((type) => ({
    data: type as PossibleRandomMatchActionType,
    weight: actionDef[type as PossibleRandomMatchActionType].getChances(sim),
  }));

  return new WeightedOptions<PossibleRandomMatchActionType>(weights);
}
