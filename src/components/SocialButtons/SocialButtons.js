import React from "react";
import { GoogleLogin } from "react-google-login";
import { Avatar, Box, Button } from "@material-ui/core";

import GoogleIcon from "../../assets/img/social-icons/google.svg";

import { SOCIAL_GOOGLE, SOCIAL_TWITTER } from "../../constants/social_types";
import { TwitterIcon } from "../Icons";

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
            color="primary"
            disableElevation
            fullWidth
            startIcon={
              <Box className="">
                <Avatar src={GoogleIcon} className={classes.googleIcon} />
              </Box>
            }>
            SIGN IN WITH GOOGLE
          </Button>
        )}
        onRequest={onRequest}
        onSuccess={(response) => onSuccess(response, SOCIAL_GOOGLE)}
        onFailure={onFailure}
      />
      <Box m={1} />
      <Button
        variant="contained"
        color="secondary"
        disableElevation
        fullWidth
        onClick={() => onSuccess(null, SOCIAL_TWITTER)}
        startIcon={<TwitterIcon />}>
        SIGN IN WITH TWITTER
      </Button>
    </Box>
  );
}

export default SocialButtons;
