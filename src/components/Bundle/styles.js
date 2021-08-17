import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    fontSize: theme.typography.body1.fontSize,
  },

  itemBundleText: {
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
