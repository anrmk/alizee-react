import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/index.scss';

import { StateProvider } from "./components/StateProvider";
import reducer, { initialState } from "./components/reducer";

import App from './App';

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>, 
  document.getElementById('app-root')
);