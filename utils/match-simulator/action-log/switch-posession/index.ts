import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLog, MatchActionLogBaseData } from '..';

export interface SwitchPossessionData
  extends MatchActionLogBaseData<'SwitchPossession'> {}

export class SwitchPossession extends MatchActionLog<'SwitchPossession'> {
  public static readonly minDuration = 5;
  public static readonly maxDuration = 15;

  public run(sim: MatchSimulatorUpdater): void {
    sim.switchPossession();
  }
}
