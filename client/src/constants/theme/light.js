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

      outlined: {},

      contained: {
        "&.primary": {
          background: "linear-gradient(89.86deg, #77306C -2.12%, #2B30B1 201.58%)",
          backgroundColor: "#77306C",
          color: "white",
          opacity: ".8",
          "&:hover": {
            opacity: "1",
          },
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
      background: "#1C1A1A",
    },
  },
});
