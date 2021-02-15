import { ImmerReducer } from 'umi';
import { notification } from 'antd';
import effects, { Action } from './action';

export interface HomeModelState {
  weather: {
    temperature?: string;
    weather?: string;
    city?: string;
  };
}

export interface HomeModelType {
  namespace: 'home';
  state: HomeModelState;
  reducers: {
    FETCH_ERROR: ImmerReducer<HomeModelState>;
    UPDATE_WEATHER: ImmerReducer<HomeModelState>;
  };
  effects: Action;
}

const HomeModel: HomeModelType = {
  namespace: 'home',
  state: {
    weather: {},
  },
  reducers: {
    FETCH_ERROR(state, { payload }) {
      return notification.error({ message: payload, duration: 1.5 });
    },
    UPDATE_WEATHER(state, { payload }) {
      state.weather = payload;
    },
  },
  effects,
};

export default HomeModel;
