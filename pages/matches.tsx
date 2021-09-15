import { AppPage, GetServerSideProps } from '@_app';
import { MatchListPage, Props } from '@page-components/match-list';
import { mockMatches } from '@model/match/mock';
import { getMilliseconds } from '@utils/jikan';
import { simulateOngoingMatch } from '@utils/match-simulator';

const MatchesPageHandler: AppPage<Props> = (props) => {
  return <MatchListPage {...props} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const matches = mockMatches.map((match) => {
    if (match.state !== 'playing') return match;

    const currentStatus = simulateOngoingMatch(
      match,
      getMilliseconds() - match.timestamp
    );

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
