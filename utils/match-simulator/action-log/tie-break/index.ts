import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { CreateMatchActionLogData } from '../interfaces';
import { comments } from './comments';

type ActionLogType = 'TieBreak';
type ActionLogData = 'winningTeam';

export type TieBreakData = CreateMatchActionLogData<
  ActionLogType,
  ActionLogData
>;

export class TieBreak extends MatchActionLogClass<
  ActionLogType,
  ActionLogData
> {
  public static readonly minDuration = 300;
  public static readonly maxDuration = 300;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {
    sim.untie(this.data);
  }
}
