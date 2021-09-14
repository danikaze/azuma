import { Match } from '@model/match/interfaces';
import { MATCH_PERIODS, MATCH_PERIOD_MS } from '@utils/constants/game';
import { createAction } from './actions/factory';
import { SimulateMatchResult } from './interfaces';
import { MatchSimulatorStateOptions } from './match-simulator-state';
import { MatchSimulatorUpdater } from './match-simulator-updater';

export interface MatchSimulatorRunOptions extends MatchSimulatorStateOptions {}

/**
 * Match Simulator built over the State+Querier+Updater
 * This class is the one carrying the logic of the simulation
 */
export class MatchSimulator extends MatchSimulatorUpdater {
  protected match: Match;

  constructor(match: Match) {
    super();
    this.match = match;
  }

  public run(options?: MatchSimulatorRunOptions): SimulateMatchResult {
    this.reset(options);
    const minActions = 100;
    const maxActions = 200;
    const goalPercentage = 30;
    const matchPeriodSecs = MATCH_PERIOD_MS / 1000;

    for (let period = 0; period < MATCH_PERIODS; period++) {
      const goalOpportunities = this.rng.integer(minActions, maxActions);
      const opportunityInterval = matchPeriodSecs / goalOpportunities;
      let possessionHome = period % 2 === 0;

      this.update(
        createAction({
          time: 0,
          type: 'MatchStart',
          player: this.getRandomPlayer(),
        })
      );

      let time = opportunityInterval;
      while (time < matchPeriodSecs) {
        if (this.rng.bool(goalPercentage)) {
          this.update(
            createAction({
              time: Math.floor(time),
              type: 'Goal',
            })
          );

          possessionHome = !possessionHome;
          continue;
        }

        if (this.rng.bool()) {
          this.update(
            createAction({
              time: Math.floor(time),
              type: 'SwitchPossession',
            })
          );
        }

        time += opportunityInterval;
      }

      this.update(
        createAction({
          time: matchPeriodSecs,
          type: 'PeriodEnd',
        })
      );
    }

    if (this.isScoreTied()) {
      this.update(
        createAction({
          time: matchPeriodSecs,
          type: 'TieBreak',
          team: this.rng.integer(0, 1) as 0 | 1,
        })
      );
    }

    return this.getResult();
  }

  public reset(options?: MatchSimulatorRunOptions): void {
    super.reset(options);
  }
}
