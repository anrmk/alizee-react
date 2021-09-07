import { Badge, makeStyles, withStyles } from "@material-ui/core";

export const StyledBadge = withStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },

  badge: {
    position: "relative",
    transform: "none",
  },
}))(Badge);

const useStyles = makeStyles((theme) => {
  const hideScroll = {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  };
  return {
    card: {
      position: "relative",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",

      [theme.breakpoints.down("sm")]: {
        height: `calc(100vh - ${
          theme.mixins.toolbar.minHeight * 2 + theme.spacing(0.7)
        }px)`,
      },
    },

    cardContent: {
      position: "relative",
      zIndex: "1",
      flex: "1 1 0",
      order: 2,
    },

    cardFooter: {
      position: "relative",
      zIndex: 1,
      flex: "none",
      order: 3,
      boxSizing: "border-box",
      width: "100%",
    },

    sideBarRoot: {
      borderRadius: theme.spacing(0.5),
      [theme.breakpoints.up("md")]: {
        borderRight: `1px solid ${theme.palette.divider}`,
        borderRadius: `${theme.spacing(0.5)}px 0 0 ${theme.spacing(0.5)}px`,
      },
    },

    roomRoot: {
      borderRadius: theme.spacing(0.5),
      [theme.breakpoints.up("md")]: {
        borderRadius: `0 ${theme.spacing(0.5)}px ${theme.spacing(0.5)}px 0`,
      },
    },

    sidebarList: {
      position: "absolute",
      width: "100%",
      height: "100%",
      overflowY: "auto",
      left: 0,
      top: 0,
      display: "flex",
      flexDirection: "column",
      ...hideScroll,
    },
    sidebarListItemText: {
      width: "100%",
    },
    sidebarListItemOfflineDate: {
      flex: "1 1 70%",
      textAlign: "end",
    },

    icon: {
      fontSize: theme.spacing(8),
    },
  };
});

export default useStyles;
