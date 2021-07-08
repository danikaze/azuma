import { LinkToLogin } from '@components/links/link-to-login';
import { LinkToLogout } from '@components/links/link-to-logout';
import { UserAuthData } from '@model/user';
import { useUserData } from '@utils/auth';
import clsx from 'clsx';
import { FC } from 'react';

import styles from './user-info-column.module.scss';

export interface Props {
  className?: string;
}

export const UserInfoColumn: FC<Props> = ({ className }) => {
  const user = useUserData();
  return (
    <aside className={clsx(className, styles.root)}>
      {user ? renderUser(user) : renderNoUser()}
    </aside>
  );
};

function renderNoUser(): JSX.Element {
  return <LinkToLogin>{renderButton('Log In', 'login')}</LinkToLogin>;
}

function renderUser(user: UserAuthData): JSX.Element[] {
  const userName = (
    <div key="user" className={styles.user}>
      {user.username}
    </div>
  );
  const logout = (
    <LinkToLogout key="logout">
      {renderButton('Log Out', 'logout')}
    </LinkToLogout>
  );

  return [userName, logout];
}

function renderButton(label: string, type: 'login' | 'logout'): JSX.Element {
  return <div className={clsx(styles.button, styles[type])}>{label}</div>;
}
