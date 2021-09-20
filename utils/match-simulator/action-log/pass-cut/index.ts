import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionLog, MatchActionLogBaseData } from '..';

export interface PassCutData extends MatchActionLogBaseData<'PassCut'> {
  from: SimPlayerRef;
  to: SimPlayerRef;
  cutBy: SimPlayerRef;
}

export class PassCut extends MatchActionLog<'PassCut'> {
  public static readonly minDuration = 2;
  public static readonly maxDuration = 8;

  public run(sim: MatchSimulatorUpdater): void {
    sim.setPossession(this.data.cutBy);
  }
}
