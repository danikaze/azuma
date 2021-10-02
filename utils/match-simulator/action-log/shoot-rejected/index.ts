import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { CreateMatchActionLogData } from '../interfaces';
import { comments } from './comments';

type ActionLogType = 'ShootRejected';
type ActionLogData = 'shooter' | 'keeper';

export type ShootRejectedData = CreateMatchActionLogData<
  ActionLogType,
  ActionLogData
>;

export class ShootRejected extends MatchActionLogClass<
  ActionLogType,
  ActionLogData
> {
  public static readonly minDuration = 2;
  public static readonly maxDuration = 7;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {
    sim.setPossession(undefined);
  }
}
