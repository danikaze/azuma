import {
  GOAL_SCORE,
  MATCH_BREAK_MS,
  MATCH_PERIOD_MS,
} from '@utils/constants/game';
import { MatchAction, MatchActionType } from './actions';
import { createAction } from './actions/factory';
import { MatchStartData } from './actions/match-start';
import { TieBreakData } from './actions/tie-break';
import { MatchActionData } from './interfaces';
import { MatchSimulatorQuerier } from './match-simulator-querier';

/**
 * Top layer over the Match data that allows to update the state
 */
export class MatchSimulatorUpdater extends MatchSimulatorQuerier {
  constructor(log?: MatchActionData[][]) {
    super();

    if (log) {
      this.log = log;
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
      this.update(createAction(actionData))
    );
  }

  public update(action: MatchAction<MatchActionType>): void {
    this.log[this.period].push(action.data);
    this.actions.push(action.data);
    action.run(this);
  }

  public startMatch(action: MatchStartData) {
    this.possession = action.player;
  }

  public switchPosession() {
    this.possession = this.getRandomPlayer({ team: 1 - this.possession[0] });
  }

  public goal() {
    this.score[this.possession[0]] += GOAL_SCORE;
    this.switchPosession();
  }

  public untie(action: TieBreakData) {
    this.score[action.team] += Math.floor(GOAL_SCORE / 2);
  }
}
