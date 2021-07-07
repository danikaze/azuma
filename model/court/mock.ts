import { TimestampData } from '@model';
import { LEAGUE_TEAMS } from '@utils/constants/game';
import { getMilliseconds } from '@utils/jikan';
import { Court } from './interfaces';

export const mockCourts = (() => {
  const courts: Court[] = [];

  const time = getMilliseconds();

  for (let i = 0; i < LEAGUE_TEAMS; i++) {
    const timestamp: TimestampData = {
      createdAt: time + i,
      updatedAt: time + i,
    };

    courts.push({
      courtId: `mock-court-${i}`,
      name: `Court ${i}`,
      ...timestamp,
    });
  }

  return courts;
})();
