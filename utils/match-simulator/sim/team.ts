import { Formation, Team } from '@model/team/interfaces';
import { TEAM_PLAYERS } from '@utils/constants/game';
import { replaceInArray } from '@utils/replace-in-array';
import { Rng } from '@utils/rng';
import {
  SIM_PLAYER_REF_I_PLAYER,
  SIM_TEAM_REF_I_AWAY,
  SIM_TEAM_REF_I_HOME,
} from './constants';
import { SimPlayer, SimPlayerRef } from './player';

export type SimTeamRef =
  | typeof SIM_TEAM_REF_I_HOME
  | typeof SIM_TEAM_REF_I_AWAY;

export interface SimTeamGetRandomPlayerOptions {
  type?: 'all' | 'only-playing' | 'only-substitutes';
  filter?: (player: SimPlayer) => boolean;
}

export class SimTeam {
  public readonly index: SimTeamRef;
  public readonly formation: Formation;

  protected readonly roster: SimPlayer[];
  protected readonly activePlayers: SimPlayer[];
  protected readonly substitutePlayers: SimPlayer[];

  constructor(team: Team, index: SimTeamRef) {
    this.index = index;
    this.formation = { ...team.formation };
    this.roster = team.players.map(
      (player, i) => new SimPlayer(this, player, i)
    );
    this.activePlayers = this.roster.filter(
      (player, index) => index < TEAM_PLAYERS
    );
    this.substitutePlayers = this.roster.filter(
      (player, index) => index >= TEAM_PLAYERS
    );
  }

  public getRef(): SimTeamRef {
    return this.index;
  }

  public getPlayerFromRef(playerRef: SimPlayerRef): SimPlayer {
    return this.roster[playerRef[SIM_PLAYER_REF_I_PLAYER]];
  }

  public getRandomPlayer(
    rng: Rng,
    options?: SimTeamGetRandomPlayerOptions
  ): SimPlayer | undefined {
    const opt: SimTeamGetRandomPlayerOptions = {
      type: 'only-playing',
      ...options,
    };

    let players =
      opt.type === 'all'
        ? this.roster
        : opt.type === 'only-playing'
        ? this.activePlayers
        : this.substitutePlayers;

    if (opt.filter) {
      players = players.filter(opt.filter);
    }

    return rng.pick(players);
  }

  public substitute(getsOutRef: SimPlayerRef, getsInRef: SimPlayerRef): void {
    const getsOutPlayer = this.roster[getsOutRef[SIM_PLAYER_REF_I_PLAYER]];
    const getsInPlayer = this.roster[getsInRef[SIM_PLAYER_REF_I_PLAYER]];

    if (!getsOutPlayer || !getsInPlayer) {
      throw new Error('Player not found');
    }

    if (!IS_PRODUCTION) {
      if (
        this.activePlayers.includes(getsInPlayer) ||
        this.substitutePlayers.includes(getsOutPlayer)
      ) {
        throw new Error(
          'Looks like substitute has been invoked with the parameters switched'
        );
      }
    }

    replaceInArray(this.activePlayers, getsOutPlayer, getsInPlayer);
    replaceInArray(this.substitutePlayers, getsInPlayer, getsOutPlayer);

    getsInPlayer.setPosition(getsOutPlayer.getPosition());
    getsOutPlayer.setPosition(undefined);
  }
}
