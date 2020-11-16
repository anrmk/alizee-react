import React from "react";
import { GoogleLogin } from "react-google-login";
import { Box, IconButton } from "@material-ui/core";

import { SOCIAL_GOOGLE } from "../../constants/social_types";
import GoogleIcon from "../../assets/img/social-icons/google.svg";

const useStyles = () => ({
  icon: {
    height: "20px",
    width: "20px",
  }
});

function SocialButtons({
  className,
  googleClientId,
  signIn,

  onRequest,
  onSuccess,
  onFailure
}) {
  const classes =  useStyles();

  return (
    <Box className={className} display="flex" alignContent="center" justifyContent="center">
      <GoogleLogin
        isSignedIn={signIn}
        clientId={googleClientId}
        render={(props) => (
          <IconButton {...props}>
            <img src={GoogleIcon} style={classes.icon} />
          </IconButton>
        )}
        onRequest={onRequest}
        onSuccess={(response) => onSuccess(response, SOCIAL_GOOGLE)}
        onFailure={onFailure}
      />
    </Box>
  )
}

export default SocialButtons;
