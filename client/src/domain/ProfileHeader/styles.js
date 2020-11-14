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
}));

export default useStyles;
