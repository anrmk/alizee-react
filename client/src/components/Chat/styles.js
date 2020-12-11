import { makeStyles } from "@material-ui/core";
import lime from '@material-ui/core/colors/lime';

import { getStyleByTheme } from "../../helpers/functions";

const useStyles = makeStyles((theme) => ({
    messenger: {
      width: "100%",
      height: `calc(100vh - ${(theme.mixins.toolbar.minHeight * 2) + (theme.spacing(2) * 3) + theme.spacing(1) * 3}px - 48px)`,
      padding: theme.spacing(2),
      marginBottom: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
      boxShadow: theme.shadows[1],
      borderRadius: theme.shape.borderRadius,
      overflowY: "auto",
      position: "relative",
      backgroundImage: "url('https://mir-s3-cdn-cf.behance.net/project_modules/disp/2d9dd173426833.5c08f5634ff45.png')",
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
