import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionLog, MatchActionLogBaseData } from '..';

export interface MatchStartData extends MatchActionLogBaseData<'MatchStart'> {
  playerRef: SimPlayerRef;
}

export class MatchStart extends MatchActionLog<'MatchStart'> {
  public static readonly minDuration = 1;
  public static readonly maxDuration = 5;

  public run(sim: MatchSimulatorUpdater): void {
    sim.startMatch(this.data);
  }
}
