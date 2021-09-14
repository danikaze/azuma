import { MatchTeamRef } from '@utils/match-simulator/interfaces';
import { MatchSimulatorUpdater } from '@utils/match-simulator/match-simulator-updater';
import { MatchActionBaseData, MatchAction } from '..';

export interface TieBreakData extends MatchActionBaseData<'TieBreak'> {
  team: MatchTeamRef;
}

export class TieBreak extends MatchAction<'TieBreak'> {
  public run(sim: MatchSimulatorUpdater): void {
    sim.untie(this.data);
  }
}
