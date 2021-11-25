import React, { useContext, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Card, CardContent, Divider } from "@material-ui/core";

import ApiContext from "../../../context/ApiContext";
import * as settingsActions from "../../../store/actions/settings";
import * as accountActions from "../../../store/actions/account";
import * as userActions from "../../../store/actions/user";

import {
  BANK_VERIF_STATUS_NONE,
  BANK_VERIF_STATUS_VERIFIED,
} from "../../../constants/banking_form_types";

import useAlert from "../../../hooks/useAlert";
import useAgreeDialog from "../../../hooks/useAgreeDialog";

import useConfirmationDialog from "../../../hooks/useConfirmationDialog";

import SettingsHeader from "../../../components/SettingsHeader/index";

import { EditBankForm, OndatoForm, WithdrawFundsForm } from "./Forms/index";

import ConfirmDialog from "../../../components/DialogForms/ConfirmDialog";
import TransactionsTable from "../../../domain/TransactionsTable/TransactionsTable";

import useStyles from "../styles";

function EditBankSettings({
  identityVerified,
  data,
  isFetching,
  requestStatus,

  getBankAccount,
  updateBankAccount,
  verifyBankAccount,
  resetBankAccount,
  withdraw,
  veryfyMe,
  onBackClick,
}) {
  const apiClient = useContext(ApiContext);
  const classes = useStyles();
  const agreeDialog = useAgreeDialog(() => veryfyMe(apiClient));
  const { account, transactions } = data;

  const confirmationDialog = useConfirmationDialog();

  useAlert(requestStatus);

  useEffect(() => {
    (async () => {
      await getBankAccount(apiClient);
    })();
  }, []);

  const handleVerifyBankAccountSubmit = async (pData) => {
    await updateBankAccount(apiClient, pData);
    await verifyBankAccount(apiClient, pData);
  };

  const handleResetBankAccount = useCallback(async () => {
    confirmationDialog.dialog.setParams({ loading: true });
    await resetBankAccount(apiClient);
    confirmationDialog.dialog.toggle({ open: false, loading: false });
  }, []);

  const handleResetBankAccountClick = () => {
    confirmationDialog.toggle(
      {
        title: "Reset Bank Account",
        mainBtnText: "Confirm",
        onMainClick: handleResetBankAccount,
      },
      {
        contentText: (
          <ConfirmDialog
            helpText="Do you really want to reset Bank Account data?"
            textProp={{ variant: "subtitle1", align: "center" }}
          />
        ),
      },
      true
    );
  };

  const handleWithdrawFundsSubmit = async (pData) => {
    await withdraw(apiClient, pData);
  };

  return (
    <Card>
      <SettingsHeader onBackClick={onBackClick} title="Banking" />
      <Divider />
      {!isFetching && (
        <CardContent>
          {account && account.verifyStatus !== BANK_VERIF_STATUS_NONE && (
            <WithdrawFundsForm
              className={classes.withdrawFormRoot}
              {...account}
              onSubmit={handleWithdrawFundsSubmit}
            />
          )}
          {account && account.verifyStatus === BANK_VERIF_STATUS_VERIFIED && (
            <TransactionsTable rows={transactions} />
          )}

          <EditBankForm
            {...account}
            onSubmit={handleVerifyBankAccountSubmit}
            onReset={handleResetBankAccountClick}
          />
          {!identityVerified && <OndatoForm onSubmit={agreeDialog.toggle} />}
        </CardContent>
      )}
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    identityVerified: state.signIn?.userInfo.identityVerified,
    data: {
      ...state.settings.data,
      deposit: state.signIn?.userInfo?.deposit?.saving,
    },
    isFetching: state.settings.isFetching,
    requestStatus: state.settings.requestStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBalance: (api) => dispatch(accountActions.getBalance(api)),
    getBankAccount: (api) => dispatch(settingsActions.getBankAccount(api)),
    updateBankAccount: (api, data) =>
      dispatch(settingsActions.updateBankAccount(api, data)),
    verifyBankAccount: (api, opts) =>
      dispatch(settingsActions.verifyBankAccount(api, opts)),
    resetBankAccount: (api) => dispatch(settingsActions.resetBankAccount(api)),
    withdraw: (api, opts) => dispatch(settingsActions.withdraw(api, opts)),
    veryfyMe: (api) => dispatch(userActions.verifyMe(api)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBankSettings);
