import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { CreateMatchActionLogData } from '../interfaces';
import { comments } from './comments';

type ActionLogType = 'FaulWithoutInjury';
type ActionLogData = 'from' | 'to';

export type FaulWithoutInjuryData = CreateMatchActionLogData<
  ActionLogType,
  ActionLogData
>;

export class FaulWithoutInjury extends MatchActionLogClass<
  ActionLogType,
  ActionLogData
> {
  public static readonly minDuration = 10;
  public static readonly maxDuration = 25;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {}
}
