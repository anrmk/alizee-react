import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";

import ApiContext from "../../context/ApiContext";
import * as settingsActions from "../../store/actions/settings";
import * as accountActions from "../../store/actions/account";
import * as userActions from "../../store/actions/user";
import { EditBankForm, OndatoForm } from "../../domain/SettingsForms";

import useAgreeDialog from "../../hooks/useAgreeDialog";
import useBankAccountStatuses from "../../hooks/settings/useBankAccountStatuses";
import WithdrawFundsForm from "../../domain/SettingsForms/WithdrawFundsForm";
import TransactionsTable from "../../domain/TransactionsTable/TransactionsTable";
import useAlert from "../../hooks/useAlert";
import useStyles from "./styles";

function EditBankSettings({
  identityVerified,
  data,
  isFetching,
  getBalance,
  requestStatus,

  getBank,
  updateBankAccount,
  verifyBankAccount,
  withdraw,
  veryfyMe,
}) {
  const apiClient = useContext(ApiContext);
  const classes = useStyles();
  const agreeDialog = useAgreeDialog(() => veryfyMe(apiClient));
  const { account, transactions } = data;
  const { isNotVerified, isPending, isVerified } = useBankAccountStatuses(
    identityVerified,
    account
  );
  useAlert(requestStatus);

  useEffect(() => {
    (async () => {
      await getBalance(apiClient);
      await getBank(apiClient);
    })();
  }, []);

  const handleVerifyBankAccountSubmit = async (pData) => {
    await updateBankAccount(apiClient, pData);
    await verifyBankAccount(apiClient, pData);
  };

  const handleEditBankSubmit = async (pData) => {
    await verifyBankAccount(apiClient, pData);
  };

  const handleWithdrawFundsSubmit = async (pData) => {
    await withdraw(apiClient, pData);
  };

  return (
    <Card>
      <CardHeader title="Banking" />
      <Divider />
      <CardContent>
        {isVerified && (
          <>
            <WithdrawFundsForm
              className={classes.withdrawFormRoot}
              {...account}
              isVerificationPending={isPending}
              onSubmit={handleWithdrawFundsSubmit}
              onUpdateAccountNumber={handleEditBankSubmit}
            />
            {!isPending && <TransactionsTable rows={transactions} />}
          </>
        )}
        {isNotVerified && !isFetching && (
          <EditBankForm {...account} onSubmit={handleVerifyBankAccountSubmit} />
        )}
        {!identityVerified && <OndatoForm onSubmit={agreeDialog.toggle} />}
      </CardContent>
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
    getBank: (api) => dispatch(settingsActions.getBank(api)),
    updateBankAccount: (api, data) =>
      dispatch(settingsActions.updateBank(api, data)),
    verifyBankAccount: (api, opts) =>
      dispatch(settingsActions.verifyBankAccount(api, opts)),
    withdraw: (api, opts) => dispatch(settingsActions.withdraw(api, opts)),
    veryfyMe: (api) => dispatch(userActions.verifyMe(api)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBankSettings);
