import { makeStyles } from "@material-ui/core";

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
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },

  media: {
    borderRadius: theme.shape.borderRadius,
    maxWidth: "60%",
    width: "100%",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
    },
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

  textField: {
    border: 0,
  },

  gridListTileBar: {
    background: "none",
  },
}));

export default useStyles;
