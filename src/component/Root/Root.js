import React, { Component } from "react";
import "./Root.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Profile from "../../pages/Profile/Profile";
import Home from "../../pages/Home";
import Error from "../../pages/Error";
import Dashboard from "../Dashboard/Dashboard";
import Aboutus from "../Weare/About";
import Privacy from "../Weare/Privacy";
import Term from "../Weare/Term";
import Loader from "../Loader/Loader"
import Test from "../Test/Test";
import { myFirestore, myFirebase, myFireFn } from "../../Config/MyFirebase";
// import Footer from "../../pages/Footer/Footer"
class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  } 
setLoading = (value) => {
    this.setState({isLoading: value});
} 



statusChanged = (uid) => {
  // [START rtdb_and_local_fs_presence]
  // [START_EXCLUDE]
  var userStatusDatabaseRef = myFirebase.database().ref('/status/' + uid);

  var isOfflineForDatabase = {
      status: 'offline',
      last_changed: myFirebase.database.ServerValue.TIMESTAMP,
  };

  var isOnlineForDatabase = {
      status: 'online',
      last_changed: myFirebase.database.ServerValue.TIMESTAMP,
  };

  // [END_EXCLUDE]
  var userStatusFirestoreRef = myFirestore.doc('/status/' + uid);

  // Firestore uses a different server timestamp value, so we'll 
  // create two more constants for Firestore status.
  var isOfflineForFirestore = {
      status: 'offline',
      last_changed: myFirebase.firestore.FieldValue.serverTimestamp(),
  };

  var isOnlineForFirestore = {
      status: 'online',
      last_changed: myFirebase.firestore.FieldValue.serverTimestamp(),
  };

  myFirebase.database().ref('.info/connected').on('value', function(snapshot) {
      if (snapshot.val() === false) {
          // Instead of simply returning, we'll also set Firestore's status
          // to 'offline'. This ensures that our Firestore cache is aware
          // of the switch to 'offline.'
          
          console.log("Root -> statusChanged -> it goes offline");
          userStatusFirestoreRef.update(isOfflineForFirestore);
          return;
      };
      console.log("Root -> statusChanged -> it goes online");

      userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
          userStatusDatabaseRef.set(isOnlineForDatabase);

          // We'll also add Firestore set here for when we come online.
          userStatusFirestoreRef.update(isOnlineForFirestore);
      });
  });
}
  showToast = (type, message) => {
    // 0 = warning, 1 = success
    switch (type) {
      case 0:
        toast.warning(message);
        break;
      case 1:
        toast.success(message);
        break;
      default:
        break;
    }
  };
  render() {
    // this.onUserStatusChanged()
    return (
      <Router>
        <div id="routing-container">
          <ToastContainer
            autoClose={2000}
            hideProgressBar={true}
            position={toast.POSITION.BOTTOM_RIGHT}
          />
          <Loader isLoading = {this.state.isLoading}/>
          <Switch>
            <Route path="/" exact render = {props => <Home statusChanged = {this.statusChanged} setLoading={this.setLoading} showToast={this.showToast} {...props} />}/>
            <Route path="/profile" exact  render={props => <Profile setLoading={this.setLoading} showToast={this.showToast} {...props}/>} />
            <Route path="/dashboard" exact render={props => <Dashboard  statusChanged = {this.statusChanged}  setLoading={this.setLoading}  showToast={this.showToast} {...props}/>} />
            <Route path="/aboutus" exact render={props => <Aboutus showToast={this.showToast} {...props}/>} />
            <Route path="/term" exact render={props => <Term showToast={this.showToast} {...props}/>} />
            <Route path="/privacy" exact render={props => <Privacy showToast={this.showToast} {...props}/>} />
            <Route path="/test" exact render={props => <Test favcol="yellow" showToast={this.showToast} {...props}/>} />
            <Route component={Error}></Route>
            {/* <Route component={Footer}></Route> */}
          </Switch>
        </div>
      </Router>
    );
  }
}
export default Root;
