import React, { Component } from "react";
import Header from "../../component/DashHeader/Header";
import { myStorage, myFirestore } from "../../Config/MyFirebase";
import { AppString } from "../../Config/AppString";
import "./Profile.css";
import images from "../../component/Themes/Images";
import {
  FormControlLabel,
  FormGroup,
  FormControl,
  InputLabel,
  FormHelperText,
  Input,
  Switch,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
const interestedInList = ["both", "male", "female"];
export default class Profile extends Component {
  // const {name, email, picture} = fb;
  constructor(props) {
    super(props);
    // this.props.setLoading(false);
    this.state = {
      id: localStorage.getItem(AppString.ID),
      displayName: localStorage.getItem(AppString.DISPLAYNAME),
      aboutMe: localStorage.getItem(AppString.ABOUT_ME),
      photoUrl: localStorage.getItem(AppString.PHOTO_URL),
      interestedIn: "both",
      showDisplayName: false,
      showProPhoto: false,
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
    console.log(
      "Profile -> onChangeEvent -> event.target.type",
      event.target.type
    );
    console.log("Profile -> onChangeEvent -> name", name);
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
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
    let newInfo = {
      displayName: this.state.displayName,
      aboutMe: this.state.aboutMe,
    };
    let userConfig = {
      interestedIn: this.state.interestedIn,
      showProPhoto: this.state.showProPhoto,
    };
    if (isUpdatePhotoUrl) {
      newInfo.photoURL = downloadURL;
    }
    // myFirestore.collection("userConfig").doc(this.state.id).update(newInfo);
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
        <Header
          title="Edit Profile"
          setLoading={this.props.setLoading}
          showToast={this.props.showToast}
          {...this.props}
        ></Header>
        <div className="profile-container">
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
          <div className="profile-form">
              <FormControl>
                <InputLabel htmlFor="displayName">Display Name:</InputLabel>
                <Input
                  id="displayName"
                  value={this.state.displayName ? this.state.displayName : ""}
                  onChange={this.onChangeEvent}
                  placeholder="Your displayName..."
                  name="displayName"
                  aria-describedby="my-helper-text"
                />
                <FormHelperText id="my-helper-text">
                  it will show.
                </FormHelperText>
              </FormControl>
            <FormGroup row>
              <FormControlLabel margin="normal"
              labelPlacement="start"
              control={
                  <Switch
                    checked={this.state.showDisplayName}
                    onChange={this.onChangeEvent}
                    name="showDisplayName"
                    color="primary"
                  />
                }
                label="Show Display Name"
              />
            </FormGroup>
            <FormGroup row>
              <FormControl>
                <InputLabel htmlFor="aboutMe">About me:</InputLabel>
                <Input
                  id="aboutMe"
                  value={this.state.aboutMe ? this.state.aboutMe : ""}
                  onChange={this.onChangeEvent}
                  placeholder="Tell about yourself..."
                  name="aboutMe"
                />
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.showProPhoto}
                    onChange={this.onChangeEvent}
                    name="showProPhoto"
                    color="primary"
                  />
                }
                label="Show Profile Photo"
              />
            </FormGroup>
            <div className="group-buttons">
              <Button variant="contained" onClick={this.goToDashboard}>
                Go Back
              </Button>
              <Button
                variant="contained"
                onClick={this.uploadAvatar}
                color="secondary"
                style={{ marginLeft: "10px" }}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
