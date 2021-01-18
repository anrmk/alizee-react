import { useContext } from "react";
import { useTheme } from "@material-ui/core/styles";

import ViewportContext from "../context/ViewportContext"

export default function useViewport() {
  const theme = useTheme();
  const { width, height } = useContext(ViewportContext);

  const up = (breakpoint) => {
    return width > theme.breakpoints.values[breakpoint];
  }

  const down = (breakpoint) => {
    return width <= theme.breakpoints.values[breakpoint];
  }

  return { width, height, up, down };
}
