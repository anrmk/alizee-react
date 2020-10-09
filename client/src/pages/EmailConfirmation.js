import React, { useContext } from "react";
import { connect } from "react-redux";

import EmailCard from "../domain/EmailCard";

import {
  resendEmailVerification
} from '../store/actions/resendEmailVerification';

import ApiContext from '../context/ApiContext';

function EmailConfirmation(props) {
  const apiClient = useContext(ApiContext);

  const { resendEmailVerification, userInfo } = props;

  const handleResendBtnClick = () => {
    resendEmailVerification(userInfo?.email, apiClient);
  }

  return (
    <div className="d-flex justify-content-center container">
      <EmailCard onResendBtnClick={handleResendBtnClick} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.signUp.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    resendEmailVerification: (email, api) => dispatch(resendEmailVerification(email, api))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmation)
