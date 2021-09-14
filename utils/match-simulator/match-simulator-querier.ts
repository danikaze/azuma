import { PlayerPosition } from '@model/player/interfaces';
import { MatchSimulatorState } from './match-simulator-state';
import {
  MatchPlayerRef,
  MatchTeamRef,
  SimulateMatchResult,
} from './interfaces';

/**
 * Wraps the raw data of a match and provides public accesors via methods
 */
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

  protected getRandomPlayer(
    options: {
      team?: MatchTeamRef;
      desiredPositions?: PlayerPosition[];
      forbiddenPositions?: PlayerPosition[];
    } = {}
  ): MatchPlayerRef {
    const t =
      options.team !== undefined
        ? options.team
        : (this.rng.integer(0, 1) as MatchTeamRef);

    return [t, 0];
  }
}
