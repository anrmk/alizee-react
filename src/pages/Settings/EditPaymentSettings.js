import React, { useContext, useEffect, useCallback } from "react";
import { connect } from "react-redux";

import { Card, CardHeader, Divider, CardContent } from "@material-ui/core";

import usePaymentCardDialog from "../../hooks/usePaymentCardDialog";
import useConfirmationDialog from "../../hooks/useConfirmationDialog";
import useDialog from "../../hooks/useDialog";

import ApiContext from "../../context/ApiContext";
import * as settingsActions from "../../store/actions/settings";
import { WalletCard, CardBlog } from "../../domain/EditPaymentSettings/index";

function EditPaymentSettings({
  getPayments,
  deleteCard,
  updateCard,
  verifyCard,
  updateWallet,

  cards,
  wallet,
  isFetching,

  onSetAlertText,
}) {
  const apiClient = useContext(ApiContext);

  const paymentCardDialog = usePaymentCardDialog();
  const confirmationDialog = useConfirmationDialog();
  const dialog = useDialog();

  useEffect(() => {
    getPayments(apiClient);
  }, []);

  const handleUpdateCard = useCallback(async (id) => {
    const fulfilled = await updateCard(apiClient, id);

    onSetAlertText(fulfilled);
  }, []);

  const handleVerifyClick = useCallback(async (id) => {
    const fulfilled = await verifyCard(apiClient, id);

    onSetAlertText(fulfilled);
  }, []);

  const handleWalletUpdate = useCallback(async (status) => {
    const fulfilled = await updateWallet(apiClient, status);

    onSetAlertText(fulfilled);
  }, []);

  const handleDeleteConfirm = useCallback(async (id) => {
    dialog.setParams({ loading: true });
    const fulfilled = await deleteCard(apiClient, id);
    dialog.toggle({ open: false, loading: false });
    onSetAlertText(fulfilled);
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
      <CardHeader title="Payments" />
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
