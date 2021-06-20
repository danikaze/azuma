import { PublicId, TimestampData } from '@model';
import { Team } from '@model/team/interfaces';
import { PLAYER_POSITIONS, PLAYER_SKILLS } from './constants';

export interface Player extends TimestampData {
  /** Unique ID of the Player */
  playerId: PublicId;

  /** Name in romaji/English */
  name: string;
  /** Surname in romaji/English */
  surname: string;
  /** Name in the original language (only if it's not romaji) */
  nativeName?: string;
  /** Surname in the original language (only if it's not romaji) */
  nativeSurname?: string;

  /** Height in cm */
  height: number;
  /** Weight in kg */
  weight: number;
  /** Dominant hand */
  dominantHand: DominantHand;

  /** Preferred position */
  position: PlayerPosition;
  /** Shirt Number */
  number?: number;

  /** List of altered status */
  states: PlayerAlteredState[];

  /** Current team */
  teamId?: Team['teamId'];
}

export type DominantHand = 'left' | 'right' | 'both';
export type AlteredStatus = 'dead' | 'lucky' | 'stunned' | 'blind';

export interface PlayerAlteredState {
  type: AlteredStatus;
  secondsLeft: number;
}

export type PlayerPosition = typeof PLAYER_POSITIONS[number];

// all player stats go from 0 to 100
export type PlayerSkills = Record<typeof PLAYER_SKILLS[number], number>;
