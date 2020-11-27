import React, { useEffect, useRef, useContext } from "react";
import { connect } from "react-redux";
import { Box, Typography, Button, CircularProgress } from "@material-ui/core";

import ApiContext from '../../context/ApiContext';
import * as settingsActions from "../../store/actions/settings";
import * as interestsActions from "../../store/actions/interests";
import InterestsList from "../../components/InterestsList";
import useStyles from "./styles";

function InterestsSettings({
  settings,

  getAccountInterests,
  createInterests
}) {
  const apiClient = useContext(ApiContext);
  const classes = useStyles();
  const interestsEl = useRef();

  useEffect(() => {
    (async () => {
      await getAccountInterests(apiClient);
    })();
  }, [])

  const handleInterestSubmit = async () => {
    const selectedInterests = interestsEl.current.getSelectedIds();
    if (selectedInterests.length) {
      await createInterests(apiClient, selectedInterests);
    }
  }

  return (
    <Box className={classes.interestsMainContainer}>
      <Typography variant="h6">
        Your Interests
      </Typography>
      {settings.isFetching ? (
        <CircularProgress className={classes.interestsProgress} />
      ) : (
        <>
          <Typography className={classes.textMute} variant="caption">
            Select your interests so that finding posts and people that are interesting and make viewing more enjoyable.
          </Typography>
          <InterestsList className={classes.interestsContainer} ref={interestsEl} items={settings.data} />
          <Button 
            className={classes.formBtn}
            disableElevation
            color="primary"
            variant="contained"
            disabled={settings.isFetching}
            onClick={handleInterestSubmit}>
              Update
          </Button>
        </>
      )}
    </Box>
  )
}

function mapStateToProps(state) {
  return {
    settings: {
      data: settingsActions.getMergedInterests(state),
      isFetching: state.settings.isFetching
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAccountInterests: (api) => dispatch(settingsActions.getAccountInterests(api)),
    createInterests: (api, ids) => dispatch(interestsActions.createInterests(api, ids))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InterestsSettings);
