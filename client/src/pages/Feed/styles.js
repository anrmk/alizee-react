import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      padding: 0
    }
  },
  grid: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: 0
    }
  }
}));

export default useStyles;