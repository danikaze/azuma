import { FC } from 'react';
import { Page } from '@components/page';

import { Match } from '@model/match/interfaces';

import styles from './match-list.module.scss';
import { MatchSummary } from '@components/match-summary';

export type Props = {
  matches: Match[];
};

export const MatchListPage: FC<Props> = ({ matches }) => {
  const matchList = matches.map((match) => (
    <li key={match.matchId}>
      <MatchSummary match={match} />
    </li>
  ));

  return (
    <Page
      activePage="matches"
      title={`Azuma League Matches`}
      description="The teams of the Azuma"
      header="All Games"
    >
      <ul className={styles.list}>{matchList}</ul>
    </Page>
  );
};
