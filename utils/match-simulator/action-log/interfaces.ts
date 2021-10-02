import { MatchActionLogClass } from '.';
import { SimPlayerRef } from '../sim/player';
import { SimTeamRef } from '../sim/team';
import { DribbleData } from './dribble';
import { DribbleCutData } from './dribble-cut';
import { FaulWithInjuryData } from './faul-with-injury';
import { FaulWithoutInjuryData } from './faul-without-injury';
import { InjuryData } from './injury';
import { MatchEndData } from './match-end';
import { MatchStartData } from './match-start';
import { PassData } from './pass';
import { PassCutData } from './pass-cut';
import { PeriodEndData } from './period-end';
import { PeriodStartData } from './period-start';
import { RecoverLostBallData } from './recover-lost-ball';
import { ShootBlockedData } from './shoot-blocked';
import { ShootGoalData } from './shoot-goal';
import { ShootMissData } from './shoot-miss';
import { ShootRejectedData } from './shoot-rejected';
import { SubstitutionData } from './substitution';
import { TieBreakData } from './tie-break';

export type ExtractMatchActionLogType<A> = A extends MatchActionLogClass<
  infer T,
  infer D
>
  ? T
  : A extends MatchActionLogType
  ? A
  : never;

export type ExtractMatchActionLogData<A> = A extends MatchActionLogClass<
  infer T,
  infer D
>
  ? A['data']
  : A extends MatchActionLogType
  ? MatchActionLogData[A]
  : never;

export type MatchActionLogType = keyof MatchActionLogData;
export type AnyMatchActionLogData = MatchActionLogData[MatchActionLogType];

export interface MatchActionLogData {
  Dribble: DribbleData;
  DribbleCut: DribbleCutData;
  FaulWithInjury: FaulWithInjuryData;
  FaulWithoutInjury: FaulWithoutInjuryData;
  Injury: InjuryData;
  MatchEnd: MatchEndData;
  MatchStart: MatchStartData;
  Pass: PassData;
  PassCut: PassCutData;
  PeriodEnd: PeriodEndData;
  PeriodStart: PeriodStartData;
  RecoverLostBall: RecoverLostBallData;
  ShootBlocked: ShootBlockedData;
  ShootGoal: ShootGoalData;
  ShootMiss: ShootMissData;
  ShootRejected: ShootRejectedData;
  Substitution: SubstitutionData;
  TieBreak: TieBreakData;
}

export interface MatchActionLogDataFieldMap {
  player: SimPlayerRef;
  playerIn: SimPlayerRef;
  playerOut: SimPlayerRef;
  attacker: SimPlayerRef;
  defender: SimPlayerRef;
  shooter: SimPlayerRef;
  keeper: SimPlayerRef;
  from?: SimPlayerRef;
  to: SimPlayerRef;
  cutBy: SimPlayerRef;
  duration: number;
  injuriedPlayer: SimPlayerRef;
  currentPeriod: number;
  winningTeam: SimTeamRef;
}

/*
 * NOTE: To make actions serializables, do NOT use objects such as
 * `SimPlayer` or `SimTeam`.
 * Use references like `SimPlayerRef` and `SimTeamRef` instead.
 */
export type CreateMatchActionLogData<
  T extends MatchActionLogType = MatchActionLogType,
  D extends keyof MatchActionLogDataFieldMap = never
> = {
  /** Type of the action */
  type: T;
} & Pick<MatchActionLogDataFieldMap, D>;

export interface MatchActionLogMetaData {
  /** Duration of the action in seconds */
  duration: number;
  /** Time when the action happened, in seconds from the start of that period */
  time: number;
  /** Index of the chosen comment texts */
  comment: number;
}
