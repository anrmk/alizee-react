import React from "react";
import { CardHeader, Typography, Hidden, IconButton } from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBackRounded";

function SettingsHeader({ onBackClick, title, subheader }) {
  return (
    <>
      <Hidden mdUp>
        <CardHeader
          avatar={
            <IconButton onClick={onBackClick}>
              <BackIcon />
            </IconButton>
          }
          subheader={subheader}
          title={<Typography variant="h5">{title}</Typography>}
        />
      </Hidden>
      <Hidden smDown>
        <CardHeader
          title={<Typography variant="h5">{title}</Typography>}
          subheader={subheader}
        />
      </Hidden>
    </>
  );
}

export default SettingsHeader;
