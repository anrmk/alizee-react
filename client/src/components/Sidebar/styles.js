import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
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
    "&::-webkit-scrollbar":
    {
      display: "none"
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

  navigation: {
    marginTop: theme.spacing(1),
    width: "100%",

    "& .success": {
      color: theme.palette.success.main,
      padding: theme.spacing(0.5)
    },
    "& .secondary": {
      color: theme.palette.secondary.main,
      padding: theme.spacing(0.5)
    },
    "& .primary": {
      color: theme.palette.primary.main,
      padding: theme.spacing(0.5)
    }
  },
}));

export default useStyles;
