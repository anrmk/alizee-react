import { createMuiTheme } from "@material-ui/core";

import defaultTheme from "./default";

export default createMuiTheme({
  ...defaultTheme,

  palette: {
    type: "light",

    primary: {
      main: "#35B1F6",
    },

    secondary: {
      main: "#845DD7",
    },

    success: {
      main: "#58CD86",
      contrast: "#44b700",
    },

    warning: {
      main: "#FFC700",
    },

    danger: {
      main: "#FE5F5F",
    },

    background: {
      default: "#F5F7F8",
      paper: "#F0F2F6",
      mainGradient:
        "linear-gradient(141.21deg, #68D794 -16.59%, #6FCBFF 40.28%, #B88AE1 90.77%)",
      secondaryGradient:
        "linear-gradient(141.21deg, rgba(136, 108, 169, 0.15) -16.6%, rgba(104, 215, 148, 0.15) -16.59%, rgba(111, 203, 255, 0.15) 40.28%, rgba(184, 138, 225, 0.15) 90.77%)",
    },

    common: {
      gray: "#E4E6E7",
    },

    divider: "rgba(26, 26, 26, 0.08)",
  },

  overrides: {
    MuiContainer: {
      maxWidthXl: {
        maxWidth: "1600px !important",
      },
    },

    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#F5F7F8",
        color: "rgba(0, 0, 0, 0.87)",
      },
    },

    MuiDrawer: {
      paper: {
        backgroundColor: "#F5F7F8",
      },
    },

    MuiCard: {
      root: {
        backgroundColor: "#FFFFFF", // "#2E2E3D"
      },
    },

    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0.85)",
      },
    },

    MuiPaper: {
      elevation1: {
        boxShadow: "none",
      },
    },

    MuiButton: {
      root: {},

      outlinedPrimary: {
        borderRadius: "20px",
      },

      outlinedSecondary: {
        borderRadius: "20px",
      },

      containedPrimary: {
        color: "white",
        // background: "linear-gradient(141.21deg, #68D794 -16.59%, #6FCBFF 40.28%, #B88AE1 90.77%)",
        // backgroundColor: "#35B1F6",
        // borderRadius: "20px",
        // color: "white",
        // "&:hover": {
        //   opacity: ".8",
        // },
      },

      containedSecondary: {
        color: "white",
        // background:
        //   "linear-gradient(141.21deg, rgba(136, 108, 169, 0.15) -16.6%, rgba(104, 215, 148, 0.15) -16.59%, rgba(111, 203, 255, 0.15) 40.28%, rgba(184, 138, 225, 0.15) 90.77%)",
        // backgroundColor: "transparent",
        // color: "#845DD7",
        // borderRadius: "20px",
        // boxShadow: "none",
        // "&:hover": {
        //   opacity: ".8",
        //   backgroundColor: "transparent",
        // },
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
        backgroundColor: "none",
      },
    },

    MuiBottomNavigationAction: {
      root: {
        minWidth: "60px",
      },
    },

    MuiListItem: {
      root: {
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
