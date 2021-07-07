import { AppPage, GetServerSideProps } from '@_app';
import { StandingsPage, Props } from '@page-components/standings';
import { mockStandings } from '@model/standing/mock';

const StandingsPageHandler: AppPage<Props> = ({ standings }) => {
  return <StandingsPage standings={standings} />;
};

StandingsPageHandler.defaultProps = {
  namespacesRequired: [],
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      standings: mockStandings[mockStandings.length - 1].teams,
    },
  };
};

export default StandingsPageHandler;
