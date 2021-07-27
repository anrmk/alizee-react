import { Button, withStyles, makeStyles } from "@material-ui/core";

export const StyledButton = withStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      minWidth: 0,
    },
  },
  iconSizeMedium: {
    "& > *:first-child": {
      [theme.breakpoints.down('md')]: {
        fontSize: "16px",
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: "14px",
      },
    },
  },
  startIcon: {
    marginLeft: 0,
    marginRight: 0
  },
  endIcon: {
    marginLeft: 0,
    marginRight: 0
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  videoBox: {
    height: "auto",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "relative"
  },
  buttonGroup: {
    position: "absolute",
    bottom: "15px",
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
    margin: theme.spacing(1, 0),
  },
  button: {
    margin: theme.spacing(0, 1),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 0.5)
    },
    whiteSpace: "nowrap"
  },
}));

export default useStyles;
