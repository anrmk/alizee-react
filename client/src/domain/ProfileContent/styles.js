import { makeStyles } from "@material-ui/core/styles";
import { theme } from "@material-ui/core";
import { getStyleByTheme } from "../../helpers/functions";

const useStyles = makeStyles((theme) => ({
  root: {

  },

  tabsWrapper: {
    position: "sticky",
    top: "3rem",
    zIndex: theme.zIndex.appBar,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up("md")]: {
      top: "4rem"
    },
  },

  tabs: {
    marginBottom: "20px",
  }
}));

export const tabsStyles = () => ({
  root: {
    boxShadow: 'inset 0 1px 0 0 #efefef',
    overflow: 'visible',
  },
  fixed: {
    overflow: 'visible !important',
  },
  indicator: {
    height: 1,
    transform: 'translateY(-52px)',
    backgroundColor: '#262626',
  },
});

export const tabItemStyles = (breakpoints ) => ({
  root: {
    lineHeight: 'inherit',
    minWidth: 0,
    '&:not(:last-child)': {
      marginRight: 24,
      [breakpoints.up('sm')]: {
        marginRight: 60,
      },
    },
    [breakpoints.up('md')]: {
      minWidth: 0,
    },
  },
  labelIcon: {
    minHeight: 53,
    '& $wrapper > *:first-child': {
      marginBottom: 0,
    },
  },
  textColorInherit: {
    opacity: 0.4,
  },
  wrapper: {
    flexDirection: 'row',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    '& svg, .material-icons': {
      fontSize: 16,
      marginRight: 8,
    },
  },
});


export default useStyles;
