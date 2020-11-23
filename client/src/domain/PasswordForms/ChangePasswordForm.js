import React, { useState, useEffect } from "react";
import {
  Button,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import LockIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import CustomInput from "../../components/CustomInput";
import BaseForm from "./BaseForm";
import useStyles from "./styles";
import { getUniqueChars, hasNumbers } from "../../helpers/functions";

const PASSWORD_INPUT_ID = "password";
const CONFIRM_PASSWORD_INPUT_ID = "confirmPassword";

const LENGTH_ERROR = "Required length longer than 3 characters";
const UNIQUE_CHARS_ERROR = "Required 4 unique chars";
const CONTAINS_NUMBER_ERROR = "Required minimum 1 number";
const PASSWORDS_DONT_MATCH_ERROR = "Password does not match";

function ChangePasswordForm({
  loading,

  onSubmit
}) {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    passwordError: "",
    confirmPasswordError: ""
  });
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    const passwordFilled = (!!formData.password.length && !(!!formData.passwordError));
    const confirmPasswordFilled = (!!formData.confirmPassword.length && !(!!formData.confirmPasswordError));
    setBtnDisabled(loading || !passwordFilled || !confirmPasswordFilled)
  }, [formData])

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit && onSubmit(formData.password);
  }

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (!name) return;

    if (name === PASSWORD_INPUT_ID) {
      // String length is less than 4
      if (value.length && value.length < 4) {
        setFormData({ ...formData, [name]: value, passwordError: LENGTH_ERROR });
        return;
      }
      // String contains 4 unique chars
      if (value.length && getUniqueChars(value).length < 4) {
        setFormData({ ...formData, [name]: value, passwordError: UNIQUE_CHARS_ERROR });
        return;
      }
      // String contains numbers
      if (value.length && !hasNumbers(value)) {
        setFormData({ ...formData, [name]: value, passwordError: CONTAINS_NUMBER_ERROR });
        return;
      }
      // Password and Confirm Password are the same
      if (value.length && formData.confirmPassword.length && value !== formData.confirmPassword) {
        setFormData({ ...formData, [name]: value, passwordError: "", confirmPasswordError: PASSWORDS_DONT_MATCH_ERROR });
        return;
      }
    }

    if (name === CONFIRM_PASSWORD_INPUT_ID) {
      // Password and Confirm Password are the same
      if (formData.password !== value) {
        setFormData({ ...formData, [name]: value, confirmPasswordError: PASSWORDS_DONT_MATCH_ERROR });
        return;
      }
    }

    setFormData({ ...formData, [name]: value, passwordError: "", confirmPasswordError: "" })
  }

  const handleShowPasswordClick = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword});
  }

  return (
    <BaseForm
      title="Change Password"
      helperText="In order to protect your account,
      make sure your password."
      btnText="Change Password"
      btnDisabled={btnDisabled}
      onSubmit={handleSubmit}
      icon={<LockIcon className={classes.icon} />}>
      <CustomInput
        id={PASSWORD_INPUT_ID}
        htmlFor={PASSWORD_INPUT_ID}
        name={PASSWORD_INPUT_ID}
        disableUnderline
        label="Password"
        wrapperClassName={classes.controlForm}
        type={formData.showPassword ? "text" : "password"}
        error={!!formData.passwordError}
        helperText={formData.passwordError}
        value={formData.password}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleShowPasswordClick}
              onMouseDown={(e) => e.preventDefault()}
              edge="end">
              {formData.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        }
        onChange={handleInputChange} />
      <CustomInput
        id={CONFIRM_PASSWORD_INPUT_ID}
        htmlFor={CONFIRM_PASSWORD_INPUT_ID}
        name={CONFIRM_PASSWORD_INPUT_ID}
        disabled={!!formData.passwordError || !formData.password.length}
        disableUnderline
        label="Confirm Password"
        type="password"
        wrapperClassName={classes.controlForm}
        error={!!formData.confirmPasswordError}
        helperText={formData.confirmPasswordError}
        value={formData.confirmPassword}
        onChange={handleInputChange} />
    </BaseForm>
  );
}

export default ChangePasswordForm;
