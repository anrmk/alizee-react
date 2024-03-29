import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
	
  },

  tabsWrapper: {
    position: "sticky",
    top: "0",
    zIndex: theme.zIndex.appBar,
    backgroundColor: theme.palette.background.default,
  },

  tabs: {
    marginBottom: "20px",
  },

  tab: {
    minWidth: '140px'
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
