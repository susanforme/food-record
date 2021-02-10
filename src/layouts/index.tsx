import { ApolloProvider } from '@apollo/client';
import client from '@/api';
import './animate.less';
import BottomNav from '@/components/BottomNav';
import { history, Redirect, IRoute, connect, State, Location } from 'umi';
import { bottomNavMap } from '@/utils';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TopNav from '@/components/TopNav';
import { cloneElement, useEffect } from 'react';

document.documentElement.style.fontSize = document.documentElement.clientWidth / 20 + 'px';

const DEFAULT_ANIMATION_MAP: DefaultAnimationMap = {
  PUSH: 'forward',
  POP: 'back',
  REPLACE: 'bottom',
};

const Layout: React.FC<LayoutProps> = ({ children, route, routeHistory, loginBySession }) => {
  useEffect(() => {
    loginBySession();
  }, [loginBySession]);
  const path = history.location.pathname;
  const isShowBottomNav = !!bottomNavMap.find((v) => v.path === path) && path !== '/publish';
  const currentRoute = route.routes?.find((v) => v.path === path);
  let key = history.location.key;
  let animateClass = DEFAULT_ANIMATION_MAP[history.action];
  if (history.action === 'REPLACE') {
    key = routeHistory[routeHistory.length - 2]?.key;
  }
  if (currentRoute?.wrappers) {
    animateClass = 'bottom';
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
            classNames: animateClass,
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

const mapDispatchToProps = (dispatch: Function) => ({
  loginBySession() {
    dispatch({
      type: 'index/loginBySession',
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

interface LayoutProps {
  children: React.ReactNode;
  route: IRoute;
  routeHistory: Location[];
  loginBySession(): void;
}

type ChildComponent = React.FunctionComponentElement<{ classNames: any }>;

interface DefaultAnimationMap {
  [k: string]: string;
  PUSH: 'forward';
  POP: 'back';
}
