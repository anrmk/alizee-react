import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardContent, Divider } from "@material-ui/core";

import ApiContext from "../../context/ApiContext";
import * as settingsActions from "../../store/actions/settings";
import * as userActions from "../../store/actions/user";
import { EditBankForm, OndatoForm } from "../../domain/SettingsForms";

import useAgreeDialog from "../../hooks/useAgreeDialog";
import useAlert from "../../hooks/useAlert";

function EditBankSettings({
  identityVerified,
  data,
  isFetching,
  requestStatus,

  getBank,
  updateBank,
  veryfyMe,
}) {
  const apiClient = useContext(ApiContext);
  useAlert(requestStatus);

  const agreeDialog = useAgreeDialog(() => {
    veryfyMe(apiClient);
  });

  useEffect(() => {
    getBank(apiClient);
  }, []);

  const handleEditBankSubmit = (pData) => {
    (async () => {
      await updateBank(apiClient, pData);
    })();
  };

  return (
    <Card>
      <CardHeader title="Banking" />
      <Divider />
      <CardContent>
        {identityVerified ? (
          !isFetching && (
            <EditBankForm {...data} onSubmit={handleEditBankSubmit} />
          )
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
    requestStatus: state.settings.requestStatus,
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
