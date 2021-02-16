import client from '@/api';
import { ARTICLE_API, TOOL_API } from '@/api/query';
import { Effect } from 'umi';

const effects: Action = {
  *getWeather({ payload }, { call, put }) {
    try {
      const result = yield call(client.query, {
        variables: { city: payload },
        query: TOOL_API.WEATHER,
      });
      yield put({ type: 'UPDATE_WEATHER', payload: result?.data?.weather });
    } catch (error) {
      yield put({ type: 'FETCH_ERROR', payload: error?.message });
    }
  },
  *getKind(action, { call, put }) {
    try {
      const result = yield call(client.query, {
        query: ARTICLE_API.KIND,
      });
      yield put({ type: 'UPDATE_KIND', payload: result?.data?.kind });
    } catch (error) {
      yield put({ type: 'FETCH_ERROR', payload: error?.message });
    }
  },
};
export default effects;

export interface Action {
  getWeather: Effect;
  getKind: Effect;
}
