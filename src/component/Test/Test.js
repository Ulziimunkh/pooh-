import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CustomDialog from '../Dialog/CustomDialog';

const ITEM_HEIGHT = 22;
export default function Test() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [leaveDialog, setLeaveDialog] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const hideDialogConfirmLogout = () => {
    setLeaveDialog(false);
  };
  const doLeave = () =>{
    setLeaveDialog(false);

  }
  const onClickLeave = () =>{
      setLeaveDialog(true);
      setAnchorEl(null);
  }
  const renderDialogConfirmLogout = () => {
      if(leaveDialog){
        return (
          <CustomDialog
            title="Are you sure to logout?"
            handleCloseYes={doLeave}
            handleCloseNo={hideDialogConfirmLogout}
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
