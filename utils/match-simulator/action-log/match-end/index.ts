import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionBaseData, MatchActionLog } from '..';

export interface MatchEndData extends MatchActionBaseData<'MatchEnd'> {}

export class MatchEnd extends MatchActionLog<'MatchEnd'> {
  public static readonly minDuration = 0;
  public static readonly maxDuration = 0;

  public run(sim: MatchSimulatorUpdater): void {
    sim.endMatch(this.data);
  }
}
