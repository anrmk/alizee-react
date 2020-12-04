import { makeStyles } from "@material-ui/core";
import lime from '@material-ui/core/colors/lime';
import { getStyleByTheme } from "../../helpers/functions";

const useStyles = makeStyles((theme) => {
  const hideScroll = {
    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
  return {
    chatList: {
      height: `calc(100vh - ${(theme.mixins.toolbar.minHeight * 2) + (theme.spacing(2) * 3) + theme.spacing(1) * 3}px - 2.5em - 1px)`,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      ...hideScroll
    },
    chatListItem: {
      display: "flex",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: getStyleByTheme(theme, theme.palette.grey["200"], theme.palette.grey["800"]),
      padding: theme.spacing(2),
      width: "100%",
      height: "100px",
      justifyContent: "space-between",
      zIndex: theme.zIndex.mobileStepper,
      overflow: "hidden",
      "& + &": {
        marginTop: theme.spacing(1),
      }
    },
    chatListItemActive: {
      backgroundColor: getStyleByTheme(theme, theme.palette.grey["400"], theme.palette.grey["600"]),
      "&:hover": {
        backgroundColor: getStyleByTheme(theme, theme.palette.grey["400"], theme.palette.grey["600"]),
      }
    },
    chatListAvatar: {
      marginRight: theme.spacing(2),
    },
    chatListFullName: {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.grey["700"]
    },
    chatListDescription: {
      fontWeight: theme.typography.fontWeightLight,
      color: theme.palette.grey["500"],
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical"
    },
    chatListEnd: {
      alignSelf: "flex-start"
    },
    chatListTime: {
      color: theme.palette.grey["500"]
    },
    chatListMessageCount: {
      width: "20px",
      height: "20px",
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
      fontSize: theme.typography.caption.fontSize,
      borderRadius: "5rem",
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    room: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: theme.spacing(1),
    },
    roomToolbarRoot: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: getStyleByTheme(theme, theme.palette.common.white, theme.palette.grey["800"]),
      boxShadow: theme.shadows[1],
      zIndex: theme.zIndex.speedDial
    },
    roomToolbarRightPart: {
      display: "flex",
      alignItems: "center",
    },
    roomToolbarLeftPart: {
    },
    toolbar: {
      width: "100%",
      justifyContent: "flex-start",
      marginBottom: theme.spacing(1),
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: getStyleByTheme(theme, theme.palette.common.white, theme.palette.grey["800"]),
      color: theme.palette.text.primary,
      boxShadow: theme.shadows[1],
      zIndex: theme.zIndex.speedDial
    },
    avatarToolbar: {
      marginRight: theme.spacing(2)
    },
    searchWrapper: {
      marginBottom: "1px",
      backgroundColor: getStyleByTheme(theme, theme.palette.common.white, theme.palette.grey["800"]),
      color: theme.palette.text.primary,
      boxShadow: theme.shadows[1]
    },
    infoRoomToolbar: {
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius
    },
    nameRoomToolbar: {
      textDecoration: "none",
      color: theme.palette.text.primary
    },
    nameToolbar: {
      textDecoration: "none",
      color: theme.palette.text.primary
    },
    lastOnlineDateRoomToolbar: {
      color: theme.palette.text.primary
    },
    emptyMessageContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      alignSelf: "center"
    },
    progress: {
      alignSelf: "center"
    },
    sidebar: {
      padding: theme.spacing(1),
    },
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
      ...hideScroll
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
    },
    badgeOffline: {
      "& .MuiBadge-badge": {
        backgroundColor: theme.palette.grey["400"],
        "&::after": {
          animationPlayState: "paused",
          border: theme.palette.grey["400"],
        },
      }
    },
    followersDialogList: {
      height: "200px",
      overflowY: "auto",
      ...hideScroll
    }
  }
});

export default useStyles;
