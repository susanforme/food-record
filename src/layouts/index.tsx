import React, { useRef } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@/api';
import './index.css';
import './animate.less';
import BottomNav from '@/components/BottomNav';
import { history, Redirect, IRoute } from 'umi';
import { bottomNavMap } from '@/utils';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

document.documentElement.style.fontSize = document.documentElement.clientWidth / 20 + 'px';

const DEFAULT_ANIMATION_MAP: DefaultAnimationMap = {
  PUSH: 'forward',
  POP: 'back',
};

const Layout: React.FC<LayoutProps> = ({ children, route }) => {
  const path = history.location.pathname;
  const nodeRef = useRef(null);
  const isShowBottomNav = !!bottomNavMap.find((v) => v.path === path) && path !== '/publish';
  const animation = route.routes?.find((v) => v.path === path)?.animation;
  let animateClassName: string;
  if (history.action === 'POP') {
    animateClassName = animation?.exit || DEFAULT_ANIMATION_MAP.POP;
  } else {
    animateClassName = animation?.enter || DEFAULT_ANIMATION_MAP.PUSH;
  }
  console.log(animateClassName);

  if (path === '/') {
    return <Redirect to="/home" />;
  }
  return (
    <ApolloProvider client={client}>
      <TransitionGroup>
        <CSSTransition
          timeout={500}
          classNames="forward"
          key={path}
          childFactory={(child: ChildComponent) =>
            React.cloneElement(child, { classNames: animateClassName })
          }
        >
          <div className="layout" ref={nodeRef}>
            {children}
          </div>
        </CSSTransition>
      </TransitionGroup>
      {isShowBottomNav ? <BottomNav /> : null}
    </ApolloProvider>
  );
};

export default Layout;

interface LayoutProps {
  children: React.ReactNode;
  route: IRoute;
}

type ChildComponent = React.FunctionComponentElement<{ classNames: any }>;

interface DefaultAnimationMap {
  [k: string]: string;
  PUSH: 'forward';
  POP: 'back';
}
