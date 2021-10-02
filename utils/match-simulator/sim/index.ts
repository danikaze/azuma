import { Match } from '@model/match/interfaces';
import { MATCH_PERIODS, MATCH_PERIOD_MS } from '@utils/constants/game';
import { MatchActionLogData } from '../action-log/interfaces';
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
      if (period === 0) {
        this.do({
          type: 'MatchStart',
          player: this.getRandomPlayer()!.getRef(),
        } as MatchActionLogData['MatchStart']);
      } else {
        this.do({
          type: 'PeriodStart',
          player: this.getRandomPlayer()!.getRef(),
          currentPeriod: period,
        } as MatchActionLogData['PeriodStart']);
      }

      // period actions
      while (this.time < matchPeriodSecs) {
        const actionType = getActionChances(this).pick(this.rng);

        if (!actionType) {
          throw new Error('No action available with the current Sim status');
        }

        const action = createAction(actionType);
        const actionLogs = action.run(this, this.rng);
        actionLogs.forEach((actionData) => this.do(actionData));
      }

      // period end
      if (period === MATCH_PERIODS - 1) {
        this.do({
          type: 'MatchEnd',
        });
      } else {
        this.do({
          type: 'PeriodEnd',
          currentPeriod: period,
        });
      }
    }

    if (!this.isScoreTied()) return;

    this.do({
      type: 'TieBreak',
      winningTeam: this.getRandomTeam().getRef(),
    } as MatchActionLogData['TieBreak']);
  }
}
