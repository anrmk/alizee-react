import React from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";

import { initTheme } from "../helpers/functions";
import ThemeDispatchContext, {
  CHANGE_THEME,
} from "../context/ThemeDispatchContext";

const ThemeProvider = ({ children, theme }) => {
  const themeInitialOptions = {
    paletteType: initTheme("light"),
  };

  const [themeOptions, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case CHANGE_THEME:
        return {
          ...state,
          paletteType: action.payload,
        };
      default:
        throw new Error();
    }
  }, themeInitialOptions);

  const memoizedTheme = React.useMemo(() => {
    if (theme) {
      return theme[themeOptions.paletteType];
    }

    return createTheme({
      palette: {
        type: themeOptions.paletteType,
      },
    });
  }, [theme, themeOptions.paletteType]);

  return (
    <MuiThemeProvider theme={memoizedTheme}>
      <ThemeDispatchContext.Provider value={dispatch}>
        {children}
      </ThemeDispatchContext.Provider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
