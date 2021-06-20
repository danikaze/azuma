import { PublicId, TimestampData } from '@model';
import { Player, PlayerPosition } from '@model/player/interfaces';

export interface Team extends TimestampData {
  /** Unique ID of the team */
  teamId: PublicId;

  /** Name of the team */
  name: string;
  /** Short name (3 letters) of the team */
  shortName: string;
  /** Team logo image basename */
  image: string;
  /** Color to be used for logos or texts of the team */
  bgColor: string;
  /** Color to be used for logos or texts of the team */
  fgColor: string;

  /** List of players */
  players: Player[];

  /** Position in the table */
  pos: number;
  /** Number of won matches */
  wins: number;
  /** Number of lost matches */
  losses: number;
  /** Number of games back */
  gb: number;
  /** Total scored points */
  totalPpg: number;
  /** Points per Game */
  ppg: number;
  /** Total opposite points */
  totalOppg: number;
  /** Oppossite Points per Game */
  oppg: number;
}

export interface Formation {
  // tslint:disable-next-line: no-magic-numbers
  positions: FormationPositions;
  linePosition: FormationLinePosition;
  mod: {
    defense: number;
    pass: number;
    shoot: number;
  };
}

export enum FormationLinePosition {
  FULL_DEFENSE = -2,
  DEFENSE = -1,
  NORMAL = 0,
  ATTACK = 1,
  FULL_ATACK = 2,
}

export type FormationPositions = readonly [
  'GK',
  PlayerPosition,
  PlayerPosition,
  PlayerPosition,
  PlayerPosition,
  PlayerPosition,
  PlayerPosition
];
