import { createMuiTheme } from "@material-ui/core";
import ThemeDispatchContext from "../../context/ThemeDispatchContext";

import defaultTheme from "./default";

export default createMuiTheme({
  ...defaultTheme,

  palette: {
    type: "dark",

    action: {
      main: "#FEDB5F" 
    },

    primary: {
      main: "#35B1F6" //"#845DD7",
    },

    secondary: {
      main: "#845DD7" //"#8A2260",
    },

    success: {
      main: "#58CD86",//"#18AA7E"
      contrast: "#44b700"
    },

    warning: {
      main: "#FEDB5F",
    },

    danger: {
      main: "#FE5F5F",
    },

    background: {
      default: "#1F2128",
      paper: "#242731",
      mainGradient: "linear-gradient(141.21deg, #36704d -16.59%, #356078 40.28%, #70538a 90.77%)",
      secondGradient: "linear-gradient(141.21deg, rgba(136, 108, 169, 0.15) -16.6%, rgba(104, 215, 148, 0.15) -16.59%, rgba(111, 203, 255, 0.15) 40.28%, rgba(184, 138, 225, 0.15) 90.77%)"
    },
    
    common: {
      gray: "#E4E6E7"
    },

    divider: "rgba(255, 255, 255, 0.08)",
  },

  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#1F2128",
      },
    },

    MuiDrawer: {
      paper: {
        backgroundColor: "#1F2128",
      },
    },

    MuiCard: {
      root: {
        backgroundColor: "#242731", //"#2E2E3D"
      },
    },

    MuiOutlinedInput: {
      input: {
        "&::-webkit-calendar-picker-indicator": {
          filter: "invert(1)",
        },
        "&:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px #343846 inset",
          WebkitTextFillColor: "#FFF",
        },
      },
    },

    MuiButton: {
      root: {},

      text: {},

      outlinedPrimary: {
        borderRadius: "20px",
      },

      containedPrimary: {
        background: "linear-gradient(141.21deg, #36704d -16.59%, #356078 40.28%, #70538a 90.77%)",
        backgroundColor: "#35B1F6",
        color: "white",
        borderRadius: "20px",
        "&:hover": {
          opacity: ".8",
        },
      },

      containedSecondary: {
        background: "linear-gradient(141.21deg, rgba(136, 108, 169, 0.15) -16.6%, rgba(104, 215, 148, 0.15) -16.59%, rgba(111, 203, 255, 0.15) 40.28%, rgba(184, 138, 225, 0.15) 90.77%)",
        backgroundColor: "transparent",
        color: "#845DD7",
        borderRadius: "20px",
        "&:hover": {
          opacity: ".8",
          backgroundColor: "transparent",
        },
      },
    },

    MuiIconButton: {
      root: {
        padding: "8px"
      },
    },

    MuiSvgIcon: {
      root: {},

      colorAction: {
        color: "#FEDB5F",
      },

      // fontSizeLarge: {
      //   fontSize: "8rem",
      // },
    },

    MuiBottomNavigation: {
      root: {
        borderRadius: "4px"
      }
    }
  },

  MuiBottomNavigationAction: {
   
  },

  MuiTypography: {
    caption: {
      opacity: "0.6",
    },
  },

  MuiDivider: {
    root: {
      background: "#1C1A1A"
    }
  }
});
