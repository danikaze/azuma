import clsx from 'clsx';
import { FC } from 'react';
import { useMatchDetailsStartingSoon } from './hooks';

import styles from './match-details-starting-soon.module.scss';

export type Props = {
  matchStartTime: number;
};

export const MatchDetailsStartingSoon: FC<Props> = (props) => {
  const { reload, msToStart } = useMatchDetailsStartingSoon(props);

  return msToStart > 0 ? renderStartingSoon(msToStart) : renderLive(reload);
};

function renderStartingSoon(msToStart: number) {
  return (
    <div className={styles.root}>
      The match will start in {formatTime(msToStart)}...
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

function formatTime(ms: number): string {
  // tslint:disable:no-magic-numbers
  const hours = Math.floor(ms / 3600000);
  const min = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
  const secs = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');

  return `${hours > 0 ? `${hours}:` : ''}${min}:${secs}`;
}
