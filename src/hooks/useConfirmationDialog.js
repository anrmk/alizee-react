import useDialog from "./useDialog";
import dialogs, { CONFIRM_DIALOG_TYPE } from "../constants/dialogs";
import { getDialogToggleType } from "../helpers/functions";

export default function useConfirmationDialog() {
  const dialog = useDialog();

  const handleDialogToggle = (dialogOpts, contentOpts, withStack = false) => {
    const toggleType = getDialogToggleType(withStack);
    dialog[toggleType](
      dialogs[CONFIRM_DIALOG_TYPE](
        {
          ...dialogOpts,
        },
        {
          ...contentOpts,
        }
      )
    );
  };

  return {
    toggle: handleDialogToggle,
  };
}
