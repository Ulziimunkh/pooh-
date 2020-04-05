import React, { Component } from "react";
import Header from "../../component/DashHeader/Header";
import { myStorage, myFirestore } from "../../Config/MyFirebase";
import { AppString } from "../../Config/AppString";
import "./Profile.css";
import images from "../../component/Themes/Images";
import { Button } from "@material-ui/core";

export default class Profile extends Component {
  // const {name, email, picture} = fb;
  constructor(props) {
    super(props);
    // this.props.setLoading(false);
    this.state = {
      id: localStorage.getItem(AppString.ID),
      displayName: localStorage.getItem(AppString.DISPLAYNAME),
      aboutMe: localStorage.getItem(AppString.ABOUT_ME),
      photoUrl: localStorage.getItem(AppString.PHOTO_URL)
    };
    this.newAvatar = null;
    this.newPhotoUrl = "";
  }
  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = () => {
    if (!localStorage.getItem(AppString.ID)) {
      this.props.history.push("/");
    }
  };
  goToDashboard = () => {
    this.props.history.push("/dashboard");
  };
  onChangeEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };
  onChangeAvatar = (event) => {
    if (event.target.files && event.target.files[0]) {
      // Check this file is an image?
      const prefixFiletype = event.target.files[0].type.toString();
      if (prefixFiletype.indexOf(AppString.PREFIX_IMAGE) !== 0) {
        this.props.showToast(0, "This file is not an image");
        return;
      }
      this.newAvatar = event.target.files[0];
      this.setState({ photoUrl: URL.createObjectURL(event.target.files[0]) });
    } else {
      this.props.showToast(0, "Something wrong with input file");
    }
  };
  uploadAvatar = () => {
    this.props.setLoading(true);
    if (this.newAvatar) {
      const uploadTask = myStorage
        .ref()
        .child("userProfile/")
        .child(this.state.id)
        .put(this.newAvatar);
      uploadTask.on(
        AppString.UPLOAD_CHANGED,
        null,
        (err) => {
          this.props.showToast(0, err.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.updateUserInfo(true, downloadURL);
          });
        }
      );
    } else {
      this.updateUserInfo(false, null);
    }
  };
  updateUserInfo = (isUpdatePhotoUrl, downloadURL) => {
    let newInfo;
    if (isUpdatePhotoUrl) {
      newInfo = {
        displayName: this.state.displayName,
        aboutMe: this.state.aboutMe,
        photoURL: downloadURL,
      };
    } else {
      newInfo = {
        displayName: this.state.displayName,
        aboutMe: this.state.aboutMe,
      };
    }
    myFirestore
      .collection(AppString.NODE_USERS)
      .doc(this.state.id)
      .update(newInfo)
      .then((data) => {
        localStorage.setItem(AppString.DISPLAYNAME, this.state.displayName);
        localStorage.setItem(AppString.ABOUT_ME, this.state.aboutMe);
        if (isUpdatePhotoUrl) {
          localStorage.setItem(AppString.PHOTO_URL, downloadURL);
        }
        this.props.setLoading(false);
        this.props.showToast(1, "Update info success");
      });
  };
  render() {
    return (
      <>
        <div className="profile-container">
          <Header
            setLoading={this.props.setLoading}
            showToast={this.props.showToast}
            {...this.props}
          ></Header>
          <img className="pro-avatar" alt="Avatar" src={this.state.photoUrl} />
          <div className="viewWrapInputFile">
            <img
              className="imgInputFile"
              alt="icon gallery"
              src={images.ic_input_file}
              onClick={() => this.refInput.click()}
            />
            <input
              ref={(el) => {
                this.refInput = el;
              }}
              accept="image/*"
              className="viewInputFile"
              type="file"
              onChange={this.onChangeAvatar}
            />
          </div>

          <span className="textLabel">Display Name:</span>
          <input
            className="textInput"
            id="displayName"
            name="displayName"
            value={this.state.displayName ? this.state.displayName : ""}
            placeholder="Your displayName..."
            onChange={this.onChangeEvent}
          />
          <span className="textLabel">About me:</span>
          <input
            className="textInput"
            id="aboutMe"
            name="aboutMe"
            value={this.state.aboutMe ? this.state.aboutMe : ""}
            placeholder="Tell about yourself..."
            onChange={this.onChangeEvent}
          />
          <div className="group-buttons" >
            <Button variant="contained" onClick={this.goToDashboard}>
              Go Back
            </Button>
            <Button
              variant="contained"
              onClick={this.uploadAvatar}
              color="secondary" style={{marginLeft: "10px"}}
            >
              Update
            </Button>
          </div>
        </div>
      </>
    );
  }
}
