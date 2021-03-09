import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {

  },
  header: {
    flexDirection: "column",
    textAlign: "center",
    wordBreak: "break-word",
    paddingBottom: 0
  },
  avatarHeader: {
    marginBottom: theme.spacing(2)
  },
  content: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(1)
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
  moodMobile: {
    ...theme.typography.body1,
    width: "100%",
    wordBreak: "break-all",
    color: theme.palette.text.secondary,
  },
}));

export default useStyles;
