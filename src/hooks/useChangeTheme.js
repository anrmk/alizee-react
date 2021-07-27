import { useContext, useCallback } from "react";
import { useTheme } from "@material-ui/core/styles";

import ThemeDispatchContext, { CHANGE_THEME } from "../context/ThemeDispatchContext";
import { initTheme } from "../helpers/functions";

export default function useChangeTheme(ignoreStorage) {
  const dispatch = useContext(ThemeDispatchContext);
  const theme = useTheme();
  const currentTheme = theme.palette.type === "light" ? "dark" : "light";

  const changeTheme = useCallback((newTheme) => {
    dispatch({
      type: CHANGE_THEME,
      payload: newTheme ?? currentTheme,
    });
    !ignoreStorage && localStorage.setItem("CURRENT_THEME", currentTheme);
  }, [theme.palette.type, dispatch]);

  const setupTheme = useCallback(() => {
    const localStorageValue = initTheme();
    dispatch({
      type: CHANGE_THEME,
      payload: localStorageValue,
    });
  }, [theme.palette.type, dispatch]);

  return {
    currentTheme: theme.palette.type,
    toggle: changeTheme,
    setupTheme
  }
};
