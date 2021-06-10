import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  googleIcon: {
    height: "20px",
    width: "20px",
    padding: theme.spacing(0.5),
    background: theme.palette.common.white,
    borderRadius: "4px"
  },
}));

export default useStyles;
