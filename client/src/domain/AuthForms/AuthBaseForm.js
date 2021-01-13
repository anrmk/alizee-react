import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Box, Typography, Card, CardContent, Button } from "@material-ui/core";

import SocialButtons from "../../components/SocialButtons/SocialButtons";

import { GOOGLE_CLIENT_ID } from "../../constants/social_client_ids";
import useStyles from "./styles";

function AuthBaseForm({
  isSingInForm = true,
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
    <Box>
      <Card className={classes.formElementIndent}>
        <CardContent>
          <Box className={clsx(classes.logoBox, classes.formElementIndent)}>
            <Box className={classes.logoImage} />
          </Box>
          <form onSubmit={onFormSubmit} autoComplete="off">
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
            <Box>
              <Button
                fullWidth
                className={classes.formElementIndent}
                disableElevation
                type="submit"
                variant="contained"
                color="primary"
              >
                {isSingInForm ? "Sign In" : "Sing Up"}
              </Button>
              <SocialButtons
                className={clsx(classes.formElement, helpComponent && classes.formElementIndent)}
                googleClientId={GOOGLE_CLIENT_ID}
                onRequest={onSocialRequest}
                onSuccess={onSocialSuccess}
                onFailure={onSocialFailure}
              />
            </Box>
          </form>
          {helpComponent}
        </CardContent>
      </Card>
      {endComponent}
    </Box>
  );
}

AuthBaseForm.propTypes = {
  isSingInForm: PropTypes.bool,
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
  isSingInForm: true,
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
