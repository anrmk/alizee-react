import { makeStyles } from "@material-ui/core";
import { getStyleByTheme } from "../../helpers/functions";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  mainBox: {
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0",
    },
  },
  grid: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: 0,
    },
  },
  suggestionList: {
    position: "sticky",
    overflowY: "auto",
    height: `calc(100vh - ${theme.spacing(4.5)}px)`,
    top: theme.spacing(3),

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  navRoot: {
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1, 0),
    marginBottom: theme.spacing(1),
    zIndex: theme.zIndex.appBar,
    borderBottom: `1px solid ${getStyleByTheme(
      theme,
      theme.palette.grey["200"],
      theme.palette.grey["800"]
    )}`,
  },
  navDivider: {
    marginBottom: theme.spacing(1),
  },
}));

export default useStyles;
