import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
  },
  card: {
    height: "100%",
  },
  cardMedia: {
    position: "relative",
    height: "100%",
  },
  userTags: {
    position: "absolute",
    bottom: theme.spacing(0),
    padding: theme.spacing(1),

    "& .MuiChip-root": {
      marginRight: theme.spacing(0.5),
    },
  },
  iconToggle: {
    position: "absolute",
    right: "10px",
    top: "8px",
    zIndex: theme.zIndex.appBar,
  },
}));

export default useStyles;
