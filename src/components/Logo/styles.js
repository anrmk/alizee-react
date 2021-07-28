import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  logo: {
    display: "block",
    background: `url(${
      theme.palette.type === "light" ? "/logo-light.svg" : "/logo-dark.svg"
    }) no-repeat`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    minHeight: "44px",
    minWidth: "220px",
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),

    [theme.breakpoints.down("sm")]: {
      minWidth: "180px",
    },
  },
}));

export default useStyles;
