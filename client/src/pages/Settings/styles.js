import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(3, 2),
    minHeight: "85vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  card: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('md')]: {
      minWidth: 210
    }
  },
  tab: {
    textDecoration: "none !important",
    "&:hover": {
      color: "inherit"
    }
  },
  content: {
    [theme.breakpoints.down('lg')]: {
      padding: `10px 5%`
    },
    [theme.breakpoints.up('md')]: {
      padding: `10px 15%`
    }
  }
}));

export default useStyles;