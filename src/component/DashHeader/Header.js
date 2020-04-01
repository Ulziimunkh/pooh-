import React, { Component, createRef, useRef, useEffect } from "react";
import { myFirebase } from "../../Config/MyFirebase";
import "./styles.css";
import images from "../Themes/Images";
import { withRouter } from "react-router-dom";
import CustomDialog from "../Dialog/CustomDialog";
import Avatar from "@material-ui/core/Avatar";
import { AppString } from "../../Config/AppString";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDialogConfirmLogout: false
    };
    this.anchorRef = createRef();
    
    this.isMenuOpen = false;
    this.currentUserId = localStorage.getItem(AppString.ID);
    this.currentUserAvatar = localStorage.getItem(AppString.PHOTO_URL);
    this.currentUserNickname = localStorage.getItem(AppString.NICKNAME);
  }
  //prevOpen = React.useRef(this.state.isMenuOpen);

  handleToggle = () => {
    this.isMenuOpen = !this.isMenuOpen;
  };
  handleClose = event => {
    if (
      this.anchorRef.current &&
      this.anchorRef.current.contains(event.target)
    ) {
      return;
    }
    this.isMenuOpen = false;
  };
  handleListKeyDown = event => {
    if (event.key === "Tab") {
      event.preventDefault();
      this.isMenuOpen = false;
    }
  };

  onProfileClick = () => {
    this.props.history.push("/profile");
  };
  onLogoutClick = () => {
    this.setState({
      isOpenDialogConfirmLogout: true
    });
  };

  doLogout = () => {
    this.props.setLoading(true);
    myFirebase
      .auth()
      .signOut()
      .then(() => {
        this.props.setLoading(false);
        this.setState(() => {
          localStorage.clear();
          this.props.showToast(1, "Logout success");
          this.props.history.push("/");
        });
      })
      .catch(function(err) {
        this.props.setLoading(false);
        this.props.showToast(0, err.message);
      });
  };
  hideDialogConfirmLogout = () => {
    this.setState({
      isOpenDialogConfirmLogout: false
    });
  };
  renderDialogConfirmLogout = () => {
    return (
      <CustomDialog
        title="Are you sure to logout?"
        handleCloseYes={this.doLogout}
        handleCloseNo={this.hideDialogConfirmLogout}
        open={this.state.isOpenDialogConfirmLogout}
      />
    );
  };
  render() {     
     return (
      <div className="root">
        <div className="header">
          <span>Mango Chat</span>
          <Button
            ref={this.anchorRef}
            aria-controls={this.isMenuOpen ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
          </Button>
          <Popper
            open={this.isMenuOpen}
            anchorEl={this.anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList
                      autoFocusItem={this.isMenuOpen}
                      id="menu-list-grow"
                      onKeyDown={this.handleListKeyDown}
                    >
                      <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                      <MenuItem onClick={this.handleClose}>My account</MenuItem>
                      <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          <Avatar
            alt="user Name"
            className="imgSetting"
            src={this.currentUserAvatar}
          />
          <img
            className="icLogout"
            alt="An icon logout"
            src={images.ic_logout}
            onClick={this.onLogoutClick}
          />
        </div>
        {this.state.isOpenDialogConfirmLogout
          ? this.renderDialogConfirmLogout()
          : null}
      </div>
    );
  }
}

export default withRouter(Header);
