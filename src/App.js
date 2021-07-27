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
            <CssBaseline />
            <Router history={history}>
              <SnackbarProvider maxSnack={3}>
                <DialogProvider>
                  <Main />
                </DialogProvider>
              </SnackbarProvider>
            </Router>
        </ThemeProvider>
      </ViewportProvider>
    </Suspense>
  );
}

export default App;
