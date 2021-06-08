import { LinkToIndex } from '@components/links/link-to-index';
import clsx from 'clsx';
import { FC } from 'react';

import styles from './nav-bar.module.scss';

export interface Props {
  active: 'index';
}

export const NavBar: FC<Props> = ({ active }) => {
  return (
    <nav className={styles.root}>
      <ul>
        <li>
          <LinkToIndex className={clsx(active === 'index' && styles.active)} />
        </li>
      </ul>
    </nav>
  );
};
