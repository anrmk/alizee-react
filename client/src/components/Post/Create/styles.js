import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navigation: {
    width: "100%",
    marginBottom: "20px"
  },
  inputText: {
    flex: "1 1 auto"
  },
  video: {
    display: "block",
    width: "100% !important",
    height: "100% !important",
    background: theme.palette.common.black,
  },
}));


export default useStyles;