import { makeStyles } from "@material-ui/core";
import faqImg from "../../assets/img/faq.svg";

const useStyles = makeStyles((theme) => {
  return {
    section: {
      paddingTop: "60px",
      minHeight: "100vh",
    },

    helpDetailSection: {
      paddingTop: "60px",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      width: "100%",
    },

    sidebarSection: {
      position: "sticky",
      top: "60px",
      height: "100%",
    },
    contentWrapper: {
      position: "relative",
    },

    content: {
      [theme.breakpoints.up("md")]: {
        position: "absolute",
        backgroundImage: `url("${faqImg}")`,
        width: "100%",
        height: "200px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top right",
        backgroundSize: "contain",
        top: 0,
        right: 0,
        zIndex: "-1",
      },
    },

    contentItem: {
      marginBottom: "10px",
      [theme.breakpoints.up("sm")]: {
        marginBottom: "54px",
      },
    },
  };
});

export default useStyles;
