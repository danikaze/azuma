import { FC } from 'react';
import { Page } from '@components/page';

export type Props = {};

export const IndexPage: FC<Props> = ({}) => {
  return (
    <Page
      activePage="index"
      title="Index"
      description="Description"
      header="Welcome to Azuma League"
    >
      <div>Index page</div>
    </Page>
  );
};
