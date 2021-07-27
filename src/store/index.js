import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducers';

let store = null;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['signIn']
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Add Redux devtools in development mode
if (process.env.NODE_ENV === 'development') {
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  store = createStore(persistedReducer, composeEnhancers(
      applyMiddleware(thunk)
  ));
} else {
  store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
  );
}

const persistor = persistStore(store);

export { store, persistor };