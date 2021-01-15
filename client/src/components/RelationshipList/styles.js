import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(0),
  },

  header: {
    justifyContent: "space-between",
    display: "flex",
  },

  item: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(1),
  },

  itemButton: {
    marginLeft: theme.spacing(1),
    flexShrink: 0,
    textTransform: "capitalize",
  },
}));

export default useStyles;
