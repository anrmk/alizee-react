import React, { useEffect, useRef, useContext } from "react";
import { connect } from "react-redux";
import { Box, Button, Typography } from "@material-ui/core";
import LoadingIcon from "@material-ui/icons/LoopOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";

import ApiContext from "../../context/ApiContext";
import * as settingsActions from "../../store/actions/settings";
import InterestsList from "../../components/InterestsList";
import useStyles from "./styles";

const INTEREST_DESCRIPTION = "Select your interests so that finding posts and people that are interesting and make viewing more enjoyable.";

function InterestsSettings({
  settings,
  interests,

  getAccountInterests,
  createInterests,
}) {
  const apiClient = useContext(ApiContext);
  const classes = useStyles();
  const interestsEl = useRef();

  useEffect(() => {
    (async () => {
      await getAccountInterests(apiClient);
    })();
  }, []);

  const handleInterestSubmit = async () => {
    const selectedInterests = interestsEl.current.getSelectedIds();
    if (selectedInterests.length) {
      await createInterests(apiClient, selectedInterests);
    }
  };

  return (
    <Box>
      <Typography variant="subtitle2">{INTEREST_DESCRIPTION}</Typography>
      <InterestsList ref={interestsEl} items={settings.data} />
      <Button disableElevation variant="contained" color="primary" disabled={settings.isFetching || interests.isFetching} onClick={handleInterestSubmit} >
        Update
      </Button>
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    settings: {
      data: settingsActions.getMergedInterests(state),
      isFetching: state.settings.isFetching,
    },
    interests: {
      isFetching: state.hashTags.isFetching
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAccountInterests: (api) => dispatch(settingsActions.getAccountInterests(api)),
    createInterests: (api, ids) => dispatch(settingsActions.createAccountInterests(api, ids)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InterestsSettings);
