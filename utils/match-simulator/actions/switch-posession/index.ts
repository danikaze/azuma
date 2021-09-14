import { MatchSimulatorUpdater } from '@utils/match-simulator/match-simulator-updater';
import { MatchActionBaseData, MatchAction } from '..';

export interface SwitchPossessionData
  extends MatchActionBaseData<'SwitchPossession'> {}

export class SwitchPossession extends MatchAction<'SwitchPossession'> {
  public run(sim: MatchSimulatorUpdater): void {
    sim.switchPosession();
  }
}
