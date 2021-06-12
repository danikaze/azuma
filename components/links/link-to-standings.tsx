import Link from 'next/link';
import { FC } from 'react';

export interface Props {
  className?: string;
}

export const LinkToStandings: FC<Props> = ({ className, children }) => {
  return (
    <Link href="/standings">
      <a className={className}>{children || 'Standings'}</a>
    </Link>
  );
};
