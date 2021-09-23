import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionLog, MatchActionLogBaseData } from '..';

export interface ShootMissData extends MatchActionLogBaseData<'ShootMiss'> {
  shooter: SimPlayerRef;
  keeper: SimPlayerRef;
}

export class ShootMiss extends MatchActionLog<'ShootMiss'> {
  public static readonly minDuration = 5;
  public static readonly maxDuration = 15;

  public run(sim: MatchSimulatorUpdater): void {
    sim.setPossession(this.data.keeper);
  }
}
