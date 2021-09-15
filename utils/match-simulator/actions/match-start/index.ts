import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionBaseData, MatchAction } from '..';

export interface MatchStartData extends MatchActionBaseData<'MatchStart'> {
  playerRef: SimPlayerRef;
}

export class MatchStart extends MatchAction<'MatchStart'> {
  public static readonly minDuration = 1;
  public static readonly maxDuration = 5;

  public run(sim: MatchSimulatorUpdater): void {
    sim.startMatch(this.data);
  }
}
