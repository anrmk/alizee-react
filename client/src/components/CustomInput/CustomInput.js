import React from "react";
import clsx from 'clsx';
import { Typography, FormControl, InputLabel,  } from "@material-ui/core";

import CustomInput, { useStyles } from "./styles";

export default function({
  label,
  error,
  helperText,
  wrapperClassName,
  htmlFor,
  variant = "outlined",
  ...rest
}) {
  const classes = useStyles();

  const renderInput = (props, error, helperText) => (
    <>
      <CustomInput {...props} className={clsx(error && classes.errorInput)} />
      {error && helperText && (
        <Typography
          color="secondary"
          variant="caption"
          component="span"
          gutterBottom>
          {helperText}
        </Typography>
      )}
    </>
  );

  return (
    <>
      {label ? (
        <FormControl className={wrapperClassName} variant={variant} >
          <InputLabel className={clsx(classes.label, error && classes.errorLabel)} htmlFor={htmlFor}>{label}</InputLabel>
          {renderInput(rest, error, helperText)}
        </FormControl>
        ) : renderInput(rest, error, helperText)
      }
    </>
  );
}