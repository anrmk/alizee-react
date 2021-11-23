import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const baseFormElement = {
    width: "100%",
    marginBottom: theme.spacing(2),
  };

  return {
    icon: {
      fontSize: theme.typography.h1.fontSize,
      color:
        theme.palette.type === "light"
          ? theme.palette.primary.light
          : theme.palette.grey["200"],
    },
    divider: {
      ...baseFormElement,
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
