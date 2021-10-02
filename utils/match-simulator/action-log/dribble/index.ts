import { MatchSimulatorUpdater } from '@utils/match-simulator/sim/match-simulator-updater';
import { MatchActionLogClass } from '..';
import { getPlayerCommentData } from '../comments';
import { CreateMatchActionLogData } from '../interfaces';
import { comments } from './comments';

type ActionLogType = 'Dribble';
type ActionLogData = 'attacker' | 'defender';

export type DribbleData = CreateMatchActionLogData<
  ActionLogType,
  ActionLogData
>;

export class Dribble extends MatchActionLogClass<ActionLogType, ActionLogData> {
  public static readonly minDuration = 5;
  public static readonly maxDuration = 15;
  public static comments = comments;

  public run(sim: MatchSimulatorUpdater): void {}

  public getComment(sim: MatchSimulatorUpdater) {
    return {
      type: 'Dribble' as const,
      text: comments[this.meta.comment],
      params: {
        attacker: getPlayerCommentData(sim, this.data.attacker),
        defender: getPlayerCommentData(sim, this.data.defender),
      },
    };
  }
}
