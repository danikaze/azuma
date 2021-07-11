import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LoginForm } from '@components/login-form';
import { AppPage, GetServerSideProps } from '@_app';

export interface Props {
  redirect?: string;
}

const Login: AppPage<Props, Props> = ({ redirect }) => {
  return (
    <div>
      <Head>
        <title>
          {PACKAGE_NAME} - {PACKAGE_VERSION} ({COMMIT_HASH_SHORT})
        </title>
      </Head>

      <main>
        <LoginForm redirect={redirect} twitter />
      </main>
      <div>PRODUCTION: {IS_PRODUCTION ? 'true' : 'false'}</div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
  locale,
}) => {
  return {
    props: {
      redirect: query.r as string | undefined,
      ...(await serverSideTranslations(locale!, ['login'])),
    },
  };
};

export default Login;
