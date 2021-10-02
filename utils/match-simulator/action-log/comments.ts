import { getPlayerName } from '@model/player';
import { Player } from '@model/player/interfaces';
import { PlayerInTeam, Team } from '@model/team/interfaces';
import { SIM_PLAYER_REF_I_TEAM } from '../sim/constants';
import { MatchSimulatorQuerier } from '../sim/match-simulator-querier';
import { SimPlayerRef } from '../sim/player';
import { SimTeamRef } from '../sim/team';
import { MatchActionLogDataFieldMap, MatchActionLogType } from './interfaces';

type FieldToComment<T> = T extends SimPlayerRef
  ? PlayerCommentData
  : T extends SimTeamRef
  ? TeamCommentData
  : T;

export type MatchActionCommentData = {
  [K in keyof MatchActionLogDataFieldMap]: FieldToComment<
    MatchActionLogDataFieldMap[K]
  >;
};

export interface PlayerCommentData {
  playerId: Player['playerId'];
  name: Player['name'];
  fullName: Player['name'];
  genre: Player['genre'];
  number: PlayerInTeam['number'];
  team: TeamCommentData;
}

export interface TeamCommentData {
  teamId: Team['teamId'];
  name: Team['name'];
  isAttacker: boolean;
  isDefender: boolean;
}

export interface MatchActionComment<
  T extends MatchActionLogType,
  P extends keyof MatchActionCommentData = never
> {
  /** Type of comment/action */
  type: T;
  /** Time when the action happened, in seconds from the start of that period */
  time: number;
  /** Text of the comment */
  text: string;
  /** Data to use for the rich rendering */
  params: Pick<MatchActionCommentData, P>;
}

export type AnyMatchActionComment = MatchActionComment<
  MatchActionLogType,
  keyof MatchActionCommentData
>;

export function getPlayerCommentData(
  match: MatchSimulatorQuerier,
  playerRef: SimPlayerRef
): PlayerCommentData {
  const player = match.getPlayer(playerRef);

  return {
    playerId: player.playerId,
    name: player.name,
    fullName: getPlayerName(player),
    genre: player.genre,
    number: player.number,
    team: getTeamCommentData(match, playerRef[SIM_PLAYER_REF_I_TEAM]),
  };
}

export function getTeamCommentData(
  match: MatchSimulatorQuerier,
  teamRef: SimTeamRef
): TeamCommentData {
  const team = match.getTeam(teamRef);

  return {
    teamId: team.teamId,
    name: team.name,
    isAttacker: match.getAttackingTeam() === team,
    isDefender: match.getDefendingTeam() === team,
  };
}
