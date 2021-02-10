import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Grid, Divider, Typography, Switch, FormControl, FormControlLabel, FormGroup } from "@material-ui/core";

const defaultSettings = {
  like: false,
  comment: false,
  tagging: false,
  subscriber: false,
  acceptedRequest: false,
  tip: false,
  purchase: false,
};

function NotificationForm(props) {
  const { loading } = props;
  const { onChange } = props;
  const [settings, setSettings] = useState(props);

  useEffect(() => {
    setSettings({
      like: props.like,
      comment: props.comment,
      tagging: props.tagging,
      subscriber: props.subscriber,
      acceptedRequest: props.acceptedRequest,
      tip: props.tip,
      purchase: props.purchase,
    });
  }, [props]);

  const handleNotificationSettingChange = (e) => {
    var ns = { ...settings };
    ns[e.target.name] = e.target.checked;

    setSettings(ns);
    onChange && onChange(ns);
  };

  return (
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <FormControlLabel
          label="New Likes"
          labelPlacement="end"
          control={<Switch checked={settings.like} onChange={handleNotificationSettingChange} name="like" />}
        />
        <Typography variant="subtitle2"></Typography>
      </Grid>

      <Divider />

      <Grid item>
        <FormControlLabel
          label="New Comments"
          labelPlacement="end"
          control={<Switch checked={settings.comment} onChange={handleNotificationSettingChange} name="comment" />}
        />
        <Typography variant="subtitle2"></Typography>
      </Grid>

      <Divider />

      <Grid item>
        <FormControlLabel
          label="New User Tagging"
          labelPlacement="end"
          control={<Switch checked={settings.tagging} onChange={handleNotificationSettingChange} name="tagging" />}
        />
        <Typography variant="subtitle2"></Typography>
      </Grid>

      <Divider />

      <Grid item>
        <FormControlLabel
          label="New Subscriber"
          labelPlacement="end"
          control={
            <Switch checked={settings.subscriber} onChange={handleNotificationSettingChange} name="subscriber" />
          }
        />
        <Typography variant="subtitle2">
          When you turn on notifications for someone you follow, you'll get a notification every time that they share a
          photo or video.
        </Typography>
      </Grid>

      <Divider />

      <Grid item>
        <FormControlLabel
          label="Accepted Follow Requests"
          labelPlacement="end"
          control={
            <Switch
              checked={settings.acceptedRequest}
              onChange={handleNotificationSettingChange}
              name="acceptedRequest"
            />
          }
        />
        <Typography variant="subtitle2"></Typography>
      </Grid>

      <Divider />

      <Grid item>
        <FormControlLabel
          label="New Tip"
          labelPlacement="end"
          control={<Switch checked={settings.tip} onChange={handleNotificationSettingChange} name="tip" />}
        />
        <Typography variant="subtitle2"></Typography>
      </Grid>

      <Divider />

      <Grid item>
        <FormControlLabel
          label="New Purchase"
          labelPlacement="end"
          control={<Switch checked={settings.purchase} onChange={handleNotificationSettingChange} name="purchase" />}
        />
        <Typography variant="subtitle2"></Typography>
      </Grid>
    </Grid>
  );
}

NotificationForm.propTypes = {
  like: PropTypes.bool,
  comment: PropTypes.bool,
  tagging: PropTypes.bool,
  subscriber: PropTypes.bool,
  acceptedRequest: PropTypes.bool,
  tip: PropTypes.bool,
  purchase: PropTypes.bool,
  loading: PropTypes.bool,

  onChange: PropTypes.func
}

NotificationForm.defaultProps = {
  like: false,
  comment: false,
  tagging: false,
  subscriber: false,
  acceptedRequest: false,
  tip: false,
  purchase: false,
  loading: false,

  onChange: undefined
}


export default NotificationForm;
