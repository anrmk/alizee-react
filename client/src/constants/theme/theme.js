import lightTheme from "./light";
import darkTheme from "./dark";

import { responsiveFontSizes } from "@material-ui/core";

export default {
  light: responsiveFontSizes(lightTheme),
  dark: responsiveFontSizes(darkTheme),
};
