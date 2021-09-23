import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { SimPlayerRef } from '@utils/match-simulator/sim/player';
import { MatchActionLog, MatchActionLogBaseData } from '..';

export interface FaulWithoutInjuryData
  extends MatchActionLogBaseData<'FaulWithoutInjury'> {
  from: SimPlayerRef;
  to: SimPlayerRef;
}

export class FaulWithoutInjury extends MatchActionLog<'FaulWithoutInjury'> {
  public static readonly minDuration = 10;
  public static readonly maxDuration = 25;

  public run(sim: MatchSimulatorUpdater): void {}
}
