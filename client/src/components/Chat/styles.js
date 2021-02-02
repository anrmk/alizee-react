import { makeStyles } from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles((theme) => ({
  emptyMessageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    height: "100%",
    justifyContent: "center",
  },

  messenger: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflowY: "auto",
    left: 0,
    top: 0,
    padding: theme.spacing(2),
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },

  messengerMessage: {
    width: "fit-content",
    maxWidth: "80%",
    minWidth: "100px",
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1),
    display: "flex",
    flexFlow: "nowrap",
    flexDirection: "row",
    alignSelf: "flex-start",
    wordBreak: "break-word",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },

  messengerMyMessage: {
    alignSelf: "flex-end",
    backgroundColor: theme.palette.success.dark,
    justifyContent: "flex-end",
  },

  messengerMessageDate: {
    width: "fit-content",
    alignSelf: "flex-end",
    whiteSpace: "nowrap",
    padding: theme.spacing(0, 0, 0, 1),
    color: grey["400"],
  },

  infinite: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  icon: {
    color: theme.palette.grey["400"]
  },
}));

export default useStyles;
