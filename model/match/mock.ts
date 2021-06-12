import { getTimestamp } from '@model';
import { Rng } from '@utils/rng';
import { GOAL_SCORE, MATCH_FULL_DURATION } from '@utils/constants/game';
import { mockTeams } from '@model/team/mock';
import { mockCourts } from '@model/court/mock';
import { Match, MatchState } from './interfaces';
import { roundRobinMatches } from '@utils/round-robin-matches';

export const mockMatches = (() => {
  const COMPLETED_ROUNDS = 4;
  const TIME_BETWEEN_ROUNDS = 604800; // 86400 * 7;
  const TIME_BETWEEN_MATCHES = 1800;
  const MIN_GOALS = 0;
  const MAX_GOALS = 10;
  const rng = new Rng();
  const now = getTimestamp();
  // current time is just before the start of the middle match of this round
  const firstTime =
    now -
    ((mockTeams.length / 2) * (MATCH_FULL_DURATION + TIME_BETWEEN_MATCHES)) /
      2 -
    COMPLETED_ROUNDS * TIME_BETWEEN_ROUNDS;
  let time = firstTime;
  const matches: Match[] = [];
  let n = 0;

  // create 2 matches (1 home + 1 away) for each team
  let switchTeams = false;
  const roundsNumber = (mockTeams.length - 1) * 2;
  // per round
  for (let round = 0; round < roundsNumber; round++) {
    const roundMatches = roundRobinMatches(mockTeams, round, switchTeams);
    const roundTime = time;

    roundMatches.forEach(([homeTeam, awayTeam]) => {
      const matchStartTime = time;
      const matchEndTime = matchStartTime + MATCH_FULL_DURATION;
      const state: MatchState =
        now < matchStartTime
          ? 'pending'
          : now < matchEndTime
          ? 'playing'
          : 'finished';

      const match: Match = {
        state,
        homeTeam,
        awayTeam,
        matchId: `mock-match-${n}`,
        court: mockCourts[n % mockCourts.length],
        timestamp: time,
        createdAt: firstTime,
        updatedAt: state === 'pending' ? firstTime : time,
      };

      if (state === 'finished') {
        match.homeScore = rng.integer(MIN_GOALS, MAX_GOALS) * GOAL_SCORE;
        do {
          match.awayScore = rng.integer(MIN_GOALS, MAX_GOALS) * GOAL_SCORE;
        } while (match.homeScore === match.awayScore);
      }

      matches.push(match);

      n++;
      time += MATCH_FULL_DURATION + TIME_BETWEEN_MATCHES;
    });

    time = roundTime + TIME_BETWEEN_ROUNDS;
    switchTeams = !switchTeams;
  }

  return matches;
})().sort((a, b) => a.timestamp - b.timestamp);
