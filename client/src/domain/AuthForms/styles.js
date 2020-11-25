import { makeStyles } from "@material-ui/core";

import { getStyleByTheme } from "../../helpers/functions";

const useStyles = makeStyles((theme) => {
  return ({
    container: {
      height: "100vh",
      display: "flex",
      alignItems: "center"
    },
    title: {
      textAlign: "center",
      marginBottom: theme.spacing(2)
    },
    card: {
      marginBottom: theme.spacing(2)
    },
    formDefElement: {
      width: "100%",
    },
    formElement: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    link: {
      textAlign: "center",
      cursor: "pointer",
      textDecoration: "none",
      color: getStyleByTheme(theme, theme.palette.primary.main, theme.palette.primary.light)
    },
    helpText: {
      textAlign: "center"
    }
  })
});

export default useStyles;
