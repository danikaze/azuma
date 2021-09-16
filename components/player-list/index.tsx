import { LinkToPlayer } from '@components/links/link-to-player';
import { LinkToTeam } from '@components/links/link-to-team';
import { Table, TableColumn, TableRow } from '@components/table';
import { PLAYER_POSITIONS } from '@model/player/constants';
import { Player } from '@model/player/interfaces';
import { Team } from '@model/team/interfaces';
import { FC } from 'react';
import { usePage } from './hooks';
import styles from './player-list.module.scss';

export type PlayerInfo = Pick<
  Player,
  'playerId' | 'name' | 'surname' | 'teamId' | 'height' | 'weight' | 'position'
> & { number: number | undefined };

export type Props = {
  players: PlayerInfo[];
  teams: Pick<Team, 'teamId' | 'name' | 'shortName'>[];
};

const playersTableColumns: TableColumn[] = [
  { label: 'Player', key: 'name', className: styles.colName },
  { label: 'Team', key: 'team' },
  { label: '#', key: 'number' },
  { label: 'Pos', key: 'position' },
  { label: 'Height', key: 'height' },
  { label: 'Weight', key: 'weight' },
];

const positionList = [
  { label: 'All Positions', position: '' },
  ...PLAYER_POSITIONS.map((position) => ({
    position,
    label: position,
  })),
];

export const PlayerList: FC<Props> = (props) => {
  const {
    totalPages,
    currentPage,
    selectNextPage,
    selectPrevPage,
    currentPlayers,
    selectPosition,
    selectTeam,
    setTextFilter,
  } = usePage(props);

  const teamFilterOptions = [
    { name: 'All Teams', teamId: '' },
    ...props.teams,
  ].map((team, index) => (
    <option key={index} value={team.teamId}>
      {team.name}
    </option>
  ));
  const positionFilterOptions = positionList.map((item, index) => (
    <option key={index} value={item.position}>
      {item.label}
    </option>
  ));

  const rows: TableRow<string, 'playerId'>[] = currentPlayers.map((item) => ({
    playerId: item.player.playerId,
    name: <LinkToPlayer player={item.player} />,
    number: item.player.number,
    position: item.player.position,
    height: item.player.height,
    weight: item.player.weight,
    team: item.team && (
      <LinkToTeam team={item.team}>{item.team?.shortName}</LinkToTeam>
    ),
  }));

  return (
    <div className={styles.root}>
      <div className={styles.filter}>
        <div>
          <input placeholder="Search Players" onChange={setTextFilter} />
          <select onChange={selectTeam}>{teamFilterOptions}</select>
          <select onChange={selectPosition}>{positionFilterOptions}</select>
        </div>
        <div className={styles.pagination}>
          <div className={styles.prevPage} onClick={selectPrevPage}>
            ⇦
          </div>
          Page {currentPage + 1} of {totalPages}
          <div className={styles.nextPage} onClick={selectNextPage}>
            ⇨
          </div>
        </div>
      </div>
      <Table columns={playersTableColumns} rows={rows} key="playerId" />
    </div>
  );
};
