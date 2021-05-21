import { makeStyles } from "@material-ui/core";

import authIllustration from "../../../src/assets/img/auth_image.png";

const useStyles = makeStyles((_theme) => {
  return ({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    grid: {
      marginTop: "110px"
    }
  })
});

export default useStyles;
