import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { MEET_ROUTE, ROOM_ID_ROUTE } from "../../constants/routes";

import {
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  Input,
  IconButton,
  DialogContent,
  InputAdornment,
} from "@material-ui/core";

import CameraOutlinedIcon from "@material-ui/icons/CameraOutlined";
import LinkIcon from "@material-ui/icons/LinkOutlined";
import DirectionsIcon from "@material-ui/icons/DirectionsOutlined";

import useStyles from "./style";

function Tools() {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [roomCode, setRoomCode] = useState("");

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    history.push(ROOM_ID_ROUTE(roomCode));
  };

  return (
    <Card className={classes.root} >
      <CardHeader
        avatar={<CameraOutlinedIcon style={{ fontSize: "72px" }} />}
        titleTypographyProps={{ variant: "body2" }}
        title="Wanna be on top? Start live streaming or join room with the hottest streamers"
      />
      <CardContent>
        <Button variant="contained" size="large" href={MEET_ROUTE}>
          Create
        </Button>
        <Button variant="contained" size="large" onClick={() => setOpen(true)}>
          Join
        </Button>
      </CardContent>

      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Anyone with a room code and account can join a meeting!</DialogTitle>
        <DialogContent>
          <form className={classes.tools} onSubmit={handleFormSubmit}>
            <FormControl>
              <InputLabel htmlFor="component-url" required focused>
                Room Code
              </InputLabel>
              <Input
                id="component-url"
                value={roomCode}
                placeholder="Enter a code"
                startAdornment={
                  <InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>
                }
                onChange={(e) => setRoomCode(e.currentTarget.value)}
                required
              />
            </FormControl>
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <DirectionsIcon />
            </IconButton>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default Tools;
