import { AppPage, GetServerSideProps } from '@_app';
import { mockMatches } from '@model/match/mock';
import { MatchPage, Props } from '@page-components/match';

const MatchPageHandler: AppPage<Props> = (props) => {
  return <MatchPage {...props} />;
};

interface Query {
  slug: string[];
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async (
  ctx
) => {
  const matchId = ctx.params?.slug[0];
  const match = matchId && mockMatches.find((m) => m.matchId === matchId);

  if (!match) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      match,
    },
  };
};

export default MatchPageHandler;
