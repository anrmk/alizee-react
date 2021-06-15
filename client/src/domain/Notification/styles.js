import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    navigation: {
      backgroundColor: "inherit",
    },
    item: {
      minWidth: "50px",
    },
    listItem: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    },
    icon: {
      paddingRight: "8px",
    },
    section: {
      minHeight: "calc(100vh - 208px)",
    },
  };
});

export default useStyles;
