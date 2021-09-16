import { Player } from '@model/player/interfaces';
import { mockPlayers } from '@model/player/mock';
import { mockTeams } from '@model/team/mock';
import { PlayerListPage, Props } from '@page-components/player-list';
import { AppPage, GetServerSideProps } from '@_app';

const PlayersPageHandler: AppPage<Props> = (props) => {
  return <PlayerListPage {...props} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      players: mockPlayers.map((player) => ({
        ...player,
        number: getPlayerNumber(player),
      })),
      teams: mockTeams,
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

export default PlayersPageHandler;
