import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // p2p: {
  //   position: "relative",
  // },

  player: {
    display: "flex",
    position: "absolute",
    maxWidth: "266px",
    bottom: theme.spacing(16),
    right: theme.spacing(2),
    overflow: "hidden",
    zIndex: 1,
    boxShadow: "0px 0px 20px #00000063",
    borderRadius: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      maxWidth: "150px",
    },

    "& video": {
      width: "100%",
      objectFit: "cover",
    },
  },

  partner: {
    position: "absolute",
    width: "100%",
    height: "100vh",
    zIndex: 0,

    "& video": {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      [theme.breakpoints.down("sm")]: {
        objectFit: "contain",
      },
    },
  },

  status: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(1),
    textAlign: "center",
    backgroundColor: theme.palette.background.default,
    borderBottomLeftRadius: theme.spacing(1),
    borderBottomRightRadius: theme.spacing(1),
    zIndex: 1,
  },

  tools: {
    position: "absolute",
    bottom: theme.spacing(2),
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    zIndex: 1,
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
    justifyContent: "center",
  },
  onlyModalIcon: {
    fontSize: theme.typography.h1.fontSize,
    color:
      theme.palette.type === "light"
        ? theme.palette.primary.light
        : theme.palette.grey["200"],
  },
}));

export default useStyles;
