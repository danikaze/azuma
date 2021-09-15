import { Match } from '@model/match/interfaces';
import { MATCH_PERIODS, MATCH_PERIOD_MS } from '@utils/constants/game';
import { createAction } from '../actions/factory';
import { MatchSimulatorStateOptions } from './match-simulator-state';
import { MatchSimulatorUpdater } from './match-simulator-updater';

export type MatchSimulatorRunOptions = MatchSimulatorStateOptions;

/**
 * Match Simulator built over the State+Querier+Updater
 * This class is the one carrying the logic of the simulation
 */
export class MatchSimulator extends MatchSimulatorUpdater {
  protected match: Match;

  constructor(match: Match) {
    super(match);
    this.match = match;
  }

  public run(options?: MatchSimulatorRunOptions): void {
    this.reset(options);
    const minActions = 100;
    const maxActions = 200;
    const goalPercentage = 30;
    const matchPeriodSecs = MATCH_PERIOD_MS / 1000;

    for (let period = 0; period < MATCH_PERIODS; period++) {
      const goalOpportunities = this.rng.integer(minActions, maxActions);
      const opportunityInterval = matchPeriodSecs / goalOpportunities;

      this.update(
        createAction({
          time: 0,
          type: period === 0 ? 'MatchStart' : 'PeriodStart',
          playerRef: this.getRandomPlayer()!.getRef(),
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
          type: period === MATCH_PERIODS - 1 ? 'MatchEnd' : 'PeriodEnd',
        })
      );
    }

    if (!this.isScoreTied()) return;

    this.update(
      createAction({
        time: matchPeriodSecs,
        type: 'TieBreak',
        teamRef: this.getRandomTeam().getRef(),
      })
    );
  }

  public reset(options?: MatchSimulatorRunOptions): void {
    super.reset(options);
  }
}
