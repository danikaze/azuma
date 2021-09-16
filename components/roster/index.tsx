import clsx from 'clsx';
import { FC } from 'react';
import { Table, TableColumn, TableRow } from '@components/table';
import { LinkToPlayer } from '@components/links/link-to-player';
import { PlayerInTeam } from '@model/team/interfaces';

import styles from './roster.module.scss';

export interface Props {
  players: PlayerInTeam[];
  className?: string;
}

const columns: TableColumn[] = [
  { key: 'fullName', label: 'Player', className: styles.colName },
  { key: 'number', label: '#' },
  { key: 'position', label: 'Pos' },
  { key: 'height', label: 'Height' },
  { key: 'weight', label: 'Weight' },
];

export const Roster: FC<Props> = ({ className, players }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <h2>Roster</h2>
      <Table columns={columns} rows={getRows(players)} keyCol="playerId" />
    </div>
  );
};

function getRows(players: PlayerInTeam[]): TableRow<string, 'playerId'>[] {
  return players.map((playerInTeam) => ({
    playerId: playerInTeam.player.playerId,
    number: playerInTeam.number,
    position: playerInTeam.position,
    fullName: <LinkToPlayer player={playerInTeam.player} />,
    height: `${playerInTeam.player.height} cm`,
    weight: `${playerInTeam.player.weight} kg`,
  }));
}
