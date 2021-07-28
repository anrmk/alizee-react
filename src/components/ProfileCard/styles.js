import { makeStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

import DefaultCover from "../../assets/img/default-cover.png";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
  },

  media: {
    backgroundImage: `url("${DefaultCover}")`,
    backgroundColor: theme.palette.background.paper,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "128px",
  },

  content: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    padding: theme.spacing(0.5, 0.5, 0.5, 14),
    backgroundColor: fade(theme.palette.common.black, 0.4),
    color: theme.palette.common.white,
  },

  avatar: {
    position: "absolute",
    left: theme.spacing(1.5),
    top: theme.spacing(1.5),
  },

  label: {
    backgroundColor: fade(theme.palette.primary.main, 0.8),
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.1, 0.5),
    position: "absolute",
    top: theme.spacing(0.5),
    left: theme.spacing(0.5),
    color: theme.palette.grey["50"],
    zIndex: 3,
    fontSize: theme.typography.caption.fontSize,
  },
}));

export default useStyles;
