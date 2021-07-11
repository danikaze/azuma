import { AppPage, GetServerSideProps } from '@_app';
import { TeamListPage, Props } from '@page-components/team-list';
import { mockTeams } from '@model/team/mock';

const TeamsPageHandler: AppPage<Props> = ({ teams }) => {
  return <TeamListPage teams={teams} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      teams: mockTeams,
    },
  };
};

export default TeamsPageHandler;
