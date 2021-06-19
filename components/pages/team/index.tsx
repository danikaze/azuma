import { FC } from 'react';
import { Match } from '@model/match/interfaces';
import { Team } from '@model/team/interfaces';
import { Page } from '@components/page';
import { TeamHeader } from '@components/team-header';
import { UpcomingMatches } from '@components/upcoming-matches';
import { Roster } from '@components/roster';

export type Props = {
  team: Team;
  upcomingMatches: Match[];
};

export const TeamPage: FC<Props> = ({ team, upcomingMatches }) => {
  const header = <TeamHeader team={team} />;

  return (
    <Page
      activePage="teams"
      title={`Azuma League Team: ${team.name}`}
      description="Azuma League team description"
      externalHeader={header}
    >
      <UpcomingMatches matches={upcomingMatches} />
      <Roster players={team.players} />
    </Page>
  );
};
