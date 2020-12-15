import { Button, Drawer, Tab, Tabs, withStyles, makeStyles } from "@material-ui/core";

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

export const StyledButton = withStyles((_theme) => ({
  endIcon: {
    marginLeft: 0,
    marginRight: 0
  },
  startIcon: {
    marginLeft: 0,
    marginRight: 0
  }
}))(Button);

export const StyledDrawer = withStyles((theme) => ({
  paper: {
    width: "316px",
    padding: theme.spacing(1)
  }
}))(Drawer);

const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(1, 0),
    textAlign: "left"
  },
  subtitle: {
    margin: theme.spacing(1, 0),
    textAlign: "left"
  },
  createRoomContainer: {
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    display: "flex",
    [theme.breakpoints.up('md')]: {
      alignItems: "center"
    },
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(1)
    }
  },
  roomBox: {
    display: "flex",
    marginTop: theme.spacing(1),
    height: `calc(100vh - ${(theme.mixins.toolbar.minHeight * 2) + (theme.spacing(2) * 3) + theme.spacing(1) * 3}px)`,
  },
  roomBoxVideo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      marginRight: theme.spacing(1)
    }
  },
  roomBoxTabs: {
    width: "300px",
    margin: theme.spacing(0, 1)
  },
  roomVideo: {
    height: "auto",
    width: "100%",
    borderRadius: theme.shape.borderRadius
  },
  roomBoxVideoButtons: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
    margin: theme.spacing(1, 0),
  },
  roomBoxVideoButton: {
    margin: theme.spacing(0, 1),
    whiteSpace: "nowrap"
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
  roomBoxDrawerCloseButton: {
    alignSelf: "flex-end"
  },
  meetingContainer: {
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  meetingItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  meetingLinkItem: {
    [theme.breakpoints.down('sm')]: {
      order: 2
    }
  },
  meetingLinkBox: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  meetingImageItem: {
    [theme.breakpoints.down('sm')]: {
      order: 1
    }
  },
  meetingImagePaper: {
    overflow: "hidden",
    // Need to add for correct wrapping image
    fontSize: 0
  },
  meetingImage: {
    width: "100%",
    height: "auto",
    padding: theme.spacing(3)
  }
}));

export default useStyles;
