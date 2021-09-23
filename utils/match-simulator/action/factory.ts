import { WeightedOptions } from '@utils/rng/weighted-options';
import { MatchAction } from '.';
import { MatchSimulatorQuerier } from '../sim/match-simulator-querier';
import { Dribble } from './dribble';
import { Pass } from './pass';
import { RecoverLostBall } from './recover-lost-ball';
import { Shoot } from './shoot';

const actionDef = {
  Dribble,
  Pass,
  RecoverLostBall,
  Shoot,
};

export type MatchActionType = keyof typeof actionDef;

export function createAction(type: MatchActionType): MatchAction {
  return new actionDef[type]();
}

export function getActionChances(
  sim: MatchSimulatorQuerier
): WeightedOptions<MatchActionType> {
  const weights = Object.entries(actionDef).map(([type, ctor]) => ({
    data: type as MatchActionType,
    weight: ctor.getChances(sim),
  }));

  return new WeightedOptions<MatchActionType>(weights);
}
