import { AppPage, GetServerSideProps } from '@_app';
import { PlayerListPage, Props } from '@page-components/player-list';
import { mockPlayers } from '@model/player/mock';
import { mockTeams } from '@model/team/mock';

const PlayersPageHandler: AppPage<Props> = (props) => {
  return <PlayerListPage {...props} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      players: mockPlayers,
      teams: mockTeams,
    },
  };
};

export default PlayersPageHandler;
