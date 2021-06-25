import clsx from 'clsx';
import { FC } from 'react';
import { Match, MatchState } from '@model/match/interfaces';
import { getTeamImageUrl } from '@model/team';
import { LinkToMatch } from '@components/links/link-to-match';

import styles from './upcoming-matches.module.scss';
import { Jikan } from '@utils/jikan';

export interface Props {
  matches: Match[];
  className?: string;
}

export const UpcomingMatches: FC<Props> = ({ className, matches }) => {
  if (matches.length === 0) return null;
  const matchList = matches.map(renderMatchInfo);

  return (
    <div className={clsx(styles.root, className)}>
      <h2>Upcoming Games</h2>
      <ul>{matchList}</ul>
    </div>
  );
};

function renderMatchInfo(match: Match): JSX.Element {
  return (
    <li key={match.matchId}>
      <LinkToMatch match={match}>
        {renderDate(match.state, match.timestamp)}
        <div className={styles.homeTeam}>
          <img src={getTeamImageUrl(match.homeTeam)} />
          {match.homeTeam.name}
        </div>
        <div className={styles.awayTeam}>
          <img src={getTeamImageUrl(match.awayTeam)} />
          {match.awayTeam.name}
        </div>
      </LinkToMatch>
    </li>
  );
}

function renderDate(state: MatchState, timestamp: number): JSX.Element {
  if (state === 'pending') {
    return (
      <div className={styles.date}>
        {new Jikan(timestamp * 1000).format('MMM/DD HH:mm')}
      </div>
    );
  }
  return <div className={styles.playing}>Playing LIVE!</div>;
}
