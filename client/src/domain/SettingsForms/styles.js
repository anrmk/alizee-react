import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  controlLabel: {
    "& > .MuiFormControlLabel-label": {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.body2.fontSize
    }
  },
  modal: {
    position: 'absolute',
    width: 400,
    top: "40%",
    left: "calc(50% - 400px / 2)",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
  formGroup: {
    marginBottom: 15
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
  phoneInput: {
    width: "100%",
    padding: theme.spacing(1, 0),
    fontSize: theme.typography.body1.fontSize,
    border: "none",
    outline: "none"
  }
}));

export default useStyles;
