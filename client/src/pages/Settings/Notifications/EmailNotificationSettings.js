import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Select,
  Divider,
  Typography,
} from "@material-ui/core";

import ApiContext from "../../../context/ApiContext";
import { isEmptyObject } from "../../../helpers/functions";
import * as settingsActions from "../../../store/actions/settings";

const ISACTIVE_INPUT_ID = "isActive";
const NEWSLETTER_INPUT_ID = "newsletter";
const LIKE_INPUT_ID = "like";
const LIKEFREQUENCY_INPUT_ID = "likeFrequency";
const GOAL_INPUT_ID = "goal";
const PURCHASE_INPUT_ID = "purchase";
const REFERRAL_INPUT_ID = "referral";
const SUBSCRIBER_INPUT_ID = "subscriber";
const TIP_INPUT_ID = "tip";
const RENEWAL_INPUT_ID = "renewal";
const RETURNING_INPUT_ID = "returning";
const POST_INPUT_ID = "post";
const POSTFREQUENCY_INPUT_ID = "postFrequency";
const STREAM_INPUT_ID = "stream";
const UPCOMMINGSTREAM_INPUT_ID = "upcommingStream";
const MESSAGES_INPUT_ID = "messages";
const MESSAGESFREQUENCY_INPUT_ID = "messagesFrequency";

const schema = yup.object().shape({
  [ISACTIVE_INPUT_ID]: yup.bool().required(),
  [NEWSLETTER_INPUT_ID]: yup.bool().required(),
  [LIKE_INPUT_ID]: yup.bool().required(),
  [LIKEFREQUENCY_INPUT_ID]: yup.number().required(),
  [GOAL_INPUT_ID]: yup.bool().required(),
  [PURCHASE_INPUT_ID]: yup.bool().required(),
  [REFERRAL_INPUT_ID]: yup.bool().required(),
  [SUBSCRIBER_INPUT_ID]: yup.bool().required(),
  [TIP_INPUT_ID]: yup.bool().required(),
  [RENEWAL_INPUT_ID]: yup.bool().required(),
  [RETURNING_INPUT_ID]: yup.bool().required(),
  [POST_INPUT_ID]: yup.bool().required(),
  [POSTFREQUENCY_INPUT_ID]: yup.number().required(),
  [STREAM_INPUT_ID]: yup.bool().required(),
  [UPCOMMINGSTREAM_INPUT_ID]: yup.bool().required(),
  [MESSAGES_INPUT_ID]: yup.bool().required(),
  [MESSAGESFREQUENCY_INPUT_ID]: yup.number().required(),
});

