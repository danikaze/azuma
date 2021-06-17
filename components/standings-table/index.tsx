import clsx from 'clsx';
import { FC } from 'react';
import { StandingTeamData } from '@model/standing/interfaces';
import { getTeamImageUrl } from '@model/team';
import { DROP_TEAMS, LEAGUE_TEAMS, PLAYOFF_TEAMS } from '@utils/constants/game';
import { LinkToTeam } from '@components/links/link-to-team';
import { Table, TableColumn, TableRow } from '@components/table';

import styles from './standings-table.module.scss';

export interface Props {
  className?: string;
  standings: StandingTeamData[];
}

const columns: TableColumn[] = [
  { key: 'rowType', className: styles.colType },
  { key: 'pos', label: 'Pos', className: styles.colPos },
  { key: 'teamName', label: 'Team', className: styles.colTeam },
  { key: 'matches', label: 'Matches' },
  { key: 'wins', label: 'Wins' },
  { key: 'losses', label: 'Losses' },
  { key: 'ppg', label: 'PPG' },
  { key: 'oppg', label: 'OPPG' },
];

export const StandingsTable: FC<Props> = ({ className, standings }) => {
  return (
    <div className={clsx(className, styles.standings)}>
      <Table columns={columns} rows={getRows(standings)} keyCol="teamId" />
      {renderLegend()}
    </div>
  );
};

function getRows(
  standings: readonly StandingTeamData[]
): TableRow<string, 'teamId'>[] {
  return standings.map((team) => ({
    teamId: team.teamId,
    rowType: renderRowType(team.pos),
    pos: team.pos,
    teamName: (
      <>
        <img src={getTeamImageUrl(team)} />
        <LinkToTeam team={{ teamId: team.teamId, name: team.name }}>
          {team.name}
        </LinkToTeam>
      </>
    ),
    matches: team.wins + team.losses,
    wins: team.wins,
    losses: team.losses,
    ppg: team.ppg.toFixed(2),
    oppg: team.oppg.toFixed(2),
  }));
}

function renderRowType(position: number): JSX.Element {
  const classes = clsx(
    styles.cellType,
    position <= PLAYOFF_TEAMS && styles.playoffs,
    position > LEAGUE_TEAMS - DROP_TEAMS && styles.drop
  );

  return <div className={classes} />;
}

function renderLegend(): JSX.Element {
  return (
    <ul className={styles.legend}>
      <li className={styles.legendPlayoff}>
        <div className={styles.legendColor} /> Playoff position
      </li>
      <li className={styles.legendDanger}>
        <div className={styles.legendColor} /> Drop position
      </li>
    </ul>
  );
}
