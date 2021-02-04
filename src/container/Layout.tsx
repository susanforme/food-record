import Home from '@/views/Home/Home';
import { lazy } from 'react';
import { StaticContext } from 'react-router';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import NavBar from '@/components/NavBar';

const Distance = lazy(() => import('../views/Distance/Distance'));
const Me = lazy(() => import('../views/Me/Me'));
const Message = lazy(() => import('../views/Message/Message'));

export default function Layout(props: any) {
  const location = useLocation();
  const pathname = location.pathname;
  const map = {
    home: <Home {...props}></Home>,
    distance: <Distance {...props}></Distance>,
    me: <Me {...props}></Me>,
    message: <Message {...props}></Message>,
  };

  if (pathname.slice(1) in map) {
    return (
      <>
        {map[pathname.slice(1) as keyof typeof map]}
        <NavBar></NavBar>
      </>
    );
  }
  return null;
}

interface LayoutProps extends RouteComponentProps<any, StaticContext, unknown> {
  route: any;
}
