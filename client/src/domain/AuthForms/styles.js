import { makeStyles } from "@material-ui/core";

import { getStyleByTheme } from "../../helpers/functions";

import authIllustration from "../../../src/assets/img/auth_image_2.png";
import img1 from "../../../src/assets/img/img1.jpg";
import img2 from "../../../src/assets/img/img2.jpg";
import img3 from "../../../src/assets/img/img3.jpg";
import img4 from "../../../src/assets/img/img4.jpg";

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

    logoBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },

    logoImage: {
      background: "url('/logo.png') no-repeat",
      backgroundPosition: "top",
      backgroundPositionY: theme.palette.type === "dark" ? "-58px" : "0",
      height: "58px",
    },

    authImage: {
      height: "618px",
      backgroundImage: `url(${authIllustration})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "454px 618px", 
      alignSelf: "center",
      backgroundPosition: "0 0"
    },

    swipe: {
      width: "240px",
      position: "absolute",
      margin: "99px 0 0 151px",
    },

    slide: {
      minHeight: 427,
      backgroundRepeat: "no-repeat",
    },

    slide1: {
      backgroundImage: `url(${img1})`,
    },

    slide2: {
      backgroundImage: `url(${img2})`,
    },

    slide3: {
      backgroundImage: `url(${img3})`,
    },
  })
});

export default useStyles;
