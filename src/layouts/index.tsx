import { ApolloProvider } from '@apollo/client';
import client from '@/api';
import './index.css';
import './animate.less';
import BottomNav from '@/components/BottomNav';
import { history, Redirect, IRoute, connect, State, Location } from 'umi';
import { bottomNavMap } from '@/utils';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TopNav from '@/components/TopNav';
import { cloneElement } from 'react';

document.documentElement.style.fontSize =
  document.documentElement.clientWidth / 20 + 'px';

const DEFAULT_ANIMATION_MAP: DefaultAnimationMap = {
  PUSH: 'forward',
  POP: 'back',
  REPLACE: 'bottom',
};

const Layout: React.FC<LayoutProps> = ({ children, route, routeHistory }) => {
  const path = history.location.pathname;
  const isShowBottomNav =
    !!bottomNavMap.find((v) => v.path === path) && path !== '/publish';
  const currentRoute = route.routes?.find((v) => v.path === path);
  let key = history.location.key;
  if (currentRoute?.wrappers || history.action === 'REPLACE') {
    key = routeHistory[routeHistory.length - 2]?.key;
  }
  if (path === '/') {
    return <Redirect to="/home" />;
  }
  return (
    <ApolloProvider client={client}>
      {isShowBottomNav ? null : <TopNav title={currentRoute?.title} />}
      <TransitionGroup
        childFactory={(child: ChildComponent) =>
          cloneElement(child, {
            classNames: DEFAULT_ANIMATION_MAP[history.action],
          })
        }
      >
        <CSSTransition timeout={400} key={key}>
          <div className="layout">{children}</div>
        </CSSTransition>
      </TransitionGroup>
      {isShowBottomNav ? <BottomNav /> : null}
    </ApolloProvider>
  );
};

const mapStateToProps = ({ index }: State) => ({
  routeHistory: index.routeHistory,
});

export default connect(mapStateToProps)(Layout);

interface LayoutProps {
  children: React.ReactNode;
  route: IRoute;
  routeHistory: Location[];
}

type ChildComponent = React.FunctionComponentElement<{ classNames: any }>;

interface DefaultAnimationMap {
  [k: string]: string;
  PUSH: 'forward';
  POP: 'back';
}
