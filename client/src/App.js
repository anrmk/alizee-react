import React, { Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory as history } from "history";
import { CssBaseline } from "@material-ui/core";

import LinearDeterminate from "./components/LinearDeterminate";
import HubComponent from "./domain/Hub/NotificationHub";
import ThemeProvider from "./domain/ThemeProvider";
import ViewportProvider from "./domain/ViewportProvider/ViewportProvider";

import Main from "./pages/Main";

import theme from "./constants/theme";

function App() {
  return (
    <Suspense fallback={<LinearDeterminate />}>
      <HubComponent>
        <ViewportProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router history={history}>
              <Route path="/" component={Main} />
            </Router>
          </ThemeProvider>
        </ViewportProvider>
      </HubComponent>
    </Suspense>
  );
}

export default App;
