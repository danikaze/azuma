import { IndexPage } from '@components/pages/index';
import { AppPage } from '@_app';

const IndexPageHandler: AppPage = () => {
  return <IndexPage />;
};

IndexPageHandler.defaultProps = {
  namespacesRequired: [],
};

export default IndexPageHandler;
