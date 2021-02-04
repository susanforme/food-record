import { Redirect } from 'react-router-dom';
import { lazy } from 'react';
import Layout from '@/container/Layout';

// 懒加载优化
const Publish = lazy(() => import('../views/Publish/Publish'));
const Login = lazy(() => import('../views/Login/Login'));
const routes = [
  {
    path: '/',
    // 精确匹配,有先后顺序,不然只能渲染空白
    exact: true,
    render: () => <Redirect to={'/home'} />,
  },
  {
    path: '/home',
    component: Layout,
    title: '首页',
    args: {
      iconName: 'icon-home',
      isMenu: true,
    },
  },
  {
    path: '/distance',
    component: Layout,
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
    component: Layout,
    title: '消息',
    args: {
      iconName: 'icon-home',
      isMenu: true,
    },
  },
  {
    path: '/me',
    component: Layout,
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
