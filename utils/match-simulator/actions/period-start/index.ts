import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionBaseData, MatchAction } from '..';

export interface PeriodStartData extends MatchActionBaseData<'PeriodStart'> {
  playerRef: SimPlayerRef;
}

export class PeriodStart extends MatchAction<'PeriodStart'> {
  public run(sim: MatchSimulatorUpdater): void {}
}
