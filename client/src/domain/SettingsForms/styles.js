import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  controlLabel: {
    "& > .MuiFormControlLabel-label": {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.body2.fontSize
    }
  },
  form: {
    "& > .MuiFormGroup-root": {
      marginTop: 30,
      marginBottom: 15
    },
    "& > .MuiFormGroup-root:first-child": {
      marginTop: 0
    },
    "& > *:last-child": {
      marginTop: 30,
      marginBottom: 0
    }
  },
  header: {
    display: "flex",
    alignItems: "center"
  },
  formElementIndent: {
    marginBottom: theme.spacing(2),
  },
  textMute: {
    color: "#6c757d"
  },
  formGroupBtn: {
    width: "fit-content"
  },
  uploadTextBtn: {
    cursor: "pointer",
    fontSize: theme.typography.body2.fontSize,
    "&:hover": {
      color: theme.palette.text.secondary
    }
  },
  uploadBtn: {
    display: "none"
  },
  username: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.fontWeightLight
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  blackListRoot: {
    flexDirection: "column",
    display: "flex"
  }
}));

export default useStyles;
