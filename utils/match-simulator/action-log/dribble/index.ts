import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { CreateMatchActionLogData } from '../interfaces';
import { comments } from './comments';

type ActionLogType = 'Dribble';
type ActionLogData = 'attacker' | 'defender';

export type DribbleData = CreateMatchActionLogData<
  ActionLogType,
  ActionLogData
>;

export class Dribble extends MatchActionLogClass<ActionLogType, ActionLogData> {
  public static readonly minDuration = 5;
  public static readonly maxDuration = 15;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {}
}
