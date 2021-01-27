import { Redirect } from 'react-router-dom';
import Home from '../views/Home/Home';
import { RouteConfig } from 'react-router-config';
import { lazy } from 'react';

// 懒加载优化
const Distance = lazy(() => import('../views/Distance/Distance'));
const Publish = lazy(() => import('../views/Publish/Publish'));
const Me = lazy(() => import('../views/Me/Me'));
const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to={'/page1'} />,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/distance',
    component: Distance,
  },
  {
    path: '/publish',
    render: () => {
      // 添加权限验证
      return Publish;
    },
  },
  {
    path: '/me',
    component: Me,
  },
];

export default routes;
