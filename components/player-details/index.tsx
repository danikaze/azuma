import { FC } from 'react';
import { Player } from '@model/player/interfaces';
import { Team } from '@model/team/interfaces';
import { getTeamImageUrl } from '@model/team';
import { LinkToTeam } from '@components/links/link-to-team';

import styles from './player-details.module.scss';

export type Props = {
  player: Player & { number: number | undefined };
  team?: Team;
};

export const PlayerDetails: FC<Props> = ({ player, team }) => {
  const teamInfo = team && (
    <LinkToTeam team={team}>
      <img src={getTeamImageUrl(team)} />
    </LinkToTeam>
  );

  return (
    <div className={styles.root}>
      {teamInfo}
      <div>
        <div>Height: {player.height} cm</div>
        <div>Weight: {player.weight} kg</div>
        <div>Number: {player.number}</div>
        <div>Position: {player.position}</div>
        <div>Dominant Hand: {player.dominantHand}</div>
      </div>
    </div>
  );
};
