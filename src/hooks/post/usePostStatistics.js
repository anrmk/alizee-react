import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import useDialog from "../useDialog";
import dialogs, { POST_STATISTICS_DIALOG_TYPE } from "../../constants/dialogs";

import ApiContext from "../../context/ApiContext";

import {
  getStatistics,
  resetStatistics,
} from "../../store/actions/getStatistics";

export default function usePostStatics() {
  const apiClient = useContext(ApiContext);
  const dispatch = useDispatch();
  const dialog = useDialog();
  const { data } = useSelector((state) => state.statistics);

  useEffect(() => {
    if (!data?.data) return;
    dialog.setContent({ data, onReset: handleResetComponent });
  }, [data]);

  const handleResetComponent = () => {
    dispatch(resetStatistics());
  };

  const handleDialogToggle = async ({ postId }) => {
    dialog.toggleWithStack(
      dialogs[POST_STATISTICS_DIALOG_TYPE]({
        loading: true,
      })
    );
    await dispatch(getStatistics(apiClient, postId));
    dialog.setParams({ loading: false });
  };

  return {
    toggle: handleDialogToggle,
  };
}
