import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: "auto",
  },

  bio: {
    marginBottom: theme.spacing(1),
  },

  sites: {
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },

  statistics: {
    display: "inline-flex",
    "& > li": {
      display: "inline-block",
      whiteSpace: "nowrap"
    },
  },
}));

export default useStyles;
