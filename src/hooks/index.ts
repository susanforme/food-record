import { useMemo } from 'react';
import { State, useStore } from 'umi';

export function useAuth() {
  const state = useStore<State>().getState();

  return {
    isLogin: state.index.isLogin,
  };
}

/**
 * @param handler callback
 * @param args callback参数
 */
export function useComputed(handler: Function, ...args: any[]) {
  return useMemo(() => handler(...args), [handler, args]);
}
