import { Rng } from '@utils/rng';
import { MatchActionLog, MatchActionLogDataMap, MatchActionLogType } from '.';
import { Dribble } from './dribble';
import { DribbleCut } from './dribble-cut';
import { FaulWithInjury } from './faul-with-injury';
import { FaulWithoutInjury } from './faul-without-injury';
import { Injury } from './injury';
import { MatchEnd } from './match-end';
import { MatchStart } from './match-start';
import { Pass } from './pass';
import { PassCut } from './pass-cut';
import { PeriodEnd } from './period-end';
import { PeriodStart } from './period-start';
import { RecoverLostBall } from './recover-lost-ball';
import { ShootBlocked } from './shoot-blocked';
import { ShootGoal } from './shoot-goal';
import { ShootMiss } from './shoot-miss';
import { ShootRejected } from './shoot-rejected';
import { Substitution } from './substitution';
import { TieBreak } from './tie-break';

const actionDef = {
  Dribble,
  DribbleCut,
  FaulWithInjury,
  FaulWithoutInjury,
  Injury,
  ShootBlocked,
  ShootGoal,
  ShootMiss,
  ShootRejected,
  RecoverLostBall,
  MatchEnd,
  MatchStart,
  Pass,
  PassCut,
  PeriodEnd,
  PeriodStart,
  Substitution,
  TieBreak,
} as const;

export type ActionLogCreator = <T extends MatchActionLogType>(
  data: MatchActionLogDataMap[T]
) => MatchActionLog<T>;

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
