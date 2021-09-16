import { Rng } from '@utils/rng';
import { WeightedOptions } from '@utils/rng/weighted-options';
import { MatchActionDataMap, MatchAction, MatchActionType } from '.';
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

type ManuallySelectedMatchActionType =
  | 'MatchStart'
  | 'MatchEnd'
  | 'PeriodStart'
  | 'PeriodEnd'
  | 'TieBreak';

export type ActionCreator = <T extends keyof MatchActionDataMap>(
  data: MatchActionDataMap[T]
) => MatchAction<T>;

export type PossibleRandomMatchActionType = Exclude<
  MatchActionType,
  ManuallySelectedMatchActionType
>;

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

export function getActionChances(
  sim: MatchSimulatorQuerier
): WeightedOptions<PossibleRandomMatchActionType> {
  const weights = randomActionDefTypes.map((type) => ({
    data: type as PossibleRandomMatchActionType,
    weight: actionDef[type as PossibleRandomMatchActionType].getChances(sim),
  }));

  return new WeightedOptions<PossibleRandomMatchActionType>(weights);
}
