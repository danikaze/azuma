import { FC } from 'react';
import { Page } from '@components/page';

import styles from './index.module.scss';

export type Props = {};

export const IndexPage: FC<Props> = ({}) => {
  return (
    <Page
      title="Index"
      description="Description"
      header="Welcome to Azuma League"
    >
      <div>Index page</div>
    </Page>
  );
};
