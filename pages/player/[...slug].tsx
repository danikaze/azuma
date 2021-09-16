import { AppPage, GetServerSideProps } from '@_app';
import { mockPlayers } from '@model/player/mock';
import { mockTeams } from '@model/team/mock';
import { PlayerPage, Props } from '@page-components/player';
import { Player } from '@model/player/interfaces';

const PlayerPageHandler: AppPage<Props> = (props) => {
  return <PlayerPage {...props} />;
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
    t.players.find((p) => p.player.playerId === playerId)
  );

  return {
    props: {
      team,
      player: {
        ...player,
        number: getPlayerNumber(player),
      },
    },
  };
};

function getPlayerNumber(player: Player): number | undefined {
  const team = mockTeams.find((team) => team.teamId === player.teamId);
  if (!team) return;

  return team.players.find(
    (playerInTeam) => player.playerId === playerInTeam.player.playerId
  )?.number;
}

export default PlayerPageHandler;
