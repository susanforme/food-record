import Routes from '@/router/Routes';
import { RouteComponentProps, StaticContext } from 'react-router';

function Me(props: MeProps) {
  const isChild = props.location.pathname !== props.route.path;

  if (isChild) {
    return <Routes routes={props.route.routes}></Routes>;
  }
  return (
    <>
      <div style={{ backgroundColor: 'blue', width: '100%', height: 100 }}>home</div>
    </>
  );
}
export default Me;

interface MeProps extends RouteComponentProps<any, StaticContext, unknown> {
  route: any;
}
