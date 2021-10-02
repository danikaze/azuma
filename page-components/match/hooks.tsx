import { Match } from '@model/match/interfaces';
import { getMilliseconds } from '@utils/jikan';
import { simulateOngoingMatch } from '@utils/match-simulator';
import { AnyMatchActionComment } from '@utils/match-simulator/action-log/comments';
import { useEffect, useState } from 'react';
import { Props } from '.';

type State = Match & {
  comments?: AnyMatchActionComment[];
};

export function useMatch({ match }: Props) {
  const [state, setState] = useState<State>({
    ...match,
    ...getCurrentState(match),
  });

  useEffect(() => {
    if (match.state !== 'playing') return;
    const actionCheckInterval = 1000;

    const interval = setInterval(() => {
      setState({
        ...state,
        ...getCurrentState(match),
      });
    }, actionCheckInterval);

    return () => clearInterval(interval);
  }, []);

  return state as Readonly<State>;
}

function getCurrentState(
  match: Match
): {} | Pick<State, 'homeScore' | 'awayScore'> {
  if (match.state === 'pending' || match.state === 'cancelled') {
    return {};
  }

  return simulateOngoingMatch(match, getMilliseconds() - match.timestamp);
}
