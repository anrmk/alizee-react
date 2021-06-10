import { makeStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: grey[400],
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: !props.open ? "none" : "flex",
    marginTop: theme.spacing(1),

    "& > *": {
      listStyle: "none"
    },
    "& a": {
      color: grey["400"],
      "&::after": {
        content: '"\\2022"',
        padding: theme.spacing(0, 2),
      },
    },

    [theme.breakpoints.down("xs")]: {
      display: "none !important",
    },
  }),
}));

export default useStyles;
