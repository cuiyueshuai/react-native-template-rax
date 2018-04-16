
import { createStore, applyMiddleware } from 'redux';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { createLogger } from 'redux-logger';

const middleware = createReactNavigationReduxMiddleware(
  "app",
  state => state.navReducer,
);

const middlewares = [thunk, middleware];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
