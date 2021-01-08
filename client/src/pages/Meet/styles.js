import { Drawer, withStyles, makeStyles } from "@material-ui/core";

export const StyledDrawer = withStyles((theme) => ({
  paper: {
    width: "316px",
    padding: theme.spacing(1)
  }
}))(Drawer);

const useStyles = makeStyles(theme => ({
  createRoomContainer: {
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 16px)`,
    display: "flex",
    [theme.breakpoints.up('md')]: {
      alignItems: "center"
    },
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(1)
    }
  },
  roomDescription: {
    marginTop: theme.spacing(1)
  },
  roomBox: {
    display: "flex",
    marginTop: theme.spacing(1),
    height: `calc(100vh - ${(theme.mixins.toolbar.minHeight * 2) + (theme.spacing(2) * 3) + theme.spacing(1) * 3}px)`,
  },
  roomBoxVideo: {
    minWidth: "300px",
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
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius
  },
  roomBoxDrawerCloseButton: {
    alignSelf: "flex-end"
  },
  meetingContainer: {
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 32px)`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  meetingLinkItem: {
    [theme.breakpoints.down('sm')]: {
      order: 2
    }
  },
  meetingLinkBox: {
    marginTop: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  meetingImageItem: {
    [theme.breakpoints.down('sm')]: {
      order: 1,
      marginBottom: theme.spacing(2)
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
