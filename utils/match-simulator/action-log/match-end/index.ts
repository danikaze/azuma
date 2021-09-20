import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLog, MatchActionLogBaseData } from '..';

export interface MatchEndData extends MatchActionLogBaseData<'MatchEnd'> {}

export class MatchEnd extends MatchActionLog<'MatchEnd'> {
  public static readonly minDuration = 0;
  public static readonly maxDuration = 0;

  public run(sim: MatchSimulatorUpdater): void {
    sim.endMatch(this.data);
  }
}
