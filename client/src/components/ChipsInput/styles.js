import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  chip: {
    margin: theme.spacing(1)
  }
}));

export default useStyles;

