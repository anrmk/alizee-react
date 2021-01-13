import { makeStyles } from "@material-ui/core";

import authIllustration from "../../../src/assets/img/auth_image.png";

const useStyles = makeStyles((_theme) => {
  return ({
    container: {
      height: "100vh",
    },
    authImage: {
      height: "600px",
      background: `center / contain no-repeat url(${authIllustration})`,
    }
  })
});

export default useStyles;
