import { makeStyles } from "@material-ui/core";

import img1 from "../../assets/img/slides/img1.jpg";
import img2 from "../../assets/img/slides/img2.jpg";
import img3 from "../../assets/img/slides/img3.jpg";
import img4 from "../../assets/img/slides/img4.jpg";

const useStyles = makeStyles((theme) => ({
  authImage: {
    width: "440px",
    height: "720px",
    position: "relative",
    backgroundImage: "url('/phones.png')",
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
    backgroundSize: "cover",
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
}));

export default useStyles;
