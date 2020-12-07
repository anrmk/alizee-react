import {makeStyles,  createMuiTheme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import blueGrey from "@material-ui/core/colors/blueGrey";
import pink from "@material-ui/core/colors/pink";
import ThemeProvider from "../../domain/ThemeProvider";

export default createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#845DD7"
    },

    secondary: {
      main: "#8A2260"
    },

    success: {
      main: "#3CFDB7"
    },

    warning: {
      main: "#FEDB5F"
    },

    danger: {
      main: "#FE5F5F"
    },

    background: {
      default: "#1F2128",
      paper: "#242731",
    },
  },

  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#1F2128",

      }
    },

    MuiDrawer: {
      paper: {
        backgroundColor: "#1F2128"
      }
    },

    MuiCard: {
      root: {
        backgroundColor: "#242731" //"#2E2E3D"
      }
    },

    MuiButton: {
      text: {
        
      },
      // contained: {
      //   background: "linear-gradient(89.86deg, rgba(119, 48, 108) -2.12%, rgba(43, 48, 177) 201.58%)",
      //   color: "white",
      //   opacity: ".8",
      //   borderRadius: "10px",
      //   "&:hover": {
      //     opacity: "1"
      //   }
      // },
      outlined: {

      }
    },

    MuiBottomNavigationAction: {
      root: {
        "&.success": {
          color: "#3CFDB7"
        },
        "&.warning": {
          color: "#FEDB5F"
        },
        "&.danger": {
          color: "#FE5F5F"
        },
      }
    },

    
    
  },
});
