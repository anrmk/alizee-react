import dialogs, { LIGHTBOX_MODAL_TYPE } from "../constants/dialogs";
import useDialog from "./useDialog";

export default function useLightboxModal() {
  const dialog = useDialog();

  const handleDialogToggle = ({ post, startSlideIndex }) => {
    dialog.toggle(dialogs[LIGHTBOX_MODAL_TYPE](
      { asModal: true },
      { items: post?.media, startSlideIndex }));
  };

  return {
    toggle: handleDialogToggle,
  };
}
