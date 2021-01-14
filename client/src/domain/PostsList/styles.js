import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },

  button: {
    width: "100%",
    textAlign: "left",
    justifyContent: "left",
    padding: theme.spacing(0.5, 2)
  }
}));

export default useStyles;
