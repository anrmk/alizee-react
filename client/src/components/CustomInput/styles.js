import { Input, withStyles, makeStyles } from "@material-ui/core";

import { getStyleByTheme } from "../../helpers/functions";

export const useStyles = makeStyles((theme) => ({
  errorInput: {
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.secondary.main + " !important",
    boxShadow: "inset 0px 0px 0px 1px " + theme.palette.secondary.main + " !important",
  },
  label: {
    padding: theme.spacing(0, 1),
    transform: "translate(5px, 25px) scale(1)",
    "&.MuiFormLabel-filled": {
      transform: "translate(2px, -6px) scale(.75)",
    },
    "&.Mui-focused": {
      transform: "translate(5px, 2px) scale(.75)",
      backgroundColor: getStyleByTheme(theme, theme.palette.common.white, theme.palette.grey["800"]),
      color: getStyleByTheme(theme, theme.palette.text.secondary, theme.palette.grey["400"])
    }
  },
  errorLabel: {
    color: theme.palette.secondary.main,
    "&.Mui-focused": {
      color: theme.palette.secondary.main,
    }
  },
  errorHelperText: {
    marginLeft: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
  helperText: {
    marginLeft: theme.spacing(2),
    color: theme.palette.text.secondary,
  }
}))

const StyledInput = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    border: "1px solid " + getStyleByTheme(theme, theme.palette.primary.main, theme.palette.grey["400"]),
    "label + &": {
      marginTop: theme.spacing(1),
    },
    "&.Mui-focused": {
      boxShadow: "inset 0px 0px 0px 1px " + getStyleByTheme(theme, theme.palette.primary.main, theme.palette.grey["400"])
    },
    "&.Mui-disabled": {
      borderColor: getStyleByTheme(theme, theme.palette.grey["400"], "transparent"),
      backgroundColor: getStyleByTheme(theme, theme.palette.grey["200"], "rgba(255, 255, 255, 0.12)")
    },
    //  Other components
    "& > .MuiSelect-select:focus": {
      backgroundColor: "transparent"
    },
    "& > textarea": {
      padding: theme.spacing(1, 0)
    }
  },
  input: {
    position: "relative",
    fontSize: theme.typography.body1.fontSize,
  }
}))(Input);

export default StyledInput;
