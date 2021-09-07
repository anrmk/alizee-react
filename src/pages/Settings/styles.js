import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tabsRoot: {},
  contentRoot: {
    marginLeft: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
    },
  },
  withdrawFormRoot: {
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
