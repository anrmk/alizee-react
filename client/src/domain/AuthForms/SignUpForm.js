import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from "@material-ui/core";

import { PRIVACY_POLICY_ROUTE, SIGN_IN_ROUTE } from "../../constants/routes";
import CONTROLLERS from "../../constants/endpoints";
import AuthBaseForm from "./AuthBaseForm";
import useStyles from "./styles";

const USERNAME_INPUT_ID = "username";
const EMAIL_INPUT_ID = "email";
const PRIVACY_POLICY_CHECKBOX_ID = "privacyPolicy";

const EMPTY_VALUE_ERROR = "It is a required filed";
const INVALID_EMAIL_ERROR = "Must be a valid email";
const PRIVACY_POLICY_REQUIRED_ERROR = "Must Accept Privacy Policy";
const VALUE_MIN_LENGTH = (min) => `Must be at least ${min} characters`;
const VALUE_MAX_LENGTH = (max) => `Must be at most ${max} characters`;

const schema = yup.object().shape({
  [USERNAME_INPUT_ID]: yup
    .string()
    .required(EMPTY_VALUE_ERROR)
    .min(3, VALUE_MIN_LENGTH(3))
    .max(32, VALUE_MAX_LENGTH(32)),
  [EMAIL_INPUT_ID]: yup.string().required(EMPTY_VALUE_ERROR).email(INVALID_EMAIL_ERROR),
  [PRIVACY_POLICY_CHECKBOX_ID]: yup
    .bool()
    .oneOf([true], PRIVACY_POLICY_REQUIRED_ERROR)
    .required(EMPTY_VALUE_ERROR),
});

function SignUpForm({
  error,

  onSubmit,
  onSocialRequest,
  onSocialSuccess,
  onSocialFailure,
}) {
  const classes = useStyles();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const { errors, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [USERNAME_INPUT_ID]: "",
      [EMAIL_INPUT_ID]: "",
      [PRIVACY_POLICY_CHECKBOX_ID]: false,
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
      isSingUpForm={true}
      error={error}
      onFormSubmit={handleSubmit(handleFormSubmit)}
      onSocialRequest={onSocialRequest}
      onSocialSuccess={onSocialSuccess}
      onSocialFailure={onSocialFailure}
      endComponent={
        <Typography align="center">
          Already have an account? &nbsp;
          <Link className={classes.link} color="primary" to={SIGN_IN_ROUTE}>
            Sign In
          </Link>
        </Typography>
      }
    >
      <Controller
        name={EMAIL_INPUT_ID}
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextField
            variant="outlined"
            fullWidth
            id={EMAIL_INPUT_ID}
            label="Email"
            type="text"
            value={value}
            error={!!errors[EMAIL_INPUT_ID]}
            helperText={errors[EMAIL_INPUT_ID]?.message}
            onBlur={onBlur}
            inputProps={{
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      />

      <Box m={1} />

      <Controller
        name={USERNAME_INPUT_ID}
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextField
            variant="outlined"
            fullWidth
            id={USERNAME_INPUT_ID}
            label="Username"
            type="text"
            value={value}
            error={!!errors[USERNAME_INPUT_ID]}
            helperText={errors[USERNAME_INPUT_ID]?.message}
            onBlur={onBlur}
            inputProps={{
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      />

      <Controller
        name={PRIVACY_POLICY_CHECKBOX_ID}
        control={control}
        render={({ onChange, onBlur, value }) => (
          <FormControl
            error={!!errors[PRIVACY_POLICY_CHECKBOX_ID]}
            component="fieldset"
            className={classes.formElementIndent}
          >
            <FormControlLabel
              control={
                <Checkbox
                  id={PRIVACY_POLICY_CHECKBOX_ID}
                  onBlur={onBlur}
                  onChange={(e) => onChange(e.target.checked)}
                  checked={value}
                />
              }
              label={
                <Typography>
                  I agree with{" "}
                  <Link className={classes.link} color="primary" to={PRIVACY_POLICY_ROUTE}>
                    Conditions and Terms
                  </Link>
                </Typography>
              }
            />
            <FormHelperText error>{errors[PRIVACY_POLICY_CHECKBOX_ID]?.message}</FormHelperText>
          </FormControl>
        )}
      />
    </AuthBaseForm>
  );
}

export default SignUpForm;
