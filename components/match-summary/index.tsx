import { FC } from 'react';
import { Jikan } from '@utils/jikan';
import { Match, MatchState } from '@model/match/interfaces';
import { getTeamImageUrl } from '@model/team';
import { LinkToMatch } from '@components/links/link-to-match';

import styles from './match-summary.module.scss';

export interface Props {
  match: Match;
  className?: string;
}

export const MatchSummary: FC<Props> = ({ className, match }) => {
  const homeScore = match.homeScore !== undefined && (
    <div>{match.homeScore}</div>
  );
  const awayScore = match.awayScore !== undefined && (
    <div>{match.awayScore}</div>
  );

  return (
    <LinkToMatch className={className} match={match}>
      {renderDate(match.state, match.timestamp)}
      <div className={styles.homeTeam}>
        <div className={styles.teamName}>
          <img src={getTeamImageUrl(match.homeTeam)} />
          {match.homeTeam.name}
        </div>
        {homeScore}
      </div>
      <div className={styles.awayTeam}>
        <div className={styles.teamName}>
          <img src={getTeamImageUrl(match.awayTeam)} />
          {match.awayTeam.name}
        </div>
        {awayScore}
      </div>
    </LinkToMatch>
  );
};

function renderDate(state: MatchState, timestamp: number): JSX.Element {
  if (state === 'pending') {
    return (
      <div className={styles.date}>
        {new Jikan(timestamp * 1000).format('MMM/DD HH:mm')}
      </div>
    );
  }

  if (state === 'finished') {
    return (
      <div className={styles.finished}>
        {new Jikan(timestamp * 1000).format('MMM/DD HH:mm')}
        <div>FINAL</div>
      </div>
    );
  }

  return <div className={styles.playing}>Playing LIVE!</div>;
}
