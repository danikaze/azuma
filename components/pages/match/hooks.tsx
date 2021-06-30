import { useEffect, useState } from 'react';
import { Match } from '@model/match/interfaces';
import { getSeconds } from '@utils/jikan';
import { MatchAction } from '@utils/match-simulator/interfaces';
import { MatchSimulatorUpdater } from '@utils/match-simulator/match-simulator-updater';
import { Props } from '.';

type State = Match & {
  actions?: MatchAction[];
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
): {} | Pick<State, 'actions' | 'homeScore' | 'awayScore'> {
  if (match.state === 'pending' || match.state === 'cancelled') {
    return {};
  }

  const sim = new MatchSimulatorUpdater(match.log);
  sim.replay(getSeconds() - match.timestamp);
  return sim.getResult();
}
