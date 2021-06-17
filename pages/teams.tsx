import { AppPage, GetServerSideProps } from '@_app';
import { TeamListPage, Props } from '@components/pages/team-list';
import { mockTeams } from '@model/team/mock';

const TeamsPageHandler: AppPage<Props> = ({ teams }) => {
  return <TeamListPage teams={teams} />;
};

TeamsPageHandler.defaultProps = {
  namespacesRequired: [],
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      teams: mockTeams,
    },
  };
};

export default TeamsPageHandler;
