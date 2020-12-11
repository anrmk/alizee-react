import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },

  //obsolete
  media: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    maxHeight: "600px",
    height: "100vh",
    cursor: "pointer",
  },

  action: {
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: theme.palette.divider,

    "& > .MuiIconButton-root, & > .MuiButton-root": {
      marginLeft: theme.spacing(1),
    },
  },

  grow: {
    flexGrow: 1,
  },
}));

export default useStyles;
