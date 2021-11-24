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
          theme.mixins.toolbar.minHeight * 1.9 + theme.spacing(3)
        }px)`,
      },
    },

    cardContent: {
      position: "relative",
      zIndex: "1",
      flex: "1 1 0",
      order: 2,
      padding: `${theme.spacing(0)} !important`,
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
      width: "100%",
      height: `calc(100vh - ${
        theme.mixins.toolbar.minHeight * 3.2 + theme.spacing(3)
      }px)`,
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      padding: "0",
      ...hideScroll,
      [theme.breakpoints.down("sm")]: {
        height: `calc(100vh - ${
          theme.mixins.toolbar.minHeight * 5.1 + theme.spacing(3)
        }px)`,
      },
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
