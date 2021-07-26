import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      "& > li": {
        paddingBottom: 0,
      },
    },
  };
});

export default useStyles;
