import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@/api';
import './index.css';
import BottomNav from '@/components/BottomNav';
import { history, Redirect } from 'umi';
import { bottomNavMap } from '@/utils';

document.documentElement.style.fontSize = document.documentElement.clientWidth / 20 + 'px';

const Layout: React.FC<LayoutProps> = (props) => {
  const path = history.location.pathname;
  const isShowBottomNav = !!bottomNavMap.find((v) => v.path === path);
  // 可根据不同的路径来加头部
  if (path === '/') {
    return <Redirect to="/home" />;
  }
  return (
    <ApolloProvider client={client}>
      <div className="layout">{props.children}</div>
      {isShowBottomNav ? <BottomNav /> : null}
    </ApolloProvider>
  );
};

export default Layout;

interface LayoutProps {
  children: React.ReactNode;
}
