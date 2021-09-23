import { TimestampData } from '@model';
import { mockPlayers } from '@model/player/mock';
import { LEAGUE_TEAMS, TeamsPerLeague } from '@utils/constants/game';
import { getMilliseconds } from '@utils/jikan';
import { Formation, FormationLinePosition, Team } from './interfaces';

export const mockTeams = (() => {
  const teams: Team[] = [];

  const playersPerTeam = Math.floor(mockPlayers.length / LEAGUE_TEAMS);
  const time = getMilliseconds();
  let n = 0;

  const fixedData: Tuple<
    Pick<Team, 'name' | 'shortName' | 'bgColor' | 'fgColor'>,
    TeamsPerLeague
  > = [
    {
      name: 'The Green 0',
      shortName: 'TG0',
      bgColor: '#1d9a4c',
      fgColor: '#ffffff',
    },
    {
      name: 'Mega Team 1',
      shortName: 'MT1',
      bgColor: '#9a1d1d',
      fgColor: '#ffffff',
    },
    {
      name: 'Black Panthers 2',
      shortName: 'BP2',
      bgColor: '#002d64',
      fgColor: '#509cf9',
    },
    {
      name: 'Space Stars 3',
      shortName: 'SS3',
      bgColor: '#00387d',
      fgColor: '#9df7ff',
    },
    {
      name: `80's Kids 4`,
      shortName: '8K4',
      bgColor: '#9e00c5',
      fgColor: '#fffc00',
    },
    {
      name: 'Lighting Spark 5',
      shortName: 'LS5',
      bgColor: '#172cce',
      fgColor: '#fffc00',
    },
    {
      name: 'Color Twirl 6',
      shortName: 'CT6',
      bgColor: '#202020',
      fgColor: '#ffffff',
    },
    {
      name: 'Spartans 7',
      shortName: 'SP7',
      bgColor: '#151618',
      fgColor: '#ffffff',
    },
  ];

  for (let t = 0; t < LEAGUE_TEAMS; t++) {
    const timestamp: TimestampData = {
      createdAt: time + n,
      updatedAt: time + n,
    };

    const players = mockPlayers
      .slice(t * playersPerTeam, (t + 1) * playersPerTeam)
      .map((player, i) => ({
        player,
        number: i + 1,
        position: player.position,
      }));

    const formation: Formation = {
      positions: ['GK', 'LB', 'RB', 'CMF', 'LF', 'CF', 'RF'],
      linePosition: FormationLinePosition.NORMAL,
    };

    n++;
    const team: Team = {
      players,
      formation,
      teamId: `mock-team-${t}`,
      image: `team-${t}-logo.png`,
      ...fixedData[t],
      pos: 0,
      wins: 0,
      losses: 0,
      gb: 0,
      totalPpg: 0,
      ppg: 0,
      totalOppg: 0,
      oppg: 0,
      ...timestamp,
    };
    teams.push(team);

    team.players.forEach((playerInTeam) => {
      playerInTeam.player.teamId = team.teamId;
    });
  }

  return teams;
})();
