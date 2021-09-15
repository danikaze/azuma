import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionBaseData, MatchAction } from '..';

export interface PassData extends MatchActionBaseData<'Pass'> {
  from: SimPlayerRef;
  to: SimPlayerRef;
}

export class Pass extends MatchAction<'Pass'> {
  public static readonly minDuration = 3;
  public static readonly maxDuration = 10;

  public run(sim: MatchSimulatorUpdater): void {
    sim.setPossession(this.data.to);
  }
}
