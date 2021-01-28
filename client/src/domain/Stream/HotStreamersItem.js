import React from "react";
import PropTypes from "prop-types";
import { Box, Card, CardActions, CardActionArea, CardHeader, Typography } from "@material-ui/core/";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";

import Avatar from "../../components/Avatar";

import { formatDate } from "../../helpers/functions";

import useStyles from "./styles";

function HotStreamersItem({
  item,

  onJoinStream,
}) {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.itemCard}>
      <CardActionArea onClick={onJoinStream}>
        <CardHeader
          className={classes.itemCardHeader}
          avatar={<Avatar src={item.user.avatarUrl} online={!item.user.offlineDate} />}
          title={
            <Typography noWrap variant="body1" color="textPrimary">
              {item?.user.name}
            </Typography>
          }
          subheader={
            <Typography noWrap variant="body2" color="textSecondary">
              {item.user.offlineDate ? formatDate(item.user.offlineDate) : "available now"}
            </Typography>
          }
          classes={{ content: classes.itemCardHeaderContent }}
        />
        <CardActions disableSpacing className={classes.itemActions}>
          <Box ml={2} display="flex">
            <FavoriteIcon color="disabled" />
            <Typography variant="body2" color="textSecondary" className={classes.itemCountText}>
              {item.likeCount ? item.likeCount : 0}
            </Typography>
          </Box>
          <Box ml={2} display="flex">
            <ChatOutlinedIcon color="disabled" />
            <Typography variant="body2" color="textSecondary" className={classes.itemCountText}>
              {item.commentCount ? item.commentCount : 0}
            </Typography>
          </Box>
          <Typography variant="body1" color="primary" className={classes.itemJoinTicketPriceText}>
            Join {item.ticketPrice ? `for $${item.ticketPrice}` : "Free"}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

HotStreamersItem.propTypes = {
  item: PropTypes.object,

  onSendTip: PropTypes.func,
  onJoinStream: PropTypes.func,
};

HotStreamersItem.defaultProps = {
  item: {},

  onSendTip: undefined,
  onJoinStream: undefined,
};

export default HotStreamersItem;
