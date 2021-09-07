import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
  },
  card: {
    height: "100%",
    borderRadius: theme.spacing(0),
    [theme.breakpoints.up("md")]: {
      borderRight: `1px solid ${theme.palette.divider}`,
      borderRadius: `${theme.spacing(0.5)}px 0 0 ${theme.spacing(0.5)}px`,
    },
  },
  cardMedia: {
    position: "relative",
    height: "100%",
  },
  commentsRoot: {
    borderRadius: theme.spacing(0),
    [theme.breakpoints.up("md")]: {
      borderRadius: `0 ${theme.spacing(0.5)}px ${theme.spacing(0.5)}px 0`,
    },
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
