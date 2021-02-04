import Routes from '@/router/Routes';
import { RouteComponentProps, StaticContext } from 'react-router';
import { CSSTransition } from 'react-transition-group';

function Home(props: HomeProps) {
  const isChild = props.location.pathname !== props.route.path;

  if (isChild) {
    return <Routes routes={props.route.routes}></Routes>;
  }
  return (
    <CSSTransition classNames="page" timeout={300} in={props.match !== null}>
      <>
        <div style={{ backgroundColor: 'red', width: '100%', height: 100 }}>home</div>
      </>
    </CSSTransition>
  );
}

export default Home;

interface HomeProps extends RouteComponentProps<any, StaticContext, unknown> {
  route: any;
}
