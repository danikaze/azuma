import { TimestampData } from '@model';
import { Team } from '@model/team/interfaces';
import { mockTeams } from '@model/team/mock';
import { mockMatches } from '@model/match/mock';
import { getMilliseconds } from '@utils/jikan';
import { Standing } from './interfaces';

export const mockStandings = (() => {
  const standings: Standing[] = [];
  const time = getMilliseconds();
  const MATCHES_PER_ROUND = mockTeams.length / 2;
  const teamsMap = mockTeams.reduce((teams, team) => {
    teams[team.teamId] = team;
    return teams;
  }, {} as Record<string, Team>);

  let round = 0;
  for (;;) {
    const roundMatches = mockMatches.slice(
      MATCHES_PER_ROUND * round,
      MATCHES_PER_ROUND * (round + 1)
    );
    if (
      roundMatches.length !== MATCHES_PER_ROUND ||
      roundMatches.some((match) => match.state === 'pending')
    ) {
      break;
    }

    for (const match of roundMatches) {
      const homeTeam = teamsMap[match.homeTeam.teamId];
      const awayTeam = teamsMap[match.awayTeam.teamId];
      homeTeam.totalPpg += match.homeScore!;
      homeTeam.totalOppg += match.awayScore!;
      homeTeam.wins += match.homeScore! > match.awayScore! ? 1 : 0;
      homeTeam.losses += match.homeScore! < match.awayScore! ? 1 : 0;
      awayTeam.totalPpg += match.awayScore!;
      awayTeam.totalOppg += match.homeScore!;
      awayTeam.wins += match.homeScore! < match.awayScore! ? 1 : 0;
      awayTeam.losses += match.homeScore! > match.awayScore! ? 1 : 0;
    }

    const teams = Object.values(teamsMap)
      .reduce((teamList, team) => {
        team.ppg = team.totalPpg / round;
        team.oppg = team.totalOppg / round;
        teamList.push(team);
        return teamList;
      }, [] as Team[])
      .sort((a, b) => {
        if (a.wins > b.wins) return -1;
        if (a.wins < b.wins) return 1;
        if (a.ppg > b.ppg) return -1;
        if (a.ppg < b.ppg) return 1;
        if (a.oppg > b.oppg) return -1;
        if (a.oppg < b.oppg) return 1;
        return 0;
      })
      .map((team, index) => {
        team.pos = index + 1;
        return team;
      });

    const standingTime = roundMatches[roundMatches.length - 1].timestamp;
    const timestamp: TimestampData = {
      createdAt: time + round,
      updatedAt: time + round,
    };
    standings.push({
      teams,
      standingId: round,
      timestamp: standingTime,
      ...timestamp,
    });

    round++;
  }

  return standings;
})();
