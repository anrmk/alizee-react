import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.up("md")]: {
      height: `calc(100vh - ${(theme.mixins.toolbar.minHeight*2 + theme.spacing(2))}px)`,
    }
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
