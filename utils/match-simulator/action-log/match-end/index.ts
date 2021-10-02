import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { CreateMatchActionLogData } from '../interfaces';
import { comments } from './comments';

type ActionLogType = 'MatchEnd';

export type MatchEndData = CreateMatchActionLogData<ActionLogType>;

export class MatchEnd extends MatchActionLogClass<ActionLogType> {
  public static readonly minDuration = 0;
  public static readonly maxDuration = 0;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {
    sim.endMatch(this.data);
  }
}
