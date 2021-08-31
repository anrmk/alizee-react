import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tabsContainer: {
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.background.default,
    zIndex: theme.zIndex.appBar,
  },
}));

export default useStyles;
