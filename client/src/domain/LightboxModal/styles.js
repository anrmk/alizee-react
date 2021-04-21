import { makeStyles } from "@material-ui/core/styles";

const baseMediaContent = () => ({
  width: "auto !important",
  height: "100%",
  objectFit: "contain"
});

const useStyles = makeStyles((theme) => ({
  imageContent: {
    ...baseMediaContent(),
    [theme.breakpoints.down("sm")]: {
      height: "auto",
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
