import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    fontSize: theme.typography.body1.fontSize,
  },

  itemBundleText: {
    marginRight: theme.spacing(1),
  },

  item: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(0.5),
  },
}));

export default useStyles;
