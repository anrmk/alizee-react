import { LinearProgress, withStyles, makeStyles } from "@material-ui/core";

const tintedBg = (opacity) => `
  linear-gradient(
    rgba(0, 0, 0, ${opacity}), 
    rgba(0, 0, 0, ${opacity})
  ),
`;

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
  previewStoryListProgress: {
    alignSelf: "center",
    marginLeft: theme.spacing(3)
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
    backgroundImage: ({ previewUrl }) => tintedBg(0.25) + `url("${previewUrl}")`,
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
  previewStoryListItemName: {
    color: theme.palette.common.white
  },
  previewStoryListItemAvatar: {
    marginRight: theme.spacing(1)
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
