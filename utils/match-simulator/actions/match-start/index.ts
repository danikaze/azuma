import { MatchPlayerRef } from '@utils/match-simulator/interfaces';
import { MatchSimulatorUpdater } from '@utils/match-simulator/match-simulator-updater';
import { MatchActionBaseData, MatchAction } from '..';

export interface MatchStartData extends MatchActionBaseData<'MatchStart'> {
  player: MatchPlayerRef;
}

export class MatchStart extends MatchAction<'MatchStart'> {
  public run(sim: MatchSimulatorUpdater): void {
    sim.startMatch(this.data);
  }
}
