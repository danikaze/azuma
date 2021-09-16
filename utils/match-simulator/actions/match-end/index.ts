import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionBaseData, MatchAction } from '..';

export interface MatchEndData extends MatchActionBaseData<'MatchEnd'> {}

export class MatchEnd extends MatchAction<'MatchEnd'> {
  public static readonly minDuration = 0;
  public static readonly maxDuration = 0;

  public run(sim: MatchSimulatorUpdater): void {
    sim.endMatch(this.data);
  }
}
