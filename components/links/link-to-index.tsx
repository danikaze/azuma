import Link from 'next/link';
import { FC } from 'react';

export interface Props {
  className?: string;
}

export const LinkToIndex: FC<Props> = ({ className, children }) => {
  return (
    <Link href="/">
      <a className={className}>{children || 'Index'}</a>
    </Link>
  );
};
