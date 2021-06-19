import clsx from 'clsx';
import { FC } from 'react';
import { Match, MatchState } from '@model/match/interfaces';
import { getTeamImageUrl } from '@model/team';

import styles from './upcoming-matches.module.scss';

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
      {renderDate(match.state, match.timestamp)}
      <div className={styles.homeTeam}>
        <img src={getTeamImageUrl(match.homeTeam)} />
        {match.homeTeam.name}
      </div>
      <div className={styles.awayTeam}>
        <img src={getTeamImageUrl(match.awayTeam)} />
        {match.awayTeam.name}
      </div>
    </li>
  );
}

function renderDate(state: MatchState, timestamp: number): JSX.Element {
  if (state === 'pending') {
    return <div className={styles.date}>{getDate(timestamp)}</div>;
  }
  return <div className={styles.playing}>Playing LIVE!</div>;
}

// TODO: Use a proper utils/Date class
function getDate(timestamp: number): string {
  const monthNames = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(
    ','
  );
  const date = new Date(timestamp * 1000);
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padEnd(2, '0');
  const hour = String(date.getHours()).padEnd(2, '0');
  const min = String(date.getMinutes()).padEnd(2, '0');

  return `${month}/${day} ${hour}:${min}`;
}
