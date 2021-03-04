import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {

  },
  header: {
    flexDirection: "column",
    textAlign: "center",
    wordBreak: "break-word"
  },
  avatarHeader: {
    marginBottom: theme.spacing(2)
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  bio: {
    ...theme.typography.body1,
    maxHeight: "235px",
    overflowY: "auto"
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
  moodMobile: {
    ...theme.typography.body1,
    color: theme.palette.text.secondary,
    overflowY: "auto"
  },
}));

export default useStyles;
