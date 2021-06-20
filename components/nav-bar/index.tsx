import clsx from 'clsx';
import { FC } from 'react';
import { LinkToIndex } from '@components/links/link-to-index';
import { LinkToStandings } from '@components/links/link-to-standings';
import { LinkToTeam } from '@components/links/link-to-team';

import styles from './nav-bar.module.scss';
import { LinkToPlayer } from '@components/links/link-to-player';

export type PageType = 'index' | 'standings' | 'teams' | 'players';

export interface Props {
  active: PageType;
}

export const NavBar: FC<Props> = ({ active }) => {
  return (
    <nav className={styles.root}>
      <ul>
        <li>
          <LinkToIndex className={clsx(active === 'index' && styles.active)} />
        </li>
        <li>
          <LinkToStandings
            className={clsx(active === 'standings' && styles.active)}
          />
        </li>
        <li>
          <LinkToTeam className={clsx(active === 'teams' && styles.active)} />
        </li>
        <li>
          <LinkToPlayer
            className={clsx(active === 'players' && styles.active)}
          />
        </li>
      </ul>
    </nav>
  );
};
