import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    paddingRight: "8px",
  },
  navbar: {
    "& > button": {
      minWidth: "48px",
      padding: theme.spacing(1, 0),
    },
    "& > button span span": {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  },
}));

export default useStyles;
