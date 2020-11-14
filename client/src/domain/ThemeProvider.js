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
        console.log("change Theme");
        return {
          ...state,
          paletteType: action.payload,
        };
      default:
        throw new Error();
    }
  }, themeInitialOptions);

  const memoizedTheme = React.useMemo(() => {
    return createMuiTheme({
      ...theme,
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
  console.log("useChangeTheme");
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
