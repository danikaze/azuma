import { FC } from 'react';
import { Player } from '@model/player/interfaces';
import { Team } from '@model/team/interfaces';
import { Page } from '@components/page';
import { PlayerList } from '@components/player-list';

export type Props = {
  players: Player[];
  teams: Team[];
};

export const PlayerListPage: FC<Props> = ({ players, teams }) => {
  return (
    <Page
      activePage="players"
      title={`Azuma League Players`}
      description="List of players of the Azuma League"
      header="All Players"
    >
      <PlayerList players={players} teams={teams} />
    </Page>
  );
};
