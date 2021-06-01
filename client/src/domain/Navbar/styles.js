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
      backgroundPositionY: theme.palette.type === "dark" ? "-29px" : "0",
      height: "29px",
      minWidth: "103px",
      marginRight: theme.spacing(1),
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
      cursor: "pointer"
    }
  }));

export default useStyles;
