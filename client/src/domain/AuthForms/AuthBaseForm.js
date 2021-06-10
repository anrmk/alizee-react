import React from "react";
import clsx from "clsx";
import { Box, Button, Card, CardContent, Typography } from "@material-ui/core";

import SocialButtons from "../../components/SocialButtons/SocialButtons";
import DividerWithText from "../../components/DividerWithText";

import { GOOGLE_CLIENT_ID } from "../../constants/social_client_ids";

import useStyles from "./styles";
import { Alert } from "@material-ui/lab";

const FORM_ID = "sign";

function AuthBaseForm({
  isSingUpForm,
  error,

  children,
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
      <Card className={classes.rootCard}>
        <CardContent>
          <Box direction="column">
            <Box marginBottom="16px">
              <Box className={classes.logoImage} />
              <Typography variant="body2" color="textSecondary" align="center">
                Sign up to make money and interact with your fans!
              </Typography>
            </Box>

            <Box marginBottom="16px">
              <SocialButtons
                className={clsx(classes.formElement, helpComponent && classes.formElementIndent)}
                googleClientId={GOOGLE_CLIENT_ID}
                onRequest={onSocialRequest}
                onSuccess={onSocialSuccess}
                onFailure={onSocialFailure}
              />
            </Box>

            <Box marginBottom="16px">
              <DividerWithText>or</DividerWithText>
            </Box>

            <Box marginBottom="16px" component="form" id={FORM_ID} onSubmit={onFormSubmit}>
              {children}
            </Box>
            <Box marginBottom="16px">{helpComponent}</Box>
            <Box marginBottom="16px">{error && <Alert severity="error">{error}</Alert>}</Box>
            <Box marginBottom="16px">
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
            </Box>

            <Box>
              <Typography variant="body2" color="textSecondary" align="center">
                {isSingUpForm
                  ? "By signing up you agree to our Terms of Service and Privacy Policy, and confirm that you are at least 18 years old."
                  : "Visit Help Center for additional help if you are unable to log in with your existing account"}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Box m={2} />

      <Card className={classes.helpCard}>
        <CardContent>{endComponent}</CardContent>
      </Card>
    </Box>
  );
}

export default AuthBaseForm;
