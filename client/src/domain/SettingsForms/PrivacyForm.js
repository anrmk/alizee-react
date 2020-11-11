import React, { useEffect, useState } from "react";
import { 
  Button,
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { SETTINGS_BLACK_LIST_ROUTE } from "../../constants/routes";
import useStyles from "./styles"

function PrivacyForm({
  accountPrivate = false,
  showActivity = false,
  offensiveCommentsHidden = false,
  loading = false,

  onAccountPrivateUpdate,
  onActivityStatusUpdate,
  onOffensiveCommentsUpdate,
  onAccountDelete
}) {
  const classes = useStyles();
  const [lAccountPrivate, setLAccountPrivate] = useState(accountPrivate);
  const [lActivityStatus, setLActivityStatus] = useState(showActivity);
  const [lOffensiveComments, setLOffensiveComments] = useState(offensiveCommentsHidden);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setLAccountPrivate(accountPrivate);
  }, [accountPrivate])

  useEffect(() => {
    setLActivityStatus(showActivity);
  }, [showActivity])

  useEffect(() => {
    setLOffensiveComments(offensiveCommentsHidden);
  }, [offensiveCommentsHidden])

  const handleAccountPrivateChange = (e) => {
    const checked = e.target.checked;
    setLAccountPrivate(checked);
    onAccountPrivateUpdate && onAccountPrivateUpdate(checked);
  }

  const handleActivityStatusChange = (e) => {
    const checked = e.target.checked;
    setLActivityStatus(checked);
    onActivityStatusUpdate && onActivityStatusUpdate(checked);
  }

  const handleOffensiveCommentsChange = (e) => {
    const checked = e.target.checked;
    setLOffensiveComments(checked);
    onOffensiveCommentsUpdate && onOffensiveCommentsUpdate(checked);
  }

  const handleModalOpen = () => {
    setShowDialog(true);
  };

  const handleModalClose = (agree) => {
    if (agree) {
      onAccountDelete && onAccountDelete();
    }
    setShowDialog(false);
  };

  return (
    <div className={classes.form}>
      <FormGroup>
        <Typography variant="h6">
          Account Privacy
        </Typography>
        <FormControlLabel
          className={classes.controlLabel}
          label="Private Account"
          labelPlacement="end" 
          control={(
            <Checkbox
              color="primary"
              name="accountPrivate"
              checked={lAccountPrivate}
              onChange={handleAccountPrivateChange} />
          )} />
        <Typography className={classes.textMute} variant="caption">
          When your account is private, only people you 
          approve can see your photos and videos on Instagram.
          Your existing followers won't affected.
        </Typography>
      </FormGroup>

      <Divider />

      <FormGroup>
        <Typography variant="h6">
          Activity Status
        </Typography>
        <FormControlLabel
          className={classes.controlLabel}
          label="Show Activity Status"
          labelPlacement="end" 
          control={(
            <Checkbox
              color="primary"
              name="showActivity"
              checked={lActivityStatus}
              onChange={handleActivityStatusChange} />
          )} />
        <Typography className={classes.textMute} variant="caption">
          Allow accounts you follow and anyone you message to 
          see when you were last active on Alizee apps. 
          When this is turned off, you won't be able to 
          see the activity status of other accounts.
        </Typography>
      </FormGroup>

      <Divider />

      <FormGroup>
        <Typography variant="h6">
          Content
        </Typography>
        <FormControlLabel
          className={classes.controlLabel}
          label="Hide Offensive Comments"
          labelPlacement="end" 
          control={(
            <Checkbox
              color="primary"
              name="offensiveCommentsHidden"
              checked={lOffensiveComments}
              onChange={handleOffensiveCommentsChange} />
          )} />
      </FormGroup>

      <Divider />

      <FormGroup>
        <Typography variant="h6">
          Comments
        </Typography>
        <Link to={SETTINGS_BLACK_LIST_ROUTE}>Black list</Link>
      </FormGroup>

      <Divider />

      <Button 
       
        variant="contained" 
        color="secondary"
        disabled={loading}
        onClick={handleModalOpen}>
        Delete Account
      </Button>

      <Dialog
        open={showDialog}
        onClose={handleModalOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Are you ABSOLUTELY sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This account will be blocked for six months, 
            and you can restore it at any time. 
            After six months, your account will be permanently deleted. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleModalClose(false)} color="primary">
            Disagree
          </Button>
          <Button onClick={() => handleModalClose(true)} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PrivacyForm;
