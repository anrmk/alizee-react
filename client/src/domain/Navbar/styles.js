import { makeStyles } from "@material-ui/core/styles";

const useStyles = (open) =>
  makeStyles((theme) => ({
    root: {
      boxShadow: "none",

      "&.bottom": {
        top: "auto",
        bottom: 0,
        borderTopWidth: "1px",
        borderTopColor: theme.palette.divider,
        borderTopStyle: "solid",
      },
    },

    logo: {
      background: `url(${theme.palette.type === "light" ? "/logo-light.png": "/logo-dark.png"}) no-repeat`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      minHeight: "42px",
      minWidth: "220px",
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),

      [theme.breakpoints.down("sm")]: {
        minWidth: "190px",
        marginLeft: theme.spacing(0),
      },
    },

    grow: {
      flexGrow: 1,
    },

    hide: {
      display: "none",
    },

    backBtn: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
  }));

export default useStyles;
