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
}));

export default useStyles;
