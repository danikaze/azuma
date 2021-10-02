import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { CreateMatchActionLogData } from '../interfaces';
import { MatchStart } from '../match-start';
import { comments } from './comments';

type ActionLogType = 'PeriodStart';
type ActionLogData = 'player';

export type PeriodStartData = CreateMatchActionLogData<
  ActionLogType,
  ActionLogData
>;

export class PeriodStart extends MatchActionLogClass<
  ActionLogType,
  ActionLogData
> {
  public static readonly minDuration = MatchStart.minDuration;
  public static readonly maxDuration = MatchStart.maxDuration;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {
    sim.startPeriod(this.data);
  }
}
