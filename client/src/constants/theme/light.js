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
      mainGradient: "linear-gradient(141.21deg, #68D794 -16.59%, #6FCBFF 40.28%, #B88AE1 90.77%)",
      secondaryGradient:
        "linear-gradient(141.21deg, rgba(136, 108, 169, 0.15) -16.6%, rgba(104, 215, 148, 0.15) -16.59%, rgba(111, 203, 255, 0.15) 40.28%, rgba(184, 138, 225, 0.15) 90.77%)",
    },

    common: {
      gray: "#E4E6E7",
    },

    divider: "rgba(26, 26, 26, 0.08)",
  },

  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#F5F7F8",
      },
    },

    MuiDrawer: {
      paper: {
        backgroundColor: "#F5F7F8",
      },
    },

    MuiCard: {
      root: {
        backgroundColor: "#FFFFFF", //"#2E2E3D"
      },
    },

    MuiButton: {
      root: {},

      text: {},

      outlinedPrimary: {
        borderRadius: "20px",
      },

      containedPrimary: {
        background: "linear-gradient(141.21deg, #68D794 -16.59%, #6FCBFF 40.28%, #B88AE1 90.77%)",
        backgroundColor: "#35B1F6",
        borderRadius: "20px",
        color: "white",
        "&:hover": {
          opacity: ".8",
        },
      },

      containedSecondary: {
        background:
          "linear-gradient(141.21deg, rgba(136, 108, 169, 0.15) -16.6%, rgba(104, 215, 148, 0.15) -16.59%, rgba(111, 203, 255, 0.15) 40.28%, rgba(184, 138, 225, 0.15) 90.77%)",
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
        padding: "8px",

        "&.primary": {
          background: "#35B1F6",
          color: "white",
        },

        "&.danger": {
          background: "#FE5F5F",
          color: "white",
        },

        "&.success" : {
          background: "#58CD86",
          color: "white",
        }
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
        borderRadius: "4px",
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
