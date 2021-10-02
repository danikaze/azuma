import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { CreateMatchActionLogData } from '../interfaces';
import { comments } from './comments';

type ActionLogType = 'ShootBlocked';
type ActionLogData = 'shooter' | 'keeper';

export type ShootBlockedData = CreateMatchActionLogData<
  ActionLogType,
  ActionLogData
>;

export class ShootBlocked extends MatchActionLogClass<
  ActionLogType,
  ActionLogData
> {
  public static readonly minDuration = 5;
  public static readonly maxDuration = 25;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {
    sim.setPossession(this.data.keeper);
  }
}
