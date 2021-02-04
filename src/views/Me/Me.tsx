import renderRoutes from '@/router/renderRoutes';
import { RouteComponentProps, StaticContext } from 'react-router';

function Me(props: MeProps) {
  const isChild = props.location.pathname !== props.route.path;

  if (isChild) {
    return renderRoutes(props.route.routes);
  }
  return <div style={{ backgroundColor: 'blue', width: 100, height: 100 }}>me</div>;
}
export default Me;

interface MeProps extends RouteComponentProps<any, StaticContext, unknown> {
  route: any;
}
