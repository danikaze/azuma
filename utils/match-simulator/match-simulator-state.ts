import { MATCH_PERIODS } from '@utils/constants/game';
import { MatchAction, MatchTeam } from './interfaces';

export class MatchSimulatorState {
  protected score!: [number, number];
  protected possession!: MatchTeam;
  protected period: number = 0;

  /** Actions per period */
  protected log!: MatchAction[][];
  /** All actions in a single list */
  protected actions!: MatchAction[];

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.period = 0;
    this.score = [0, 0];
    this.log = [];
    this.actions = [];

    for (let i = 0; i < MATCH_PERIODS; i++) {
      this.log.push([]);
    }
  }
}
