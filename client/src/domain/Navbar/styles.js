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
      background: "url('/logo.png') no-repeat",
      backgroundSize: "cover",
      backgroundPositionY: theme.palette.type === "dark" ? "-48px" : "0",
      height: "48px",
      minWidth: "261px",
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),

      [theme.breakpoints.down("sm")]: {
        backgroundPositionY: theme.palette.type === "dark" ? "-35px" : "0",
        height: "35px",
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
