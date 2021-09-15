import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionBaseData, MatchAction } from '..';

export interface GoalData extends MatchActionBaseData<'Goal'> {}

export class Goal extends MatchAction<'Goal'> {
  public static readonly minDuration = 15;
  public static readonly maxDuration = 30;

  public run(sim: MatchSimulatorUpdater): void {
    sim.goal();
  }
}
