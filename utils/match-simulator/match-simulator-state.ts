import { MATCH_PERIODS } from '@utils/constants/game';
import { Rng } from '@utils/rng';
import { MatchActionData, MatchPlayerRef } from './interfaces';

export interface MatchSimulatorStateOptions {
  rngSeed?: number;
}

/**
 * The most basic MatchSimulator information, it just has the raw data
 */
export class MatchSimulatorState {
  protected rng!: Rng;

  protected score!: [number, number];
  protected possession!: MatchPlayerRef;
  protected period: number = 0;

  /** Actions per period */
  protected log!: MatchActionData[][];
  /** All actions in a single list */
  protected actions!: MatchActionData[];

  constructor() {
    this.reset();
  }

  public reset(options?: MatchSimulatorStateOptions): void {
    this.rng = options?.rngSeed
      ? new Rng({ seed: options.rngSeed })
      : new Rng();

    this.period = 0;
    this.score = [0, 0];
    this.log = [];
    this.actions = [];

    for (let i = 0; i < MATCH_PERIODS; i++) {
      this.log.push([]);
    }
  }
}
