import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tabs: {
    textAlign: "left",
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
