import { AppPage, GetServerSideProps } from '@_app';
import { mockPlayers } from '@model/player/mock';
import { PlayerPage, Props } from '@components/pages/player';
import { mockTeams } from '@model/team/mock';

const PlayerPageHandler: AppPage<Props> = (props) => {
  return <PlayerPage {...props} />;
};

PlayerPageHandler.defaultProps = {
  namespacesRequired: [],
};

interface Query {
  slug: string[];
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async (
  ctx
) => {
  const playerId = ctx.params?.slug[0];
  const player = playerId && mockPlayers.find((p) => p.playerId === playerId);

  if (!player) {
    return {
      notFound: true,
    };
  }

  const team = mockTeams.find((t) =>
    t.players.find((p) => p.playerId === playerId)
  );

  return {
    props: {
      player,
      team,
    },
  };
};

export default PlayerPageHandler;
