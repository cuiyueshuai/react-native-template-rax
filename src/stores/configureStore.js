/**
 *
 * Copyright 2016-08-29 pdms
 * configureStore
 * @author gyli<gyli@amarsoft.com>
 *
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { createLogger } from 'redux-logger';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
