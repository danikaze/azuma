import clsx from 'clsx';
import { FC } from 'react';
import { Team } from '@model/team/interfaces';
import { getTeamImageUrl } from '@model/team';
import { LinkToTeam } from '@components/links/link-to-team';

import styles from './team-summary.module.scss';

export interface Props {
  team: Pick<Team, 'teamId' | 'name' | 'image' | 'bgColor'>;
  className?: string;
}

export const TeamSummary: FC<Props> = ({ className, team }) => {
  const teamLogo = getTeamImageUrl(team);
  const headerStyle = {
    backgroundColor: team.bgColor,
  };
  const logoStyle = {
    backgroundImage: `url(${teamLogo})`,
  };

  return (
    <LinkToTeam team={team} className={styles.teamName}>
      <div className={clsx(className, styles.container)} style={headerStyle}>
        <div className={styles.logoBg} style={logoStyle} />
        <div className={styles.data}>
          <div className={styles.logoTitle} style={logoStyle} />
          {team.name}
        </div>
      </div>
    </LinkToTeam>
  );
};
