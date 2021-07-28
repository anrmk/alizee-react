import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Divider,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
} from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";

import { BLOCKED_USERNAME_ROUTE } from "../../constants/routes";

const ACCOUNT_PRIVACY_HEADER = "Account Privacy";
const ACCOUNT_PRIVACY_HELPER =
  "When your account is private, only people you approve can see your photos and videos on StudioXR. Your existing followers won't affected.";
const ACTIVITY_STATUS_HEADER = "Activity Status";
const ACTIVITY_STATUS_HELPER =
  "Allow accounts you follow and anyone you message to see when you were last active on Alizee apps. When this is turned off, you won't be able to see the activity status of other accounts.";
const COMMENTS_FILTERING_HEADER = "Comments Filtering";
const COMMENTS_FILTERING_HELPER =
  "Hide comments that contain any offensive words or phrases from your posts automatically.";
const BLOCKED_ACCOUNTS_HEADER = "Blocked Accounts";
const BLOCKED_ACCOUNTS_HELPER =
  "They won't be able to find your profile, posts or story. System won't let them know you blocked them.";
const DELETE_ACCOUNT_HEADER = "Delete Account";
const DELETE_ACCOUNT_HELPER =
  "If you want a break from us, you can temporarily disable your account instead of deleting it. Your profile won't appear on StudioXR while you're away.";
const RESET_PASSWORD_HEADER = "Reset Password";
const RESET_PASSWORD_HELPER =
  "Resetting your password using your email address or phone number";

function PrivacyForm({
  accountPrivate = false,
  showActivity = false,
  offensiveCommentsHidden = false,
  loading = false,

  onAccountPrivateUpdate,
  onActivityStatusUpdate,
  onOffensiveCommentsUpdate,
  onPasswordReset,
  onAccountDelete,
}) {
  const [lAccountPrivate, setLAccountPrivate] = useState(accountPrivate);
  const [lActivityStatus, setLActivityStatus] = useState(showActivity);
  const [lOffensiveComments, setLOffensiveComments] = useState(
    offensiveCommentsHidden
  );

  useEffect(() => {
    setLAccountPrivate(accountPrivate);
  }, [accountPrivate]);

  useEffect(() => {
    setLActivityStatus(showActivity);
  }, [showActivity]);

  useEffect(() => {
    setLOffensiveComments(offensiveCommentsHidden);
  }, [offensiveCommentsHidden]);

  const handleAccountPrivateChange = (e) => {
    const { checked } = e.target;
    setLAccountPrivate(checked);
    onAccountPrivateUpdate && onAccountPrivateUpdate(checked);
  };

  const handleActivityStatusChange = (e) => {
    const { checked } = e.target;
    setLActivityStatus(checked);
    onActivityStatusUpdate && onActivityStatusUpdate(checked);
  };

  const handleOffensiveCommentsChange = (e) => {
    const { checked } = e.target;
    setLOffensiveComments(checked);
    onOffensiveCommentsUpdate && onOffensiveCommentsUpdate(checked);
  };

  return (
    <Card>
      <CardHeader title="Privacy and Safety" />

      <Divider />

      <CardContent>
        <List disablePadding>
          <ListItem>
            <ListItemText
              primary={ACCOUNT_PRIVACY_HEADER}
              secondary={ACCOUNT_PRIVACY_HELPER}
            />
            <ListItemSecondaryAction>
              <Switch
                checked={lAccountPrivate}
                name="accountPrivate"
                onChange={handleAccountPrivateChange}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText
              primary={ACTIVITY_STATUS_HEADER}
              secondary={ACTIVITY_STATUS_HELPER}
            />
            <ListItemSecondaryAction>
              <Switch
                checked={lActivityStatus}
                name="showActivity"
                onChange={handleActivityStatusChange}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText
              primary={COMMENTS_FILTERING_HEADER}
              secondary={COMMENTS_FILTERING_HELPER}
            />
            <ListItemSecondaryAction>
              <Switch
                checked={lOffensiveComments}
                name="offensiveCommentsHidden"
                onChange={handleOffensiveCommentsChange}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </CardContent>

      <Divider />

      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h6">{BLOCKED_ACCOUNTS_HEADER}</Typography>
            <Typography variant="subtitle2">
              {BLOCKED_ACCOUNTS_HELPER}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              disableElevation
              variant="outlined"
              color="primary"
              to={BLOCKED_USERNAME_ROUTE("userName")}
              component={Link}>
              Blocked Accounts
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h6">{RESET_PASSWORD_HEADER}</Typography>
            <Typography variant="subtitle2">{RESET_PASSWORD_HELPER}</Typography>
          </Grid>
          <Grid item>
            <Button
              startIcon={<WarningIcon />}
              disableElevation
              variant="outlined"
              color="secondary"
              disabled={loading}
              onClick={onPasswordReset}>
              Reset Password
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h6">{DELETE_ACCOUNT_HEADER}</Typography>
            <Typography variant="subtitle2">{DELETE_ACCOUNT_HELPER}</Typography>
          </Grid>
          <Grid item>
            <Button
              startIcon={<WarningIcon />}
              disableElevation
              variant="outlined"
              color="secondary"
              disabled={loading}
              onClick={onAccountDelete}>
              Delete your Account
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PrivacyForm;
