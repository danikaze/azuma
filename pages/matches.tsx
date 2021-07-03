import { AppPage, GetServerSideProps } from '@_app';
import { MatchListPage, Props } from '@components/pages/match-list';
import { mockMatches } from '@model/match/mock';
import { MatchSimulatorUpdater } from '@utils/match-simulator/match-simulator-updater';
import { getSeconds } from '@utils/jikan';

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
    sim.replay(getSeconds() - match.timestamp);
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
