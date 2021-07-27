import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";
import AccountOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";

import ApiContext from "../../context/ApiContext";
import * as settingsActions from "../../store/actions/settings";
import * as userActions from "../../store/actions/user";
import { EditBankForm, OndatoForm } from "../../domain/SettingsForms";

import useAgreeDialog from "../../hooks/useAgreeDialog";

function EditBankSettings({ identityVerified, data, isFetching, getBank, updateBank, veryfyMe, onSetAlertText }) {
  const apiClient = useContext(ApiContext);

  const agreeDialog = useAgreeDialog((data) => {
    veryfyMe(apiClient);
  });

  useEffect(() => {
    getBank(apiClient);
  }, []);

  const handleEditBankSubmit = (data) => {
    (async () => {
      const fulfilled = await updateBank(apiClient, data);
      onSetAlertText(fulfilled);
    })();
  };

  return (
    <Card>
      <CardHeader title="Banking" />
      <Divider />
      <CardContent>
        {identityVerified ? (
          !isFetching && <EditBankForm {...data} onSubmit={handleEditBankSubmit} />
        ) : (
          <OndatoForm onSubmit={agreeDialog.toggle} />
        )}
      </CardContent>
    </Card>
  );
}

function mapStateToProps(state) {
  return {
    identityVerified: state.signIn?.userInfo.identityVerified,
    data: state.settings.data,
    isFetching: state.settings.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBank: (api) => dispatch(settingsActions.getBank(api)),
    updateBank: (api, data) => dispatch(settingsActions.updateBank(api, data)),
    veryfyMe: (api) => dispatch(userActions.verifyMe(api)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBankSettings);
