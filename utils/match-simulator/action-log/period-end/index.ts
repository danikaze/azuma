import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { CreateMatchActionLogData } from '../interfaces';
import { MatchEnd } from '../match-end';
import { comments } from './comments';

type ActionLogType = 'PeriodEnd';

export type PeriodEndData = CreateMatchActionLogData<ActionLogType>;

export class PeriodEnd extends MatchActionLogClass<ActionLogType> {
  public static readonly minDuration = MatchEnd.minDuration;
  public static readonly maxDuration = MatchEnd.maxDuration;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {
    sim.endPeriod(this.data);
  }
}
