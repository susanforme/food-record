import { ImmerReducer, Subscription } from 'umi';

export interface IndexModelState {
  isLogin: boolean;
  pathname: string;
}

export interface IndexModelType {
  namespace: 'index';
  state: IndexModelState;
  reducers: {
    LOGIN: ImmerReducer<IndexModelState>;
    UPDATE_PATHNAME: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
  namespace: 'index',
  state: {
    isLogin: false,
    pathname: '/',
  },
  reducers: {
    LOGIN(state, action) {
      state.isLogin = action.payload;
    },
    UPDATE_PATHNAME(state, action) {
      state.pathname = action.payload;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        dispatch({
          type: 'UPDATE_PATHNAME',
          payload: pathname,
        });
      });
    },
  },
};

export default IndexModel;

export interface State {
  index: IndexModelState;
}
