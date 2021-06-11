import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      padding: 0
    }
  },
  mainBox: {
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0"
    }
  },
  grid: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: 0
    }
  },
  suggestionList: {
    position: "sticky",
    overflowY: "auto",
    height: `calc(100vh - ${theme.spacing(4.5)}px)`,
    top: theme.spacing(3),

    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
}));

export default useStyles;