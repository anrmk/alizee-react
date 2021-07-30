import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import {
  Grid,
  Divider,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  List,
} from "@material-ui/core";

import ApiContext from "../../context/ApiContext";
import * as settingsActions from "../../store/actions/settings";
import { EditSubscriptionForm } from "../../domain/SettingsForms";

import useSubscriptionBundleDialog from "../../hooks/useSubscriptionBundleDialog";
import useConfirmationDialog from "../../hooks/useConfirmationDialog";
import useDialog from "../../hooks/useDialog";

import Bundle from "../../components/Bundle.js/Bundle";

function EditSubscriptionSettings({
  data,
  bundles,

  getSubscription,
  updateSubscription,
  deleteSubscriptionBundle,
  onSetAlertText,
}) {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();
  const subscriptionBundleDialog = useSubscriptionBundleDialog();
  const confirmationDialog = useConfirmationDialog();
  useEffect(() => {
    getSubscription(apiClient);
  }, []);

  const handleEditProfileSubmit = async (pData) => {
    const fulfilled = await updateSubscription(apiClient, pData);
    onSetAlertText(fulfilled);
  };

  const handleBundleDelete = async (pData) => {
    dialog.setParams({ loading: true });
    const fulfilled = await deleteSubscriptionBundle(apiClient, pData);
    dialog.toggle({ open: false, loading: false });
    onSetAlertText(fulfilled);
  };

  const handleDeleteClick = (pData) => {
    confirmationDialog.toggle(
      {
        mainBtnText: "Delete",
        title: "Delete bundle",
        onMainClick: () => handleBundleDelete(pData),
      },
      {
        contentText: "Do you really want to delete bundle?",
      }
    );
  };
  return (
    <Card>
      <CardHeader title="Subscription" />
      <Divider />
      <EditSubscriptionForm
        price={data.price}
        onSubmit={handleEditProfileSubmit}
      />
      <Divider />

      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h6">Profile promotion campaign</Typography>
            <Typography variant="body2">
              Offer a free trial or a discounted subscription on your profile
              for a limited number of new or already expired subscribers
            </Typography>
          </Grid>
          <Grid item>
            <Button
              disableElevation
              variant="outlined"
              color="primary"
              disabled={data.price < 0.1}>
              Start Campaign
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h6">Following bundles</Typography>
            <Typography variant="caption" color="textSecondary">
              Offer several months of subscription as a discounted bundle
            </Typography>
          </Grid>

          <Grid item>
            <Button
              disabled={data.price < 0.1}
              disableElevation
              variant="outlined"
              color="primary"
              onClick={subscriptionBundleDialog.toggle}>
              Create Bundle
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      {bundles?.length > 0 && (
        <>
          <Divider />
          <CardContent>
            <List dense>
              {bundles.map((item) => (
                <Bundle
                  isOwner
                  key={item.duration}
                  onDelete={handleDeleteClick}
                  duration={item.duration}
                  discount={item.discount}
                  price={data.price}
                  id={item.id}
                />
              ))}
            </List>
          </CardContent>
        </>
      )}
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    data: state.settings.data,
    isFetching: state.settings.isFetching,
    bundles: settingsActions.getSortedBundles(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteSubscriptionBundle: (api, opts) =>
      dispatch(settingsActions.deleteSubscriptionBundle(api, opts)),
    getSubscription: (api) => dispatch(settingsActions.getSubscription(api)),
    updateSubscription: (api, opts) =>
      dispatch(settingsActions.updateSubscription(api, opts)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSubscriptionSettings);
