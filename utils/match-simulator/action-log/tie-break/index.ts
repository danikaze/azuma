import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimTeamRef } from '@utils/match-simulator/sim/team';
import { MatchActionBaseData, MatchActionLog } from '..';

export interface TieBreakData extends MatchActionBaseData<'TieBreak'> {
  teamRef: SimTeamRef;
}

export class TieBreak extends MatchActionLog<'TieBreak'> {
  public static readonly minDuration = 300;
  public static readonly maxDuration = 300;

  public run(sim: MatchSimulatorUpdater): void {
    sim.untie(this.data);
  }
}
