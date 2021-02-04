import renderRoutes from '@/router/renderRoutes';
import { RouteComponentProps, StaticContext } from 'react-router';

function Home(props: HomeProps) {
  const isChild = props.location.pathname !== props.route.path;

  if (isChild) {
    return renderRoutes(props.route.routes);
  }
  return <div style={{ backgroundColor: 'red', width: 100, height: 100 }}>home</div>;
}

export default Home;

interface HomeProps extends RouteComponentProps<any, StaticContext, unknown> {
  route: any;
}
