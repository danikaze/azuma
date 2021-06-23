import { FC } from 'react';
import { Match } from '@model/match/interfaces';

import styles from './match-details.module.scss';

export type Props = {
  match: Match;
};

export const MatchDetails: FC<Props> = ({ match }) => {
  return <div className={styles.root} />;
};
