import React from "react";
import { IconButton, Typography } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

interface Props {
  myMessage: boolean;
  onReply: () => void;
  onDelete: () => void;
}

const ChatMessageAction: React.FC<Props> = ({
  myMessage,
  onReply,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {myMessage ? (
          <div>
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                onDelete();
              }}
              style={{ color: "red" }}
            >
              Delete
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem
              onClick={() => {
                handleClose();
                onReply();
              }}
            >
              Reply
            </MenuItem>
            <MenuItem onClick={handleClose}>Report</MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default ChatMessageAction;
