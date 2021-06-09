import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    height: "100%"
  },
  card: {
    height: "100%"
  },
  cardMedia: {
    position: "relative",
    height: "100%"
  },
  iconToggle: {
    position: "absolute",
    right: "10px",
    top: "10px",
    zIndex: theme.zIndex.appBar
  }
}));

export default useStyles;
