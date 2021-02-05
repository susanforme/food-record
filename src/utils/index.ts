/**
 * @description
 * 获取是否为子路由,或者就是当前路由
 */
export const getIsChildRoute = (father: string, child: string) => {
  return child === father || (child.includes(father) && child.replace(father, '').startsWith('/'));
};

// 需要显示底部导航栏的页面
export const bottomNavMap = [
  {
    path: '/home',
    title: '首页',
  },
  {
    path: '/ranging',
    title: '测距',
  },
  {
    path: '/publish',
    title: '',
  },
  {
    path: '/message',
    title: '消息',
  },
  {
    path: '/me',
    title: '我的',
  },
];
