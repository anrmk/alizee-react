import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  divider: {
    width: "1px",
    height: "20px",
    alignSelf: "auto",
    backgroundColor: theme.palette.common.white,
    margin: theme.spacing(0, 1),
  },
}));

export default useStyles;
