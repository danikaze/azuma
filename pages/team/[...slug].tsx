import { AppPage, GetServerSideProps } from '@_app';
import { TeamPage, Props } from '@page-components/team';
import { mockTeams } from '@model/team/mock';
import { mockMatches } from '@model/match/mock';
import { TEAM_UPCOMING_MATCHES_SHOWN } from '@utils/constants/ui';

const TeamPageHandler: AppPage<Props> = (props) => {
  return <TeamPage {...props} />;
};

interface Query {
  slug: string[];
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async (
  ctx
) => {
  const teamId = ctx.params?.slug[0];
  const team = teamId && mockTeams.find((t) => t.teamId === teamId);

  if (!team) {
    return {
      notFound: true,
    };
  }

  const upcomingMatches = mockMatches
    .filter(
      (match) =>
        (match.state === 'pending' || match.state === 'playing') &&
        (match.homeTeam.teamId === teamId || match.awayTeam.teamId === teamId)
    )
    .slice(0, TEAM_UPCOMING_MATCHES_SHOWN);

  return {
    props: {
      team,
      upcomingMatches,
    },
  };
};

export default TeamPageHandler;
