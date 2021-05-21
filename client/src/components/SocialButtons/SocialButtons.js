import React from "react";
import { GoogleLogin } from "react-google-login";
import { Avatar, Box, Button } from "@material-ui/core";

import { SOCIAL_GOOGLE, SOCIAL_TWITTER } from "../../constants/social_types";
import GoogleIcon from "../../assets/img/social-icons/google.svg";
import TwitterIcon from "../../assets/img/social-icons/twitter.svg";

import useStyles from "./styles";

function SocialButtons({
  googleClientId,

  onRequest,
  onSuccess,
  onFailure,
}) {
  const classes = useStyles();

  return (
    <Box>
      <GoogleLogin
        clientId={googleClientId}
        render={(props) => (
          <Button
            {...props}
            variant="contained"
            color="secondary"
            disableElevation
            fullWidth
            startIcon={<Avatar src={GoogleIcon} className={classes.googleIcon} />}
          >
            SING IN WITH GOGGLE
          </Button>
        )}
        onRequest={onRequest}
        onSuccess={(response) => onSuccess(response, SOCIAL_GOOGLE)}
        onFailure={onFailure}
      />
      <Box m={1}></Box>
      <Button
        variant="contained"
        color="secondary"
        disableElevation
        fullWidth
        onClick={() => onSuccess(null, SOCIAL_TWITTER)}
        startIcon={<Avatar src={TwitterIcon} className={classes.googleIcon} />}
      >
        SIGN IN WITH TWITTER
      </Button>
    </Box>
  );
}

export default SocialButtons;