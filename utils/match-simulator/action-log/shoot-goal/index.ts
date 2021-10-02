import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { CreateMatchActionLogData } from '../interfaces';
import { comments } from './comments';

type ActionLogType = 'ShootGoal';
type ActionLogData = 'shooter' | 'keeper';

export type ShootGoalData = CreateMatchActionLogData<
  ActionLogType,
  ActionLogData
>;

export class ShootGoal extends MatchActionLogClass<
  'ShootGoal',
  'shooter' | 'keeper'
> {
  public static readonly minDuration = 15;
  public static readonly maxDuration = 30;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {
    sim.goal();
  }
}
