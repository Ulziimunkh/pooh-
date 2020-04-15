import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { withRouter, Redirect } from "react-router-dom";
import { myFirestore, myFirebase } from "../../Config/MyFirebase";
import { CalculateAge } from "../../Utils/Utils";
class Login extends Component {
  constructor(props) {
    super(props);
    // The component's Local state.
    this.state = {
      isSignedIn: false, // Local signed-in state.
      signupError: "",
    };
  }

  uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "",
    signInOptions: [
      {
        provider: myFirebase.auth.FacebookAuthProvider.PROVIDER_ID,
        scopes: [
          "public_profile",
          "email",
          "user_gender",
          "user_birthday",
          //"user_hometown",
          //"user_location",
          //"user_photos",
          //"user_posts",
          //"user_videos",
          //"user_link",
          //"user_likes",
          //"instagram_basic",
          //"user_friends"
        ],
      },
      myFirebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // {
      //   provider: myFirebase.auth.PhoneAuthProvider.PROVIDER_ID,
      //   defaultCountry: "IN"
      // }
    ],
    // Terms of service url.
    tosUrl: "/term",
    // Privacy policy url.
    privacyPolicyUrl: "/privacy",
    // credentialHelper:
    //   CLIENT_ID && CLIENT_ID != "YOUR_OAUTH_CLIENT_ID"
    //     ? myFirebase.auth.CredentialHelper.GOOGLE_YOLO
    //     : myFirebase.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        console.log("login result:", authResult);
        if (authResult.credential) {
          const dt = Date.now();
          const { user, additionalUserInfo } = authResult;
          const userObj = {
            id: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            emailVerified: false,
            aboutMe: "Let's have fun.",
            providerId: authResult.additionalUserInfo.providerId,
            ageRange: [16,35],
            interestedIn: "both",
            showDisplayName: false,
            showGender: false,
            showProPhoto: false,
            createdDate: dt,
            last_changed: dt,
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
              if(user.photoURL){
                if ((user.photoURL.indexOf('googleusercontent.com') !== -1) ||
                    (user.photoURL.indexOf('ggpht.com') !== -1)) {
                      userObj.photoURL = user.photoURL + '?sz=40px';
                }
              }
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
            if (userObj.birthday) {
              let age = CalculateAge(new Date(userObj.birthday));
              userObj.age = age;
            }
            myFirestore
              .collection("users")
              .doc(user.uid)
              .set(userObj)
              .then(
                () => {
                  console.log("registered successfully...");
                  this.props.history.push("/profile");
                },
                (dbErr) => {
                  this.setState({ signupError: "Failed to add user" });
                }
              );
          } 
          console.log("Login -> statusChanged")
         this.props.statusChanged(user.uid);
        }
        return false;
      },
      // signInFailure callback must be provided to handle merge conflicts which
      // occur when an existing credential is linked to an anonymous user.
      signInFailure: function (error) {
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
      },
    },
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = myFirebase
      .auth()
      .onAuthStateChanged((user) => this.setState({ isSignedIn: !!user }));
  }
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <>
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
    // this.props.statusChanged();
    return <Redirect to={{ pathname: "/dashboard" }}></Redirect>;
  }
}
export default withRouter(Login);
