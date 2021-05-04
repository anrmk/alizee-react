import dialogs, { LIGHTBOX_MODAL_TYPE } from "../constants/dialogs";
import useDialog from "./useDialog";

export default function useLightboxModal() {
  const dialog = useDialog();

  const handleDialogToggle = ({ items, startSlideIndex = 0 }) => {
    dialog.toggle(dialogs[LIGHTBOX_MODAL_TYPE](
      { asModal: true },
      { items, startSlideIndex }));
  };

  return {
    toggle: handleDialogToggle,
  };
}
