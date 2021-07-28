import React from "react";
import PropTypes from "prop-types";

import { Box, IconButton } from "@material-ui/core";

import LinkIcon from "@material-ui/icons/Link";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import PinterestIcon from "@material-ui/icons/Pinterest";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";

function SocialControl({ urls, onClick }) {
  const renderIcon = (url) => {
    if (url.includes("instagram.com")) {
      return <InstagramIcon />;
    }
    if (url.includes("facebook.com")) {
      return <FacebookIcon />;
    }
    if (url.includes("linkedin.com")) {
      return <LinkedInIcon />;
    }
    if (url.includes("pinterest.com")) {
      return <PinterestIcon />;
    }
    if (url.includes("twitter.com/")) {
      return <TwitterIcon />;
    }
    if (url.includes("youtube.com")) {
      return <YouTubeIcon />;
    }
    return <LinkIcon />;
  };

  return (
    <Box display="flex" flexDirection="row-reverse">
      {urls.map((item) => (
        <IconButton onClick={() => onClick && onClick(item)} key={item}>
          {renderIcon(item)}
        </IconButton>
      ))}
    </Box>
  );
}

SocialControl.propTypes = {
  urls: PropTypes.array,
  onClick: PropTypes.func,
};

SocialControl.defaultProps = {
  urls: [],
  onClick: undefined,
};

export default SocialControl;
