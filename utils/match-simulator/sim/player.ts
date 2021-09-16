import { PlayerPosition } from '@model/player/interfaces';
import { PlayerInTeam } from '@model/team/interfaces';
import { FieldPosition, PLAYER_POSITIONS_FIELD } from './constants';
import { SimTeam, SimTeamRef } from './team';

export type SimPlayerRef = readonly [SimTeamRef, number];

export class SimPlayer {
  public readonly team: SimTeam;
  public readonly position: PlayerPosition;
  public readonly fieldPosition: FieldPosition;

  protected readonly ref: SimPlayerRef;

  constructor(team: SimTeam, teamPlayer: PlayerInTeam, index: number) {
    this.team = team;
    this.position = teamPlayer.player.position;
    this.ref = [this.team.getRef(), index];
    this.fieldPosition =
      PLAYER_POSITIONS_FIELD[team.index].defense[this.position][0];
  }

  public getRef(): SimPlayerRef {
    return this.ref;
  }
}
