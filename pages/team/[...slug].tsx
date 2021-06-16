import { AppPage, GetServerSideProps } from '@_app';
import { TeamPage, Props } from '@components/pages/team';
import { mockTeams } from '@model/team/mock';

const TeamPageHandler: AppPage<Props> = ({ team }) => {
  return <TeamPage team={team} />;
};

TeamPageHandler.defaultProps = {
  namespacesRequired: [],
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

  return {
    props: {
      team,
    },
  };
};

export default TeamPageHandler;
