import { Tab, Tabs, withStyles, makeStyles } from "@material-ui/core";

export const StyledTab = withStyles((theme) => ({
  root: {
    minWidth: 60,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
  selected: {
    backgroundColor: theme.palette.secondary.main,
  },
}))(Tab);

export const StyledTabs = withStyles((_theme) => ({
  indicator: {
    display: "none",
  },
}))(Tabs);

const useStyles = makeStyles((theme) => ({
  formElementIndent: {
    marginBottom: theme.spacing(2),
  },
  formElementHidden: {
    display: "none",
  },
  createRoomLinkId: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  createRoomLinkLabel: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      whiteSpace: "break-spaces",
    },
  },
  createRoomItemVideo: {
    height: "auto",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up("md")]: {
      marginBottom: theme.spacing(1),
    },
  },
  roomMiddleTab: {
    margin: theme.spacing(0, 1),
  },
  roomBoxTabChat: {
    display: "flex",
    paddingTop: theme.spacing(1),
    flexDirection: "column",
    justifyContent: "center",
  },
  roomBoxTabChatMessageList: {
    height: `calc(100vh - ${
      theme.mixins.toolbar.minHeight * 3 +
      theme.spacing(2) * 3 +
      theme.spacing(1) * 3
    }px - 72px)`,
    position: "relative",
  },
  roomVideoBox: {
    height: "100%",
  },
  roomVideo: {
    height: "auto",
    width: "100%",
    [theme.breakpoints.only("sm")]: {
      width: "85%",
    },
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
  roomVideoDivider: {
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
