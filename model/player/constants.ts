export const PLAYER_SKILLS = [
  // ingame general skills
  'speed',
  'stamina',
  'constitution',
  'luck',
  // ingame specific skills
  'aggresivity',
  'dribble',
  'shoot',
  'goalkeeper',
  'fight',
  'defense',
  'pass',
  // offline skills
  'show',
  'charisma',
] as const;

export const PLAYER_POSITIONS = [
  'GK', // Goal Keeper
  'LB', // Left Back
  'CB', // Center Back
  'RB', // Right Back
  'LMF', // Left Mid Field
  'CMF', // Center Mid Field
  'RMF', // Right Mid Field
  'LF', // Left Forward
  'CF', // Center Forward
  'RF', // Right Forward
] as const;
