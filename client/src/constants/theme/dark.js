import { createMuiTheme } from "@material-ui/core";
import defaultTheme from "./default";

export default createMuiTheme({
  ...defaultTheme, 
  palette: {
    type: "dark",
    primary: {
      main: "#845DD7",
    },

    secondary: {
      main: "#8A2260",
    },

    success: {
      main: "#3CFDB7",
    },

    warning: {
      main: "#FEDB5F",
    },

    danger: {
      main: "#FE5F5F",
    },

    background: {
      default: "#1F2128",
      paper: "#242731"
    },

    divider:  "rgba(255, 255, 255, 0.08)"
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

        "&.gold": {
          background: "linear-gradient(89.86deg, #FEDB5F -2.12%, #2B30B1 201.58%)",
          backgroundColor: "#FEDB5F",
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
        "&.success": {
          color: "#3CFDB7",
        },
        "&.warning": {
          color: "#FEDB5F",
        },
        "&.danger": {
          color: "#FE5F5F",
        },
      },
    },

    MuiSvgIcon: {
      root: {},

      fontSizeLarge: {
        fontSize: "8rem",
      },
    },
  },

  MuiBottomNavigationAction: {
    root: {
      "&.success": {
        color: "#3CFDB7",
        backgroundColor: "red"
      },
      "&.warning": {
        color: "#FEDB5F",
      },
      "&.danger": {
        color: "#FE5F5F",
      },
    },
    "& .success": {
      color: "#3CFDB7",
    },
  },

  MuiTypography: {
    caption: {
      opacity: "0.6",
    },
  },

});
