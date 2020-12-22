import { LinearProgress, withStyles, makeStyles } from "@material-ui/core";

const tintedBg = (opacity) => `
  linear-gradient(
    rgba(0, 0, 0, ${opacity}), 
    rgba(0, 0, 0, ${opacity})
  ),
`;

const fullSize = {
  width: "100%",
  height: "100%"
}

const baseControls = (theme) => ({
  position: "absolute",
  display: "none",
  top: "calc(90% / 2)",
  backgroundColor: theme.palette.grey["400"],
  padding: theme.spacing(0),
  zIndex: theme.zIndex.appBar,
  "& > span > svg": {
    fill: theme.palette.grey["800"],
  },
  "&:hover": {
    backgroundColor: theme.palette.grey["400"],
  },
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
});

const useStyles = makeStyles(theme => ({
  previewStoryList: {
    width: "100%",
    display: "flex",
    overflowX: "scroll",
    padding: theme.spacing(1),
    "&::-webkit-scrollbar": {
      display: "none"
    }
  },
  previewStoryListWrapper: {
    width: "100%",
    display: "flex",
    overflowX: "scroll",
    padding: theme.spacing(1),
    "&::-webkit-scrollbar": {
      display: "none"
    }
  },
  previewStoryListItem: {
    width: "114px",
    height: "144px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundImage: ({ previewUrl }) => tintedBg(0.25) + `url('${previewUrl}')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundColor: theme.palette.background.paper,
    cursor: "pointer",
    transition: "opacity .2s",
    textDecoration: "none",
    color: theme.palette.text.primary,
    "& + &": {
      marginLeft: theme.spacing(3)
    }
  },
  previewStoryListItemAvatar: {
    marginRight: theme.spacing(1)
  },
  storiesList: {
    maxWidth: "450px",
    width: "100%",
    height: "100%"
  },
  storiesListContent: {
    position: "relative",
    width: "100%",
    height: `calc(100vh - ${10 + theme.spacing(2)}px)`
  },
  storiesListSwipeableArea: {
    ...fullSize,
    borderRadius: theme.shape.borderRadius,
    "& > .react-swipeable-view-container": {
      ...fullSize
    }
  },
  storiesListSwipeableAreaSlide: {
    overflow: "hidden !important"
  },
  storiesListControls: {
    position: "absolute",
    top: "calc(90% / 2)",
    zIndex: theme.zIndex.appBar
  },
  storiesListControlRight: {
    ...baseControls(theme),
    right: -theme.spacing(4),
  },
  storiesListControlLeft: {
    ...baseControls(theme),
    left: -theme.spacing(4),
  },
  storiesListHeader: {
    width: "100%",
    display: "flex",
    position: "absolute",
    alignItems: "center",
    padding: theme.spacing(2),
    zIndex: theme.zIndex.appBar
  },
  storiesListAvatar: {
    marginRight: theme.spacing(1)
  },
  storiesListItem: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  storiesListItemSlide: {
    width: "100%",
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  storySlideProgress: {
    display: "flex",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  customLinerProgress: {
    "& > div": {
      backgroundColor: "transparent",
    }
  },
  storySlideVideoWrapper: {
    width: "100%",
    height: "100%",
  },
  storySlideVideo: {
    objectFit: "cover"
  },
  storySlideImageWrapper: {
    height: "100%",
  },
  storySlideImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center"
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
