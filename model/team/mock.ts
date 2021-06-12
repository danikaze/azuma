import { getTimestamp, TimestampData } from '@model';
import { LEAGUE_TEAMS } from '@utils/constants/game';
import { mockPlayers } from '@model/player/mock';
import { Team } from './interfaces';

export const mockTeams = (() => {
  const teams: Team[] = [];

  const playersPerTeam = Math.floor(mockPlayers.length / LEAGUE_TEAMS);
  const time = getTimestamp();
  let n = 0;

  for (let t = 0; t < LEAGUE_TEAMS; t++) {
    const timestamp: TimestampData = {
      createdAt: time + n,
      updatedAt: time + n,
    };

    n++;
    teams.push({
      teamId: `mock-team-${t}`,
      name: `Team ${t}`,
      image: `team-${t}-logo.png`,
      bgColor: '',
      fgColor: '',
      players: mockPlayers.slice(t * playersPerTeam, (t + 1) * playersPerTeam),
      pos: 0,
      wins: 0,
      losses: 0,
      gb: 0,
      totalPpg: 0,
      ppg: 0,
      totalOppg: 0,
      oppg: 0,
      ...timestamp,
    });
  }

  return teams;
})();
