import { Match } from '@model/match/interfaces';
import {
  GOAL_SCORE,
  MATCH_BREAK_MS,
  MATCH_PERIOD_MS,
} from '@utils/constants/game';
import { getLogger } from '@utils/logger';
import { MatchActionData } from '..';
import {
  MatchActionLog,
  MatchActionLogDataMap,
  MatchActionLogType,
} from '../action-log';
import { MatchEndData } from '../action-log/match-end';
import { MatchStartData } from '../action-log/match-start';
import { PeriodEndData } from '../action-log/period-end';
import { PeriodStartData } from '../action-log/period-start';
import { TieBreakData } from '../action-log/tie-break';
import {
  FieldSection,
  FieldSectionSide,
  FIELD_SECTION_I,
  FIELD_SECTION_SIDE_I,
} from './constants';
import { MatchSimulatorQuerier } from './match-simulator-querier';
import { SimPlayer, SimPlayerRef } from './player';
import { SimTeamRef } from './team';

type ActionsWithoutTime = {
  [K in keyof MatchActionLogDataMap]: Omit<MatchActionLogDataMap[K], 'time'>;
};

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
    log: MatchActionData[][],
    ellapsedMs?: number
  ): MatchActionData[] {
    const actions: MatchActionData[] = [];
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
        if (playedTime < action.time) break;
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
      this.update(this.createActionLog(actionData))
    );
  }

  public update(action: MatchActionLog<MatchActionLogType>): void {
    if (!IS_PRODUCTION) {
      Object.entries(action.data).forEach(([key, value]) => {
        if (JSON.stringify(value) === undefined) {
          getLogger('MatchSimulatorUpdater').warn(
            `MatchAction "${action.data.type}" is using non-serializable data in key ${key}`
          );
        }
      });
    }

    this.log[this.period].push(action.data);
    this.actions.push(action.data);
    action.run(this);
  }

  public startMatch(action: MatchStartData): void {
    this.possession = this.getPlayer(action.playerRef);
    this.ballPosition[FIELD_SECTION_I] = FieldSection.CENTER;
    this.ballPosition[FIELD_SECTION_SIDE_I] = FieldSectionSide.CENTER;
  }

  public startPeriod(action: PeriodStartData): void {
    this.possession = this.getPlayer(action.playerRef);
    this.ballPosition[FIELD_SECTION_I] = FieldSection.CENTER;
    this.ballPosition[FIELD_SECTION_SIDE_I] = FieldSectionSide.CENTER;
  }

  public endPeriod(action: PeriodEndData): void {
    this.period++;
    this.time = 0;
  }

  public endMatch(action: MatchEndData): void {}

  public switchPossession(): void {
    if (!this.possession) {
      this.possession = this.getRandomPlayer()!;
      return;
    }
    this.possession = this.getRandomPlayer({
      team: this.getDefendingTeam(),
    })!;
  }

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

  public untie(action: TieBreakData) {
    this.addScore(action.teamRef, GOAL_SCORE / 2);
  }

  protected do<T extends keyof ActionsWithoutTime>(
    data: ActionsWithoutTime[T]
  ): void {
    const action = this.createActionLog({
      ...data,
      time: this.time,
    } as MatchActionLogDataMap[T]);
    this.update(action);
    this.time += action.duration;
  }

  protected addScore(team: SimTeamRef, value: number): void {
    this.score[team] += value;
  }
}
