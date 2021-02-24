import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: "24px",
    borderWidth: "1px",
    borderColor: theme.palette.divider,
    borderStyle: "solid",
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    maxWidth: "500px",
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },

  popper: {
    zIndex: 1100,
    marginTop: theme.spacing(1)
  },

  popperContent: {
    maxWidth: "300px",
    maxHeight: "300px",
    overflow: "scroll",
  }

}));

export default useStyles;