function EmailNotificationsSettings({ isFetching, data, getNotification, updateNotification, onSetAlertText }) {
  const apiClient = useContext(ApiContext);

  const { reset, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      [ISACTIVE_INPUT_ID]: data?.isActive ?? false,
      [NEWSLETTER_INPUT_ID]: data?.newsletter ?? false,
      [LIKE_INPUT_ID]: data?.like ?? false,
      [LIKEFREQUENCY_INPUT_ID]: data?.likeFrequency ?? 24,
      [GOAL_INPUT_ID]: data?.goal ?? false,
      [PURCHASE_INPUT_ID]: data?.purchase ?? false,
      [REFERRAL_INPUT_ID]: data?.referral ?? false,
      [SUBSCRIBER_INPUT_ID]: data?.subheader ?? false,
      [TIP_INPUT_ID]: data?.tip ?? false,
      [RENEWAL_INPUT_ID]: data?.renewal ?? false,
      [RETURNING_INPUT_ID]: data?.returning ?? false,
      [POST_INPUT_ID]: data?.post ?? false,
      [POSTFREQUENCY_INPUT_ID]: data?.postFrequency ?? 24,
      [STREAM_INPUT_ID]: data?.stream ?? false,
      [UPCOMMINGSTREAM_INPUT_ID]: data?.upcommingStream ?? false,
      [MESSAGES_INPUT_ID]: data?.messages ?? false,
      [MESSAGESFREQUENCY_INPUT_ID]: data?.messagesFrequency ?? 24,
    },
  });

  useEffect(() => {
    getNotification(apiClient);
  }, []);

  useEffect(() => {
    if (!isEmptyObject(data)) {
      reset(data);
    }
  }, [data]);

  const handleSettingsChange = (data) => {
    if (!isFetching) {
      (async () => {
        const fulfilled = await updateNotification(apiClient, data);
        onSetAlertText(fulfilled);
      })();
    }
  };

  const renderSwitchControl = (name, disabled) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Switch
            checked={value}
            id={name}
            onBlur={onBlur}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
          />
        )}
      />
    );
  };

  const renderSelectControl = (name, disabled) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Select
            native
            fullWidth
            variant="outlined"
            value={value}
            disabled={disabled}
            onBlur={onBlur}
            onChange={onChange}
          >
            <option value={1}>Every hour</option>
            <option value={3}>Every 3 hours</option>
            <option value={6}>Every 6 hours</option>
            <option value={12}>Every 12 hours</option>
            <option value={24}>Every 24 hours</option>
          </Select>
        )}
      />
    );
  };

  return (
    <Card>
      <CardHeader
        title="Email Notifications"
        subheader="Get emails to find out what’s going on when you’re not on site. You can turn them off anytime."
      />

      <Divider />

      <CardContent>
        <List disablePadding onChange={handleSubmit(handleSettingsChange)}>
          <ListItem>
            <ListItemText primary="Email Notifications" />
            <ListItemSecondaryAction>{renderSwitchControl(ISACTIVE_INPUT_ID)}</ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="Monthly Newsletter" />
            <ListItemSecondaryAction>
              {renderSwitchControl(NEWSLETTER_INPUT_ID, !watch(ISACTIVE_INPUT_ID))}
            </ListItemSecondaryAction>
          </ListItem>

          <ListSubheader>Related to you and your posts</ListSubheader>

          <ListItem>
            <ListItemText>
              <Typography>New Likes Summary</Typography>
              {renderSelectControl(LIKEFREQUENCY_INPUT_ID, !watch(LIKE_INPUT_ID) || !watch(ISACTIVE_INPUT_ID))}
            </ListItemText>
            <ListItemSecondaryAction>
              {renderSwitchControl(LIKE_INPUT_ID, !watch(ISACTIVE_INPUT_ID))}
            </ListItemSecondaryAction>
          </ListItem>

          <Divider component="li" />

          <ListItem>
            <ListItemText primary="Campaign Goal Reached" />
            <ListItemSecondaryAction>
              {renderSwitchControl(GOAL_INPUT_ID, !watch(ISACTIVE_INPUT_ID))}
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="New Campaign Contribution" />
            <ListItemSecondaryAction>
              {renderSwitchControl(PURCHASE_INPUT_ID, !watch(ISACTIVE_INPUT_ID))}
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="New Referral" />
            <ListItemSecondaryAction>
              {renderSwitchControl(REFERRAL_INPUT_ID, !watch(ISACTIVE_INPUT_ID))}
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="New Subscriber" />
            <ListItemSecondaryAction>
              {renderSwitchControl(SUBSCRIBER_INPUT_ID, !watch(ISACTIVE_INPUT_ID))}
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="New Tips" />
            <ListItemSecondaryAction>
              {renderSwitchControl(TIP_INPUT_ID, !watch(ISACTIVE_INPUT_ID))}
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="Renewal" />
            <ListItemSecondaryAction>
              {renderSwitchControl(RENEWAL_INPUT_ID, !watch(ISACTIVE_INPUT_ID))}
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="Returning Subscriber" />
            <ListItemSecondaryAction>
              {renderSwitchControl(RETURNING_INPUT_ID, !watch(ISACTIVE_INPUT_ID))}
            </ListItemSecondaryAction>
          </ListItem>

          <ListSubheader>Subscriptions and following</ListSubheader>

          <ListItem>
            <ListItemText>
              <Typography>New Posts Summary</Typography>
              {renderSelectControl(POSTFREQUENCY_INPUT_ID, !watch(POST_INPUT_ID) || !watch(ISACTIVE_INPUT_ID))}
            </ListItemText>
            <ListItemSecondaryAction>
              {renderSwitchControl(POST_INPUT_ID, !watch(ISACTIVE_INPUT_ID))}
            </ListItemSecondaryAction>
          </ListItem>

          <Divider component="li" />

          <ListItem>
            <ListItemText primary="New Stream" />
            <ListItemSecondaryAction>
              {renderSwitchControl(STREAM_INPUT_ID, !watch(ISACTIVE_INPUT_ID))}
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="Upcoming stream reminders" />
            <ListItemSecondaryAction>
              {renderSwitchControl(UPCOMMINGSTREAM_INPUT_ID, !watch(ISACTIVE_INPUT_ID))}
            </ListItemSecondaryAction>
          </ListItem>

          <ListSubheader>New messages</ListSubheader>

          <ListItem>
            <ListItemText>
              <Typography>New Private Message Summary</Typography>
              {renderSelectControl(MESSAGESFREQUENCY_INPUT_ID, !watch(MESSAGES_INPUT_ID) || !watch(ISACTIVE_INPUT_ID))}
            </ListItemText>

            <ListItemSecondaryAction>
              {renderSwitchControl(MESSAGES_INPUT_ID, !watch(ISACTIVE_INPUT_ID))}
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
