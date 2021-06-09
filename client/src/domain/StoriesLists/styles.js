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
  height: "174px",
}

const useStyles = makeStyles((theme) => ({
  previewStoryList: {
    position: "relative",
    width: "100%",
    display: "flex",
    marginBottom: theme.spacing(2),
    "&::-webkit-scrollbar": {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      marginBottom: theme.spacing(0),
    }
  },
  previewStoryListProgress: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  previewStoryListItem: {
    ...previewStoryListItemBase,
    display: "flex",
    justifyContent: ({ empty }) => (!empty ? "flex-start" : "center"),
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundImage: ({ previewUrl }) => previewUrl && tintedBg(0.25) + `url("${previewUrl}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.grey[theme.palette.type === "dark" ? "800" : "200"],
    borderWidth: "1px",
    borderStyle: "solid",
    cursor: "pointer",
    transition: "opacity .2s",
    textDecoration: "none",
    color: theme.palette.text.primary,
    overflow: "hidden",
    "& + &": {
      marginLeft: theme.spacing(1),
    },
  },
  previewStoryItemUserInfo: {
    alignItems: "center",
    display: "flex",
    width: "100%",
    alignSelf: "flex-end",
  },
  previewStoryListItemName: {
    color: theme.palette.common.white,
  },
  previewStoryListItemAvatar: {
    marginRight: theme.spacing(1),
  },
  previewStoryListItemAddButton: {
    fontSize: theme.typography.h3.fontSize,
    color: theme.palette.primary.main,
  },
  previewStoryListItemSkeleton: {
    ...previewStoryListItemBase,
    borderRadius: theme.shape.borderRadius,
    "& + &": {
      marginLeft: theme.spacing(1),
    },
  },
  bottomContainer: {
    width: "100%",
    height: "60px",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette.common.white,
    zIndex: theme.zIndex.mobileStepper,
  },
  createButton: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bottom: "36px",
    backgroundColor: theme.palette.primary.main,
    border: "4px solid " + theme.palette.common.white,
    borderRadius: "50%",
  },
  createButtonText: {
    position: "absolute",
    bottom: "10px",
    color: theme.palette.common.black,
  },
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
