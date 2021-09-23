import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionLog, MatchActionLogBaseData } from '..';

export interface DribbleCutData extends MatchActionLogBaseData<'DribbleCut'> {
  attack: SimPlayerRef;
  defense: SimPlayerRef;
}

export class DribbleCut extends MatchActionLog<'DribbleCut'> {
  public static readonly minDuration = 5;
  public static readonly maxDuration = 15;

  public run(sim: MatchSimulatorUpdater): void {
    sim.setPossession(this.data.defense);
  }
}
