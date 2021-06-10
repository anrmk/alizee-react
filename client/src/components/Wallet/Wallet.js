import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../helpers/functions";

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Menu,
  IconButton,
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import TimelineIcon from "@material-ui/icons/TimelineOutlined";

import useStyles from "./styles";
import { STATISTICS_ROUTE, SETTINGS_CARD_ROUTE } from "../../constants/routes";

function Wallet({ deposit }) {
  const classes = useStyles();
  const [menuAnchor, setMenuAnchor] = useState(false);
  const menuId = "walletMenu";

  const handleMenuCloseClick = () => {
    setMenuAnchor(null);
  }

  return (
    <Box my={2}>
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton
              aria-controls={menuId}
              aria-label="Wallet menu"
              aria-haspopup="true"
              onClick={(e) => setMenuAnchor(e.currentTarget)}>
              <MoreVertIcon htmlColor="white" />
            </IconButton>
          }
          title={<Typography variant="h6">Wallet balance</Typography>}
        ></CardHeader>
        <CardContent className={classes.content}>
          <Typography variant="h5">{formatCurrency(deposit || 0)}</Typography>
        </CardContent>
      </Card>
      
      <Menu
        keepMounted
        id={menuId}
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={() => setMenuAnchor(null)}>
        <MenuItem
          to={STATISTICS_ROUTE}
          onClick={handleMenuCloseClick}
          component={Link}>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Statistics" />
        </MenuItem>
        <MenuItem
          to={SETTINGS_CARD_ROUTE} 
          onClick={handleMenuCloseClick}
          component={Link}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Wallet;
