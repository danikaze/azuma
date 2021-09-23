import {
  AlteredState,
  PlayerAlteredState,
  PlayerPosition,
  PlayerSkill,
  PlayerSkills,
} from '@model/player/interfaces';
import { PlayerInTeam } from '@model/team/interfaces';
import { Rng } from '@utils/rng';
import { FieldPosition, PLAYER_POSITIONS_FIELD } from './constants';
import { SimTeam, SimTeamRef } from './team';

export type SimPlayerRef = readonly [SimTeamRef, number];

export class SimPlayer {
  public readonly team: SimTeam;
  /** Where it's in the field */
  public readonly fieldPosition: FieldPosition | undefined;

  /** Position played in this match */
  protected position: PlayerPosition | undefined;
  /** Cached reference of the player */
  protected readonly ref: SimPlayerRef;
  /** Best position for this player */
  protected readonly preferredPosition: PlayerPosition;
  /** Base skills without modifiers */
  protected readonly baseSkills: PlayerSkills;
  /** Cached skills used in the game */
  protected readonly actualSkills: PlayerSkills;
  /** Current state of the player */
  protected readonly states: PlayerAlteredState[];

  constructor(team: SimTeam, teamPlayer: PlayerInTeam, index: number) {
    this.team = team;
    this.preferredPosition = teamPlayer.player.position;
    this.position = team.formation.positions[index];
    this.ref = [this.team.getRef(), index];
    this.baseSkills = teamPlayer.player.skills;
    this.states = [...teamPlayer.player.states];
    this.fieldPosition =
      this.position &&
      PLAYER_POSITIONS_FIELD[team.index].defense[this.position][0];

    this.actualSkills = this.calculateSkills();
  }

  public getRef(): SimPlayerRef {
    return this.ref;
  }

  public skillRoll(rng: Rng, skill: PlayerSkill): number {
    // TODO: Consider better way to calculate skill checks
    // TODO: Consider current position vs basePosition
    // TODO: Consider external modifiers (i.e. luck, etc.)
    const MID_SKILL = 50;
    const maxValue = this.actualSkills[skill];
    const mod = Math.floor((maxValue - MID_SKILL) / 2);

    return rng.integer(0, maxValue) + mod;
  }

  public skillCheck(rng: Rng, skill: PlayerSkill, dc: number): boolean {
    return this.skillRoll(rng, skill) >= dc;
  }

  public skillContest(
    rng: Rng,
    skill: PlayerSkill,
    player: SimPlayer | undefined,
    playerSkill?: PlayerSkill
  ): boolean {
    if (!player) return true;
    const val1 = this.skillRoll(rng, skill);
    const val2 = player.skillRoll(rng, playerSkill || skill);

    return val1 >= val2;
  }

  public setPosition(position: PlayerPosition | undefined): void {
    this.position = position;
    this.calculateSkills();
  }

  public getPosition(): PlayerPosition | undefined {
    return this.position;
  }

  public setState(state: AlteredState, time: number): void {
    const currentState = this.states.find((item) => item.type === state);
    if (currentState) {
      currentState.secondsLeft + time;
      return;
    }
    this.states.push({
      type: state,
      secondsLeft: time,
    });
  }

  public hasState(state: AlteredState): boolean {
    return this.states.find((item) => item.type === state) !== undefined;
  }

  public update(ellapsedSeconds: number): void {
    // update altered states
    for (let i = this.states.length - 1; i >= 0; i--) {
      const state = this.states[i];
      state.secondsLeft -= ellapsedSeconds;
      if (state.secondsLeft <= 0) {
        this.states.splice(i, 1);
      }
    }
  }

  protected calculateSkills(): PlayerSkills {
    return { ...this.baseSkills };
  }
}
