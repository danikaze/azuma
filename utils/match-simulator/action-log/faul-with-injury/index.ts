import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { CreateMatchActionLogData } from '../interfaces';
import { comments } from './comments';

type ActionLogType = 'FaulWithInjury';
type ActionLogData = 'from' | 'to' | 'duration';

export type FaulWithInjuryData = CreateMatchActionLogData<
  ActionLogType,
  ActionLogData
>;

export class FaulWithInjury extends MatchActionLogClass<
  ActionLogType,
  ActionLogData
> {
  public static readonly minDuration = 45;
  public static readonly maxDuration = 120;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {
    sim.injury(this.data.to, this.data.duration);
  }
}
