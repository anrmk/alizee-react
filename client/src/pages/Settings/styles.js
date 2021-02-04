import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tabs: {
    textAlign: "left",
    "& span": {
      alignItems: "flex-start",
    },
  },
}));

export default useStyles;
