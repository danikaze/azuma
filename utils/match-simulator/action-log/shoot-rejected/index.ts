import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionLog, MatchActionLogBaseData } from '..';

export interface ShootRejectedData
  extends MatchActionLogBaseData<'ShootRejected'> {
  shooter: SimPlayerRef;
  keeper: SimPlayerRef;
}

export class ShootRejected extends MatchActionLog<'ShootRejected'> {
  public static readonly minDuration = 2;
  public static readonly maxDuration = 7;

  public run(sim: MatchSimulatorUpdater): void {
    sim.setPossession(undefined);
  }
}
