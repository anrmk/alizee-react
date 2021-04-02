import { makeStyles } from "@material-ui/core";


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
    display: "flex",
    flexDirection: "column-reverse",
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
    maxWidth: "70%",
    minWidth: "100px",
    marginBottom: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    display: "flex",
    flexFlow: "nowrap",
    flexDirection: "column",
    alignSelf: "flex-start",
    wordBreak: "break-word",
    background: theme.palette.primary.main,
    color: theme.palette.common.white
  },

  messengerMediaMessage: {
    maxWidth: "50%",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "60%",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "70%",
    },
  },

  messengerMyMessage: {
    alignSelf: "flex-end",
    background: theme.palette.secondary.main,
    justifyContent: "flex-end",
  },

  messengerMessageDate: {
    width: "fit-content",
    alignSelf: "flex-end",
    whiteSpace: "nowrap",
    padding: theme.spacing(0, 0, 0, 1),
    color: theme.palette.common.gray,
  },

  infinite: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  input: {
    padding: theme.spacing(0.5),

    "& .MuiIconButton-root": {
      padding: theme.spacing(1),
    },

    "& input": {
      padding: theme.spacing(1.5),
    },
  },

  gridItem: {
    width: "120px",
    height: "120px",
  },

  gridItemImage: {
    width: "100%",
    height: "100%",
  },

  icon: {
    color: "white",
    marginRight: theme.spacing(1)
  },

  gridListTileBar: {
    background: "none",
  },
}));

export default useStyles;
