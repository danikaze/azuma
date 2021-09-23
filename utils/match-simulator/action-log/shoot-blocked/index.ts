import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionLog, MatchActionLogBaseData } from '..';

export interface ShootBlockedData
  extends MatchActionLogBaseData<'ShootBlocked'> {
  shooter: SimPlayerRef;
  keeper: SimPlayerRef;
}

export class ShootBlocked extends MatchActionLog<'ShootBlocked'> {
  public static readonly minDuration = 5;
  public static readonly maxDuration = 25;

  public run(sim: MatchSimulatorUpdater): void {
    sim.setPossession(this.data.keeper);
  }
}
