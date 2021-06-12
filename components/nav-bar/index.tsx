import { LinkToIndex } from '@components/links/link-to-index';
import { LinkToStandings } from '@components/links/link-to-standings';
import clsx from 'clsx';
import { FC } from 'react';

import styles from './nav-bar.module.scss';

export type PageType = 'index' | 'standings';

export interface Props {
  active: PageType;
}

export const NavBar: FC<Props> = ({ active }) => {
  return (
    <nav className={styles.root}>
      <ul>
        <li>
          <LinkToIndex className={clsx(active === 'index' && styles.active)} />
          <LinkToStandings
            className={clsx(active === 'standings' && styles.active)}
          />
        </li>
      </ul>
    </nav>
  );
};
