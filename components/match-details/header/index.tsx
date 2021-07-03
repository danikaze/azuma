import { FC } from 'react';
import { getTeamImageUrl } from '@model/team';
import { Match } from '@model/match/interfaces';

import styles from './match-details-header.module.scss';

export type Props = {
  match: Match;
};

export const MatchDetailsHeader: FC<Props> = ({ match }) => {
  const separator =
    match.state === 'finished' ? (
      <div className={styles.separator}>
        <div className={styles.separatorFinal}>FINAL</div>
      </div>
    ) : (
      <div className={styles.separator}>
        <div>-</div>
      </div>
    );

  const { homeTeam, awayTeam } = match;
  const homeTeamStyle = {
    background: homeTeam.bgColor,
    color: homeTeam.fgColor,
  };
  const awayTeamStyle = {
    background: awayTeam.bgColor,
    color: awayTeam.fgColor,
  };

  return (
    <div className={styles.root}>
      <div className={styles.homeTeam} style={homeTeamStyle}>
        <div className={styles.teamName}>
          <img src={getTeamImageUrl(homeTeam)} />
          {homeTeam.name}
        </div>
        <div className={styles.score}>{match.homeScore}</div>
      </div>
      {separator}
      <div className={styles.awayTeam} style={awayTeamStyle}>
        <div className={styles.score}>{match.awayScore}</div>
        <div className={styles.teamName}>
          {awayTeam.name}
          <img src={getTeamImageUrl(awayTeam)} />
        </div>
      </div>
    </div>
  );
};
