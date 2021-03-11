import { useCallback, useEffect, useState } from "react";

import dialogs, { SHARE_POST_DIALOG_TYPE } from "../../constants/dialogs";
import useDialog from "../useDialog";

export default function useSharePostDialog() {
  const dialog = useDialog();
  const [localData, setLocalData] = useState();

  useEffect(() => { 
    if (dialog.stack.length === 2) {
      dialog.setParams(
        dialogs[SHARE_POST_DIALOG_TYPE](
          null,
          {
            onBackClick: dialog.back,
            ...localData,
          }
        )
      );
    }
  }, [dialog.stack]);

  const handleDialogToggle = useCallback(
    async (data) => {
      setLocalData(data);
      dialog.toggleWithStack(
        dialogs[SHARE_POST_DIALOG_TYPE](
          null,
          {
            onBackClick: dialog.back,
            ...data,
          }
        )
      );
    },
    []
  );

  return {
    toggle: handleDialogToggle
  };
}
