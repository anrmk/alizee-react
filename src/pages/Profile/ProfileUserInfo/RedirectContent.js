import React from "react";

import { Typography, Divider, Box } from "@material-ui/core/";

function RedirectContent({ link }) {
  return (
    <Box textAlign="center">
      <Typography variant="subtitle1">
        You followed a link on <strong>TheMembers.com</strong> that redirects to
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        {link}
      </Typography>
      <Divider />
      <Box paddingTop={1}>
        <Typography variant="caption" component="p">
          Make sure to only follow links from sources you trust.
        </Typography>
        <Typography variant="caption" component="p">
          We&apos;re showing you this because our systems detected that link
          you&apos;re trying to follow may not take you where you intended to
          go.
        </Typography>
      </Box>
    </Box>
  );
}

export default RedirectContent;
