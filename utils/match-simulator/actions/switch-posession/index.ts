import { MatchSimulatorQuerier } from '@utils/match-simulator/sim/match-simulator-querier';
import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionBaseData, MatchAction } from '..';

export interface SwitchPossessionData
  extends MatchActionBaseData<'SwitchPossession'> {}

export class SwitchPossession extends MatchAction<'SwitchPossession'> {
  public static readonly minDuration = 5;
  public static readonly maxDuration = 15;

  public static getChances(sim: MatchSimulatorQuerier): number {
    if (!sim.getAttackingTeam()) return 0;
    return MatchAction.DEFAULT_ACTION_CHANCES / 2;
  }

  public run(sim: MatchSimulatorUpdater): void {
    sim.switchPossession();
  }
}
