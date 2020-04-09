import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CustomDialog from '../Dialog/CustomDialog';
import { myFirestore} from "../../Config/MyFirebase";

const ITEM_HEIGHT = 22;
export default function ChatLeave(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [leaveDialog, setLeaveDialog] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const hideDialogConfirmNo = () => {
    setLeaveDialog(false);
  };
  const doLeave = () =>{
    setLeaveDialog(false);
    let selectedChat = props.selectedChat;
    myFirestore
    .collection("chats")
    .doc(selectedChat.chatId)
    .update({
      isActive: false,
      deactivedDate: new Date(),
      deactivedBy: props.currentUserId
    });
  }
  const onClickLeave = () =>{
      setLeaveDialog(true);
      setAnchorEl(null);
  }
  const renderDialogConfirmLogout = () => {
      if(leaveDialog){
        return (
          <CustomDialog
            title="Make sure to leave chat"
            handleCloseYes={doLeave}
            handleCloseNo={hideDialogConfirmNo}
            open={leaveDialog}
          />)
      }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '15ch',
          },
        }}
      >
          <MenuItem key='leave_you' onClick={onClickLeave}>
            Leave you
          </MenuItem>
       </Menu>
       {renderDialogConfirmLogout()}
    </div>
  );
}
