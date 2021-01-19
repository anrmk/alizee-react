import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    // <Box style={isAuthenticated && !isNavigationHide ? { flexGrow: 1, paddingTop: 64, paddingBottom: 32 } : null}>
    [theme.breakpoints.up("sm")]: {
      display: ({ isAuthenticated, isNavigationHide }) => isAuthenticated && !isNavigationHide ? "flex" : "block"
    }
  },
  routesContainer: {
    paddingTop: ({ isAuthenticated, isNavigationHide }) => isAuthenticated && !isNavigationHide ? 64 : null,
    paddingBottom: ({ isAuthenticated, isNavigationHide }) => isAuthenticated && !isNavigationHide ? 64 : null,
    [theme.breakpoints.up("sm")]: {
      flexGrow: ({ isAuthenticated, isNavigationHide }) => isAuthenticated && !isNavigationHide ? 1 : null
    }
  }
}));

export default useStyles;