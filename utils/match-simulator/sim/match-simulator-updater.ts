import { Match } from '@model/match/interfaces';
import {
  GOAL_SCORE,
  MATCH_BREAK_MS,
  MATCH_PERIOD_MS,
} from '@utils/constants/game';
import { getLogger } from '@utils/logger';
import { MatchActionCreationData } from '..';
import { MatchActionLogClass } from '../action-log';
import { AnyMatchActionComment } from '../action-log/comments';
import { createActionLog } from '../action-log/factory';
import {
  MatchActionLogData,
  MatchActionLogType,
} from '../action-log/interfaces';
import {
  FieldSection,
  FieldSectionSide,
  FIELD_SECTION_I,
  FIELD_SECTION_SIDE_I,
} from './constants';
import { MatchSimulatorQuerier } from './match-simulator-querier';
import { SimPlayer, SimPlayerRef } from './player';
import { SimTeamRef } from './team';

/**
 * Top layer over the Match data that allows to update the state
 */
export class MatchSimulatorUpdater extends MatchSimulatorQuerier {
  constructor(match: Match) {
    super(match);

    if (match.log) {
      this.log = match.log;
    }
  }

  private static getActions(
    log: MatchActionCreationData[][],
    ellapsedMs?: number
  ): MatchActionCreationData[] {
    const actions: MatchActionCreationData[] = [];
    const fullPeriodAndBreak = (MATCH_PERIOD_MS + MATCH_BREAK_MS) / 1000;
    let playedTime = ellapsedMs ? ellapsedMs / 1000 : undefined;

    for (const period of log) {
      // no time limit
      if (playedTime === undefined) {
        actions.push(...period);
        continue;
      }

      // full period finished
      if (playedTime! > MATCH_PERIOD_MS) {
        playedTime -= fullPeriodAndBreak;
        actions.push(...period);
        continue;
      }

      // period still not started
      if (playedTime < 0) {
        break;
      }

      // period being currently played
      for (const action of period) {
        if (playedTime < action.meta.time) break;
        actions.push(action);
      }
      playedTime -= fullPeriodAndBreak;
    }

    return actions;
  }

  public replay(ellapsedMs?: number): void {
    const log = this.log;
    this.reset();
    MatchSimulatorUpdater.getActions(log, ellapsedMs).forEach((actionData) =>
      this.update(
        createActionLog(
          this.rng,
          actionData.data,
          actionData.meta.time,
          actionData.meta.comment
        )
      )
    );
  }

  public update(action: MatchActionLogClass<MatchActionLogType>): void {
    if (!IS_PRODUCTION) {
      Object.entries(action.data).forEach(([key, value]) => {
        if (JSON.stringify(value) === undefined) {
          getLogger('MatchSimulatorUpdater').warn(
            `MatchAction "${action.data.type}" is using non-serializable data in key ${key}`
          );
        }
      });
    }

    const creationData = {
      data: action.data,
      meta: action.meta,
    } as MatchActionCreationData;
    this.log[this.period].push(creationData);
    this.actions.push(creationData);
    action.run(this);

    if (action.getComment) {
      const commentData = action.getComment(this) as AnyMatchActionComment;
      this.comments.push(commentData);
    }
  }

  public startMatch(action: MatchActionLogData['MatchStart']): void {
    this.possession = this.getPlayer(action.player);
    this.ballPosition[FIELD_SECTION_I] = FieldSection.CENTER;
    this.ballPosition[FIELD_SECTION_SIDE_I] = FieldSectionSide.CENTER;
  }

  public startPeriod(action: MatchActionLogData['PeriodStart']): void {
    this.possession = this.getPlayer(action.player);
    this.ballPosition[FIELD_SECTION_I] = FieldSection.CENTER;
    this.ballPosition[FIELD_SECTION_SIDE_I] = FieldSectionSide.CENTER;
  }

  public endPeriod(action: MatchActionLogData['PeriodEnd']): void {
    this.period++;
    this.time = 0;
  }

  public endMatch(action: MatchActionLogData['MatchEnd']): void {}

  public setPossession(player: SimPlayer | SimPlayerRef | undefined): void {
    const MAX_SECTOR_INDEX = 4;
    this.possession = this.getPlayer(player);
    // TODO: manage properly the direction of the ball
    this.ballPosition[FIELD_SECTION_I] = Math.max(
      0,
      Math.min(
        MAX_SECTOR_INDEX,
        this.ballPosition[FIELD_SECTION_I] + this.rng.integer(-1, 1)
      )
    );
  }

  public goal() {
    if (!this.possession) return;
    this.addScore(this.getAttackingTeamIndex()!, GOAL_SCORE);
    this.ballPosition[FIELD_SECTION_I] = FieldSection.CENTER;
    this.ballPosition[FIELD_SECTION_SIDE_I] = FieldSectionSide.CENTER;
  }

  public untie(action: MatchActionLogData['TieBreak']) {
    this.addScore(action.winningTeam, GOAL_SCORE / 2);
  }

  public injury(player: SimPlayer | SimPlayerRef, time: number): void {
    this.getPlayer(player).setState('injury', time);
  }

  public substitute(
    getsOut: SimPlayer | SimPlayerRef,
    getsIn: SimPlayer | SimPlayerRef
  ): void {
    const exitingPlayer = this.getPlayer(getsOut)!;
    const enteringPlayer = this.getPlayer(getsIn)!;

    if (exitingPlayer.team !== enteringPlayer.team) {
      throw new Error(`Can't substitute players from different teams`);
    }

    exitingPlayer.team.substitute(
      exitingPlayer.getRef(),
      enteringPlayer.getRef()
    );
  }

  protected do<T extends MatchActionLogType>(
    data: MatchActionLogData[T]
  ): void {
    const action = createActionLog(this.rng, data, this.time);
    this.update(action);
    this.time += action.meta.duration;
  }

  protected addScore(team: SimTeamRef, value: number): void {
    this.score[team] += value;
  }
}
