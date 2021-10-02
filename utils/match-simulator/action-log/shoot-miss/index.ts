import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { CreateMatchActionLogData } from '../interfaces';
import { comments } from './comments';

type ActionLogType = 'ShootMiss';
type ActionLogData = 'shooter' | 'keeper';

export type ShootMissData = CreateMatchActionLogData<
  ActionLogType,
  ActionLogData
>;

export class ShootMiss extends MatchActionLogClass<
  ActionLogType,
  ActionLogData
> {
  public static readonly minDuration = 5;
  public static readonly maxDuration = 15;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {
    sim.setPossession(this.data.keeper);
  }
}
