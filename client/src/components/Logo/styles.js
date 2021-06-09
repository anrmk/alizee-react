import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  logo: {
    display: "block",
    background: `url(${theme.palette.type === "light" ? "/logo-light.png" : "/logo-dark.png"}) no-repeat`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    minHeight: "42px",
    minWidth: "180px",
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),

    [theme.breakpoints.down("sm")]: {
      minWidth: "190px",
    },
  },
}));

export default useStyles;
