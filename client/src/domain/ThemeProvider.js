import React from "react";
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

import { initTheme } from "../helpers/functions";

const ThemeDispatchContext = React.createContext(null);

const ThemeProvider = ({ children, theme }) => {
  const themeInitialOptions = {
    paletteType: initTheme("light"),
  };

  const [themeOptions, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case "changeTheme":
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

    return createMuiTheme({
      palette: {
        type: themeOptions.paletteType,
      },
    });
  }, [theme, themeOptions.paletteType]);

  return (
    <MuiThemeProvider theme={memoizedTheme}>
      <ThemeDispatchContext.Provider value={dispatch}>{children}</ThemeDispatchContext.Provider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;

export const useChangeTheme = () => {
  const dispatch = React.useContext(ThemeDispatchContext);
  const theme = useTheme();
  const currentTheme = theme.palette.type === "light" ? "dark" : "light";
  const changeTheme = React.useCallback(() => {
    dispatch({
      type: "changeTheme",
      payload: currentTheme,
    });
    localStorage.setItem("CURRENT_THEME", currentTheme);
  }, [theme.palette.type, dispatch]);

  return changeTheme;
};
