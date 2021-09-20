import { MatchSimulatorQuerier } from '@utils/match-simulator/sim/match-simulator-querier';
import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionBaseData, MatchActionLog } from '..';

export interface PassData extends MatchActionBaseData<'Pass'> {
  from: SimPlayerRef;
  to: SimPlayerRef;
}

export class Pass extends MatchActionLog<'Pass'> {
  public static readonly minDuration = 3;
  public static readonly maxDuration = 10;

  public static getChances(sim: MatchSimulatorQuerier): number {
    if (!sim.getAttackingTeam()) return 0;
    return MatchActionLog.DEFAULT_ACTION_CHANCES;
  }

  public run(sim: MatchSimulatorUpdater): void {
    sim.setPossession(this.data.to);
  }
}