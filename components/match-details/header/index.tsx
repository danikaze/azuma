import { FC } from 'react';
import { getTeamImageUrl } from '@model/team';
import { Match } from '@model/match/interfaces';

import styles from './match-details-header.module.scss';

export type Props = {
  match: Match;
};

export const MatchDetailsHeader: FC<Props> = ({ match }) => {
  return (
    <div className={styles.root}>
      <div className={styles.homeTeam}>
        <div className={styles.teamName}>{match.homeTeam.name}</div>
        <img src={getTeamImageUrl(match.homeTeam)} />
        <div className={styles.score}>{match.homeScore}</div>
      </div>
      -
      <div className={styles.awayTeam}>
        <div className={styles.score}>{match.awayScore}</div>
        <img src={getTeamImageUrl(match.awayTeam)} />
        <div className={styles.teamName}>{match.awayTeam.name}</div>
      </div>
    </div>
  );
};
