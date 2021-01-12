import { fade, makeStyles } from "@material-ui/core/styles";

const drawerWidth = 260;

const useStyles = (open) => makeStyles((theme) => ({
    root: {
      boxShadow: "none",
      width: "100%",
      
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),

      "&.bottom": {
        top: "auto",
        bottom: 0,
        borderTopWidth: "1px",
        borderTopColor: theme.palette.divider,
        borderTopStyle: "solid",
      },

      [theme.breakpoints.up("md")]: {
        width: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${theme.spacing(7)}px)`,
      }
    },

    logo: {
      background: "url('/logo1.png') no-repeat",
      backgroundSize: "cover",
      backgroundPositionY: theme.palette.type === "dark" ? "-29px" : "0",
      height: "29px",
      minWidth: "103px",
      marginRight: theme.spacing(1)
    },

    // menuButton: {
    //   marginRight: theme.spacing(2),
    // },

    toolbar: {
      padding: theme.spacing(0),
      justifyContent: "space-between",
    },

    grow: {
      flexGrow: 1,
    },

    // title: {
    //   display: "none",
    //   color: fade(theme.palette.common.black, 0.5),
    //   [theme.breakpoints.up("sm")]: {
    //     display: "block",
    //   },
    // },

    search: {
      position: "relative",
      borderRadius: "24px",
      borderWidth: "1px",
      borderColor: theme.palette.divider,
      borderStyle: "solid",
      backgroundColor: fade(theme.palette.common.black, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.black, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "auto",
      //display: "none",
      // [theme.breakpoints.up("sm")]: {
      //   display: "flex",
      //   width: "auto",
      // },
    },

    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
    },
    controls: {
      display: "flex",
      flexWrap: "nowrap",
    },

    hide: {
      display: "none",
    },

  }));

export default useStyles;
