export const test = 'test';

/**
 * @description
 * 获取是否为子路由,或者就是当前路由
 */
export const getIsChildRoute = (father: string, child: string) => {
  return child === father || (child.includes(father) && child.replace(father, '').startsWith('/'));
};
