import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: "10px auto"
  },
  formElementIndent: {
    marginBottom: theme.spacing(2)
  },
  cover: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    position: "absolute",
    boxShadow: "box-shadow: 10px 5px 5px red;"
  },
  header: {
    width: "100%"
  }
}));

export default useStyles;
