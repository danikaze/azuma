import { mockMatches } from '@model/match/mock';
import { mockTeams } from '@model/team/mock';
import { Props, TeamPage } from '@page-components/team';
import { TEAM_UPCOMING_MATCHES_SHOWN } from '@utils/constants/ui';
import { getMilliseconds } from '@utils/jikan';
import { simulateOngoingMatch } from '@utils/match-simulator';
import { AppPage, GetServerSideProps } from '@_app';

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
    .slice(0, TEAM_UPCOMING_MATCHES_SHOWN)
    .map((match) => {
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
      team,
      upcomingMatches,
    },
  };
};

export default TeamPageHandler;
