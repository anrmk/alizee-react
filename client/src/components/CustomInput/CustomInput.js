import React from "react";
import clsx from 'clsx';
import { Typography, FormControl, InputLabel,  } from "@material-ui/core";

import StyledInput, { useStyles } from "./styles";

export default function CustomInput({
  label,
  error,
  helperText,
  wrapperClassName,
  inputClassName,
  htmlFor,
  variant = "outlined",
  ...rest
}) {
  const classes = useStyles();

  const renderInput = (props, error, helperText) => (
    <>
      <StyledInput {...props} className={clsx(inputClassName && inputClassName, error && classes.errorInput)} />
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
      <FormControl className={wrapperClassName} variant={variant} >
        {label && <InputLabel className={clsx(classes.label, error && classes.errorLabel)} htmlFor={htmlFor}>{label}</InputLabel>}
        {renderInput(rest, error, helperText)}
      </FormControl>
    </>
  );
}