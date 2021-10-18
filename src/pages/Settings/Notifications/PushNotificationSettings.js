/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { connect } from "react-redux";

import {
  Card,
  CardContent,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Switch,
  Link,
} from "@material-ui/core";

import { HELP_ROUTE } from "../../../constants/routes";

import ApiContext from "../../../context/ApiContext";
import usePushNotifications from "../../../hooks/usePushNotifications";
import { isEmptyObject } from "../../../helpers/functions";
import * as settingsActions from "../../../store/actions/settings";
import SettingsHeader from "../../../domain/SettingsForms/SettingsHeader";

import { ALLOW_PUSH_NOTIFICATION } from "../../../constants/permissions";
import useAlert from "../../../hooks/useAlert";

function PushNotificationSettings({
  data,
  requestStatus,

  getNotification,
  updateNotification,
  resetSettings,
  onBackClick,
}) {
  const apiClient = useContext(ApiContext);
  const [settings, setSettings] = useState({
    isActive: false,
    like: false,
    comment: false,
    tagging: false,
    subscriber: false,
    acceptedRequest: false,
    tip: false,
    purchase: false,
    stream: false,
    direct: false,
    messages: false,
  });
  const {
    checkPermission,
    subscribeUserToggle,
    isSubscribed,
    isDisable,
    subscription,
  } = usePushNotifications();

  const history = useHistory();
  useAlert(requestStatus);

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

  const handleSettingsChange = async (e) => {
    const value = { ...settings };
    value[e.target.name] = e.target.checked;

    let subscriptionValue = subscription;
    if (e.target.name === "isActive") {
      subscriptionValue = await subscribeUserToggle();

      const permission = checkPermission();
      if (permission !== ALLOW_PUSH_NOTIFICATION) {
        return;
      }
    }

    if (subscriptionValue) {
      const {
        endpoint: endPoint,
        keys: { auth, p256dh },
      } = JSON.parse(subscriptionValue);
      subscriptionValue = { endPoint, auth, p256dh };
    } else {
      value.isActive = false;
      subscriptionValue = { endPoint: "", auth: "", p256dh: "" };
    }

    setSettings(value);
    if (!settings.isFetching) {
      (async () => {
        updateNotification(apiClient, {
          ...value,
          ...subscriptionValue,
        });
      })();
    }
  };
  return (
    <Card>
      <SettingsHeader
        onBackClick={onBackClick}
        title="Push Notifications"
        subheader="Get push notifications to find out what’s going on when you’re not on site. You can turn them off anytime."
      />
      <Divider />
      <CardContent>
        <List disablePadding onChange={handleSettingsChange}>
          <ListItem>
            <ListItemText
              primary="New Campaign Contribution"
              // TODO:  create the reasons not enable push notification in help.
              secondary={
                isDisable && (
                  <>
                    Not enabled in browser.{" "}
                    <Link href="#" onClick={() => history.push(HELP_ROUTE)}>
                      The reasons
                    </Link>
                  </>
                )
              }
            />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.isActive && isSubscribed}
                name="isActive"
                disabled={isDisable}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListSubheader>Related to you and your posts</ListSubheader>

          <ListItem>
            <ListItemText primary="New Campaign Contribution" />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.purchase}
                disabled={!isSubscribed}
                name="purchase"
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="New Comment" />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.comment}
                disabled={!isSubscribed}
                name="comment"
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="New Likes" />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.like}
                disabled={!isSubscribed}
                name="like"
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="New Subscriber" />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.subscriber}
                disabled={!isSubscribed}
                name="subscriber"
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="New Tips" />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.tip}
                disabled={!isSubscribed}
                name="tip"
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListSubheader>Subscriptions and following</ListSubheader>

          <ListItem>
            <ListItemText primary="New Stream" />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.stream}
                disabled={!isSubscribed}
                name="stream"
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListSubheader>New messages</ListSubheader>

          <ListItem>
            <ListItemText primary="Important Direct Messages" />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.direct}
                disabled={!isSubscribed}
                name="direct"
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="New Messages" />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.messages}
                disabled={!isSubscribed}
                name="messages"
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
      dispatch(settingsActions.getPushNotification(api)),
    updateNotification: (api, data) =>
      dispatch(settingsActions.updatePushNotification(api, data)),
    resetSettings: () => dispatch(settingsActions.resetSettings()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PushNotificationSettings);
