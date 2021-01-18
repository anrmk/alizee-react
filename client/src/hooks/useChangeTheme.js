import { useContext, useCallback } from "react";
import { useTheme } from "@material-ui/core/styles";

import ThemeDispatchContext from "../context/ThemeDispatchContext";

export default function useChangeTheme() {
  const dispatch = useContext(ThemeDispatchContext);
  const theme = useTheme();
  const currentTheme = theme.palette.type === "light" ? "dark" : "light";
  const changeTheme = useCallback(() => {
    dispatch({
      type: "changeTheme",
      payload: currentTheme,
    });
    localStorage.setItem("CURRENT_THEME", currentTheme);
  }, [theme.palette.type, dispatch]);

  return changeTheme;
};
