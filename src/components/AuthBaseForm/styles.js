import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },

  rootCard: {
    [theme.breakpoints.up("md")]: {
      minHeight: "640px",
    },
    [theme.breakpoints.only("md")]: {
      backgroundColor: "white",
    },
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
  },

  helpCard: {
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
  },

  formElement: {
    width: "100%",
  },

  logoImage: {
    background: `url(${
      theme.palette.type === "light" ? "/logo-light.svg" : "/logo-dark.svg"
    }) no-repeat`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    minHeight: "80px",
  },
}));

export default useStyles;
