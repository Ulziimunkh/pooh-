import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect} from "react-router-dom";
import { myFirestore, myFirebase } from "../../Config/MyFirebase";
import {AppString} from '../../Config/AppString'
import NavBar from "../NavBar/NavBar";
export default class AuthProvider extends Component {
  //localization
  // The component's Local state.
  state = {
    isSignedIn: false, // Local signed-in state.
    signupError: "",
    isLoading: false
  };

  uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/dashboard",
    signInOptions: [
      {
        provider: myFirebase.auth.FacebookAuthProvider.PROVIDER_ID,
        scopes: [
          "public_profile",
          "email",
          "user_gender",
          "user_birthday"
          //"user_hometown",
          //"user_location",
          //"user_photos",
          //"user_posts",
          //"user_videos",
          //"user_link",
          //"user_likes",
          //"instagram_basic",
          //"user_friends"
        ]
      },
      myFirebase.auth.GoogleAuthProvider.PROVIDER_ID,
      {
        provider: myFirebase.auth.PhoneAuthProvider.PROVIDER_ID,
        defaultCountry: "IN"
      }
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        console.log("login result:", authResult);
        if (authResult.credential) {
          const dt = new Date();
          const { user, additionalUserInfo, credential } = authResult;
          const userObj = {
            userId: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            emailVerified: false,
            aboutMe: "Let's have fun.",
            createdDate: dt,
            lastSignedDate: dt
          };
          switch (authResult.additionalUserInfo.providerId) {
            case "facebook.com":
              if (additionalUserInfo.isNewUser) {
                userObj.gender = additionalUserInfo.profile.gender;
                userObj.birthday = additionalUserInfo.profile.birthday;
              } else {
              }
              break;
            case "google.com":
              if (additionalUserInfo.isNewUser) {
              } else {
              }
              break;
            case "phone":
              if (additionalUserInfo.isNewUser) {
              } else {
              }
              break;
            default:
              break;
          }
          if (additionalUserInfo.isNewUser) {
            myFirestore
              .collection("users")
              .doc(userObj.email)
              .set(userObj)
              .then(
                () => {
                  console.log("registered successfully...");
                  this.setDataToLocalStorage(user);
                },
                dbErr => {
                  console.log("Failed to add user to the database: ", dbErr);
                  this.setState({ signupError: "Failed to add user" });
                }
              );
          } else {
            myFirestore
              .collection("users")
              .doc(user.email)
              .update({ lastSignedDate: new Date() })
              .then(
                (userUpdated) => {
                  this.setDataToLocalStorage(user);
                },
                dbErr => {
                  console.log(
                    "Failed to update user data to the database: ",
                    dbErr
                  );
                  this.setState({ signupError: "Failed to update user" });
                }
              );
            //update
          }
          console.log("loggod from: ", credential.providerId);
          console.log("user data: ", user);
          console.log("Additional user data: ", additionalUserInfo.isNewUser);
        }
        return false;
      },
      // signInFailure callback must be provided to handle merge conflicts which
      // occur when an existing credential is linked to an anonymous user.
      signInFailure: function(error) {
        console.log("login failure----->");
        // For merge conflicts, the error.code will be
        // 'firebaseui/anonymous-upgrade-merge-conflict'.
        if (error.code !== "firebaseui/anonymous-upgrade-merge-conflict") {
          return Promise.resolve();
        }
        // The credential the user tried to sign in with.
        var cred = error.credential;
        // Copy data from anonymous user to permanent user and delete anonymous
        // user.
        // ...
        // Finish sign-in after data is copied.
        return myFirebase.auth().signInWithCredential(cred);
      }
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = myFirebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
  }
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  setDataToLocalStorage = (user) => {
    // Write user info to local
    localStorage.setItem(AppString.ID, user.uid)
    localStorage.setItem(AppString.NICKNAME, user.displayName)
    localStorage.setItem(AppString.PHOTO_URL, user.photoURL)
    this.props.setLoading(false);
    this.setState(() => {
        this.props.showToast(1, 'Login success')
        this.props.history.push('/dashboard')
    })
  }
  render() {
    if (!this.state.isSignedIn) {
      document.getElementsByTagName("BODY")[0].classList.add("home-page");
      return (
        <>
          <NavBar></NavBar>
          <div className="home-login">
            <div className="login-content">
              <h1>Welcome to Mango!</h1>
              <p>Please sign-in:</p>
              <StyledFirebaseAuth 
                uiConfig={this.uiConfig}
                firebaseAuth={myFirebase.auth()}
              />
            </div>
          </div>
        </>
      );
    }
    document.getElementsByTagName("BODY")[0].classList.remove("home-page");
    return <Redirect to={{ pathname: "/dashboard" }}></Redirect>;
  }
}
