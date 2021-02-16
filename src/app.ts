import { createLogger } from 'redux-logger';
import { message } from 'antd';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Reducer, Action } from 'redux';
import { PersistPartial } from 'redux-persist/es/persistReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['home'],
};

const persistEnhancer = () => (
  createStore: (arg0: Reducer<PersistPartial, Action<any>>, arg1: any, arg2: any) => any,
) => (reducer: Reducer<unknown, Action<any>>, initialState: any, enhancer: any) => {
  const store = createStore(persistReducer(persistConfig, reducer), initialState, enhancer);
  const persist = persistStore(store, null);

  return {
    persist,
    ...store,
  };
};

const config =
  process.env.NODE_ENV === 'development'
    ? {
        onAction: createLogger(),
        onError(e: Error) {
          message.error(e.message, 3);
        },
        extraEnhancers: [persistEnhancer()],
      }
    : {
        onError(e: Error) {
          message.error(e.message, 3);
        },
        extraEnhancers: [persistEnhancer()],
      };

export const dva = {
  config,
};
