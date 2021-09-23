import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionLog, MatchActionLogBaseData } from '..';

export interface FaulWithInjuryData
  extends MatchActionLogBaseData<'FaulWithInjury'> {
  from: SimPlayerRef;
  to: SimPlayerRef;
  duration: number;
}

export class FaulWithInjury extends MatchActionLog<'FaulWithInjury'> {
  public static readonly minDuration = 45;
  public static readonly maxDuration = 120;

  public run(sim: MatchSimulatorUpdater): void {
    sim.injury(this.data.to, this.data.duration);
  }
}
