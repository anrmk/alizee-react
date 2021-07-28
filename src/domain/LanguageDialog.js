import React from "react";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

import { List, ListItem, ListItemText } from "@material-ui/core";

function LanguageDialog({ onChange }) {
  const { t } = useTranslation();

  const handleLanguageChange = (l) => {
    onChange && onChange(l);
  };

  return (
    <List>
      {i18n.options.supportedLngs &&
        i18n.options.supportedLngs.map(
          (lang) =>
            lang !== "cimode" && (
              <ListItem
                key={lang}
                button
                onClick={() => handleLanguageChange(lang)}
                selected={lang === i18n.language}>
                <ListItemText>{t(lang)}</ListItemText>
              </ListItem>
            )
        )}
    </List>
  );
}

export default LanguageDialog;
