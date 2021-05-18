import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tabs: {
    textAlign: "left",
    padding: theme.spacing(0, 1),
    "& span": {
      alignItems: "flex-start",
    },
    [theme.breakpoints.up("sm")]: {
      position: "sticky",
      top: "4rem"
    },
  },
}));

export default useStyles;
