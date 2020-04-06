import React, { Component } from "react";
import { myFirebase } from "../../Config/MyFirebase";
import "./styles.css";
import { withRouter } from "react-router-dom";
import CustomDialog from "../Dialog/CustomDialog";
import Avatar from "@material-ui/core/Avatar";
import { AppString } from "../../Config/AppString";
import Menu from "../Menu/Menu";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDialogConfirmLogout: false
    };
    this.currentUserId = localStorage.getItem(AppString.ID);
    this.currentUserAvatar = localStorage.getItem(AppString.PHOTO_URL);
    this.currentUserDisplayName = localStorage.getItem(AppString.DISPLAYNAME);
  }

  onProfileClick = () => {
    this.props.history.push("/profile");
  };
  // ############# Start logOut #######################
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
  // ############# ENDS logOut #######################

  render() {     
     return (
      <div className="root">
        <div className="header">
         <span>{this.props.title?? "Mango Chat"}</span>
         <div className="profile-menu-container">
           <div className="avatar">
          <Avatar
              alt="user Name"
              className="imgSetting"
              src={this.currentUserAvatar}/>
           </div>
           <div className="setting-dropDown">
            <Menu logOut={this.onLogoutClick} gotoProfile={this.onProfileClick}></Menu>
           </div>
         </div>
        </div>
        {this.state.isOpenDialogConfirmLogout
          ? this.renderDialogConfirmLogout()
          : null}
      </div>
    );
  }
}

export default withRouter(Header);
