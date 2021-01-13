import { makeStyles } from "@material-ui/core";

import { getStyleByTheme } from "../../helpers/functions";

const useStyles = makeStyles((theme) => {
  return ({
    container: {
      height: "100vh",
      display: "flex",
      alignItems: "center"
    },
    formElement: {
      width: "100%",
    },
    formElementIndent: {
      marginBottom: theme.spacing(2)
    },
    link: {
      textAlign: "center",
      cursor: "pointer",
      textDecoration: "none",
      color: getStyleByTheme(theme, theme.palette.primary.main, theme.palette.primary.light)
    },
    logoBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    logoImage: {
      display: "flex",
      background: "url('/logo1.png') no-repeat",
      backgroundSize: "cover",
      backgroundPositionY: theme.palette.type === "dark" ? "-32px" : "0",
      height: "32px",
      minWidth: "115px"
    },
  })
});

export default useStyles;
