import { useEffect, useState } from 'react';
import { getMilliseconds } from '@utils/jikan';
import { Props } from '.';
import { useRouter } from 'next/router';

interface State {
  msToStart: number;
}

export function useMatchDetailsStartingSoon({ matchStartTime }: Props) {
  const router = useRouter();
  const [state, setState] = useState<State>({
    msToStart: matchStartTime - getMilliseconds(),
  });

  useEffect(() => {
    let interval: number | undefined = window.setInterval(() => {
      const timeToStart = Math.max(0, matchStartTime - getMilliseconds());

      if (timeToStart === 0) {
        clearInterval(interval);
        interval = undefined;
      }

      setState((state) => ({
        ...state,
        msToStart: timeToStart,
      }));
    }, 1000);

    return () => {
      interval && clearInterval(interval);
    };
  }, []);

  function reload() {
    router.reload();
  }

  return {
    reload,
    msToStart: state.msToStart,
  };
}
