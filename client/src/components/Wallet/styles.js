import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "url('/card-wave.jpg') no-repeat",
    backgroundSize: "cover",
    color: theme.palette.common.white
  },

  content: {
    padding: theme.spacing(0, 2),
  }
}));

export default useStyles;
