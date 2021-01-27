import { ActionTypes } from './actionTypes';

const initState: State = {
  isLogin: false,
  user: {
    id: '',
    username: '',
    headImg: '',
  },
};

export default (state = initState, action: Action) => {
  const newState: State = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case ActionTypes.LOGIN: {
      // 还需要传递其他的如用户名
      newState.isLogin = action.data.isLogin;
      break;
    }
  }
  return newState;
};

interface State {
  isLogin: boolean;
  user: {
    id: string;
    username: string;
    headImg: string;
  };
}

interface Action {
  type: ActionTypes;
  data: any;
}
