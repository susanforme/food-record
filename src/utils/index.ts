/**
 * @description
 * 获取是否为子路由,或者就是当前路由
 */
export const getIsChildRoute = (father: string, child: string) => {
  return (
    child === father ||
    (child.includes(father) && child.replace(father, '').startsWith('/'))
  );
};

// 需要显示底部导航栏的页面
export const bottomNavMap = [
  {
    path: '/home',
    title: '首页',
    icon: 'icon-home',
  },
  {
    path: '/ranging',
    title: '测距',
    icon: 'icon-feiji',
  },
  {
    path: '/publish',
    title: '发表',
    icon: '',
  },
  {
    path: '/message',
    title: '消息',
    icon: 'icon-message',
  },
  {
    path: '/me',
    title: '我的',
    icon: 'icon-user',
  },
];

/**
 * @description
 * 防抖
 * @param delay 毫秒
 */
export const debounceFactory = (delay: number) => {
  let pre = Date.now();
  return (callback: Function) => {
    const now = Date.now();
    if (now - pre > delay) {
      pre = now;
      callback && callback();
    }
  };
};
