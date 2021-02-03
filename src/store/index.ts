import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import createRootReducer from './reducer';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const store = createStore(
  createRootReducer(history),
  compose(applyMiddleware(routerMiddleware(history), thunk)),
);

export default store;

export type History = typeof history;
