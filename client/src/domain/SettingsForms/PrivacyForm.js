import React, { useEffect, useState } from "react";
import { Button, Checkbox, FormGroup, FormControlLabel, Divider, Typography, Grid } from "@material-ui/core";

import { SETTINGS_BLACK_LIST_ROUTE } from "../../constants/routes";

const ACCOUNT_PRIVACY_HEADER = "Account Privacy";
const ACCOUNT_PRIVACY_HELPER =
  "When your account is private, only people you approve can see your photos and videos on Instagram. Your existing followers won't affected.";
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
  "If you want a break from us, you can temporarily disable your account instead of deleting it. Your profile won't appear on Instagram while you're away.";
const RESET_PASSWORD_HEADER = "Reset Password";
const RESET_PASSWORD_HELPER = "Resetting your password using your email address or phone number";

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
  const [lOffensiveComments, setLOffensiveComments] = useState(offensiveCommentsHidden);

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
    const checked = e.target.checked;
    setLAccountPrivate(checked);
    onAccountPrivateUpdate && onAccountPrivateUpdate(checked);
  };

  const handleActivityStatusChange = (e) => {
    const checked = e.target.checked;
    setLActivityStatus(checked);
    onActivityStatusUpdate && onActivityStatusUpdate(checked);
  };

  const handleOffensiveCommentsChange = (e) => {
    const checked = e.target.checked;
    setLOffensiveComments(checked);
    onOffensiveCommentsUpdate && onOffensiveCommentsUpdate(checked);
  };

  return (
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <Typography variant="h6">{ACCOUNT_PRIVACY_HEADER}</Typography>
        <Typography variant="subtitle2">{ACCOUNT_PRIVACY_HELPER}</Typography>

        <FormControlLabel
          label="Private Account"
          labelPlacement="end"
          control={
            <Checkbox
              color="primary"
              name="accountPrivate"
              checked={lAccountPrivate}
              onChange={handleAccountPrivateChange}
            />
          }
        />
      </Grid>

      <Divider />
      
      <Grid item>
        <Typography variant="h6">{ACTIVITY_STATUS_HEADER}</Typography>
        <Typography variant="subtitle2">{ACTIVITY_STATUS_HELPER}</Typography>

        <FormGroup>
          <FormControlLabel
            label="Show Activity Status"
            labelPlacement="end"
            control={
              <Checkbox
                color="primary"
                name="showActivity"
                checked={lActivityStatus}
                onChange={handleActivityStatusChange}
              />
            }
          />
        </FormGroup>
      </Grid>
      
      <Divider />
      
      <Grid item>
        <Typography variant="h6">{COMMENTS_FILTERING_HEADER}</Typography>
        <Typography variant="subtitle2">{COMMENTS_FILTERING_HELPER}</Typography>

        <FormGroup>
          <FormControlLabel
            label="Hide Offensive Comments"
            labelPlacement="end"
            control={
              <Checkbox
                color="primary"
                name="offensiveCommentsHidden"
                checked={lOffensiveComments}
                onChange={handleOffensiveCommentsChange}
              />
            }
          />
        </FormGroup>
      </Grid>
      
      <Divider />
      
      <Grid item>
        <Typography variant="h6">{BLOCKED_ACCOUNTS_HEADER}</Typography>
        <Typography variant="subtitle2">{BLOCKED_ACCOUNTS_HELPER}</Typography>

        <Button href={SETTINGS_BLACK_LIST_ROUTE}>Blocked Accounts</Button>
      </Grid>
      
      <Divider />
      
      <Grid item>
        <Typography variant="h6">{RESET_PASSWORD_HEADER}</Typography>
        <Typography variant="subtitle2">{RESET_PASSWORD_HELPER}</Typography>

        <Button color="secondary" disabled={loading} onClick={onPasswordReset}>
          Reset Password
        </Button>
      </Grid>
      
      <Divider />
      
      <Grid item>
        <Typography variant="h6">{DELETE_ACCOUNT_HEADER}</Typography>
        <Typography variant="subtitle2">{DELETE_ACCOUNT_HELPER}</Typography>

        <Button color="secondary" disabled={loading} onClick={onAccountDelete}>
          Delete your Account
        </Button>
      </Grid>
    </Grid>
  );
}

export default PrivacyForm;