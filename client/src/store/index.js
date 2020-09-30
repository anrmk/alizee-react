import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

let store = null;

// Add Redux devtools in development mode
if (process.env.NODE_ENV === 'development') {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  store = createStore(rootReducer, composeEnhancers(
      applyMiddleware(thunk)
  ));
} else {
  store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
}

export default store;