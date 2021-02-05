import { State, useStore } from 'umi';

export function useAuth() {
  const state = useStore<State>().getState();

  return {
    isLogin: state.index.isLogin,
  };
}
