import { MatchSimulatorUpdater } from '@utils/match-simulator/match-simulator-updater';
import { MatchActionBaseData, MatchAction } from '..';

export interface MatchEndData extends MatchActionBaseData<'MatchEnd'> {}

export class MatchEnd extends MatchAction<'MatchEnd'> {
  public run(sim: MatchSimulatorUpdater): void {}
}
