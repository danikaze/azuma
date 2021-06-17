import { FC } from 'react';
import { Page } from '@components/page';
import { TeamHeader } from '@components/team-header';

import { Team } from '@model/team/interfaces';
import { Roster } from '@components/roster';

export type Props = {
  team: Team;
};

export const TeamPage: FC<Props> = ({ team }) => {
  const header = <TeamHeader team={team} />;

  return (
    <Page
      activePage="teams"
      title={`Azuma League Team: ${team.name}`}
      description="Azuma League team description"
      externalHeader={header}
    >
      <Roster players={team.players} />
    </Page>
  );
};
