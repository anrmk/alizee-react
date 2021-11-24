import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "400px",
    padding: theme.spacing(5),
  },
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
}));

export default useStyles;
