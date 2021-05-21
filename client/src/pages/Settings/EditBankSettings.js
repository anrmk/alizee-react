import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import AccountOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";

import ApiContext from "../../context/ApiContext";
import * as settingsActions from "../../store/actions/settings";
import { EditBankForm, OndatoForm } from "../../domain/SettingsForms";

function EditBankSettings({ identityVerified, data, isFetching, getBank, updateBank }) {
  const apiClient = useContext(ApiContext);

  useEffect(() => {
    getBank(apiClient);
  }, []);

  const handleEditBankSubmit = (data) => {
    (async () => {
      await updateBank(apiClient, data);
    })();
  };
  return (
    <Card>
      <CardHeader title="Banking" />
      <CardContent>
        {identityVerified ? !isFetching && <EditBankForm {...data} onSubmit={handleEditBankSubmit} /> : <OndatoForm />}
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBankSettings);
