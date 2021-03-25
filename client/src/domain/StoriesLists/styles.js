import { LinearProgress, withStyles, makeStyles } from "@material-ui/core";

const tintedBg = (opacity) => `
  linear-gradient(
    rgba(0, 0, 0, ${opacity}), 
    rgba(0, 0, 0, ${opacity})
  ),
`;

const previewStoryListItemBase = {
  minWidth: "114px",
  maxWidth: "114px",
  height: "144px",
}

const useStyles = makeStyles(theme => ({
  previewStoryList: {
    width: "100%",
    display: "flex",
    "&::-webkit-scrollbar": {
      display: "none"
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "814px"
    }
  },
  previewStoryListProgress: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  },
  previewStoryListItem: {
    ...previewStoryListItemBase,
    display: "flex",
    justifyContent: ({ empty }) => !empty ? "flex-start" : "center",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundImage: ({ previewUrl }) => previewUrl && tintedBg(0.25) + `url("${previewUrl}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: theme.palette.background.paper,
    cursor: "pointer",
    transition: "opacity .2s",
    textDecoration: "none",
    color: theme.palette.text.primary,
    "& + &": {
      marginLeft: theme.spacing(1)
    }
  },
  previewStoryItemUserInfo: {
    alignItems: "center",
    display: "flex",
    width: "100%",
    alignSelf: "flex-end"
  },
  previewStoryListItemName: {
    color: theme.palette.common.white
  },
  previewStoryListItemAvatar: {
    marginRight: theme.spacing(1)
  },
  previewStoryListItemAddButton: {
    fontSize: theme.typography.h3.fontSize,
    color: theme.palette.primary.main 
  },
  previewStoryListItemSkeleton: {
    ...previewStoryListItemBase,
    borderRadius: theme.shape.borderRadius,
    "& + &": {
      marginLeft: theme.spacing(1)
    }
  }
}));

export const CustomLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    "& + &": {
      marginLeft: theme.spacing(1)
    }
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[700],
  },
  bar: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[400]
  },
}))(LinearProgress);

export default useStyles;
