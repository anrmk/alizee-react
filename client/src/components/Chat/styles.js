import { makeStyles } from "@material-ui/core";
import { fade } from '@material-ui/core/styles/colorManipulator';


const useStyles = makeStyles((theme) => ({
  messenger: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
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

  // messengerMediaMessage: {
  //   maxWidth: "50%",
  //   width: "100%",
  //   [theme.breakpoints.down("sm")]: {
  //     maxWidth: "60%",
  //   },
  //   [theme.breakpoints.down("xs")]: {
  //     maxWidth: "70%",
  //   },
  // },

  input: {
    padding: theme.spacing(0.5),

    "& .MuiIconButton-root": {
      padding: theme.spacing(1),
    },

    "& input": {
      padding: theme.spacing(1.5),
    },
  },

  gridListTileBar: {
    background: "none",
  },
}));

export default useStyles;
