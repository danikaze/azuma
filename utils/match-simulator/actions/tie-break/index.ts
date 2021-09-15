import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimTeamRef } from '@utils/match-simulator/sim/team';
import { MatchActionBaseData, MatchAction } from '..';

export interface TieBreakData extends MatchActionBaseData<'TieBreak'> {
  teamRef: SimTeamRef;
}

export class TieBreak extends MatchAction<'TieBreak'> {
  public run(sim: MatchSimulatorUpdater): void {
    sim.untie(this.data);
  }
}
