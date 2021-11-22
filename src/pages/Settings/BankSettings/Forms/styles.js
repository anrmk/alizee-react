import { makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { getStyleByTheme } from "../../../../helpers/functions";

const useStyles = makeStyles((theme) => ({
  withdrawFundsAlertRoot: {
    "& > .MuiAlert-message": {
      width: "100%",
    },
  },
  withdrawFundsCardRoot: {
    border: `1px solid ${theme.palette.divider}`,
  },
  withdrawFundsCardHeader: {
    backgroundColor: getStyleByTheme(theme, blue[100], theme.palette.grey[800]),
  },
  withdrawFundsCardSubTitle: {
    fontWeight: 600,
  },
}));

export default useStyles;
