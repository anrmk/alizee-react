import { fade, makeStyles } from "@material-ui/core/styles";

const drawerWidth = 260;

const useStyles = (open) => makeStyles((theme) => ({
    root: {
      boxShadow: "none",
      width: `calc(100% - ${theme.spacing(7)}px)`,

      marginLeft: drawerWidth,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.up("sm")]: {
        width: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${theme.spacing(7)}px)`,
      },
    },

    menuButton: {
      marginRight: theme.spacing(2),
    },

    toolbar: {
      padding: theme.spacing(0),
    },

    grow: {
      flexGrow: 1,
    },

    title: {
      display: "none",
      color: fade(theme.palette.common.black, 0.5),
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },

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
      width: "100%",
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
        width: "auto",
      },
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
