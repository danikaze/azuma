import { roundRobinMatches } from '@utils/round-robin-matches';
import 'jest';

describe('roundRobinMatches', () => {
  // tslint:disable: no-magic-numbers

  function flip<T>(list: [T, T][]): [T, T][] {
    return list.map(([a, b]) => [b, a]);
  }

  function test<T>(teams: T[], round: number, expected: [T, T][]) {
    expect(
      roundRobinMatches(teams, round),
      `${teams.length} teams / round ${round} (switch: false)`
    ).toEqual(expected);
    expect(
      roundRobinMatches(teams, round, true),
      `${teams.length} teams / round ${round} (switch: true)`
    ).toEqual(flip(expected));
  }

  it('should match 2 teams', () => {
    const teams = [0, 1];

    test(teams, 0, [[0, 1]]);
    test(teams, 1, [[0, 1]]);
    test(teams, 2, [[0, 1]]);
  });

  it('should match 3 teams', () => {
    const teams = [0, 1, 2];

    test(teams, 0, [[1, 2]]); // 0 rests
    test(teams, 1, [[0, 1]]); // 2 rests
    test(teams, 2, [[0, 2]]); // 1 rests
    test(teams, 3, [[1, 2]]); // 0 rests
    test(teams, 4, [[0, 1]]); // 2 rests
    test(teams, 5, [[0, 2]]); // 1 rests
  });

  it('should match 4 teams', () => {
    const teams = [0, 1, 2, 3];

    test(teams, 0, [
      [0, 3],
      [1, 2],
    ]);
    test(teams, 1, [
      [0, 1],
      [2, 3],
    ]);
    test(teams, 2, [
      [0, 2],
      [3, 1],
    ]);
    test(teams, 3, [
      [0, 3],
      [1, 2],
    ]);
  });

  it('should match 8 teams', () => {
    const teams = [0, 1, 2, 3, 4, 5, 6, 7];

    test(teams, 0, [
      [0, 7],
      [1, 6],
      [2, 5],
      [3, 4],
    ]);

    test(teams, 1, [
      [0, 1],
      [2, 7],
      [3, 6],
      [4, 5],
    ]);

    test(teams, 2, [
      [0, 2],
      [3, 1],
      [4, 7],
      [5, 6],
    ]);

    test(teams, 3, [
      [0, 3],
      [4, 2],
      [5, 1],
      [6, 7],
    ]);

    test(teams, 4, [
      [0, 4],
      [5, 3],
      [6, 2],
      [7, 1],
    ]);

    test(teams, 5, [
      [0, 5],
      [6, 4],
      [7, 3],
      [1, 2],
    ]);

    test(teams, 6, [
      [0, 6],
      [7, 5],
      [1, 4],
      [2, 3],
    ]);

    test(teams, 7, [
      [0, 7],
      [1, 6],
      [2, 5],
      [3, 4],
    ]);
  });
});
