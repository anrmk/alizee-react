import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  const chipBase = {
    margin: theme.spacing(1),
  }

  return ({
    chipList: {
      display: "flex",
      flexWrap: "wrap",
      padding: theme.spacing(0, 2)
    },
    chip: {
      ...chipBase
    },
    activeChip: {
      ...chipBase,
      backgroundColor: theme.palette.secondary.light,
      "&:active, &:focus": {
        backgroundColor: theme.palette.secondary.light,
      },
      "&:hover": {
        backgroundColor: theme.palette.secondary.dark,
      }
    },
    chipAvatar: {
      backgroundColor: "transparent",
      fontSize: theme.typography.h6.fontSize + " !important"
    }
  });
})

export default useStyles;
