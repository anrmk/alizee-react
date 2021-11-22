import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

import { Divider, Card } from "@material-ui/core";

import ApiContext from "../../../context/ApiContext";
import * as settingsActions from "../../../store/actions/settings";
import SettingsHeader from "../../../components/SettingsHeader/index";

import useSubscriptionBundleDialog from "../../../hooks/useSubscriptionBundleDialog";
import useSubscriptionCampaignDialog from "../../../hooks/useSubscriptionCampaignDialog";
import useConfirmationDialog from "../../../hooks/useConfirmationDialog";
import useDialog from "../../../hooks/useDialog";
import useAlert from "../../../hooks/useAlert";

import {
  EditSubscriptionForm,
  BundleBlog,
  CampaignBlog,
} from "./EditSubscriptionSettings/index";

function EditSubscriptionSettings({
  data,
  bundles,
  campaigns,
  userInfo,
  requestStatus,

  getSubscription,
  updateSubscription,
  deleteSubscriptionBundle,
  deleteCampaign,
  onBackClick,
}) {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();
  const subscriptionBundleDialog = useSubscriptionBundleDialog();
  const subscriptionCampaignDialog = useSubscriptionCampaignDialog();
  const confirmationDialog = useConfirmationDialog();
  useAlert(requestStatus);
  useEffect(() => {
    getSubscription(apiClient);
  }, []);

  const handleEditProfileSubmit = async (pData) => {
    updateSubscription(apiClient, pData);
  };

  const handleDelete = async (pData, isBundle) => {
    dialog.setParams({ loading: true });
    isBundle
      ? await deleteSubscriptionBundle(apiClient, pData)
      : await deleteCampaign(apiClient, pData);
    dialog.toggle({ open: false, loading: false });
  };

  const handleDeleteClick = (
    pData,
    title,
    isBundle,
    contentText = "Do you really want to stop promotion campaign?"
  ) => {
    confirmationDialog.toggle(
      {
        mainBtnText: "Delete",
        title,
        onMainClick: () => handleDelete(pData, isBundle),
      },
      {
        contentText,
      }
    );
  };
  return (
    <Card>
      <SettingsHeader onBackClick={onBackClick} title="Subscription" />
      <Divider />
      <EditSubscriptionForm
        price={data.price}
        onSubmit={handleEditProfileSubmit}
      />
      <Divider />
      <CampaignBlog
        data={campaigns}
        onOpenDialogClick={subscriptionCampaignDialog.toggle}
        price={data.price}
        userName={userInfo.userName}
        onCampaignDelete={handleDeleteClick}
        disabled={data.price === 0}
      />
      <Divider />
      <BundleBlog
        data={bundles}
        onOpenDialogClick={subscriptionBundleDialog.toggle}
        price={data.price}
        disabled={data.price === 0}
        onBundleDelete={handleDeleteClick}
      />
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    data: state.settings.data,
    isFetching: state.settings.isFetching,
    bundles: settingsActions.getSortedBundles(state),
    campaigns: state.settings.data.campaigns,
    userInfo: state.signIn.userInfo,
    requestStatus: state.settings.requestStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteSubscriptionBundle: (api, opts) =>
      dispatch(settingsActions.deleteSubscriptionBundle(api, opts)),
    deleteCampaign: (api, opts) =>
      dispatch(settingsActions.deleteCampaign(api, opts)),
    getSubscription: (api) => dispatch(settingsActions.getSubscription(api)),
    updateSubscription: (api, opts) =>
      dispatch(settingsActions.updateSubscription(api, opts)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSubscriptionSettings);
