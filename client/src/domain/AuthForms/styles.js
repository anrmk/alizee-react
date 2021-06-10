import { makeStyles } from "@material-ui/core";

//import authIllustration from "/phones.png";
import img1 from "../../../src/assets/img/slides/img1.jpg";
import img2 from "../../../src/assets/img/slides/img2.jpg";
import img3 from "../../../src/assets/img/slides/img3.jpg";
import img4 from "../../../src/assets/img/slides/img4.jpg";

const useStyles = makeStyles((theme) => {
  return ({
    container: {
      height: "100vh",
      display: "flex",
      alignItems: "center"
    },

    rootCard: {
      [theme.breakpoints.up("md")]: {
        minHeight: "640px"
      },
      [theme.breakpoints.only("md")]: {
        backgroundColor: "white"
      },
      [theme.breakpoints.down("sm")]: {
        backgroundColor: "transparent",
        boxShadow: "none"
      }
    },

    helpCard: {
      [theme.breakpoints.down("sm")]: {
        backgroundColor: "transparent",
        boxShadow: "none"
      }
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
      background: `url(${theme.palette.type === "light" ? "/logo-light.svg": "/logo-dark.svg"}) no-repeat`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      minHeight: "80px",
    },

    authImage: {
      width: "440px",
      height: "720px",
      position: "relative",
      backgroundImage: `url("/phones.png")`,
      backgroundRepeat: "no-repeat",
    },

    swipe: {
      width: "308px",
      position: "absolute",
      margin: "81px 0 0 112px",
    },

    slide: {
      height: "545px",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
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

    slide4: {
      backgroundImage: `url(${img4})`,
    },
  })
});

export default useStyles;
