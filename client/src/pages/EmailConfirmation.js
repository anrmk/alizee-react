import React, { useContext } from "react";
import { connect } from "react-redux";

import EmailCard from "../domain/EmailCard/EmailCard";

import { resendEmailVerification } from "../store/actions/resendEmailVerification";

import ApiContext from "../context/ApiContext";
import { Box } from "@material-ui/core";

function EmailConfirmation(props) {
  const apiClient = useContext(ApiContext);

  const { resendEmailVerification, userInfo } = props;

  const handleResendBtnClick = () => {
    resendEmailVerification(userInfo?.email, apiClient);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <EmailCard onResendBtnClick={handleResendBtnClick} />
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.signUp.userInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resendEmailVerification: (email, api) => dispatch(resendEmailVerification(email, api)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmation);
