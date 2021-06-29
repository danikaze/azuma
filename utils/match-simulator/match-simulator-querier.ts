import { MatchSimulatorState } from './match-simulator-state';
import { SimulateMatchResult } from './interfaces';

export class MatchSimulatorQuerier extends MatchSimulatorState {
  public getResult(): Readonly<SimulateMatchResult> {
    return {
      homeScore: this.score[0],
      awayScore: this.score[1],
      log: this.log,
      actions: this.actions,
    };
  }

  public isScoreTied(): boolean {
    return this.score[0] === this.score[1];
  }
}
