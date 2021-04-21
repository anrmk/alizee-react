import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      borderRadius: 0,
      border: "none"
    }
  },

  card: {
    position: "relative",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: ({ isPurchased }) => isPurchased ? "space-between" : "flex-start",
    [theme.breakpoints.down("sm")]: {
      height: `calc(100vh - ${(theme.mixins.toolbar.minHeight*2 + theme.spacing(3))}px)`,
    }
  },

  cardContent: {
    position: "relative",
    zIndex: "1",
    flex: "1 1 0",
    order: 2
  },

  cardFooter: {
    position: "relative",
    zIndex: 1,
    flex: "none",
    order: 3,
    boxSizing: "border-box",
    width: "100%"
  },

  //obsolete
  media: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    maxHeight: "600px",
    height: "100vh",
    cursor: "pointer",
  },

  action: {
    flexDirection: "column",

    "& > .MuiIconButton-root, & > .MuiButton-root": {
      margin: theme.spacing(0, 0.5),
      padding: theme.spacing(1)
    }
  },

  mediaContent: {
    width: "100%"
  },

  receipt: {
    textAlign: "center"
  },

  grow: {
    flexGrow: 1
  },

  divider: {
    width: "110%",
    margin: theme.spacing(1, 0)
  },

  postCardContent: {
    padding: theme.spacing(0.5, 2)
  },

  postDescriptionText: {
    marginTop: theme.spacing(1)
  },

  toolsLikesText: {
    fontWeight: theme.typography.fontWeightBold
  },

  commentsPreviewRoot: {
    width: "100%",
    padding: theme.spacing(0, 1)
  },
  commentsPreviewList: {
    padding: 0
  },
  commentsPreviewItem: {
    padding: 0
  },
  commentsPreviewUsername: {
    textDecoration: "none",
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold
  },
  commentsPreviewText: {
    marginLeft: theme.spacing(1)
  },
  commentsPreviewDate: {
    color: theme.palette.text.secondary
  }
}));

export default useStyles;

