import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },

  rootBox: {
    position: "sticky",
    overflowY: "auto",
    height: `calc(100vh - ${theme.spacing(4.5)}px)`,
    top: theme.spacing(3),

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },

  papper: {
    width: theme.spacing(7),
    overflow: "hidden",
  },

  drawerHeader: (props) => ({
    display: "none",

    [theme.breakpoints.up("sm")]: {
      display: "inherit",
    },
  }),

  themeToggle: (props) => ({}),

  drawerOpen: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },

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

  card: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    display: "flex",
  },

  cardName: {
    marginRight: theme.spacing(0.5),
  },

  navigation: {
    marginTop: theme.spacing(1),
    width: "100%",

    "& .success": {
      color: theme.palette.success.main,
      padding: theme.spacing(0.5),
    },
    "& .secondary": {
      color: theme.palette.secondary.main,
      padding: theme.spacing(0.5),
    },
    "& .primary": {
      color: theme.palette.primary.main,
      padding: theme.spacing(0.5),
    },
  },
}));

export default useStyles;
