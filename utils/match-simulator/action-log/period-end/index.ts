import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLog, MatchActionLogBaseData } from '..';
import { MatchEnd } from '../match-end';

export interface PeriodEndData extends MatchActionLogBaseData<'PeriodEnd'> {}

export class PeriodEnd extends MatchActionLog<'PeriodEnd'> {
  public static readonly minDuration = MatchEnd.minDuration;
  public static readonly maxDuration = MatchEnd.maxDuration;

  public run(sim: MatchSimulatorUpdater): void {
    sim.endPeriod(this.data);
  }
}
