import { FC } from 'react';
import { Page } from '@components/page';
import { StandingsTable } from '@components/standings-table';
import { StandingTeamData } from '@model/standing/interfaces';

export type Props = {
  standings: StandingTeamData[];
};

export const StandingsPage: FC<Props> = ({ standings }) => {
  return (
    <Page
      activePage="standings"
      title="Azuma League Standings & Stats"
      description="League Standings"
      header="Standings & Stats"
    >
      <StandingsTable standings={standings} />
    </Page>
  );
};
