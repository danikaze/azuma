import {
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
  public readonly position: PlayerPosition;
  public readonly fieldPosition: FieldPosition;

  protected readonly ref: SimPlayerRef;
  protected readonly baseSkills: PlayerSkills;
  protected readonly actualSkills: PlayerSkills;

  constructor(team: SimTeam, teamPlayer: PlayerInTeam, index: number) {
    this.team = team;
    this.position = teamPlayer.player.position;
    this.ref = [this.team.getRef(), index];
    this.baseSkills = teamPlayer.player.skills;
    this.fieldPosition =
      PLAYER_POSITIONS_FIELD[team.index].defense[this.position][0];

    this.actualSkills = this.calculateSkills();
  }

  public getRef(): SimPlayerRef {
    return this.ref;
  }

  public skillRoll(rng: Rng, skill: PlayerSkill): number {
    // TODO: Consider better way to calculate skill checks
    // TODO: Consider external modifiers (i.e. luck, etc.)
    const MOD_RATIO = 0.25;
    const maxValue = this.actualSkills[skill];
    const mod = Math.floor(maxValue * MOD_RATIO);

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

  protected calculateSkills(): PlayerSkills {
    return { ...this.baseSkills };
  }
}
