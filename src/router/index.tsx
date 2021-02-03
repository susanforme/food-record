import { Redirect } from 'react-router-dom';
import Home from '../views/Home/Home';
// 只用types来提供类型声明
import { RouteConfig } from 'react-router-config';
import { lazy } from 'react';

// 懒加载优化
const Distance = lazy(() => import('../views/Distance/Distance'));
const Publish = lazy(() => import('../views/Publish/Publish'));
const Me = lazy(() => import('../views/Me/Me'));
const Login = lazy(() => import('../views/Login/Login'));
const Message = lazy(() => import('../views/Message/Message'));
const routes: RouteConfig[] = [
  {
    path: '/',
    // 精确匹配,有先后顺序,不然只能渲染空白
    exact: true,
    render: () => <Redirect to={'/home'} />,
  },
  {
    path: '/home',
    component: Home,
    title: '首页',
    args: {
      iconName: 'icon-home',
      isMenu: true,
    },
  },
  {
    path: '/distance',
    component: Distance,
    auth: true,
    title: '距离',
    args: {
      iconName: 'icon-home',
      isMenu: true,
    },
  },
  {
    path: '/publish',
    component: Publish,
    auth: true,
    title: '发表',
    args: {
      isMenu: true,
    },
  },
  {
    path: '/message',
    component: Message,
    title: '消息',
    args: {
      iconName: 'icon-home',
      isMenu: true,
    },
  },
  {
    path: '/me',
    component: Me,
    title: '我的',
    args: {
      iconName: 'icon-home',
      isMenu: true,
    },
  },
  {
    path: '/login',
    component: Login,
    title: '登录',
  },
];

export default routes;
