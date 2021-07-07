import { AppPage, GetServerSideProps } from '@_app';
import { MatchListPage, Props } from '@page-components/match-list';
import { mockMatches } from '@model/match/mock';
import { MatchSimulatorUpdater } from '@utils/match-simulator/match-simulator-updater';
import { getMilliseconds } from '@utils/jikan';

const MatchesPageHandler: AppPage<Props> = (props) => {
  return <MatchListPage {...props} />;
};

MatchesPageHandler.defaultProps = {
  namespacesRequired: [],
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const matches = mockMatches.map((match) => {
    if (match.state !== 'playing') return match;
    const sim = new MatchSimulatorUpdater(match.log);
    sim.replay(getMilliseconds() - match.timestamp);
    const currentStatus = sim.getResult();

    return {
      ...match,
      homeScore: currentStatus.homeScore,
      awayScore: currentStatus.awayScore,
    };
  });

  return {
    props: {
      matches,
    },
  };
};

export default MatchesPageHandler;
