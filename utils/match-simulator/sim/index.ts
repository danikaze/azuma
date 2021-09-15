import { Match } from '@model/match/interfaces';
import { MATCH_PERIODS, MATCH_PERIOD_MS } from '@utils/constants/game';
import { WeightedOptions } from '@utils/rng/weighted-options';
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
      this.do({
        type: period === 0 ? 'MatchStart' : 'PeriodStart',
        playerRef: this.getRandomPlayer()!.getRef(),
      });

      this.runPeriodMainActions(matchPeriodSecs);

      this.do({
        type: period === MATCH_PERIODS - 1 ? 'MatchEnd' : 'PeriodEnd',
      });
    }

    if (!this.isScoreTied()) return;

    this.do({
      type: 'TieBreak',
      teamRef: this.getRandomTeam().getRef(),
    });
  }

  public reset(options?: MatchSimulatorRunOptions): void {
    super.reset(options);
    this.time = 0;
  }

  protected runPeriodMainActions(matchPeriodSecs: number): void {
    const actions = new WeightedOptions([
      {
        data: 'Goal',
        weight: 1,
      } as const,
      {
        data: 'Pass',
        weight: 6,
      } as const,
      {
        data: 'SwitchPossession',
        weight: 4,
      } as const,
    ]);

    while (this.time < matchPeriodSecs) {
      const action = actions.pick(this.rng)!;

      if (action === 'Goal') {
        this.do({
          type: 'Goal',
        });
        continue;
      }

      if (this.possession && action === 'Pass') {
        const toPlayer = this.getRandomPlayer({
          team: this.getAttackingTeam(),
        })!;
        this.do({
          type: 'Pass',
          from: this.possession.getRef(),
          to: toPlayer.getRef(),
        });
        continue;
      }

      if (action === 'SwitchPossession') {
        this.do({
          type: 'SwitchPossession',
        });
        continue;
      }
    }
  }
}
