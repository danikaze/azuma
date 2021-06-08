import clsx from 'clsx';
import { FC } from 'react';

import styles from './footer.module.scss';

export interface Props {
  className?: string;
}

export const Footer: FC<Props> = ({ className }) => {
  return <footer className={clsx(styles.root, className)}>Footer</footer>;
};
