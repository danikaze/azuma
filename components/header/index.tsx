import clsx from 'clsx';
import { FC } from 'react';

import styles from './header.module.scss';
import headerBg from '@assets/images/header-bg.jpg';
import headerPj from '@assets/images/header-pj.png';
import headerLogo from '@assets/images/header-logo.png';

export interface Props {
  className?: string;
}

export const Header: FC<Props> = ({ className }) => {
  const classes = clsx(styles.root, className);

  return (
    <header className={classes} style={{ backgroundImage: `url(${headerBg})` }}>
      <div className={styles.dark} />
      <div className={styles.messages}>
        <div>The most extreme sport in a future cyberpunk society</div>
      </div>
      <img className={styles.pj} src={headerPj} />
      <img className={styles.logo} src={headerLogo} />
    </header>
  );
};
