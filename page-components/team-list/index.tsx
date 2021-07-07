import { FC } from 'react';
import { Page } from '@components/page';

import { Team } from '@model/team/interfaces';
import { TeamSummary } from '@components/team-summary';

import styles from './team-list.module.scss';

export type Props = {
  teams: Team[];
};

export const TeamListPage: FC<Props> = ({ teams }) => {
  const teamList = teams.map((team) => (
    <li key={team.teamId}>
      <TeamSummary team={team} />
    </li>
  ));

  return (
    <Page
      activePage="teams"
      title={`Azuma League Teams`}
      description="The teams of the Azuma"
      header="Team List"
    >
      <ul className={styles.list}>{teamList}</ul>
    </Page>
  );
};
