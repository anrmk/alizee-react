import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  progressBar: {
    height: theme.spacing(3.8),
    borderRadius: theme.spacing(0.5),
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid",
  },

  targetFunds: {
    position: "absolute",
    top: "4px",
    right: "10px",
  },
}));

export default useStyles;
