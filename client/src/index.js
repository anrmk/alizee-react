import React from "react";
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './assets/scss/index.scss';

import App from './App';
import store from './store';
import ApiClient from './services/api';
import ApiContext from './context/ApiContext';

const clientApi = new ApiClient();

ReactDOM.render(
  <Provider store={store}>
    <ApiContext.Provider value={clientApi}>
      <App />
    </ApiContext.Provider>
  </Provider>,
  document.getElementById('root')
);