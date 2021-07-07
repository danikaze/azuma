import { MATCH_FULL_DURATION_MS } from '@utils/constants/game';
import { mockTeams } from '@model/team/mock';
import { mockCourts } from '@model/court/mock';
import { roundRobinMatches } from '@utils/round-robin-matches';
import { MatchSimulator } from '@utils/match-simulator';
import { getMilliseconds } from '@utils/jikan';
import { Match, MatchState } from './interfaces';

export const mockMatches = (() => {
  const COMPLETED_ROUNDS = 4;
  const TIME_BETWEEN_ROUNDS = 604_800_000; // 86400 * 7 * 1000;
  const TIME_BETWEEN_MATCHES = 1_800_000; // 30 * 60 * 1000
  const now = getMilliseconds();
  // current time is just before the start of the middle match of this round
  const firstTime =
    now -
    ((mockTeams.length / 2) * (MATCH_FULL_DURATION_MS + TIME_BETWEEN_MATCHES)) /
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
      const matchEndTime = matchStartTime + MATCH_FULL_DURATION_MS;
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

      if (state === 'playing' || state === 'finished') {
        const simulation = new MatchSimulator(match);
        Object.assign(match, simulation.run());
      }

      matches.push(match);

      n++;
      time += MATCH_FULL_DURATION_MS + TIME_BETWEEN_MATCHES;
    });

    time = roundTime + TIME_BETWEEN_ROUNDS;
    switchTeams = !switchTeams;
  }

  return matches;
})().sort((a, b) => a.timestamp - b.timestamp);
