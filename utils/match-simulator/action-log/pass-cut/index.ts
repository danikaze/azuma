import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { CreateMatchActionLogData } from '../interfaces';
import { comments } from './comments';

type ActionLogType = 'PassCut';
type ActionLogData = 'from' | 'to' | 'cutBy';

export type PassCutData = CreateMatchActionLogData<
  ActionLogType,
  ActionLogData
>;

export class PassCut extends MatchActionLogClass<ActionLogType, ActionLogData> {
  public static readonly minDuration = 2;
  public static readonly maxDuration = 8;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {
    sim.setPossession(this.data.cutBy);
  }
}
