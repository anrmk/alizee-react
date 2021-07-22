import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: theme.spacing(2, 3, 3, 3),
    pointerEvents: "none",
  },
  progressBar: {
    height: theme.spacing(2),
    borderRadius: theme.spacing(0.5),
    width: "100%",
  },

  targetFunds: {
    color: theme.palette.common.white,
    position: "absolute",
    paddingRight: theme.spacing(3),
    bottom: theme.spacing(0.5),
    right: 0,
  },
}));

export default useStyles;
