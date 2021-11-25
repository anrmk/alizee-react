import { makeStyles } from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  content: {
    height: "35vh",
  },
  dateBtn: {
    cursor: "pointer",
    fontSize: theme.typography.caption.fontSize,
    textDecoration: "none !important",
    color: theme.palette.text.secondary,
    "& + &": {
      marginLeft: theme.spacing(1),
    },
    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
  active: {
    color: theme.palette.text.primary,
  },
}));

export default useStyles;
