import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  base: {
    height: ({ isFullScreenHeight }) => isFullScreenHeight ? "100vh" : "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
      paddingBottom: theme.spacing(8)
    }
  },
  twoColumnGrid: {
    flex: "1",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    }
  },
  twoColumnContainer: {
    display: ({ isFullScreenHeight }) => isFullScreenHeight ? "flex" : "block",
  },
  mainBase: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.down("sm")]: {
      height: "100% !important",
      paddingBottom: theme.spacing(7)
    }
  },
  mainInnerGrid: {
    height: "100%",
    scrollbarWidth: "none",

    "& > .MuiGrid-item" : { 
      paddingLeft: theme.spacing(3),
      [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(0)
      }
    }
  },
  mainContainer: {
    // [theme.breakpoints.down("sm")]: {
    //   padding: 0
    // }
  },
  publicBase: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.down("md")]: {
      overflow: "hidden",
      paddingBottom: theme.spacing(9)
    }
  }
}));

export default useStyles;
