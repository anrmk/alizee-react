import { makeStyles } from "@material-ui/core";
import gray from "@material-ui/core/colors/grey";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  border: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderColor: gray["400"],	
    width: "100%",
  },
  content: {
    paddingTop: theme.spacing(0.1),
    paddingBottom: theme.spacing(0.1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    fontWeight: 500,
    fontSize: 18,
    color: gray["400"],
	whiteSpace: "nowrap"
  },
}));

export default useStyles;
