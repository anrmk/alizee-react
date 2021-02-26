import { makeStyles } from "@material-ui/core";

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
