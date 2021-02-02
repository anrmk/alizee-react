import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const pickerScrollbarTrackBackgroundColor =
    theme.palette.type === "light" ? theme.palette.grey[300] : theme.palette.grey[600];
  const pickerBackgroundColor =
    theme.palette.type === "light" ? theme.palette.common.white : theme.palette.background.paper;

  return {
    icon: {
      color: theme.palette.grey["400"],
    },

    picker: {
      whiteSpace: "break-spaces",
      "& .emoji-mart-category-label span": {
        backgroundColor: pickerBackgroundColor,
      },
      "& .emoji-mart-scroll": {
        "&::-webkit-scrollbar": {
          width: "16px",
        },
        "&::-webkit-scrollbar-track": {
          background: pickerScrollbarTrackBackgroundColor,
          borderLeft: `7px solid ${pickerBackgroundColor}`,
          borderRight: `7px solid ${pickerBackgroundColor}`,
        },
        "&::-webkit-scrollbar-thumb": {
          background: pickerScrollbarTrackBackgroundColor,
          borderRadius: "16px",
        },
      },
      "& .emoji-mart-anchor": {
        padding: "12px 1px",
      },
    },
  };
});

export default useStyles;
