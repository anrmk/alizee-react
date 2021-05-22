import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return ({
    container: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(3),
    },
    grid: {
      padding: theme.spacing(4),
      justifyContent: "center",
      alignItems: "center"
    }
  })
});

export default useStyles;
