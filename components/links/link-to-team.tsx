import { FC } from 'react';
import Link from 'next/link';
import { createUrlSlug } from '@utils/url';
import { Team } from '@model/team/interfaces';

export interface Props {
  team?: Pick<Team, 'teamId' | 'name'>;
  className?: string;
}

export const LinkToTeam: FC<Props> = ({ className, team, children }) => {
  const teamUrl = team ? `/${team.teamId}/${createUrlSlug(team.name)}` : 's';
  const url = `/team${teamUrl}`;
  return (
    <Link href={url}>
      <a className={className}>{children || (team ? team.name : 'Teams')}</a>
    </Link>
  );
};
