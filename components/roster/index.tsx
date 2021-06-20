import clsx from 'clsx';
import { FC } from 'react';
import { Player } from '@model/player/interfaces';
import { Table, TableColumn, TableRow } from '@components/table';

import styles from './roster.module.scss';
import { LinkToPlayer } from '@components/links/link-to-player';

export interface Props {
  players: Player[];
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

function getRows(players: Player[]): TableRow<string, 'playerId'>[] {
  return players.map((player) => ({
    playerId: player.playerId,
    number: player.number,
    position: player.position,
    fullName: <LinkToPlayer player={player} />,
    height: `${player.height} cm`,
    weight: `${player.weight} kg`,
  }));
}
