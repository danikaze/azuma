import clsx from 'clsx';
import { FC } from 'react';
import { Team } from '@model/team/interfaces';

import styles from './team-header.module.scss';
import { getTeamImageUrl } from '@model/team';

export interface Props {
  team: Team;
  className?: string;
}

export const TeamHeader: FC<Props> = ({ className, team }) => {
  const teamLogo = getTeamImageUrl(team);
  const headerStyle = {
    backgroundColor: team.bgColor,
  };
  const logoStyle = {
    backgroundImage: `url(${teamLogo})`,
  };

  return (
    <div className={clsx(className, styles.container)} style={headerStyle}>
      <div className={styles.logoBg} style={logoStyle} />
      <div className={styles.data}>
        <h1 className={styles.title}>
          <div className={styles.logoTitle} style={logoStyle} />
          {team.name}
        </h1>
        <ul className={styles.stats}>
          {renderOneStat('Position', `#${team.pos}`)}
          {renderOneStat('PPG', team.ppg.toFixed(2))}
          {renderOneStat('Wins', team.wins)}
          {renderOneStat('Loses', team.losses)}
          {renderOneStat('OPPG', team.oppg.toFixed(2))}
        </ul>
      </div>
    </div>
  );
};

function renderOneStat(name: string, value: number | string): JSX.Element {
  return (
    <div className={styles.stat}>
      <div className={styles.statName}>{name}</div>
      <div className={styles.statValue}>{value}</div>
    </div>
  );
}
