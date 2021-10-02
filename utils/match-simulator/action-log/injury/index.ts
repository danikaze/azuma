import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { CreateMatchActionLogData } from '../interfaces';
import { comments } from './comments';

type ActionLogType = 'Injury';
type ActionLogData = 'from' | 'injuriedPlayer' | 'duration';

export type InjuryData = CreateMatchActionLogData<ActionLogType, ActionLogData>;

export class Injury extends MatchActionLogClass<ActionLogType, ActionLogData> {
  public static readonly minDuration = 60;
  public static readonly maxDuration = 120;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {
    sim.injury(this.data.injuriedPlayer, this.data.duration);
  }
}
