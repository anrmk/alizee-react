import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },

  card: {
    position: "relative",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      height: `calc(100vh - ${(theme.mixins.toolbar.minHeight*2 + theme.spacing(3))}px)`,
    }
  },

  cardContent: {
    position: "relative",
    zIndex: "1",
    flex: "1 1 0",
    order: 2
  },

  cardFooter: {
    position: "relative",
    zIndex: 1,
    flex: "none",
    order: 3,
    boxSizing: "border-box",
    width: "100%"
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
      margin: theme.spacing(0, 0.5),
      padding: theme.spacing(1)
    },
  },

  receipt: {
    textAlign: "center"
  },

  grow: {
    flexGrow: 1,
  },
}));

export default useStyles;

