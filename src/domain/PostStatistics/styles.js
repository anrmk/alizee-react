import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > li": {
      paddingBottom: 0,
    },
  },
}));

export default useStyles;
