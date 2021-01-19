import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";

import SocialButtons from "../../components/SocialButtons/SocialButtons";

import { GOOGLE_CLIENT_ID } from "../../constants/social_client_ids";

import useStyles from "./styles";

const FORM_ID = "signUp";

function AuthBaseForm({
  isSingUpForm,
  error,

  children,
  formComponent,
  helpComponent,
  endComponent,

  onFormSubmit,
  onSocialRequest,
  onSocialSuccess,
  onSocialFailure,
}) {
  const classes = useStyles();

  return (
    <Box textAlign="center">
      <Card className={classes.formElementIndent}>
        <CardContent>
          <Box className={clsx(classes.logoBox, classes.formElementIndent)}>
            <Box className={classes.logoImage} />
          </Box>
          <form id={FORM_ID} onSubmit={onFormSubmit} autoComplete="off">
            {formComponent || children}
            {error && (
              <Typography
                className={clsx(classes.formElement, classes.formElementIndent)}
                color="secondary"
                variant="caption"
                component="span"
              >
                {error}
              </Typography>
            )}
          </form>
          <Box>
            <Button
              form={FORM_ID}
              fullWidth
              className={classes.formElementIndent}
              disableElevation
              type="submit"
              variant="contained"
              color="primary"
            >
              {isSingUpForm ? "Sing Up" : "Sign In"}
            </Button>
            <SocialButtons
              className={clsx(classes.formElement, helpComponent && classes.formElementIndent)}
              googleClientId={GOOGLE_CLIENT_ID}
              onRequest={onSocialRequest}
              onSuccess={onSocialSuccess}
              onFailure={onSocialFailure}
            />
          </Box>
          {helpComponent}
        </CardContent>
      </Card>
      {endComponent}
    </Box>
  );
}

AuthBaseForm.propTypes = {
  isSingUpForm: PropTypes.bool,
  error: PropTypes.string,

  children: PropTypes.any,
  formComponent: PropTypes.any,
  helpComponent: PropTypes.any,
  endComponent: PropTypes.any,

  onFormSubmit: PropTypes.func,
  onSocialRequest: PropTypes.func,
  onSocialSuccess: PropTypes.func,
  onSocialFailure: PropTypes.func,
};

AuthBaseForm.defaultProps = {
  isSingUpForm: true,
  error: "",

  children: null,
  formComponent: null,
  helpComponent: null,
  endComponent: null,

  onFormSubmit: undefined,
  onSocialRequest: undefined,
  onSocialSuccess: undefined,
  onSocialFailure: undefined,
};

export default AuthBaseForm;
