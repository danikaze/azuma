import {
  GOAL_SCORE,
  MATCH_BREAK_MS,
  MATCH_PERIOD_MS,
} from '@utils/constants/game';
import { isAction, MatchActionData } from './actions';
import { MatchAction, MatchTeam } from './interfaces';
import { MatchSimulatorQuerier } from './match-simulator-querier';

export class MatchSimulatorUpdater extends MatchSimulatorQuerier {
  constructor(log?: MatchAction[][]) {
    super();

    if (log) {
      this.log = log;
    }
  }

  private static getActions(
    log: MatchAction[][],
    ellapsedMs?: number
  ): MatchAction[] {
    const actions: MatchAction[] = [];
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
    MatchSimulatorUpdater.getActions(log, ellapsedMs).forEach((action) =>
      this.update(action)
    );
  }

  public update(action: MatchAction): void {
    this.log[this.period].push(action);
    this.actions.push(action);

    // TODO: Maybe just provide the action API and delegate the effects to
    // each action like `action.do(this)` when the list grows;
    if (isAction('MatchStart', action)) {
      return this.startMatch(action);
    }

    if (isAction('SwitchPossession', action)) {
      return this.switchPosession();
    }

    if (isAction('Goal', action)) {
      return this.goal();
    }

    if (isAction('TieBreak', action)) {
      return this.untie(action);
    }

    if (isAction('PeriodEnd', action)) {
      return;
    }

    throw new Error(`Unknown action ${action.type}`);
  }

  public startMatch(action: MatchActionData['MatchStart']) {
    this.possession = action.team;
  }

  public switchPosession() {
    this.possession = (1 - this.possession) as MatchTeam;
  }

  public goal() {
    this.score[this.possession] += GOAL_SCORE;
    this.switchPosession();
  }

  public untie(action: MatchActionData['TieBreak']) {
    this.score[action.team] += Math.floor(GOAL_SCORE / 2);
  }
}
