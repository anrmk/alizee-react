import React from "react";
import clsx from "clsx";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button
} from "@material-ui/core";

import SocialButtons from "../../components/SocialButtons/SocialButtons";

import { GOOGLE_CLIENT_ID } from "../../constants/social_client_ids";
import useStyles from "./styles";

function AuthBaseForm({
  error,

  children,
  formComponent,
  helpComponent,
  endComponent,

  onFormSubmit,
  onSocialRequest,
  onSocialSuccess,
  onSocialFailure
}) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} sm={5} md={3} lg={3} xl={3}>
        <Card className={classes.formElementIndent}>
          <CardContent>
            <Typography align="center" className={classes.formElementIndent} variant="h5" component="h1">
              Alizee
            </Typography>
            <form onSubmit={onFormSubmit}>
              {formComponent || children}
              {error && (
                <Typography className={clsx(classes.formElement, classes.formElementIndent)} color="secondary" variant="caption" component="span">
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
                  color="primary">
                  Sign In
                </Button>
                <SocialButtons
                  className={clsx(classes.formElement, helpComponent && classes.formElementIndent)}
                  googleClientId={GOOGLE_CLIENT_ID}
                  onRequest={onSocialRequest}
                  onSuccess={onSocialSuccess}
                  onFailure={onSocialFailure} />
              </Box>
            </form>
            {helpComponent}
          </CardContent>
        </Card>
        {endComponent}
      </Grid>
    </Grid>
  );
}

export default AuthBaseForm;
