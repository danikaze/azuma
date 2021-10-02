import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { CreateMatchActionLogData } from '../interfaces';
import { comments } from './comments';

type ActionLogType = 'Pass';
type ActionLogData = 'from' | 'to';

export type PassData = CreateMatchActionLogData<ActionLogType, ActionLogData>;

export class Pass extends MatchActionLogClass<'Pass', 'from' | 'to'> {
  public static readonly minDuration = 3;
  public static readonly maxDuration = 10;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {
    sim.setPossession(this.data.to);
  }
}
