import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionLog, MatchActionLogBaseData } from '..';

export interface DribbleData extends MatchActionLogBaseData<'Dribble'> {
  attack: SimPlayerRef;
  defense: SimPlayerRef;
}

export class Dribble extends MatchActionLog<'Dribble'> {
  public static readonly minDuration = 5;
  public static readonly maxDuration = 15;

  public run(sim: MatchSimulatorUpdater): void {}
}
