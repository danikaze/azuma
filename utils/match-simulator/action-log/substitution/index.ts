import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { CreateMatchActionLogData } from '../interfaces';
import { comments } from './comments';

type ActionLogType = 'Substitution';
type ActionLogData = 'playerIn' | 'playerOut';

export type SubstitutionData = CreateMatchActionLogData<
  ActionLogType,
  ActionLogData
>;

export class Substitution extends MatchActionLogClass<
  ActionLogType,
  ActionLogData
> {
  public static readonly minDuration = 30;
  public static readonly maxDuration = 60;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {
    sim.substitute(this.data.playerOut, this.data.playerIn);
  }
}
