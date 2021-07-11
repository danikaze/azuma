import { AppPage } from '@_app';
import { UserPage, Props } from '@page-components/user';
import { userRequiredServerSideProps } from '@utils/auth';

const UserPageHandler: AppPage<Props> = (props) => {
  return <UserPage {...props} />;
};

export const getServerSideProps = userRequiredServerSideProps<Props>(
  async () => {
    return { props: {} };
  }
);

export default UserPageHandler;
