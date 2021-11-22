import React, { useContext, useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Card,
  CardContent,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
} from "@material-ui/core";
import SettingsHeader from "../../../components/SettingsHeader/SettingsHeader";

import ApiContext from "../../../context/ApiContext";
import { isEmptyObject } from "../../../helpers/functions";
import * as settingsActions from "../../../store/actions/settings";
import useAlert from "../../../hooks/useAlert";

function SiteNotificationSettings({
  data,
  requestStatus,

  getNotification,
  updateNotification,
  resetSettings,
  onBackClick,
}) {
  const apiClient = useContext(ApiContext);
  useAlert(requestStatus);
  const [settings, setSettings] = useState({
    isActive: false,
    like: false,
    comment: false,
    tagging: false,
    subscriber: false,
    acceptedRequest: false,
    tip: false,
    purchase: false,
    discount: false,
    stream: false,
  });

  useEffect(() => {
    getNotification(apiClient);
    return () => {
      resetSettings();
    };
  }, []);

  useEffect(() => {
    if (!isEmptyObject(data)) {
      setSettings(data);
    }
  }, [data]);

  const handleSettingsChange = (e) => {
    const value = { ...settings };
    value[e.target.name] = e.target.checked;
    setSettings(value);

    if (!settings.isFetching) {
      (async () => {
        updateNotification(apiClient, value);
      })();
    }
  };

  return (
    <Card>
      <SettingsHeader onBackClick={onBackClick} title="Site Notifications" />
      <Divider />
      <CardContent>
        <List disablePadding onChange={handleSettingsChange}>
          <ListItem>
            <ListItemText primary="Site Notifications" />
            <ListItemSecondaryAction>
              <Switch checked={settings.isActive} name="isActive" />
            </ListItemSecondaryAction>
          </ListItem>

          <ListSubheader>Related to you and your posts</ListSubheader>

          <ListItem>
            <ListItemText primary="New Campaign Contribution" />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.purchase}
                disabled={!settings.isActive}
                name="purchase"
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="New Comment" />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.comment}
                disabled={!settings.isActive}
                name="comment"
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="New Likes" />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.like}
                disabled={!settings.isActive}
                name="like"
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="New Subscriber" />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.subscriber}
                disabled={!settings.isActive}
                name="subscriber"
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="New Tips" />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.tip}
                disabled={!settings.isActive}
                name="tip"
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListSubheader>Subscriptions and following</ListSubheader>

          <ListItem>
            <ListItemText primary="Discounts from users I used to follow" />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.discount}
                disabled={!settings.isActive}
                name="discount"
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="Upcoming stream reminders" />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.stream}
                disabled={!settings.isActive}
                name="stream"
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    isFetching: state.settings.isFetching,
    data: state.settings.data,
    requestStatus: state.settings.requestStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getNotification: (api) =>
      dispatch(settingsActions.getSiteNotification(api)),
    updateNotification: (api, data) =>
      dispatch(settingsActions.updateSiteNotification(api, data)),
    resetSettings: () => dispatch(settingsActions.resetSettings()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteNotificationSettings);
