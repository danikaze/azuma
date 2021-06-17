import clsx from 'clsx';
import { FC } from 'react';
import { Player } from '@model/player/interfaces';

import styles from './roster.module.scss';

export interface Props {
  players: Player[];
  className?: string;
}

export const Roster: FC<Props> = ({ className, players }) => {
  return (
    <div className={styles.root}>
      <h3>Roster</h3>
      <table className={clsx(className, styles.list)}>
        {renderHeader()}
        {renderPlayers(players)}
      </table>
    </div>
  );
};

function renderHeader(): JSX.Element {
  return (
    <thead>
      <tr>
        <td className={styles.colName}>Player</td>
        <td>#</td>
        <td>Pos</td>
        <td>Height</td>
        <td>Weight</td>
      </tr>
    </thead>
  );
}

function renderPlayers(players: Player[]): JSX.Element {
  const playerList = players.map((player) => (
    <tr key={player.playerId}>
      <td className={styles.colName}>
        {player.name} {player.surname}
      </td>
      <td>{player.number}</td>
      <td>{player.position}</td>
      <td>{player.height} cm</td>
      <td>{player.weight} kg</td>
    </tr>
  ));

  return <tbody>{playerList}</tbody>;
}
