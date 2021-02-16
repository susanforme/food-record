import { ImmerReducer } from 'umi';
import { notification } from 'antd';
import effects, { Action } from './action';

export interface HomeModelState {
  weather: {
    temperature?: string;
    weather?: string;
    city?: string;
  };
  kind: {
    kindName?: string;
    id?: string;
  }[];
}

export interface HomeModelType {
  namespace: 'home';
  state: HomeModelState;
  reducers: {
    FETCH_ERROR: ImmerReducer<HomeModelState>;
    UPDATE_WEATHER: ImmerReducer<HomeModelState>;
    UPDATE_KIND: ImmerReducer<HomeModelState>;
  };
  effects: Action;
}

const HomeModel: HomeModelType = {
  namespace: 'home',
  state: {
    weather: {},
    kind: [{}],
  },
  reducers: {
    FETCH_ERROR(state, { payload }) {
      return notification.error({ message: payload, duration: 1.5 });
    },
    UPDATE_WEATHER(state, { payload }) {
      state.weather = payload;
    },
    UPDATE_KIND(state, { payload }) {
      state.kind = payload;
    },
  },
  effects,
};

export default HomeModel;
