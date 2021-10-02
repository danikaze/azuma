import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { CreateMatchActionLogData } from '../interfaces';
import { comments } from './comments';

type ActionLogType = 'RecoverLostBall';
type ActionLogData = 'player';

export type RecoverLostBallData = CreateMatchActionLogData<
  ActionLogType,
  ActionLogData
>;

export class RecoverLostBall extends MatchActionLogClass<
  ActionLogType,
  ActionLogData
> {
  public static readonly minDuration = 5;
  public static readonly maxDuration = 10;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {
    sim.setPossession(this.data.player);
  }
}
