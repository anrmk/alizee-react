import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0),
    padding: theme.spacing(0)
  },

  header: {
    justifyContent: "space-between",
    display: "flex"
  },

  payable: {
    marginLeft: 'auto'
  },

  item: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(1)
  },

  itemSecondText: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: "58%"
  }
}));

export default useStyles;
