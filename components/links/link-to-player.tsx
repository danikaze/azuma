import { FC } from 'react';
import Link from 'next/link';
import { createUrlSlug } from '@utils/url';
import { Player } from '@model/player/interfaces';
import { getPlayerName } from '@model/player';

export interface Props {
  player?: Pick<Player, 'playerId' | 'name' | 'surname'>;
  className?: string;
}

export const LinkToPlayer: FC<Props> = ({ className, player, children }) => {
  const teamUrl = player
    ? `/${player.playerId}/${createUrlSlug(player.name)}`
    : 's';
  const url = `/player${teamUrl}`;

  return (
    <Link href={url}>
      <a className={className}>
        {children || (player ? getPlayerName(player) : 'Players')}
      </a>
    </Link>
  );
};
