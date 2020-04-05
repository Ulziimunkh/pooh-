import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./WelcomeBoard.css";
import {AppString} from '../../Config/AppString';

export default class WelcomeBoard extends Component {
    constructor(props) {
        super(props)
        this.currentUserId = localStorage.getItem(AppString.ID)
        this.currentUserAvatar = localStorage.getItem(AppString.PHOTO_URL)
        this.currentUserDisplayName = localStorage.getItem(AppString.DISPLAYNAME)
    }
  render() {
    return (
      <div className="viewWelcomeBoard">
        <span className="textTitleWelcome">{`Welcome, ${this.currentUserDisplayName}`}</span>
        <img
          className="avatarWelcome"
          src={this.currentUserAvatar}
          alt="icon avatar"
        />
        <span className="textDesciptionWelcome">
          Let's start talking. Great things might happen.
        </span>
      </div>
    );
  }
}
