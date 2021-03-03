import { makeStyles } from "@material-ui/core/styles";
import { getStyleByTheme } from "../../helpers/functions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: theme.palette.background.mainGradient,
    //background: "url('/card-wave.jpg') no-repeat",
    //backgroundSize: "cover",
    border: "1px solid white",
    borderRadius: theme.shape.borderRadius * 2,
    color: theme.palette.common.white,
    filter: getStyleByTheme(theme, "drop-shadow(10px 10px 15px rgba(174, 174, 192, 0.4))", "drop-shadow(10px 10px 15px rgba(0, 0, 0, 0.4))")
  },
  btn: {
    color: theme.palette.common.white
  },

  content: {
    padding: theme.spacing(0, 2),
  }
}));

export default useStyles;
