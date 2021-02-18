import { ImmerReducer, Subscription, Location, getDvaApp, Loading } from 'umi';
import { notification } from 'antd';
import effects, { Action } from './action';
import { HomeModelState } from '../home/home';

export interface IndexModelState {
  isLogin: boolean;
  routeHistory: Location[];
  user: User;
}

export interface IndexModelType {
  namespace: 'index';
  state: IndexModelState;
  reducers: {
    UPDATE_ROUTE_HISTORY: ImmerReducer<IndexModelState>;
    UPDATE_AND_CLEAN_ROUTE_HISTORY: ImmerReducer<IndexModelState>;
    UPDATE_USER: ImmerReducer<IndexModelState>;
    FETCH_ERROR: ImmerReducer<IndexModelState>;
  };
  effects: Action;
  subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
  namespace: 'index',
  state: {
    isLogin: false,
    routeHistory: [],
    user: {
      location: '510700',
    },
  },
  reducers: {
    UPDATE_ROUTE_HISTORY(state, action) {
      state.routeHistory.push(action.payload);
    },
    // 防止数据过多卡顿
    UPDATE_AND_CLEAN_ROUTE_HISTORY(state, action) {
      state.routeHistory = [...state.routeHistory.slice(6), action.payload];
    },
    UPDATE_USER(state, action) {
      state.isLogin = true;
      state.user = { ...state.user, ...action.payload };
      return notification.success({ message: '登录成功', duration: 2.5 });
    },
    FETCH_ERROR(state, { payload }) {
      return notification.error({ message: payload, duration: 1.5 });
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
