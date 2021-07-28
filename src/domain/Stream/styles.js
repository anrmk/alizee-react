import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  itemCard: {
    marginBottom: theme.spacing(1),
  },
  itemCardHeaderContent: {
    overflow: "hidden",
  },
  itemCountText: {
    marginLeft: theme.spacing(0.5),
  },
  itemActions: {
    flexWrap: "wrap",
  },
  itemJoinTicketPriceText: {
    marginLeft: "auto",
    marginRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
}));

export default useStyles;
