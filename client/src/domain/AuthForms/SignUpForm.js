import React from "react";
import { Controller, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Card, CardContent, Link, TextField, Typography } from "@material-ui/core";

import { SIGN_IN_ROUTE } from "../../constants/routes";
import { getYearFromCurrentDate } from "../../helpers/functions";
import CONTROLLERS from "../../constants/endpoints";
import AuthBaseForm from "./AuthBaseForm";
import useStyles from "./styles";

const NAME_INPUT_ID = "firstName";
const SURNAME_INPUT_ID = "surname";
const BIRTHDAY_INPUT_ID = "birthday";
const USERNAME_INPUT_ID = "username";
const EMAIL_INPUT_ID = "email";

const EMPTY_VALUE_ERROR = "It is a required filed";
const INVALID_EMAIL_ERROR = "Must be a valid email";
const BIRTHDAY_LESS_200_ERROR = "Must be +18 years";
const BIRTHDAY_GREATER_18_ERROR = "Guinness world record is 200 years";
const VALUE_MIN_LENGTH = (min) => `Must be at least ${min} characters`;
const VALUE_MAX_LENGTH = (max) => `Must be at most ${max} characters`;

const schema = yup.object().shape({
  [NAME_INPUT_ID]: yup.string().required(EMPTY_VALUE_ERROR).min(2, VALUE_MIN_LENGTH(2)).max(49, VALUE_MAX_LENGTH(49)),
  [SURNAME_INPUT_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
    .min(2, VALUE_MIN_LENGTH(2))
    .max(49, VALUE_MAX_LENGTH(49)),
  [BIRTHDAY_INPUT_ID]: yup
    .date()
    .nullable()
    .notRequired()
    .min(new Date(getYearFromCurrentDate(200), 0, 1), BIRTHDAY_GREATER_18_ERROR)
    .max(new Date(getYearFromCurrentDate(18), 0, 1), BIRTHDAY_LESS_200_ERROR),
  [USERNAME_INPUT_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
    .min(3, VALUE_MIN_LENGTH(3))
    .max(32, VALUE_MAX_LENGTH(32)),
  [EMAIL_INPUT_ID]: yup.string().required(EMPTY_VALUE_ERROR).email(INVALID_EMAIL_ERROR),
});

function SignUpForm({
  error,

  onSubmit,
  onSocialRequest,
  onSocialSuccess,
  onSocialFailure,
}) {
  const history = useHistory();
  const classes = useStyles();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const { errors, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [NAME_INPUT_ID]: "",
      [SURNAME_INPUT_ID]: "",
      [BIRTHDAY_INPUT_ID]: undefined,
      [USERNAME_INPUT_ID]: "",
      [EMAIL_INPUT_ID]: "",
    },
  });

  const handleFormSubmit = async (data) => {
    if (!executeRecaptcha) {
      return;
    }

    const token = await executeRecaptcha(CONTROLLERS.endpoints.signUp);

    if (!token) return;

    onSubmit && onSubmit({ ...data, token });
  };

  return (
    <AuthBaseForm
      isSingInForm={false}
      error={error}
      onFormSubmit={handleSubmit(handleFormSubmit)}
      onSocialRequest={onSocialRequest}
      onSocialSuccess={onSocialSuccess}
      onSocialFailure={onSocialFailure}
      endComponent={
        <>
          <Card>
            <CardContent>
              <Typography align="center">
                Already have an account? &nbsp;
                <Link
                  className={classes.link}
                  color="primary"
                  variant="body1"
                  onClick={() => history.push(SIGN_IN_ROUTE)}
                >
                  Sign In
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </>
      }
    >
      <Controller
        name={NAME_INPUT_ID}
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextField
            variant="outlined"
            fullWidth
            className={classes.formElementIndent}
            id={NAME_INPUT_ID}
            label="Name"
            type="text"
            value={value}
            error={!!errors[NAME_INPUT_ID]}
            helperText={errors[NAME_INPUT_ID]?.message}
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      />
      <Controller
        name={SURNAME_INPUT_ID}
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextField
            variant="outlined"
            fullWidth
            className={classes.formElementIndent}
            id={SURNAME_INPUT_ID}
            label="Surname"
            type="text"
            value={value}
            error={!!errors[SURNAME_INPUT_ID]}
            helperText={errors[SURNAME_INPUT_ID]?.message}
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      />
      <Controller
        name={USERNAME_INPUT_ID}
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextField
            variant="outlined"
            fullWidth
            className={classes.formElementIndent}
            id={USERNAME_INPUT_ID}
            label="Username"
            type="text"
            value={value}
            error={!!errors[USERNAME_INPUT_ID]}
            helperText={errors[USERNAME_INPUT_ID]?.message}
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      />
      <Controller
        name={EMAIL_INPUT_ID}
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextField
            variant="outlined"
            fullWidth
            className={classes.formElementIndent}
            id={EMAIL_INPUT_ID}
            label="Email"
            type="text"
            value={value}
            error={!!errors[EMAIL_INPUT_ID]}
            helperText={errors[EMAIL_INPUT_ID]?.message}
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      />
      <Controller
        name={BIRTHDAY_INPUT_ID}
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextField
            variant="outlined"
            fullWidth
            className={classes.formElementIndent}
            id={BIRTHDAY_INPUT_ID}
            type="date"
            value={value}
            error={!!errors[BIRTHDAY_INPUT_ID]}
            helperText={errors[BIRTHDAY_INPUT_ID]?.message}
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      />
    </AuthBaseForm>
  );
}

SignUpForm.propTypes = {
  error: PropTypes.string,

  onSubmit: PropTypes.func,
  onSocialRequest: PropTypes.func,
  onSocialSuccess: PropTypes.func,
  onSocialFailure: PropTypes.func,
};

SignUpForm.defaultProps = {
  error: "",

  onSubmit: undefined,
  onSocialRequest: undefined,
  onSocialSuccess: undefined,
  onSocialFailure: undefined,
};

export default SignUpForm;
