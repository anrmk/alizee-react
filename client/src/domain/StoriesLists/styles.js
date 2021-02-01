import { LinearProgress, withStyles, makeStyles } from "@material-ui/core";
import { getStyleByTheme } from "../../helpers/functions";

const tintedBg = (opacity) => `
  linear-gradient(
    rgba(0, 0, 0, ${opacity}), 
    rgba(0, 0, 0, ${opacity})
  ),
`;

const useStyles = makeStyles(theme => ({
  previewStoryList: {
    width: "100%",
    display: ({ loading }) => loading ? "block" : "flex",
    overflowX: "scroll",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  },
  previewStoryListProgress: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  },
  previewStoryListItem: {
    minWidth: "114px",
    maxWidth: "114px",
    height: "144px",
    display: "flex",
    alignItems: ({ empty }) => !empty ? "flex-end" : "center",
    justifyContent: ({ empty }) => !empty ? "flex-start" : "center",
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
  },
  previewStoryListItemAddButton: {
    marginRight: theme.spacing(1),
    fontSize: theme.typography.h3.fontSize,
    color: getStyleByTheme(theme, theme.palette.common.white, theme.palette.text.secondary) 
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
