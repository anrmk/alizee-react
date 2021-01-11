import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    display: !props.open ? "none" : "block",
    "& ul": {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      padding: theme.spacing(0, 0, 2, 0),

      "& li": {
        padding: theme.spacing(0, 0.5, 0, 0),
        width: "auto",
        color: "theme.palette.color"
      },
    },
    [theme.breakpoints.down("xs")]: {
      display: "none !important",
    },
  }),
}));

export default useStyles;
