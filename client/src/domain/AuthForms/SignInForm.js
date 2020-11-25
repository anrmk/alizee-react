import React from "react";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { 
  Typography, 
  Card,
  CardContent,
  Divider,
  Link
} from "@material-ui/core";

import CustomInput from "../../components/CustomInput";
import { RESET_PASSWORD_ROUTE, SIGN_UP_ROUTE } from "../../constants/routes";
import AuthBaseForm from "./AuthBaseForm";
import useStyles from "./styles";

const EMAIL_INPUT_ID = "email";
const PASSWORD_INPUT_ID = "password";

const INVALID_EMAIL_ERROR = "Must be a valid email";
const EMPTY_VALUE_ERROR = "It is a required filed";

const schema = yup.object().shape({
  [EMAIL_INPUT_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
    .email(INVALID_EMAIL_ERROR),
  [PASSWORD_INPUT_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
});

function SignInForm({
  error,

  onSubmit,
  onSocialRequest,
  onSocialSuccess,
  onSocialFailure
}) {
  const history = useHistory();
  const classes = useStyles();

  const { errors, control, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <AuthBaseForm
      error={error}
      onFormSubmit={handleSubmit(onSubmit)}
      onSocialRequest={onSocialRequest}
      onSocialSuccess={onSocialSuccess}
      onSocialFailure={onSocialFailure}
      formComponent={(
        <>
          <Controller
            name={EMAIL_INPUT_ID}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <CustomInput
                id={EMAIL_INPUT_ID}
                htmlFor={EMAIL_INPUT_ID}
                name={EMAIL_INPUT_ID}
                disableUnderline
                label="Email"
                type="text"
                wrapperClassName={classes.formElement}
                value={value}
                error={!!errors[EMAIL_INPUT_ID]}
                helperText={errors[EMAIL_INPUT_ID]?.message}
                onBlur={onBlur}
                onChange={e => onChange(e.target.value)} />
            )} />
          <Controller
            name={PASSWORD_INPUT_ID}
            control={control}
            render={({ onChange, onBlur, value }) => (
              <CustomInput
                id={PASSWORD_INPUT_ID}
                htmlFor={PASSWORD_INPUT_ID}
                name={PASSWORD_INPUT_ID}
                disableUnderline
                label="Password"
                type="password"
                wrapperClassName={classes.formElement}
                value={value}
                error={!!errors[PASSWORD_INPUT_ID]}
                helperText={errors[PASSWORD_INPUT_ID]?.message}
                onBlur={onBlur}
                onChange={e => onChange(e.target.value)} />
            )} />
        </>
      )}
      helpComponent={(
        <>
          <Divider className={classes.formElement} />
          <Typography className={classes.helpText}>
            <Link
              className={classes.link}
              color="primary"
              variant="body1"
              onClick={() => history.push(RESET_PASSWORD_ROUTE)}>
              Forgot password?
            </Link>
          </Typography>
        </>
      )}
      endComponent={(
        <>
          <Card>
            <CardContent>
              <Typography className={classes.helpText}>
                Don't have an account? &nbsp;
                <Link
                  className={classes.link}
                  color="primary"
                  variant="body1"
                  onClick={() => history.push(SIGN_UP_ROUTE)}>
                  Sign Up
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </>
      )} />
  );
}

export default SignInForm;
