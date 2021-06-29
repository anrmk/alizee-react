import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  rootList: {
    "& > div + div": {
      marginTop: theme.spacing(1)
    }
  },
  loadingBtn: {
    animation: "$spin 1.5s linear infinite"
  },
  "@keyframes spin": {
    "from": {
      transform: "rotate(0deg)"
    },
    "to": {
      transform: "rotate(360deg)"
    },
  },
}));

export default useStyles;
