import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  ButtonBase
} from "@material-ui/core";

import { PROFILE_ROUTE } from "../../constants/routes";
import Avatar from "../../components/Avatar/Avatar";
import useStyles from "./styles";

function SidebarToolbar({
  name,
  username,
  avatarUrl
}) {
  const classes = useStyles();

  return (
    <Box className={classes.toolbarRoot}>
      <ButtonBase className={classes.toolbar} to={PROFILE_ROUTE(username)} component={Link}>
        <Avatar className={classes.avatarToolbar} src={avatarUrl} size="upperMedium" avatarBaseProps={{ variant: "circular" }} />
        <Typography className={classes.nameToolbar} variant="body1" noWrap>
          {name}
        </Typography>
      </ButtonBase>
    </Box>
  )
}

export default SidebarToolbar;
