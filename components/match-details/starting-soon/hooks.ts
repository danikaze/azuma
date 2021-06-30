import { useEffect, useState } from 'react';
import { getSeconds } from '@utils/jikan';
import { Props } from '.';
import { useRouter } from 'next/router';

interface State {
  timeToStart: number;
}

export function useMatchDetailsStartingSoon({ matchStartTime }: Props) {
  const router = useRouter();
  const [state, setState] = useState<State>({
    timeToStart: matchStartTime - getSeconds(),
  });

  useEffect(() => {
    let interval: number | undefined = window.setInterval(() => {
      const timeToStart = Math.max(0, matchStartTime - getSeconds());

      if (timeToStart === 0) {
        clearInterval(interval);
        interval = undefined;
      }

      setState((state) => ({
        ...state,
        timeToStart,
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
    timeToStart: state.timeToStart,
  };
}
