import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },

  image: {
    overflow: "hidden",
    display: "block",
    width: "100%",
  },

  payable: {},

  video: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

       
   
  },

  player: {
    width: "100% !important",
    height: "100% !important",
    pointerEvents: "none",

    "& video": {
      objectFit: "cover"
    }
  }
}));

export default useStyles;
