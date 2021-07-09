import { FC } from 'react';
import { Page } from '@components/page';

export type Props = {};

export const UserPage: FC<Props> = ({}) => {
  return (
    <Page
      activePage="user"
      title="User Information"
      description="Azuma League user information and configuration page"
      header="User Information"
    />
  );
};
