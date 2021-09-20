import { TimestampData } from '@model';
import { LEAGUE_TEAMS, TEAM_PLAYERS } from '@utils/constants/game';
import { getMilliseconds } from '@utils/jikan';
import { generateName } from '@utils/name-generator.ts';
import { Rng } from '@utils/rng';
import { WeightedOptions } from '@utils/rng/weighted-options';
import { PLAYER_POSITIONS, PLAYER_SKILLS } from './constants';
import {
  DominantHand,
  Player,
  PlayerPosition,
  PlayerSkills,
} from './interfaces';

export const mockPlayers = (() => {
  // tslint:disable: no-magic-numbers
  function getSkills(position: PlayerPosition): PlayerSkills {
    const skillsImportanceByPosition: Record<
      PlayerPosition,
      (keyof PlayerSkills)[]
    > = {
      GK: ['goalkeeper'],
      LB: ['defense'],
      CB: ['defense'],
      RB: ['defense'],
      LMF: ['pass'],
      CMF: ['pass'],
      RMF: ['pass'],
      LF: ['shoot'],
      CF: ['shoot'],
      RF: ['shoot'],
    };
    const positionSkills = skillsImportanceByPosition[position];
    const skills = {} as PlayerSkills;

    // generate all numeric values and sort
    const values: number[] = [];
    for (const skill of PLAYER_SKILLS) {
      values.push(rng.integer(20, 99));
    }
    values.sort();

    // assign first "not important values" randomly
    for (const skill of PLAYER_SKILLS) {
      if (positionSkills.includes(skill)) continue;
      skills[skill] = rng.extract(values)!;
    }

    // assign important values in order
    for (const skill of positionSkills) {
      skills[skill] = rng.extract(values)!;
    }

    return skills;
  }

  const players: Player[] = [];
  const rng = new Rng();
  const dominantHand = new WeightedOptions<DominantHand>([
    { data: 'both', weight: 1 },
    { data: 'left', weight: 3 },
    { data: 'right', weight: 8 },
  ]);

  const N_PLAYERS = TEAM_PLAYERS * 2 * LEAGUE_TEAMS;
  const time = getMilliseconds();
  let n = 0;

  for (let p = 0; p < N_PLAYERS; p++) {
    const position = PLAYER_POSITIONS[p % PLAYER_POSITIONS.length];
    const timestamp: TimestampData = {
      createdAt: time + n,
      updatedAt: time + n,
    };

    n++;
    const genre = rng.bool() ? 'm' : 'f';
    players.push({
      genre,
      position,
      skills: getSkills(position),
      ...generateName({ genre }),
      playerId: `mock-player-${p}`,
      height: rng.integer(160, 220),
      weight: rng.integer(60, 120),
      dominantHand: dominantHand.pick(rng)!,
      states: [],
      ...timestamp,
    });
  }

  return players;
})();
