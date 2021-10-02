import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { CreateMatchActionLogData } from '../interfaces';
import { comments } from './comments';

type ActionLogType = 'Injury';
type ActionLogData = 'player';

export type MatchStartData = CreateMatchActionLogData<
  ActionLogType,
  ActionLogData
>;

export class MatchStart extends MatchActionLogClass<
  ActionLogType,
  ActionLogData
> {
  public static readonly minDuration = 1;
  public static readonly maxDuration = 5;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {
    sim.startMatch(this.data);
  }
}
