import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionLog, MatchActionLogBaseData } from '..';

export interface RecoverLostBallData
  extends MatchActionLogBaseData<'RecoverLostBall'> {
  player: SimPlayerRef;
}

export class RecoverLostBall extends MatchActionLog<'RecoverLostBall'> {
  public static readonly minDuration = 5;
  public static readonly maxDuration = 10;

  public run(sim: MatchSimulatorUpdater): void {
    sim.setPossession(this.data.player);
  }
}
