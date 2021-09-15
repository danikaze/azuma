import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionBaseData, MatchAction } from '..';

export interface GoalData extends MatchActionBaseData<'Goal'> {}

export class Goal extends MatchAction<'Goal'> {
  public run(sim: MatchSimulatorUpdater): void {
    sim.goal();
  }
}
