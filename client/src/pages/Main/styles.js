import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainContainer: ({ isAuthenticated, isNavigationHide }) => ({
    [theme.breakpoints.up("sm")]: {
      display: isAuthenticated && !isNavigationHide ? "flex" : "block",
    },
  }),
  routesContainer: ({ isAuthenticated, isNavigationHide }) => ({
    paddingTop: isAuthenticated && !isNavigationHide ? 64 : null,
    paddingBottom: isAuthenticated && !isNavigationHide ? 64 : null,
    [theme.breakpoints.up("sm")]: {
      flexGrow: isAuthenticated && !isNavigationHide ? 1 : null,
    },
  }),
}));

export default useStyles;
