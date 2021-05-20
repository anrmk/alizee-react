import React from "react";
import clsx from "clsx";
import { Box, Button, Card, CardContent, Typography, Divider, Grid } from "@material-ui/core";

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
      <Card>
        <CardContent>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Box className={classes.logoImage} />
              <Typography variant="body2" color="textSecondary" align="center">
                Sign up to make money and interact with your fans!
              </Typography>
            </Grid>

            <Grid item>
              <SocialButtons
                className={clsx(classes.formElement, helpComponent && classes.formElementIndent)}
                googleClientId={GOOGLE_CLIENT_ID}
                onRequest={onSocialRequest}
                onSuccess={onSocialSuccess}
                onFailure={onSocialFailure}
              />
            </Grid>

            <Grid item>
              <DividerWithText>or</DividerWithText>
            </Grid>

            <Grid item component="form" id={FORM_ID} onSubmit={onFormSubmit}>
              {children}
            </Grid>
            <Grid item>{helpComponent}</Grid>
            <Grid item>{error && <Alert severity="error">{error}</Alert>}</Grid>
            <Grid item>
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
            </Grid>

            <Grid item>
              <Typography variant="body2" color="textSecondary" align="center">
                {isSingUpForm
                  ? "By signing up you agree to our Terms of Service and Privacy Policy, and confirm that you are at least 18 years old."
                  : "Visit Help Center for additional help if you are unable to log in with your existing account"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box m={2} />

      <Card>
        <CardContent>{endComponent}</CardContent>
      </Card>
    </Box>
  );
}

export default AuthBaseForm;
