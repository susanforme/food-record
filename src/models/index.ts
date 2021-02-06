import { ImmerReducer, Subscription, Location, getDvaApp } from 'umi';

export interface IndexModelState {
  isLogin: boolean;
  routeHistory: Location[];
}

export interface IndexModelType {
  namespace: 'index';
  state: IndexModelState;
  reducers: {
    LOGIN: ImmerReducer<IndexModelState>;
    UPDATE_ROUTE_HISTORY: ImmerReducer<IndexModelState>;
    UPDATE_AND_CLEAN_ROUTE_HISTORY: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
  namespace: 'index',
  state: {
    isLogin: false,
    routeHistory: [],
  },
  reducers: {
    LOGIN(state, action) {
      state.isLogin = action.payload;
    },
    UPDATE_ROUTE_HISTORY(state, action) {
      state.routeHistory.push(action.payload);
    },
    // 防止数据过多卡顿
    UPDATE_AND_CLEAN_ROUTE_HISTORY(state, action) {
      state.routeHistory = [...state.routeHistory.slice(6), action.payload];
    },
  },
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
        console.log(state);
        if (
          state.routeHistory[state.routeHistory.length - 1]?.pathname !==
          location.pathname
        ) {
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
}
