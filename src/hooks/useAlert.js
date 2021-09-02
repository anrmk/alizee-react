import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import {
  DEFAULT_ALERT_SUCCESS_TEXT,
  DEFAULT_ALERT_ERROR_TEXT,
} from "../constants/alerts";
import { SUCCESS, FAILURE } from "../constants/request_status";

export default function useAlert(
  state,
  alertTextSuccess = DEFAULT_ALERT_SUCCESS_TEXT,
  alertTextError = DEFAULT_ALERT_ERROR_TEXT
) {
  const { enqueueSnackbar } = useSnackbar();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (state === SUCCESS && flag) {
      enqueueSnackbar(alertTextSuccess, { variant: "success" });
    }
    if (state === FAILURE && flag) {
      enqueueSnackbar(alertTextError, { variant: "error" });
    }
    setFlag(true);
  }, [state]);
}
