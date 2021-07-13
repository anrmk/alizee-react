import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // p2p: {
  //   position: "relative",
  // },

  player: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "flex-end",
    overflow: "hidden",

    width: "40%",
    zIndex: 1,

    "& video" : {
      width: "100%"
    }
  },

  partner: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",

    width: "100%",
    height: "100vh",
    zIndex: 0,

    "& video" : {
      height: "100%"
    }
  },

  // status: {
  //   textAlign: "center",
  //   zIndex: 1
  // },
  
  tools: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    zIndex: 1
  },

  createRoomContainer: {
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 16px)`,
    display: "flex",
    [theme.breakpoints.up("md")]: {
      alignItems: "center",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(1),
    },
  },
  meetingContainer: {
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 32px)`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  meetingLinkItem: {
    [theme.breakpoints.down("sm")]: {
      order: 2,
    },
  },
  meetingLinkBox: {
    marginTop: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  meetingImageItem: {
    [theme.breakpoints.down("sm")]: {
      order: 1,
      marginBottom: theme.spacing(2),
    },
  },
  meetingImagePaper: {
    overflow: "hidden",
    // Need to add for correct wrapping image
    fontSize: 0,
  },
  meetingImage: {
    width: "100%",
    height: "auto",
    padding: theme.spacing(0.5),
  },
  
  onlyModalRoot: {
    padding: theme.spacing(8, 2),
  },
  onlyModalContent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  onlyModalIcon: {
    fontSize: theme.typography.h1.fontSize,
    color: theme.palette.type === "light" ? theme.palette.primary.light : theme.palette.grey["200"]
  }
}));

export default useStyles;
