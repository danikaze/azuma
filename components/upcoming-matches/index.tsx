import clsx from 'clsx';
import { FC } from 'react';
import { Match } from '@model/match/interfaces';
import { MatchSummary } from '@components/match-summary';

import styles from './upcoming-matches.module.scss';

export interface Props {
  matches: Match[];
  className?: string;
}

export const UpcomingMatches: FC<Props> = ({ className, matches }) => {
  if (matches.length === 0) return null;
  const matchList = matches.map((match) => (
    <li key={match.matchId}>
      <MatchSummary match={match} />
    </li>
  ));

  return (
    <div className={clsx(styles.root, className)}>
      <h2>Upcoming Games</h2>
      <ul>{matchList}</ul>
    </div>
  );
};
