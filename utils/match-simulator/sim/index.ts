import { Match } from '@model/match/interfaces';
import { MATCH_PERIODS, MATCH_PERIOD_MS } from '@utils/constants/game';
import { ActionLogDataWithoutTime } from '../action';
import { createAction, getActionChances } from '../action/factory';
import { MatchSimulatorStateOptions } from './match-simulator-state';
import { MatchSimulatorUpdater } from './match-simulator-updater';

export type MatchSimulatorRunOptions = MatchSimulatorStateOptions;

/**
 * Match Simulator built over the State+Querier+Updater
 * This class is the one carrying the logic of the simulation
 */
export class MatchSimulator extends MatchSimulatorUpdater {
  constructor(match: Match) {
    super(match);
  }

  public run(options?: MatchSimulatorRunOptions): void {
    this.reset(options);
    const matchPeriodSecs = MATCH_PERIOD_MS / 1000;

    for (let period = 0; period < MATCH_PERIODS; period++) {
      // period start
      this.do({
        type: period === 0 ? 'MatchStart' : 'PeriodStart',
        playerRef: this.getRandomPlayer()!.getRef(),
      } as ActionLogDataWithoutTime<'MatchStart' | 'PeriodStart'>);

      // period actions
      while (this.time < matchPeriodSecs) {
        const actionType = getActionChances(this).pick(this.rng)!;
        const action = createAction(actionType);
        const actionLogs = action.run(this, this.rng);
        actionLogs.forEach((actionData) => this.do(actionData));
      }

      // period end
      this.do({
        type: period === MATCH_PERIODS - 1 ? 'MatchEnd' : 'PeriodEnd',
      });
    }

    if (!this.isScoreTied()) return;

    this.do({
      type: 'TieBreak',
      teamRef: this.getRandomTeam().getRef(),
    } as ActionLogDataWithoutTime<'TieBreak'>);
  }
}
