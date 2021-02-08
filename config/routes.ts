import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { exact: true, path: '/home', component: '@/pages/Home', title: '首页' },
      {
        exact: true,
        path: '/ranging',
        component: '@/pages/Ranging',
        title: '测距',
      },
      {
        exact: true,
        path: '/message',
        component: '@/pages/Message',
        title: '消息',
      },
      { exact: true, path: '/me', component: '@/pages/Me', title: '我的' },
      {
        exact: true,
        path: '/login',
        component: '@/pages/Login',
        title: '登录',
      },
      {
        exact: true,
        path: '/publish',
        component: '@/pages/Publish',
        title: '发表',
        wrappers: ['@/wrappers/Auth'],
      },
      {
        exact: true,
        path: '/about',
        component: '@/pages/About',
        title: '关于我',
      },
      { path: '*', component: '@/pages/404', title: '页面走丢了' },
    ],
  },
];

export default routes;
