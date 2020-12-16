import { makeStyles } from "@material-ui/core";
import lime from '@material-ui/core/colors/lime';

import { getStyleByTheme } from "../../helpers/functions";

const useStyles = makeStyles((theme) => ({
    emptyMessageContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      alignSelf: "center"
    },
    messenger: {
      width: "100%",
      height: `40vh`, // - ${(theme.mixins.toolbar.minHeight * 5) + (theme.spacing(5) * 7) }px bugfix
      padding: theme.spacing(2),
      marginBottom: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      borderRadius: theme.shape.borderRadius,
      overflowY: "auto",
      position: "relative",
      backgroundRepeat: "repeat",
      "&::-webkit-scrollbar": {
        display: "none"
      }
    },
    messengerMessage: {
      width: "fit-content",
      maxWidth: "100%",
      minWidth: "100px",
      margin: theme.spacing(1, 0),
      padding: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      alignSelf: "flex-start",
      overflowWrap: "break-word",
      backgroundColor: getStyleByTheme(theme, theme.palette.primary.white, theme.palette.grey["800"])
    },
    messengerMyMessage: {
      alignSelf: "flex-end",
      backgroundColor: getStyleByTheme(theme, lime["50"], "#353b61")
    },
    messengerMessageDate: {
      width: "fit-content",
      alignSelf: "flex-end",
      color: theme.palette.text.secondary
    },
    messageSenderWrapper: {
    },
    messageSenderInputWrapper: {
      width: "100%",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: getStyleByTheme(theme, theme.palette.common.white, theme.palette.grey["800"]),
    },
    messageSenderInput: {
      padding: theme.spacing(1, 0),
    }
}));

export default useStyles;
