import clsx from 'clsx';
import { FC } from 'react';
import { useMatchDetailsStartingSoon } from './hooks';

import styles from './match-details-starting-soon.module.scss';

export type Props = {
  matchStartTime: number;
};

export const MatchDetailsStartingSoon: FC<Props> = (props) => {
  const { reload, timeToStart } = useMatchDetailsStartingSoon(props);

  return timeToStart > 0 ? renderStartingSoon(timeToStart) : renderLive(reload);
};

function renderStartingSoon(timeToStart: number) {
  return (
    <div className={styles.root}>
      The match will start in {formatTime(timeToStart)}...
    </div>
  );
}

function renderLive(reload: () => void) {
  return (
    <div className={clsx(styles.root, styles.clickable)} onClick={reload}>
      Match has started! Reload the page to watch it live!
    </div>
  );
}

function formatTime(time: number): string {
  // tslint:disable:no-magic-numbers
  const hours = Math.floor(time / 3600);
  const min = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const secs = String(Math.floor(time % 60)).padStart(2, '0');

  return `${hours > 0 ? `${hours}:` : ''}${min}:${secs}`;
}
