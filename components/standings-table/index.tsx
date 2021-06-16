import clsx from 'clsx';
import { FC } from 'react';
import { StandingTeamData } from '@model/standing/interfaces';
import { PLAYOFF_TEAMS } from '@utils/constants/game';
import { LinkToTeam } from '@components/links/link-to-team';

import styles from './standings-table.module.scss';

export interface Props {
  className?: string;
  standings: StandingTeamData[];
}

export const StandingsTable: FC<Props> = ({ className, standings }) => {
  return (
    <div className={clsx(className, styles.standings)}>
      <table>
        <thead>
          <tr className={styles.header}>
            <th className={styles.colType}>&nbsp;</th>
            <th className={styles.colPos}>Pos</th>
            <th className={styles.colTeam}>Team</th>
            <th className={styles.colWins}>Wins</th>
            <th className={styles.colLosses}>Losses</th>
            <th className={styles.colPpg}>PPG</th>
            <th className={styles.colOppg}>OPPG</th>
          </tr>
        </thead>
        <tbody>{renderStandings(standings)}</tbody>
      </table>
      {renderLegend()}
    </div>
  );
};

function renderStandings(standings: StandingTeamData[]): JSX.Element[] {
  return standings.map((team) => {
    const colTypeClases = clsx(
      styles.colType,
      team.pos <= PLAYOFF_TEAMS && styles.playoffs,
      team.pos === standings.length && styles.danger
    );
    const teamName = (
      <LinkToTeam team={{ teamId: team.teamId, name: team.name }}>
        {team.name}
      </LinkToTeam>
    );

    return (
      <tr key={team.teamId}>
        <td className={colTypeClases}>&nbsp;</td>
        <td>{team.pos}</td>
        <td className={styles.colTeam}>{teamName}</td>
        <td>{team.wins}</td>
        <td>{team.losses}</td>
        <td>{team.ppg.toFixed(2)}</td>
        <td>{team.oppg.toFixed(2)}</td>
      </tr>
    );
  });
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
