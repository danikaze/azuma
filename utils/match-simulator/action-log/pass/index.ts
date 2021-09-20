import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionLog, MatchActionLogBaseData } from '..';

export interface PassData extends MatchActionLogBaseData<'Pass'> {
  from: SimPlayerRef;
  to: SimPlayerRef;
}

export class Pass extends MatchActionLog<'Pass'> {
  public static readonly minDuration = 3;
  public static readonly maxDuration = 10;

  public run(sim: MatchSimulatorUpdater): void {
    sim.setPossession(this.data.to);
  }
}
