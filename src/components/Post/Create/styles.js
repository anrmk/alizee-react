import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  navigation: {
    width: "100%",
    marginBottom: "20px",
  },
  inputText: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  media: {
    display: "block",
    width: "100% !important",
    height: "100% !important",
    objectFit: "cover",
    background: theme.palette.common.black,
  },
}));

export default useStyles;
