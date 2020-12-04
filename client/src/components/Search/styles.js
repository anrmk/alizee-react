import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  searchInputWrapper: {
    width: "100%",
  },
  searchInput: {
    height: "2.5em",
    border: "none",
    "&.Mui-focused": {
      border: "none",
      boxShadow: "none"
    },
  },
  searchIcon: {
    color: theme.palette.grey["400"]
  }
}));

export default useStyles;

