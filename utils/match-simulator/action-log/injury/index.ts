import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionLog, MatchActionLogBaseData } from '..';

export interface InjuryData extends MatchActionLogBaseData<'Injury'> {
  player: SimPlayerRef;
  duration: number;
  from?: SimPlayerRef;
}

export class Injury extends MatchActionLog<'Injury'> {
  public static readonly minDuration = 60;
  public static readonly maxDuration = 120;

  public run(sim: MatchSimulatorUpdater): void {
    sim.injury(this.data.player, this.data.duration);
  }
}
