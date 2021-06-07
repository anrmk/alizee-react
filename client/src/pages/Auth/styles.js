import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return ({
    container: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(3),
      [theme.breakpoints.down("md")]: {
        padding: theme.spacing(0),
        justifyContent: "center"
      }
    },
    grid: {
      padding: theme.spacing(4),
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(0),
        margin: theme.spacing(0)
      }
    },
    footer: {
      marginTop: theme.spacing(0),
      justifyContent: "space-evenly",
      alignItems: "center",
      [theme.breakpoints.up("sm")]: {
        marginTop: "auto"
      }
    }
  })
});

export default useStyles;
