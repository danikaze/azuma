import { IndexPage } from '@page-components/index';
import { AppPage } from '@_app';

const IndexPageHandler: AppPage = () => {
  return <IndexPage />;
};

IndexPageHandler.defaultProps = {
  namespacesRequired: [],
};

export default IndexPageHandler;
