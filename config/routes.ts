import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        path: '/home',
        component: '@/pages/Home',
        title: '首页',
      },
      {
        path: '/ranging',
        component: '@/pages/Ranging',
        title: '测距',
      },
      {
        path: '/message',
        component: '@/pages/Message',
        title: '消息',
      },
      { path: '/me', component: '@/pages/Me', title: '我的' },
      {
        path: '/account',
        component: '@/pages/Account',
        routes: [
          {
            path: '/account/login',
            component: '@/pages/Account/Login',
            title: '登录',
          },
          {
            path: '/account/register',
            component: '@/pages/Account/Register',
            title: '注册',
          },
        ],
      },
      {
        path: '/publish',
        component: '@/pages/Publish',
        title: '发表',
        wrappers: ['@/wrappers/Auth'],
      },
      {
        path: '/about',
        component: '@/pages/Other/About',
        title: '关于我',
      },
      {
        path: '/food',
        component: '@/pages/Other/Food',
        title: '寻美食',
      },
      { path: '*', component: '@/pages/404', title: '页面走丢了' },
    ],
  },
];

export default routes;
