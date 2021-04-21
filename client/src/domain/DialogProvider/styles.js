import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  closeBtn: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    zIndex: theme.zIndex.tooltip
  }
}));

export default useStyles;
