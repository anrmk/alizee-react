import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { SIGN_IN_ROUTE } from "../../constants/routes";

import { Box, Card, CardContent, Divider, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";
import MailIcon from "@material-ui/icons/Mail";

const RESEND_BTN_DISABLE_TIME = 30000;

function EmailCard({ onResendBtnClick }) {
  const classes = useStyles();
  const history = useHistory();
  const [resendBtnDisable, setResendBtnDisable] = useState(false);

  const handleResendBtnClick = (e) => {
    if (resendBtnDisable) return;

    setResendBtnDisable(true)
    setTimeout(() => setResendBtnDisable(false), RESEND_BTN_DISABLE_TIME);

    onResendBtnClick && onResendBtnClick(e);
  }

  return (
    <Card>
      <CardContent className={classes.root}>
        <Grid container direction="column" spacing={2} alignItems="center">
          <Grid item>
            <Box className={classes.circleIcon}>
              <MailIcon className={classes.icon} />
            </Box>
          </Grid>
          <Grid item>
            <Typography variant="h6" component="h6" gutterBottom>
              Email confirmation
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption" component="span" gutterBottom>
              Please check for an email and go to the link to verify your account
            </Typography>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              disableElevation
              disabled={resendBtnDisable}
              size="large"
              color="primary"
              variant="contained"
              onClick={handleResendBtnClick}
            >
              Resend confirmation link
            </Button>
            <Box width="100%" textAlign="center">
              {resendBtnDisable && <Typography variant="caption" color="textSecondary">You can resend the link in 30 seconds</Typography>}
            </Box>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              disableElevation
              variant="contained"
              onClick={() => history.push(SIGN_IN_ROUTE)}
            >
              Back To Login
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default EmailCard;
