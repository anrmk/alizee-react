import React, { useContext, useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch
} from "@material-ui/core";

import ApiContext from "../../../context/ApiContext";
import { isEmptyObject } from "../../../helpers/functions";
import * as settingsActions from "../../../store/actions/settings";

function EmailNotificationsSettings({ data, getNotification, updateNotification }) {
  const apiClient = useContext(ApiContext);
  const [settings, setSettings] = useState({
    isActive: false,
    newsletter: false,
    like: false,
    goal: false,
    purchase: false,
    referral: false,
    subscriber: false,
    tip: false,
    renewal: false,
    returning: false,
    post: false,
    stream: false,
    messages: false,
  });

  useEffect(() => {
    getNotification(apiClient);
  }, []);

  useEffect(() => {
    if (!isEmptyObject(data)) {
      setSettings(data);
    }
  }, [data]);

  const handleSettingsChange = (e) => {
    var value = { ...settings };
    value[e.target.name] = e.target.checked;
    setSettings(value);

    if (!settings.isFetching) {
      (async () => {
        await updateNotification(apiClient, value);
      })();
    }
  };

  return (
    <Card>
      <CardHeader
        title="Email Notifications"
        subheader="Get emails to find out what’s going on when you’re not on site. You can turn them off anytime."
      />
      <CardContent>
        <List disablePadding onChange={handleSettingsChange}>
          <ListItem>
            <ListItemText primary="Email Notifications" />
            <ListItemSecondaryAction>
              <Switch checked={settings.isActive} name="isActive" />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="Monthly Newsletter" />
            <ListItemSecondaryAction>
              <Switch checked={settings.newsletter} name="newsletter" />
            </ListItemSecondaryAction>
          </ListItem>

          <ListSubheader>Related to you and your posts</ListSubheader>

          <ListItem>
            <ListItemText primary="New Likes Summary" />
            <ListItemSecondaryAction>
              <Switch checked={settings.like} disabled={!settings.isActive} name="like" />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="Campaign Goal Reached" />
            <ListItemSecondaryAction>
              <Switch checked={settings.goal} disabled={!settings.isActive} name="goal" />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="New Campaign Contribution" />
            <ListItemSecondaryAction>
              <Switch checked={settings.purchase} disabled={!settings.isActive} name="purchase" />
            </ListItemSecondaryAction>
          </ListItem>

          {/* <ListItem>
            <ListItemText primary="New Referral" />
            <ListItemSecondaryAction>
              <Switch checked={settings.referral} disabled={settings.isActive} name="referral" />
            </ListItemSecondaryAction>
          </ListItem> */}

          <ListItem>
            <ListItemText primary="New Subscriber" />
            <ListItemSecondaryAction>
              <Switch checked={settings.subscriber} disabled={!settings.isActive} name="subscriber" />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="New Tips" />
            <ListItemSecondaryAction>
              <Switch checked={settings.tip} disabled={!settings.isActive} name="tip" />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="Renewal" />
            <ListItemSecondaryAction>
              <Switch checked={settings.renewal} disabled={!settings.isActive} name="renewal" />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="Returning Subscriber" />
            <ListItemSecondaryAction>
              <Switch checked={settings.returning} disabled={!settings.isActive} name="returning" />
            </ListItemSecondaryAction>
          </ListItem>

          <ListSubheader>Subscriptions and following</ListSubheader>

          <ListItem>
            <ListItemText primary="New Posts Summary" />
            <ListItemSecondaryAction>
              <Switch checked={settings.post} disabled={!settings.isActive} name="post" />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="New Stream" />
            <ListItemSecondaryAction>
              <Switch checked={settings.stream} disabled={!settings.isActive} name="stream" />
            </ListItemSecondaryAction>
          </ListItem>

          <ListSubheader>New messages</ListSubheader>

          <ListItem>
            <ListItemText primary="New Private Message Summary" />
            <ListItemSecondaryAction>
              <Switch checked={settings.messages} disabled={!settings.isActive} name="messages" />
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getNotification: (api) => dispatch(settingsActions.getEmailNotification(api)),
    updateNotification: (api, data) => dispatch(settingsActions.updateEmailNotification(api, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailNotificationsSettings);