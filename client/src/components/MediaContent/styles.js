import { makeStyles } from "@material-ui/core/styles";
import { object } from "yup";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%"
  },

  mediaContent: {
    height: "100%",
    objectFit: "cover"
  },

  imageContentWrapper: {
    height: "100%",
    width: "100%"
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
    zIndex: theme.zIndex.drawer,

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

  favoriteIcon: {
    position: "absolute",
    opacity: 0.5,
    color: theme.palette.grey["100"],
    zIndex: theme.zIndex.mobileStepper,
    fontSize: "15rem",
    left: "calc(50% - 7.6rem)",
    top: "calc(50% - 7.6rem)",
    [theme.breakpoints.down("sm")]: {
      top: "calc(50% - 4rem)",
      left: "calc(50% - 4rem)",
      fontSize: "8rem",
    }
  }
}));

export default useStyles;
