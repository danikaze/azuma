import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLog, MatchActionLogBaseData } from '..';

export interface GoalData extends MatchActionLogBaseData<'Goal'> {}

export class Goal extends MatchActionLog<'Goal'> {
  public static readonly minDuration = 15;
  public static readonly maxDuration = 30;

  public run(sim: MatchSimulatorUpdater): void {
    sim.goal();
  }
}
