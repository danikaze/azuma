import { PublicId, TimestampData } from '@model';
import { Team } from '@model/team/interfaces';
import { PLAYER_POSITIONS, PLAYER_SKILLS } from './constants';

export interface Player extends TimestampData {
  /** Unique ID of the Player */
  playerId: PublicId;

  /** Genre */
  genre: PlayerGenre;
  /** Name in romaji/English */
  name: string;
  /** Surname in romaji/English */
  surname: string;

  /** Height in cm */
  height: number;
  /** Weight in kg */
  weight: number;
  /** Dominant hand */
  dominantHand: DominantHand;
  /** Numeric Skills */
  skills: PlayerSkills;

  /** Preferred position */
  position: PlayerPosition;

  /** List of altered status */
  states: PlayerAlteredState[];

  /** Current team */
  teamId?: Team['teamId'];
}

export type PlayerGenre = 'm' | 'f';
export type DominantHand = 'left' | 'right' | 'both';
export type AlteredState = 'injury';

export interface PlayerAlteredState {
  type: AlteredState;
  secondsLeft: number;
}

export type PlayerPosition = typeof PLAYER_POSITIONS[number];

// all player stats go from 0 to 100
export type PlayerSkills = Record<typeof PLAYER_SKILLS[number], number>;
export type PlayerSkill = keyof PlayerSkills;
