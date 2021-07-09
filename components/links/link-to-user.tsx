import Link from 'next/link';
import { FC } from 'react';

export interface Props {
  className?: string;
}

export const LinkToUser: FC<Props> = ({ className, children }) => {
  return (
    <Link href="/user">
      <a className={className}>{children || 'User'}</a>
    </Link>
  );
};
