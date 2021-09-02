import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  subscribeBtn: {
    whiteSpace: "nowrap",
  },

  btnMargin: {
    marginBottom: theme.spacing(2),
  },

  btnsGroupMobile: {
    display: "flex",
    alignItems: "center",
    "& > .MuiButtonBase-root + .MuiButtonBase-root": {
      marginLeft: theme.spacing(1),
    },
    flexWrap: "wrap",
  },
  mood: {
    cursor: "pointer",
    padding: ({ isOwner }) => isOwner && theme.spacing(0.5),
    border: ({ isOwner }) => isOwner && "1px dashed",
    borderColor: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    marginTop: theme.spacing(2),
    wordBreak: "break-all",
  },
  cardHeader: {
    "& > div": {
      width: "100%",
    },
  },

  moodMobile: {
    ...theme.typography.body1,
    width: "100%",
    wordBreak: "break-all",
    color: theme.palette.text.secondary,
  },
  breakText: {
    wordBreak: "break-all",
  },
}));

export default useStyles;
