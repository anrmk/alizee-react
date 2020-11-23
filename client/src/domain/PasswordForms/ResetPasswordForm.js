import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Divider } from "@material-ui/core";
import LockIcon from '@material-ui/icons/VerifiedUserOutlined';

import CustomInput from "../../components/CustomInput";
import { isCorrectEmail } from "../../helpers/functions";
import { SIGN_UP_ROUTE, SIGN_IN_ROUTE } from "../../constants/routes";
import BaseForm from "./BaseForm";
import useStyles from "./styles";

const EMAIL_INPUT_ID = "email";

const INVALID_EMAIL_ERROR = "Invalid email address";

function ResetPasswordForm({
  loading,

  onSubmit
}) {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit && onSubmit(email);
  }

  const handleEmailChange = (e) => {
    const value = e.target.value.trim();

    if (value.length && btnDisabled) {
      setBtnDisabled(false)
    } else if (!value.length && !btnDisabled) {
      setBtnDisabled(true)
    }

    if (value.length && !isCorrectEmail(value) && !error) {
      setError(INVALID_EMAIL_ERROR);
    }
    else if (!value.length || isCorrectEmail(value) && error) {
      setError("");
    }

    setEmail(value);
  }

  return (
    <BaseForm
      title="Trouble Logging In?"
      helperText="Enter your email and we'll send 
      you a link to get back into your account."
      btnText="Send Reset Link"
      btnDisabled={loading || btnDisabled || !!error}
      onSubmit={handleSubmit}
      icon={<LockIcon className={classes.icon} />}
      footerComponent={(
        <>
          <Divider className={classes.divider} variant="middle" />
          <Button
            className={classes.formElement}
            variant="text"
            onClick={() => history.push(SIGN_UP_ROUTE)}>
            Create New Account
          </Button>
          <Button
            className={classes.btnBackSignIn}
            disableElevation
            variant="contained"
            onClick={() => history.push(SIGN_IN_ROUTE)}>
            Back To Login
          </Button>
        </>
      )}>
        <CustomInput
          id={EMAIL_INPUT_ID}
          htmlFor={EMAIL_INPUT_ID}
          disableUnderline
          placeholder="test@domain.com"
          label="Email"
          wrapperClassName={classes.controlForm}
          error={!!error}
          helperText={error}
          value={email}
          onChange={handleEmailChange} />
    </BaseForm>
  );
}

export default ResetPasswordForm;
