import React from "react";
import { useHistory } from "react-router-dom";

import {
  SETTINGS_NOTIFICATIONS_PUSH_ROUTE,
  SETTINGS_NOTIFICATIONS_EMAIL_ROUTE,
  SETTINGS_NOTIFICATIONS_SITE_ROUTE,
  SETTINGS_NOTIFICATIONS_TOAST_ROUTE,
} from "../../../constants/routes";

import { Card, CardContent, CardHeader, Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import WebIcon from "@material-ui/icons/WebOutlined";
import EmailIcon from "@material-ui/icons/EmailOutlined";
import LanguageIcon from "@material-ui/icons/LanguageOutlined";
import ViewDayIcon from "@material-ui/icons/ViewDayOutlined";
import ChevronRightIcon from "@material-ui/icons/ChevronRightOutlined";

function GeneralNotificationSettings() {
  const history = useHistory();

  return (
    <Card>
      <CardHeader title="Notifications Settings" />
      <Divider />
      <CardContent>
        <List disablePadding>
          <ListItem button alignItems="flex-start" onClick={() => history.push(SETTINGS_NOTIFICATIONS_PUSH_ROUTE)}>
            <ListItemIcon>
              <WebIcon />
            </ListItemIcon>
            <ListItemText
              primary="Push notifications"
              secondary="Get push notifications to find out what’s going on when you’re not on TheMembers. You can turn them off anytime."
            />
            <ChevronRightIcon />
          </ListItem>

          <ListItem button alignItems="flex-start" onClick={() => history.push(SETTINGS_NOTIFICATIONS_EMAIL_ROUTE)}>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText
              primary="Email notifications"
              secondary="Get emails to find out what’s going on when you’re not on TheMembers. You can turn them off anytime."
            />
            <ChevronRightIcon />
          </ListItem>

          <ListItem button alignItems="flex-start" onClick={() => history.push(SETTINGS_NOTIFICATIONS_SITE_ROUTE)}>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Site notifications" />
            <ChevronRightIcon />
          </ListItem>

          <ListItem button alignItems="flex-start" onClick={() => history.push(SETTINGS_NOTIFICATIONS_TOAST_ROUTE)}>
            <ListItemIcon>
              <ViewDayIcon />
            </ListItemIcon>
            <ListItemText primary="Toast notifications" />
            <ChevronRightIcon />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

export default GeneralNotificationSettings;
