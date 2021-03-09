import { makeStyles } from "@material-ui/core/styles";

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
    background: "url('/logo.png') no-repeat",
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

  controls: {
    display: "flex",
    flexWrap: "nowrap",
  },

  hide: {
    display: "none",
  },
}));

export default useStyles;
