import { AppPage } from './_app';

const IndexPageHandler: AppPage = () => {
  return <div>Index Page</div>;
};

IndexPageHandler.defaultProps = {
  namespacesRequired: [],
};

export default IndexPageHandler;
