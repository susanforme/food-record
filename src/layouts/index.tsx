import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@/api';
import './index.css';

const Layout: React.FC<LayoutProps> = (props) => {
  // 可根据不同的路径来加头部
  return (
    <ApolloProvider client={client}>
      <div className="layout">{props.children}</div>
    </ApolloProvider>
  );
};

export default Layout;

interface LayoutProps {
  children: React.ReactNode;
}
