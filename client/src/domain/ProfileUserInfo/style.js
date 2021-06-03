import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {

  },
  header: {
    flexDirection: "column",
    textAlign: "center",
    wordBreak: "break-word",
    paddingBottom: 0,
    "& > .MuiCardHeader-content": {
      width: "100%"
    },
    "& > .MuiCardHeader-avatar": {
      marginRight: 0
    }
  },
  avatarHeader: {
    marginBottom: theme.spacing(2)
  },
  content: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(1),
  },
  subscribeBtn: {
    whiteSpace: "nowrap"
  },
  btnsGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.up("lg")]: {
      margin: theme.spacing(1, 0),
      flexWrap: "nowrap !important",
      "& > *": {
        fontSize: theme.typography.button.fontSize,
        width: "auto !important",
      },
    },
    [theme.breakpoints.down("lg")]: {
      margin: "0",
      flexWrap: "wrap",
      "& > *": {
        width: "100%",
        marginTop: theme.spacing(1),
        whiteSpace: "nowrap"
      }
    }
  },
  bio: {
    ...theme.typography.body1,
    maxHeight: "235px",
    overflowY: "auto"
  },
  bioHeader: {
    margin: theme.spacing(1, 0)
  },
  btnMobile: {
    background: theme.palette.background.secondaryGradient,
    color: theme.palette.primary.main,
  },
  btnsGroupMobile: {
    display: "flex",
    alignItems: "center",
    "& > .MuiButtonBase-root + .MuiButtonBase-root": {
      marginLeft: theme.spacing(1)
    }
  },
  mood: {
    cursor: "pointer",
    padding: ({ isOwner }) => isOwner && theme.spacing(0.5),
    border: ({ isOwner }) => isOwner && "1px dashed",
    borderColor: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius
  },
  moodMobile: {
    ...theme.typography.body1,
    width: "100%",
    wordBreak: "break-all",
    color: theme.palette.text.secondary,
  },
}));

export default useStyles;
