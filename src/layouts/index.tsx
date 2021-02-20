import { ApolloProvider } from '@apollo/client';
import client from '@/api';
import './animate.less';
import BottomNav from '@/components/BottomNav';
import { history, Redirect, IRoute, connect, State, Location } from 'umi';
import { bottomNavMap } from '@/utils';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TopNav from '@/components/TopNav';
import { cloneElement, useEffect } from 'react';
import Shelf from '@/components/Shelf';

const DEFAULT_ANIMATION_MAP: DefaultAnimationMap = {
  PUSH: 'forward',
  POP: 'back',
  REPLACE: 'bottom',
};

document.documentElement.style.fontSize = document.documentElement.clientWidth / 20 + 'px';

const Layout: React.FC<LayoutProps> = ({
  children,
  route,
  routeHistory,
  loginBySession,
  loading,
  getKind,
}) => {
  useEffect(() => {
    loginBySession();
    getKind();
  }, [getKind, loginBySession]);
  const path = history.location.pathname;
  const isShowBottomNav = !!bottomNavMap.find((v) => v.path === path) && path !== '/publish';
  const currentRoute = route.routes?.find((v) => v.path === path);
  const noNav = currentRoute?.noNav;
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
      {!isShowBottomNav && !noNav ? <TopNav /> : null}

      {loading ? (
        <Shelf />
      ) : (
        <TransitionGroup
          exit={false}
          appear={true}
          unmountOnExit={true}
          childFactory={(child: ChildComponent) =>
            cloneElement(child, {
              classNames: animateClass,
            })
          }
        >
          <CSSTransition timeout={400} key={key}>
            <div className="layout" key={key}>
              {children}
            </div>
          </CSSTransition>
        </TransitionGroup>
      )}

      {isShowBottomNav && !noNav ? <BottomNav /> : null}
    </ApolloProvider>
  );
};

const mapStateToProps = (state: State) => {
  const loginLoading = state.loading.effects['index/loginBySession'];
  const kindLoading = state.loading.effects['home/getKind'];
  return {
    routeHistory: state.index.routeHistory,
    loading:
      (loginLoading === undefined ? true : loginLoading) ||
      (kindLoading === undefined ? true : kindLoading),
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  loginBySession() {
    dispatch({
      type: 'index/loginBySession',
    });
  },
  getKind() {
    dispatch({
      type: 'home/getKind',
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

interface LayoutProps {
  children: React.ReactNode;
  route: IRoute;
  routeHistory: Location[];
  loginBySession(): void;
  loading: boolean | undefined;
  getKind(): void;
}

type ChildComponent = React.FunctionComponentElement<{ classNames: any }>;

interface DefaultAnimationMap {
  [k: string]: string;
  PUSH: 'forward';
  POP: 'back';
}
