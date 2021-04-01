import React from "react";
import { GoogleLogin } from "react-google-login";
import PropTypes from "prop-types";
import { Avatar, Box, IconButton } from "@material-ui/core";

import { SOCIAL_GOOGLE, SOCIAL_TWITTER } from "../../constants/social_types";
import GoogleIcon from "../../assets/img/social-icons/google.svg";
import TwitterIcon from "../../assets/img/social-icons/twitter.svg";

import useStyles from "./styles";

function SocialButtons({
  className,
  googleClientId,

  onRequest,
  onSuccess,
  onFailure,
}) {
  const classes = useStyles();

  return (
    <Box className={className} display="flex" alignContent="center" justifyContent="center">
      <GoogleLogin
        clientId={googleClientId}
        render={(props) => (
          <IconButton {...props}>
            <Avatar src={GoogleIcon} className={classes.googleIcon} />
          </IconButton>
        )}
        onRequest={onRequest}
        onSuccess={(response) => onSuccess(response, SOCIAL_GOOGLE)}
        onFailure={onFailure}
      />
      <IconButton onClick={() => onSuccess(null, SOCIAL_TWITTER)}>
        <Avatar src={TwitterIcon} className={classes.googleIcon} />
      </IconButton>
    </Box>
  );
}

SocialButtons.propTypes = {
  className: PropTypes.string,
  googleClientId: PropTypes.string,

  onRequest: PropTypes.func,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
};

SocialButtons.defaultProps = {
  className: "",
  googleClientId: "",

  onRequest: undefined,
  onSuccess: undefined,
  onFailure: undefined,
};

export default SocialButtons;
