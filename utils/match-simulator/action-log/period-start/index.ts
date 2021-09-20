import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionLog, MatchActionLogBaseData } from '..';
import { MatchStart } from '../match-start';

export interface PeriodStartData extends MatchActionLogBaseData<'PeriodStart'> {
  playerRef: SimPlayerRef;
}

export class PeriodStart extends MatchActionLog<'PeriodStart'> {
  public static readonly minDuration = MatchStart.minDuration;
  public static readonly maxDuration = MatchStart.maxDuration;

  public run(sim: MatchSimulatorUpdater): void {
    sim.startPeriod(this.data);
  }
}
