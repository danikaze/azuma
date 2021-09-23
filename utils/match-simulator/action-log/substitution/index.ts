import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionLog, MatchActionLogBaseData } from '..';

export interface SubstitutionData
  extends MatchActionLogBaseData<'Substitution'> {
  in: SimPlayerRef;
  out: SimPlayerRef;
}

export class Substitution extends MatchActionLog<'Substitution'> {
  public static readonly minDuration = 30;
  public static readonly maxDuration = 60;

  public run(sim: MatchSimulatorUpdater): void {
    sim.substitute(this.data.out, this.data.in);
  }
}
