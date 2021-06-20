import { FC } from 'react';
import { Page } from '@components/page';
import { Player } from '@model/player/interfaces';
import { getPlayerName } from '@model/player';
import { Team } from '@model/team/interfaces';
import { PlayerDetails } from '@components/player-details';

export type Props = {
  player: Player;
  team?: Team;
};

export const PlayerPage: FC<Props> = ({ player, team }) => {
  return (
    <Page
      activePage="players"
      title={`Azuma League Player: ${player.name}`}
      description="Azuma League player description"
      header={getPlayerName(player)}
    >
      <PlayerDetails player={player} team={team} />
    </Page>
  );
};
