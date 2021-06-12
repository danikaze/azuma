const BYE_ELEM = '__RR_BYE__';

/**
 * Given a list of `teams`, pairs them for a given `round`.
 * First `round` is `0`
 */
export function roundRobinMatches<T>(
  teams: readonly T[],
  round: number,
  switchTeams: boolean = false
): [T, T][] {
  const matches: [T, T][] = [];
  const indices = [0];
  const evenTeams: readonly (T | typeof BYE_ELEM)[] =
    teams.length % 2 ? [...teams, BYE_ELEM] : teams;

  const n = evenTeams.length - 1;
  const h = Math.floor(evenTeams.length / 2);

  for (let i = 0; i < n; i++) {
    indices.push(((i + round) % n) + 1);
  }

  for (let i = 0; i < h; i++) {
    const home = evenTeams[indices[i]];
    if (home === BYE_ELEM) continue;
    const away = evenTeams[indices[n - i]];
    if (away === BYE_ELEM) continue;
    matches.push(switchTeams ? [away, home] : [home, away]);
  }

  return matches;
}
