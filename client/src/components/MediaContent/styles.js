import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // position: "relative",
    // maxHeight: "600px",
    // height: "100vh",
    // cursor: "pointer",
    // color: "red",
  },


  payable: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    //position: "relative",
    maxHeight: "600px",
    height: "100vh",
    cursor: "pointer",
    color: "rgba(226, 223, 223, 0.9)",

    "& .lock": {
      fontSize: "8rem"
    },
  },

  videoContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  player: {
    pointerEvents: "none",
    "& video": {
      objectFit: "cover",
    },
  },

  playerControlls: {
    position: "absolute",
    transition: "opacity .5s",
    cursor: "pointer",
    color: "rgba(226, 223, 223, 0.9)",

    "&.volume": {
      bottom: theme.spacing(1),
      left: theme.spacing(1),
    },

    "&.play, &.lock": {
      "& svg": {
        fontSize: "8rem"
      },
    }
    
  },
}));

export default useStyles;
