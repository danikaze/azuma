import { AppPage, GetServerSideProps } from '@_app';
import { MatchListPage, Props } from '@components/pages/match-list';
import { mockMatches } from '@model/match/mock';

const MatchesPageHandler: AppPage<Props> = (props) => {
  return <MatchListPage {...props} />;
};

MatchesPageHandler.defaultProps = {
  namespacesRequired: [],
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      matches: mockMatches,
    },
  };
};

export default MatchesPageHandler;
