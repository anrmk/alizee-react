import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: "12px",
    float: "left",
  },
  inputBase: {
    flexWrap: "wrap",
    boxSizing: "border-box",
    paddingTop: "12px",
  },
  input: {
    minWidth: "50px",
    padding: "0 14px 12px 0",
    display: "inline-block",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    appearance: "none", // Remove border in Safari, doesn't seem to break anything in other browsers
    WebkitTapHighlightColor: "rgba(0,0,0,0)", // Remove mobile color flashing (deprecated style).
    float: "left",
    flex: 1,
  },
}));

export default useStyles;
