import { ActionTypes } from './actionTypes';
import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from '.';

const initState = {
  isLogin: false,
};

const reducer = (state = initState, action: Action) => {
  const newState: State = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case ActionTypes.LOGIN: {
      // 还需要传递其他的如用户名
      newState.state.isLogin = action.data.isLogin;
      break;
    }
  }
  return newState;
};

export interface State {
  state: {
    isLogin: boolean;
    user: {
      id: string;
      username: string;
      headImg: string;
    };
  };
  router: RouterState;
}

interface Action {
  type: ActionTypes;
  data: any;
}

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    state: reducer,
  });
