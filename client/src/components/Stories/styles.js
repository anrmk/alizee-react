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

const opacityTransition = (pause) => ({
  transition: "opacity 400ms ease-in-out",
  opacity: pause ? 0 : 1
})

const useStyles = makeStyles((theme) => ({
  container: {
    width: 500,
    display: "flex",
    flexDirection: "column",
    background: theme.palette.common.black,
    position: "relative"
  },
  header: ({ pause }) => ({
    position: "absolute",
    display: "flex",
    width: "100%",
    alignItems: "center",
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    zIndex: theme.zIndex.appBar,
    ...opacityTransition(pause)
  }),
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
    borderRadius: theme.shape.borderRadius
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
    perspective: 1000
  }),
  progressList: ({ pause }) => ({
    display: "flex",
    justifyContent: "center",
    maxWidth: "100%",
    flexWrap: "row",
    position: "absolute",
    width: "98%",
    padding: theme.spacing(0.5),
    paddingTop: theme.spacing(1),
    alignSelf: "center",
    zIndex: theme.zIndex.appBar,
    filter: "drop-shadow(0 1px 8px #222)",
    ...opacityTransition(pause)
  }),
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
