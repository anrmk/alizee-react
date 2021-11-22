import React, { useContext, useEffect, useCallback } from "react";
import { connect } from "react-redux";

import { Card, Divider, CardContent } from "@material-ui/core";

import usePaymentCardDialog from "../../../hooks/usePaymentCardDialog";
import useConfirmationDialog from "../../../hooks/useConfirmationDialog";
import useDialog from "../../../hooks/useDialog";
import SettingsHeader from "../../../components/SettingsHeader/index";

import ApiContext from "../../../context/ApiContext";
import * as settingsActions from "../../../store/actions/settings";
import { WalletCard, CardBlog } from "./EditPaymentSettings/index";
import useAlert from "../../../hooks/useAlert";

function EditPaymentSettings({
  getPayments,
  deleteCard,
  updateCard,
  verifyCard,
  updateWallet,
  requestStatus,

  cards,
  wallet,
  isFetching,
  onBackClick,
}) {
  const apiClient = useContext(ApiContext);

  const paymentCardDialog = usePaymentCardDialog();
  const confirmationDialog = useConfirmationDialog();
  const dialog = useDialog();
  useAlert(requestStatus);

  useEffect(() => {
    getPayments(apiClient);
  }, []);

  const handleUpdateCard = useCallback(async (id) => {
    await updateCard(apiClient, id);
  }, []);

  const handleVerifyClick = useCallback(async (id) => {
    await verifyCard(apiClient, id);
  }, []);

  const handleWalletUpdate = useCallback(async (status) => {
    await updateWallet(apiClient, status);
  }, []);

  const handleDeleteConfirm = useCallback(async (id) => {
    dialog.setParams({ loading: true });
    await deleteCard(apiClient, id);
    dialog.toggle({ open: false, loading: false });
  }, []);

  const handleDeleteClick = useCallback(async (id) => {
    confirmationDialog.toggle(
      {
        mainBtnText: "Delete",
        title: "Delete the card",
        state: id,
        onMainClick: handleDeleteConfirm,
      },
      {
        contentText: "Do you really want to delete the card?",
      },
      true
    );
  }, []);

  return (
    <Card>
      <SettingsHeader onBackClick={onBackClick} title="Payments" />
      <Divider />

      <WalletCard
        data={cards}
        {...wallet}
        onDialogOpen={paymentCardDialog.toggle}
        onUpdateWallet={handleWalletUpdate}
      />
      <Divider />
      <CardContent>
        <CardBlog
          onDialogOpen={paymentCardDialog.toggle}
          data={cards}
          onClick={handleUpdateCard}
          onDelete={handleDeleteClick}
          onVerifyClick={handleVerifyClick}
        />
      </CardContent>
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    cards: state.settings.data.cards,
    wallet: state.settings.data.wallet,
    isFetching: state.settings.isFetching,
    requestStatus: state.settings.requestStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPayments: (api) => dispatch(settingsActions.getPayments(api)),
    deleteCard: (api, id) => dispatch(settingsActions.deleteCard(api, id)),
    updateCard: (api, id) => dispatch(settingsActions.updateCard(api, id)),
    verifyCard: (api, id) => dispatch(settingsActions.verifyCard(api, id)),
    updateWallet: (api, status) =>
      dispatch(settingsActions.updateWallet(api, status)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPaymentSettings);
