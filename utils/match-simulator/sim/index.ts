import { Match } from '@model/match/interfaces';
import { MATCH_PERIODS, MATCH_PERIOD_MS } from '@utils/constants/game';
import { MatchActionLogType } from '../action-log';
import { getActionLogChances } from '../action-log/factory';
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
    while (this.time < matchPeriodSecs) {
      const action = this.selectNextActionType();

      if (action === 'Goal') {
        this.do({
          type: 'Goal',
        });
        continue;
      }

      if (action === 'Pass') {
        const currentPlayer = this.getPlayer(this.possession)!;
        const toPlayer = this.getRandomPlayer({
          team: this.getAttackingTeam(),
          filter: (player) => player !== currentPlayer,
        })!;
        this.do({
          type: 'Pass',
          from: this.possession!.getRef(),
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

  protected selectNextActionType(): MatchActionLogType {
    return getActionLogChances(this).pick(this.rng)!;
  }
}
