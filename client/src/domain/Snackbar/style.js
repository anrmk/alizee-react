import { makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    minWidth: "360px",
    maxWidth: "360px",
    backgroundColor: blue[500],
    borderRadius: theme.shape.borderRadius
  },
  name: {
    color: theme.palette.common.white,
    fontWeight: theme.typography.h6.fontWeight
  },
  userName: {
    color: blue[200],
    marginLeft: theme.spacing(0.4)
  },
  description: {
    color: theme.palette.common.white
  }
}));

export default useStyles;
