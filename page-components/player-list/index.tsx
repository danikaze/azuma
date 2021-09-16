import { FC } from 'react';
import { Page } from '@components/page';
import { PlayerList, Props as PlayerListProps } from '@components/player-list';

export type Props = PlayerListProps;

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
