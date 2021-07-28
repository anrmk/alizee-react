import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const baseFormElement = {
    width: "100%",
    marginBottom: theme.spacing(2),
  };

  return {
    circleIcon: {
      width: "150px",
      height: "150px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(2),
      border: `3px solid ${
        theme.palette.type === "light"
          ? theme.palette.primary.light
          : theme.palette.grey["200"]
      }`,
      borderRadius: "50%",
      marginBottom: theme.spacing(2),
    },
    icon: {
      fontSize: theme.typography.h1.fontSize,
      color:
        theme.palette.type === "light"
          ? theme.palette.primary.light
          : theme.palette.grey["200"],
    },
    content: {
      maxWidth: "400px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
      padding: theme.spacing(5),
    },
    divider: {
      ...baseFormElement,
    },
    captionText: {
      color: theme.palette.grey["500"],
      marginBottom: theme.spacing(2),
    },
    controlForm: {
      ...baseFormElement,
      textAlign: "left",
    },
    formElementIndent: {
      marginBottom: theme.spacing(2),
    },
    btnBackSignIn: {
      ...baseFormElement,
      marginTop: theme.spacing(4),
      marginBottom: 0,
      backgroundColor: theme.palette.grey["200"],
    },
  };
});

export default useStyles;
