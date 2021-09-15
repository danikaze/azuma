import { Player, PlayerPosition } from '@model/player/interfaces';
import { SimTeam, SimTeamRef } from './team';

export type SimPlayerRef = readonly [SimTeamRef, number];

export class SimPlayer {
  public readonly team: SimTeam;
  public readonly position: PlayerPosition;

  protected readonly ref: SimPlayerRef;

  constructor(team: SimTeam, player: Player, index: number) {
    this.team = team;
    this.position = player.position;
    this.ref = [this.team.getRef(), index];
  }

  public getRef(): SimPlayerRef {
    return this.ref;
  }
}
