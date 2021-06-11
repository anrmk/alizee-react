import { createMuiTheme } from "@material-ui/core";
import ThemeDispatchContext from "../../context/ThemeDispatchContext";

import defaultTheme from "./default";

export default createMuiTheme({
  ...defaultTheme,

  palette: {
    type: "dark",

    action: {
      main: "#FEDB5F",
    },

    primary: {
      main: "#35B1F6", //"#845DD7",
    },

    secondary: {
      main: "#845DD7", //"#8A2260",
    },

    success: {
      main: "#58CD86", //"#18AA7E"
      contrast: "#44b700",
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
      secondGradient:
        "linear-gradient(141.21deg, rgba(136, 108, 169, 0.15) -16.6%, rgba(104, 215, 148, 0.15) -16.59%, rgba(111, 203, 255, 0.15) 40.28%, rgba(184, 138, 225, 0.15) 90.77%)",
    },

    common: {
      gray: "#E4E6E7",
    },

    divider: "rgba(255, 255, 255, 0.08)",
  },

  overrides: {
    MuiContainer: {
      maxWidthXl: {
        maxWidth: "1600px !important",
      },
    },

    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#1F2128",
        color: "#fff",
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

        "&.noborder": {
          
        }
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

    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0.85)",
      },
    },

    MuiPaper: {
      elevation1: {
        boxShadow: "none"
      }
    },

    MuiButton: {
      root: {},

      text: {},

      outlinedPrimary : {
        borderRadius: "20px",
      },

      outlinedSecondary : {
        borderRadius: "20px",
      },

      containedPrimary: {
        color: "white"
        // background: "linear-gradient(141.21deg, #36704d -16.59%, #356078 40.28%, #70538a 90.77%)",
        // backgroundColor: "#35B1F6",
        // color: "white",
        // borderRadius: "20px",
        // "&:hover": {
        //   opacity: ".8",
        // },
      },

      containedSecondary: {
        color: "white",
        background:
          "linear-gradient(141.21deg, rgba(136, 108, 169, 0.15) -16.6%, rgba(104, 215, 148, 0.15) -16.59%, rgba(111, 203, 255, 0.15) 40.28%, rgba(184, 138, 225, 0.15) 90.77%)",
        backgroundColor: "transparent",
        color: "#845DD7",
        borderRadius: "20px",
        boxShadow: "none",
        "&:hover": {
          opacity: ".8",
          backgroundColor: "transparent",
        },
      },
    },

    MuiIconButton: {
      root: {
        padding: "8px",

        "&.primary": {
          background: "#35B1F6",
          color: "white",

          "&.transparent": {
            background: "rgb(53 177 246 / 80%)",
          },
        },

        "&.danger": {
          background: "#FE5F5F",
          color: "white",

          "&.transparent": {
            background: "rgb(254 95 95 / 80%)",
          },
        },

        "&.success": {
          background: "#58CD86",
          color: "white",

          "&.transparent": {
            background: "rgb(88 205 134 / 80%)",
          },
        },
      },
    },

    MuiSvgIcon: {
      root: {},

      colorAction: {
        color: "#FEDB5F",
      },
    },

    MuiBottomNavigation: {
      root: {
        borderRadius: "4px",
      },
    },

    MuiBottomNavigationAction: {
      root: {
        minWidth: "60px",
      },
    },

    MuiListItem: {
      root: {
        borderRadius: "4px",
        "&$selected": {
          backgroundColor: "#35B1F616",
        },
      },

      secondaryAction: {
        paddingRight: "96px",
      },
    },
  },

  MuiBottomNavigationAction: {},

  MuiTypography: {
    caption: {
      opacity: "0.6",
    },
  },

  MuiDivider: {
    root: {
      background: "#1C1A1A",
    },
  },
});
