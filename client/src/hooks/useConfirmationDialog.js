import useDialog from "./useDialog";
import dialogs, { CONFIRM_DIALOG_TYPE } from "../constants/dialogs";

export default function useConfirmationDialog() {
  const dialog = useDialog();

  const handleDialogToggle = ({ callback, title, contentText, mainBtnText }) => {
    dialog.toggle(
      dialogs[CONFIRM_DIALOG_TYPE](
        {
          mainBtnText,
          onMainClick: () => callback(),
          title: title,
        },
        {
          contentText,
        }
      )
    );
  };

  return {
    toggle: handleDialogToggle,
  };
}
