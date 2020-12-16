import { Tab, Tabs, withStyles, makeStyles } from "@material-ui/core";

export const StyledTab = withStyles((theme) => ({
  root: {
    minWidth: 60,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
  selected: {
    backgroundColor: theme.palette.secondary.main,
  }
}))(Tab);

export const StyledTabs = withStyles((_theme) => ({
  indicator: {
    display: "none"
  }
}))(Tabs);

const useStyles = makeStyles(theme => ({
  formGroup: {
    marginBottom: theme.spacing(2),
  },
  createRoomTitle: {
    margin: theme.spacing(1, 0),
    textAlign: "center"
  },
  createRoomChip: {
    borderRadius: theme.shape.borderRadius
  },
  createRoomItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  createRoomItemVideo: {
    height: "auto",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
  },
  // Need to customize SelectInput
  selectErrorHelperMessage: {
    margin: theme.spacing(0, 0, 0, 2),
    color: theme.palette.secondary.main,
  },
  roomMiddleTab: {
    margin: theme.spacing(0, 1)
  },
  roomBoxTabChat: {
    display: "flex",
    paddingTop: theme.spacing(1),
    flexDirection: "column",
    justifyContent: "center"
  },
  roomBoxTabChatMessageList: {
    height: `calc(100vh - ${(theme.mixins.toolbar.minHeight * 2) + (theme.spacing(2) * 3) + theme.spacing(1) * 3}px - 18px)`,
  },
  roomBoxDrawerTabChatMessageList: {
    height: `calc(100vh - ${(theme.mixins.toolbar.minHeight * 2) + (theme.spacing(2) * 3) + theme.spacing(1) * 3}px - 10px)`,
  },
}));

export default useStyles;
