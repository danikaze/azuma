import { PlayerPosition } from '@model/player/interfaces';
import { SimTeamRef } from './team';

export const SIM_TEAM_REF_I_HOME = 0;
export const SIM_TEAM_REF_I_AWAY = 1;

export const SIM_PLAYER_REF_I_TEAM = 0;
export const SIM_PLAYER_REF_I_PLAYER = 1;

export const FIELD_SECTION_I = 0;
export const FIELD_SECTION_SIDE_I = 1;

export type FieldPosition = [FieldSection, FieldSectionSide];

/**
 * Field is divided like this in sections where the ball can be:
 * ┌────────────────┐
 * │ HOME_TEAM_GOAL │ 🡹
 * ├────────────────┤
 * │ HOME_TEAM_MID  │
 * ├────────────────┤
 * │ CENTER         │ ━━
 * ├────────────────┤
 * │ AWAY_TEAM_MID  │
 * ├────────────────┤
 * │ AWAY_TEAM_GOAL │ 🡻
 * └────────────────┘
 */
export enum FieldSection {
  HOME_TEAM_GOAL = 0,
  HOME_TEAM_MID = 1,
  CENTER = 2,
  AWAY_TEAM_MID = 3,
  AWAY_TEAM_GOAL = 4,
}

/**
 * Also, each `FieldSection` is divided into sides
 * Obviously, the left side for one team would be the right side for the other
 * This division creates quadrants in the field
 */
export enum FieldSectionSide {
  CENTER = 1,
  HOME_LEFT = 0,
  AWAY_RIGHT = 0,
  HOME_RIGHT = 2,
  AWAY_LEFT = 2,
}

/**
 * Mapping between the player position and the field quadrant where they play
 */
export const PLAYER_POSITIONS_FIELD: Record<
  SimTeamRef,
  Record<'attack' | 'defense', Record<PlayerPosition, FieldPosition[]>>
> = {
  [SIM_TEAM_REF_I_HOME]: {
    attack: {
      GK: [[FieldSection.HOME_TEAM_GOAL, FieldSectionSide.CENTER]],
      LB: [[FieldSection.CENTER, FieldSectionSide.HOME_LEFT]],
      CB: [[FieldSection.CENTER, FieldSectionSide.CENTER]],
      RB: [[FieldSection.CENTER, FieldSectionSide.HOME_RIGHT]],
      LMF: [[FieldSection.AWAY_TEAM_MID, FieldSectionSide.HOME_LEFT]],
      CMF: [[FieldSection.AWAY_TEAM_MID, FieldSectionSide.CENTER]],
      RMF: [[FieldSection.AWAY_TEAM_MID, FieldSectionSide.HOME_RIGHT]],
      LF: [[FieldSection.AWAY_TEAM_GOAL, FieldSectionSide.HOME_LEFT]],
      CF: [[FieldSection.AWAY_TEAM_GOAL, FieldSectionSide.CENTER]],
      RF: [[FieldSection.AWAY_TEAM_GOAL, FieldSectionSide.HOME_RIGHT]],
    },
    defense: {
      GK: [[FieldSection.HOME_TEAM_GOAL, FieldSectionSide.CENTER]],
      LB: [[FieldSection.HOME_TEAM_GOAL, FieldSectionSide.HOME_LEFT]],
      CB: [[FieldSection.HOME_TEAM_GOAL, FieldSectionSide.CENTER]],
      RB: [[FieldSection.HOME_TEAM_GOAL, FieldSectionSide.HOME_RIGHT]],
      LMF: [[FieldSection.HOME_TEAM_MID, FieldSectionSide.HOME_LEFT]],
      CMF: [[FieldSection.HOME_TEAM_MID, FieldSectionSide.CENTER]],
      RMF: [[FieldSection.HOME_TEAM_MID, FieldSectionSide.HOME_RIGHT]],
      LF: [[FieldSection.AWAY_TEAM_MID, FieldSectionSide.HOME_LEFT]],
      CF: [[FieldSection.AWAY_TEAM_MID, FieldSectionSide.CENTER]],
      RF: [[FieldSection.AWAY_TEAM_MID, FieldSectionSide.HOME_RIGHT]],
    },
  },
  [SIM_TEAM_REF_I_AWAY]: {
    attack: {
      GK: [[FieldSection.AWAY_TEAM_GOAL, FieldSectionSide.CENTER]],
      LB: [[FieldSection.AWAY_TEAM_GOAL, FieldSectionSide.AWAY_LEFT]],
      CB: [[FieldSection.AWAY_TEAM_GOAL, FieldSectionSide.CENTER]],
      RB: [[FieldSection.AWAY_TEAM_GOAL, FieldSectionSide.AWAY_RIGHT]],
      LMF: [[FieldSection.AWAY_TEAM_MID, FieldSectionSide.AWAY_LEFT]],
      CMF: [[FieldSection.AWAY_TEAM_MID, FieldSectionSide.CENTER]],
      RMF: [[FieldSection.AWAY_TEAM_MID, FieldSectionSide.AWAY_RIGHT]],
      LF: [[FieldSection.HOME_TEAM_MID, FieldSectionSide.AWAY_LEFT]],
      CF: [[FieldSection.HOME_TEAM_MID, FieldSectionSide.CENTER]],
      RF: [[FieldSection.HOME_TEAM_MID, FieldSectionSide.AWAY_RIGHT]],
    },
    defense: {
      GK: [[FieldSection.AWAY_TEAM_GOAL, FieldSectionSide.CENTER]],
      LB: [[FieldSection.CENTER, FieldSectionSide.AWAY_LEFT]],
      CB: [[FieldSection.CENTER, FieldSectionSide.CENTER]],
      RB: [[FieldSection.CENTER, FieldSectionSide.AWAY_RIGHT]],
      LMF: [[FieldSection.HOME_TEAM_MID, FieldSectionSide.AWAY_LEFT]],
      CMF: [[FieldSection.HOME_TEAM_MID, FieldSectionSide.CENTER]],
      RMF: [[FieldSection.HOME_TEAM_MID, FieldSectionSide.AWAY_RIGHT]],
      LF: [[FieldSection.HOME_TEAM_GOAL, FieldSectionSide.AWAY_LEFT]],
      CF: [[FieldSection.HOME_TEAM_GOAL, FieldSectionSide.CENTER]],
      RF: [[FieldSection.HOME_TEAM_GOAL, FieldSectionSide.AWAY_RIGHT]],
    },
  },
};
