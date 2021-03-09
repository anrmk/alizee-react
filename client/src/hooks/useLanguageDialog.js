import i18n from "i18next";

import dialogs, { LANGUAGE_DIALOG_TYPE } from "../constants/dialogs";
import useDialog from "../hooks/useDialog";

export default function useLanguageDialog() {
  const dialog = useDialog();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    dialog.toggle({ open: false });
  };

  const handleDialogToggle = () => {
    dialog.toggle(dialogs[LANGUAGE_DIALOG_TYPE](null, { onChange: handleLanguageChange, lang: i18n.language }));
  };

  return {
    toggle: handleDialogToggle,
  };
}
