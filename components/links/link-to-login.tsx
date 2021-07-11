import Link from 'next/link';
import { FC } from 'react';

export interface Props {
  className?: string;
}

export const LinkToLogin: FC<Props> = ({ className, children }) => {
  return (
    <Link href={AUTH_TWITTER_LOGIN_PAGE} locale={false}>
      <a className={className}>{children || 'Log In'}</a>
    </Link>
  );
};
