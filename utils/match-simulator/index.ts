import { Match } from '@model/match/interfaces';
import { MATCH_PERIODS, MATCH_PERIOD_SECONDS } from '@utils/constants/game';
import { Rng } from '@utils/rng';
import { createAction } from './actions';
import { SimulateMatchResult } from './interfaces';
import { MatchSimulatorUpdater } from './match-simulator-updater';

export interface MatchSimulatorRunOptions {
  rngSeed?: number;
}

export class MatchSimulator extends MatchSimulatorUpdater {
  protected match: Match;
  protected rng!: Rng;

  constructor(match: Match) {
    super();
    this.match = match;
  }

  public run(options?: MatchSimulatorRunOptions): SimulateMatchResult {
    this.reset(options);
    const minActions = 100;
    const maxActions = 200;
    const goalPercentage = 30;

    for (let period = 0; period < MATCH_PERIODS; period++) {
      const goalOpportunities = this.rng.integer(minActions, maxActions);
      const opportunityInterval = MATCH_PERIOD_SECONDS / goalOpportunities;
      let possessionHome = period % 2 === 0;

      this.update(
        createAction({
          time: 0,
          type: 'MatchStart',
          team: this.rng.integer(0, 1) as 0 | 1,
        })
      );

      let time = opportunityInterval;
      while (time < MATCH_PERIOD_SECONDS) {
        if (this.rng.bool(goalPercentage)) {
          this.update(
            createAction({
              time,
              type: 'Goal',
            })
          );

          possessionHome = !possessionHome;
          continue;
        }

        if (this.rng.bool()) {
          this.update(
            createAction({
              time,
              type: 'SwitchPossession',
            })
          );
        }

        time += opportunityInterval;
      }

      this.update(
        createAction({
          time: MATCH_PERIOD_SECONDS,
          type: 'PeriodEnd',
        })
      );
    }

    if (this.isScoreTied()) {
      this.update(
        createAction({
          time: MATCH_PERIOD_SECONDS,
          type: 'TieBreak',
          team: this.rng.integer(0, 1) as 0 | 1,
        })
      );
    }

    return this.getResult();
  }

  public reset(options?: MatchSimulatorRunOptions): void {
    super.reset();

    this.rng = options?.rngSeed
      ? new Rng({ seed: options.rngSeed })
      : new Rng();
  }
}
