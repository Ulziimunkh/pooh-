import React, { Component } from "react";
import { myStorage, myFirestore } from "../../Config/MyFirebase";
import { AppString } from "../../Config/AppString";
import "./Profile.css";
import images from "../../component/Themes/Images";
import NativeSelect from "@material-ui/core/NativeSelect";
import {CalculateAge} from '../../Utils/Utils'
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  FormControlLabel,
  TextField,
  Slider,
  Typography,
  FormHelperText,
  CssBaseline,
  Container,
  FormControl,
  InputLabel,
  Grid,
  Input,
  Switch,
} from "@material-ui/core";
import { Button} from "@material-ui/core";
const interestedInList = [
  { value: "both", label: "Both" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];
class Profile extends Component {
  // const {name, email, picture} = fb;
  constructor(props) {
    super(props);
    // this.props.setLoading(false);
    this.state = {
      id: localStorage.getItem(AppString.ID),
      displayName: localStorage.getItem(AppString.DISPLAYNAME),
      aboutMe: localStorage.getItem(AppString.ABOUT_ME),
      photoUrl: localStorage.getItem(AppString.PHOTO_URL),
      interestedIn: localStorage.getItem(AppString.INTERESTEDIN)?? 'both',
      showDisplayName: localStorage.getItem(AppString.SHOW_DISPLAYNAME) === 'true',
      showProPhoto: Boolean(localStorage.getItem(AppString.SHOW_PROPHOTO)) === 'true',
      showGender: Boolean(localStorage.getItem(AppString.SHOW_GENDER)) === 'true',
      gender: localStorage.getItem(AppString.GENDER)?? '',
      birthday: localStorage.getItem(AppString.BIRTHDAY)?? new Date('01/01/2004'),
      ageRange: localStorage.getItem(AppString.AGE_RANGE).split(',').map(Number)
      
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
  handleChangeRange = (event, newValue) => {
    this.setState({ ageRange: newValue });
  };
  handleChangeBirthday = (event, newValue) => {
    this.setState({ birthday: newValue });
  };
  onChangeEvent = (event) => {
    const name = event.target.name;
    console.log(
      "Profile -> onChangeEvent -> event.target.type",
      event.target.type
    );
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
      showDisplayName: this.state.showDisplayName,
      aboutMe: this.state.aboutMe,
      gender: this.state.gender,
      showGender: this.state.showGender,
      birthday: this.state.birthday,
      interestedIn: this.state.interestedIn,
      showProPhoto: this.state.showProPhoto,
      ageRange: this.state.ageRange,
    };
    if(this.state.birthday){
        let age = CalculateAge(new Date(this.state.birthday));
        newInfo.age = age;
    }
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
        localStorage.setItem(AppString.SHOW_DISPLAYNAME, this.state.showDisplayName);
        localStorage.setItem(AppString.GENDER, this.state.gender);
        localStorage.setItem(AppString.SHOW_GENDER, this.state.showGender);
        localStorage.setItem(AppString.BIRTHDAY, this.state.birthday);
        localStorage.setItem(AppString.INTERESTEDIN, this.state.interestedIn);
        localStorage.setItem(AppString.SHOW_PROPHOTO, this.state.showProPhoto);
        localStorage.setItem(AppString.AGE_RANGE, this.state.ageRange);
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
        {/* <Header
          title="Edit Profile"
          setLoading={this.props.setLoading}
          showToast={this.props.showToast}
          {...this.props}
        ></Header> */}
        <div className="profile-container">
          <div className="avatar-container">
            <div className="avatar-img">
              <img
                className="pro-avatar"
                alt="Avatar"
                src={this.state.photoUrl}
              />
            </div>
            <div className="pro-control-container">
              <FormControlLabel
                className="pro-controller"
                margin="normal"
                labelPlacement="end"
                control={
                  <Switch
                    checked={this.state.showProPhoto}
                    onChange={this.onChangeEvent}
                    name="showProPhoto"
                    color="primary"
                  />
                }
                label="Show"
              />
            </div>
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
          </div>
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className="profile-form">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl style={{ width: "100%" }}>
                    <TextField
                      autoComplete="displayName"
                      value={
                        this.state.displayName ? this.state.displayName : ""
                      }
                      onChange={this.onChangeEvent}
                      name="displayName"
                      required
                      id="displayName"
                      label="Display Name"
                      autoFocus
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl style={{ width: "100%" }}>
                    <FormControlLabel
                      margin="normal"
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
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <FormControl style={{ width: "100%" }}>
                      <KeyboardDatePicker
                        margin="normal"
                        name="birthday"
                        id="birthday"
                        label="Birthday"
                        format="MM/dd/yyyy"
                        value={this.state.birthday}
                        onChange={this.handleChangeBirthday}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                      <FormHelperText>It will only be used to find your next match...</FormHelperText>
                    </FormControl>
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel htmlFor="gender">Sex:</InputLabel>
                    <NativeSelect
                      value={this.state.gender}
                      onChange={this.onChangeEvent}
                      inputProps={{
                        name: "gender",
                        id: "gender",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </NativeSelect>
                    <FormHelperText>Please select your sex...</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl style={{ width: "100%" }}>
                    <FormControlLabel
                      margin="normal"
                      labelPlacement="start"
                      control={
                        <Switch
                          checked={this.state.showGender}
                          onChange={this.onChangeEvent}
                          name="showGender"
                          color="primary"
                        />
                      }
                      label="Show Gender Info"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel htmlFor="aboutMe">About me:</InputLabel>
                    <Input
                      id="aboutMe"
                      value={this.state.aboutMe ? this.state.aboutMe : ""}
                      onChange={this.onChangeEvent}
                      placeholder="Tell about yourself..."
                      name="aboutMe"
                    />
                    <FormHelperText>
                      Tell them about yourself. ex: Interest, hobbies, (it helps
                      to identify you){" "}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel htmlFor="interestedIn">
                      InterestedIn:
                    </InputLabel>
                    <NativeSelect
                      value={this.state.interestedIn}
                      onChange={this.onChangeEvent}
                      inputProps={{
                        name: "interestedIn",
                        id: "interestedIn",
                      }}
                    >
                      {interestedInList.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl style={{ width: "100%" }}>
                    <Typography
                      id="ageRange"
                      style={{ marginLeft: "auto" }}
                      gutterBottom
                    >
                      Age Range
                    </Typography>
                    <Slider min={16}
                      name="ageRange" defaultValue={[16,35]}
                      value={this.state.ageRange}
                      onChange={this.handleChangeRange}
                      aria-labelledby="ageRange"
                      id="ageRange"
                      valueLabelDisplay="on"
                    />
                  </FormControl>
                </Grid>
              </Grid>
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
          </Container>
        </div>
      </>
    );
  }
}
export default (Profile);
