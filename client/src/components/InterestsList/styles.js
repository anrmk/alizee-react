import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const chipBase = {
    margin: theme.spacing(0.5),
  };

  return {
    chipList: {
      display: "flex",
      flexWrap: "wrap",
      padding: theme.spacing(2, 0),
    },
    chip: {
      ...chipBase,
    },
  };
});

export default useStyles;
