import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
// import "typeface-roboto";

import App from "./App";
import { store, persistor } from "./store";
import ApiClient from "./services/api";
import ApiContext from "./context/ApiContext";
import "./i18n";

const clientApi = new ApiClient();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApiContext.Provider value={clientApi}>
        <App />
      </ApiContext.Provider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
