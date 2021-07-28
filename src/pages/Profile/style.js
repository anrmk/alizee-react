import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // AZIZ
    // [theme.breakpoints.down("sm")]: {
    //   paddingLeft: 0,
    //   paddingRight: 0,
    // },
  },
  grid: {
    // AZIZ
    // paddingLeft: theme.spacing(3),
    // paddingRight: theme.spacing(3),
    // [theme.breakpoints.down("sm")]: {
    //   paddingLeft: 0,
    //   paddingRight: 0,
    // },
  },
  userInfo: {
    position: "sticky",
    top: "4rem",
  },
}));

export default useStyles;
