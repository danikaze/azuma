import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionBaseData, MatchAction } from '..';

export interface SwitchPossessionData
  extends MatchActionBaseData<'SwitchPossession'> {}

export class SwitchPossession extends MatchAction<'SwitchPossession'> {
  public static readonly minDuration = 5;
  public static readonly maxDuration = 15;

  public run(sim: MatchSimulatorUpdater): void {
    sim.switchPossession();
  }
}
