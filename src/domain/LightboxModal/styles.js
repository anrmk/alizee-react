import { makeStyles } from "@material-ui/core/styles";

const baseMediaContent = () => ({
  width: "auto !important",
  height: "100vh",
  objectFit: "contain"
});

const useStyles = makeStyles((theme) => ({
  imageContent: {
    ...baseMediaContent(),
    [theme.breakpoints.down("sm")]: {
      width: "100% !important"
    }
  },
  videoContent: {
    ...baseMediaContent(),
  },
  imageContentWrapper: {
    height: "100%",
    width: "100%"
  },
}));

export default useStyles;
