import { ImmerReducer, Subscription, Location, getDvaApp, Loading } from 'umi';
import { notification } from 'antd';
import effects, { Action } from './action';
import { HomeModelState } from '../home/home';
import { getHeadImg } from '@/utils';

export interface IndexModelState {
  isLogin: boolean;
  routeHistory: Location[];
  user: User;
  title: string;
}

export interface IndexModelType {
  namespace: 'index';
  state: IndexModelState;
  reducers: {
    UPDATE_ROUTE_HISTORY: ImmerReducer<IndexModelState>;
    UPDATE_AND_CLEAN_ROUTE_HISTORY: ImmerReducer<IndexModelState>;
    UPDATE_USER: ImmerReducer<IndexModelState>;
    FETCH_ERROR: ImmerReducer<IndexModelState>;
    CHANGE_TITLE: ImmerReducer<IndexModelState>;
    DELETE_USER: ImmerReducer<IndexModelState>;
    UPDATE_HEAD_IMG: ImmerReducer<IndexModelState>;
  };
  effects: Action;
  subscriptions: { setup: Subscription; title: Subscription };
}

const IndexModel: IndexModelType = {
  namespace: 'index',
  state: {
    isLogin: false,
    routeHistory: [],
    user: {
      location: '510700',
    },
    title: '食遇记',
  },
  reducers: {
    UPDATE_ROUTE_HISTORY(state, action) {
      state.routeHistory.push(action.payload);
    },
    // 防止数据过多卡顿
    UPDATE_AND_CLEAN_ROUTE_HISTORY(state, action) {
      state.routeHistory = [...state.routeHistory.slice(6), action.payload];
    },
    UPDATE_USER(state, { payload }) {
      state.isLogin = true;
      const user = payload;
      // 头像剪切处理
      user.headImg = getHeadImg(user.headImg);
      state.user = user;
      return notification.success({ message: '登录成功 😄', duration: 2.5 });
    },
    FETCH_ERROR(_, { payload }) {
      return notification.error({ message: payload, duration: 1.5 });
    },
    CHANGE_TITLE(state, { payload }) {
      state.title = payload;
    },
    DELETE_USER(state) {
      state.user = {
        location: '510700',
      };
      state.isLogin = false;
    },
    UPDATE_HEAD_IMG(state, { payload }) {
      state.user.headImg = payload + '/headImg';
    },
  },
  effects,
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location) => {
        // 防止dva未初始化发生bug
        if (!getDvaApp) {
          return dispatch({
            type: 'UPDATE_ROUTE_HISTORY',
            payload: location,
          });
        }
        const state: IndexModelState = getDvaApp()._store.getState().index;
        const type =
          state.routeHistory.length >= 10
            ? 'UPDATE_AND_CLEAN_ROUTE_HISTORY'
            : 'UPDATE_ROUTE_HISTORY';
        if (state.routeHistory[state.routeHistory.length - 1]?.pathname !== location.pathname) {
          dispatch({
            type,
            payload: location,
          });
        }
      });
    },
    title({ dispatch }) {
      const observer = new MutationObserver(() => {
        dispatch({
          type: 'CHANGE_TITLE',
          payload: document.title || '食遇记',
        });
      });
      window.onload = () => {
        const title = document.querySelector('title');
        const MutationObserverConfig = {
          childList: true,
          subtree: true,
          characterData: true,
        };
        observer.observe(title as HTMLTitleElement, MutationObserverConfig);
      };
      return () => observer.disconnect();
    },
  },
};

export default IndexModel;

export interface State {
  index: IndexModelState;
  home: HomeModelState;
  loading: Loading;
}

type User = {
  username?: string;
  id?: string;
  headImg?: string;
  createTime?: number;
  location?: string;
  email?: string;
};
