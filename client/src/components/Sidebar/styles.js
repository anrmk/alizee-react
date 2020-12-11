import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },

  drawer: {
    width: theme.spacing(7),
    overflow: "hidden",
    flexShrink: 0,
    whiteSpace: "nowrap",
  },

  papper: {
    width: theme.spacing(7),
    overflow: "hidden",
  },

  header: (props) => ({
    display: "flex",
    padding: theme.spacing(1),
    alignItems: props.open ? "space-between": "center",
    flexDirection: props.open ? "row": "column",
    justifyContent:  "center",
   
    "& label": {
     width: "auto",
     flexWrap: "nowrap",
    },

    [theme.breakpoints.up("sm")]: {
      justifyContent:  "space-between",
    }
  }),

  drawerHeader: (props) => ({
    display: "none",

    [theme.breakpoints.up("sm")]: {
      display: "inherit",
    },
  }),

  themeToggle: (props) => ({

  }),

  drawerOpen: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
    },
  },

  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  card: (props) => ({
    flexDirection: "column",
    alignItems:"center",
    textAlign: "center",
    display: !props.open ? "none" : "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none !important",
    }
  }),

  navigation: {
    margin: theme.spacing(2, 0)
  },
}));

export default useStyles;
