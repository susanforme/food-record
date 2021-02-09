import client from '@/api';
import { USER_API } from '@/api/query';
import { Effect } from 'umi';

const effects: Action = {
  *login({ payload }, { call, put }) {
    try {
      const result = yield call(client.mutate, {
        variables: { data: payload },
        mutation: USER_API.LOGIN,
      });
      yield put({ type: 'UPDATE_USER', payload: result?.data?.login });
    } catch (error) {
      yield put({ type: 'FETCH_ERROR', payload: error?.message });
    }
  },
};
export default effects;

export interface Action {
  login: Effect;
}
