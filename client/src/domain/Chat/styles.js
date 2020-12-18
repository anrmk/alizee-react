import { makeStyles } from "@material-ui/core";
import { getStyleByTheme } from "../../helpers/functions";

const useStyles = makeStyles((theme) => {
  const hideScroll = {
    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
  return {
    card: {
      position: "relative",
      height: `calc(100vh - ${(theme.mixins.toolbar.minHeight*2 + theme.spacing(2))}px)`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },

    cardContent: {
      position: "relative",
      zIndex: "1",
      flex: "1 1 0",
      order: 2
    },

    cardFooter: {
      position: "relative",
      zIndex: 1,
      flex: "none",
      order: 3,
      boxSizing: "border-box",
      width: "100%"
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
      ...hideScroll
    },
  }
});

export default useStyles;
