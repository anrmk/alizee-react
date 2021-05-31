import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory as history } from "history";
import { CssBaseline } from "@material-ui/core";

import LinearDeterminate from "./components/LinearDeterminate";
import ThemeProvider from "./domain/ThemeProvider";
import ViewportProvider from "./domain/ViewportProvider/ViewportProvider";
import DialogProvider from "./domain/DialogProvider";
import { SnackbarProvider } from "notistack";

import Main from "./pages/Main";

import theme from "./constants/theme";

function App() {
  return (
    <Suspense fallback={<LinearDeterminate />}>
      <ViewportProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <CssBaseline />
            <Router history={history}>
              <DialogProvider>
                <Main />
              </DialogProvider>
            </Router>
          </SnackbarProvider>
        </ThemeProvider>
      </ViewportProvider>
    </Suspense>
  );
}

export default App;
