import { ApolloProvider } from '@apollo/client';
import client from '@/api';
import './animate.less';
import BottomNav from '@/components/BottomNav';
import { history, Redirect, IRoute, connect, State, Location } from 'umi';
import { bottomNavMap } from '@/utils';
import TopNav from '@/components/TopNav';
import { useEffect } from 'react';
import Shelf from '@/components/Shelf';
import { TweenOneGroup } from 'rc-tween-one';

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
  if (history.action === 'REPLACE') {
    key = routeHistory[routeHistory.length - 2]?.key;
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
        // 等完成在添加更多动画 https://motion.ant.design/api/tween-one-cn#TweenOneGroup-API
        <TweenOneGroup
          enter={{
            opacity: 0,
            width: 0,
            scale: 0,
            duration: 400,
            height: 0,
            type: 'from',
            onComplete: (e: any) => {
              e.target.style = '';
            },
          }}

          // leave={{ opacity: 0, width: 0, scale: 0, duration: 800, height: 0, type: 'from' }}
        >
          <div className="layout" key={key}>
            {children}
          </div>
        </TweenOneGroup>
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
