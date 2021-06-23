import { FC } from 'react';
import Link from 'next/link';
import { createUrlSlug } from '@utils/url';
import { Match } from '@model/match/interfaces';
import { Team } from '@model/team/interfaces';

export interface Props {
  match?: Pick<Match, 'matchId'> &
    Record<'homeTeam' | 'awayTeam', Pick<Team, 'name'>>;
  className?: string;
}

export const LinkToMatch: FC<Props> = ({ className, match, children }) => {
  let url = '/matches';
  let title: string | undefined;

  if (match) {
    title = `${match.homeTeam.name} vs ${match.awayTeam.name}`;
    const teamUrl = `/${match.matchId}/${createUrlSlug(title)}`;
    url = `/match${teamUrl}`;
  }

  return (
    <Link href={url}>
      <a className={className}>{children || title || 'Matches'}</a>
    </Link>
  );
};
