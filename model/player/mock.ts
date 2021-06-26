import { getTimestamp, TimestampData } from '@model';
import { LEAGUE_TEAMS, TEAM_PLAYERS } from '@utils/constants/game';
import { generateName } from '@utils/name-generator.ts';
import { Rng } from '@utils/rng';
import { WeightedOptions } from '@utils/rng/weighted-options';
import { PLAYER_POSITIONS, PLAYER_SKILLS } from './constants';
import { DominantHand, Player, PlayerSkills } from './interfaces';

export const mockPlayers = (() => {
  // tslint:disable: no-magic-numbers
  const players: Player[] = [];
  const rng = new Rng();
  const dominantHand = new WeightedOptions<DominantHand>([
    { data: 'both', weight: 1 },
    { data: 'left', weight: 3 },
    { data: 'right', weight: 8 },
  ]);

  const N_PLAYERS = TEAM_PLAYERS * 2 * LEAGUE_TEAMS;
  const time = getTimestamp();
  let n = 0;

  for (let p = 0; p < N_PLAYERS; p++) {
    const skills = PLAYER_SKILLS.reduce((skills, skill) => {
      skills[skill] = rng.integer(20, 99);
      return skills;
    }, {} as PlayerSkills);

    const timestamp: TimestampData = {
      createdAt: time + n,
      updatedAt: time + n,
    };

    n++;
    const genre = rng.bool() ? 'm' : 'f';
    players.push({
      genre,
      ...generateName({ genre }),
      playerId: `mock-player-${p}`,
      height: rng.integer(160, 220),
      weight: rng.integer(60, 120),
      dominantHand: dominantHand.pick(rng)!,
      states: [],
      position: PLAYER_POSITIONS[p % PLAYER_POSITIONS.length],
      number: n,
      ...skills,
      ...timestamp,
    });
  }

  return players;
})();
