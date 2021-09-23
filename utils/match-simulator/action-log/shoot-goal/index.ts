import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionLog, MatchActionLogBaseData } from '..';

export interface ShootGoalData extends MatchActionLogBaseData<'ShootGoal'> {
  shooter: SimPlayerRef;
  keeper: SimPlayerRef;
}

export class ShootGoal extends MatchActionLog<'ShootGoal'> {
  public static readonly minDuration = 15;
  public static readonly maxDuration = 30;

  public run(sim: MatchSimulatorUpdater): void {
    sim.goal();
  }
}
