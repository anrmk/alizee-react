import { makeStyles } from "@material-ui/core/styles";

const getProgressInnerStyles = (count, type) => {
  switch (type) {
    case 2:
      return { width: "100%" };
    case 1:
      return { transform: `scaleX(${count / 100})` };
    default:
      return { width: 0 };
  }
};

const getShadow = (theme) => ({
  position: "absolute",
  width: "100%",
  height: `calc(65px + ${theme.spacing(2)}px )`,
  left: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.2,
  filter: `blur(${theme.spacing(1)}px)`,
  zIndex: theme.zIndex.mobileStepper
});

const useStyles = makeStyles((theme) => ({
  container: {
    width: 500,
    display: "flex",
    flexDirection: "column",
    background: theme.palette.common.black,
    position: "relative"
  },
  header: {
    position: "absolute",
    left: "0",
    width: "100%",
    padding: theme.spacing(2),
    zIndex: theme.zIndex.drawer,
  },
  headerInner: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(1)
  },
  headerShadow: {
    top: 0,
    ...getShadow(theme)
  },
  footer: {
    width: "100%",
    bottom: 0,
    display: "flex",
    position: "absolute",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    zIndex: theme.zIndex.drawer
  },
  footerShadow: {
    bottom: 0,
    ...getShadow(theme)
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  tools: {
  },
  btn: {
    color: theme.palette.common.white
  },
  headerText: {
    marginLeft: theme.spacing(2),
    color: theme.palette.common.white
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex"
  },
  controls: {
    width: "50%",
    zIndex: theme.zIndex.appBar
  },
  progressOuter: {
    width: ({ width }) => `${width * 100}%`,
    height: 2,
    maxWidth: "100%",
    background: "#555",
    margin: theme.spacing(0.2),
    overflow: "hidden",
    borderRadius: theme.shape.borderRadius,
  },
  progressInner: ({ count, active }) => ({
    ...getProgressInnerStyles(count, active),
    background: theme.palette.common.white,
    height: "100%",
    maxWidth: "100%",
    borderRadius: theme.shape.borderRadius,
    transformOrigin: "center left",

    WebkitBackfaceVisibility: "hidden",
    MozBackfaceVisibility: "hidden",
    msBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",

    WebkitPerspective: 1000,
    MozPerspective: 1000,
    msPerspective: 1000,
    perspective: 1000,
  }),
  progressList: {
    display: "flex",
    justifyContent: "center",
    maxWidth: "100%",
    flexWrap: "nowrap",
    width: "100%",
    alignSelf: "center"
  },
  story: {
    width: "100%",
    height: "100%",
		display: "flex",
		position: "relative",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    opacity: ({ loaded }) => loaded ? 1 : 0
  },
  video: {
    width: "100%",
    height: "100%"
  },
  loader: {
    position: "absolute",
    zIndex: theme.zIndex.appBar
  }
}));

export default useStyles;
