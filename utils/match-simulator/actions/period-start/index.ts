import { MatchTeamRef } from '@utils/match-simulator/interfaces';
import { MatchSimulatorUpdater } from '@utils/match-simulator/match-simulator-updater';
import { MatchActionBaseData, MatchAction } from '..';

export interface PeriodStartData extends MatchActionBaseData<'PeriodStart'> {
  team: MatchTeamRef;
}

export class PeriodStart extends MatchAction<'PeriodStart'> {
  public run(sim: MatchSimulatorUpdater): void {}
}
