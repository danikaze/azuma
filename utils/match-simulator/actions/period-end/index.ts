import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionBaseData, MatchAction } from '..';

export interface PeriodEndData extends MatchActionBaseData<'PeriodEnd'> {}

export class PeriodEnd extends MatchAction<'PeriodEnd'> {
  public run(sim: MatchSimulatorUpdater): void {}
}
