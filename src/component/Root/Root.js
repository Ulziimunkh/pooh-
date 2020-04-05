import React, { Component } from "react";
import "./Root.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Profile from "../../pages/Profile";
import Home from "../../pages/Home";
import Error from "../../pages/Error";
import Dashboard from "../Dashboard/Dashboard";
import Aboutus from "../Weare/About";
import Privacy from "../Weare/Privacy";
import Term from "../Weare/Term";
import Loader from "../Loader/Loader"
import Test from "../Test/Test";
import Footer from "../../pages/Footer/Footer"
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
            <Route path="/" exact render = {props => <Home setLoading={this.setLoading} showToast={this.showToast} {...props} />}/>
            <Route path="/profile" exact  render={props => <Profile setLoading={this.setLoading} showToast={this.showToast} {...props}/>} />
            <Route path="/dashboard" exact render={props => <Dashboard setLoading={this.setLoading} showToast={this.showToast} {...props}/>} />
            <Route path="/aboutus" exact render={props => <Aboutus showToast={this.showToast} {...props}/>} />
            <Route path="/term" exact render={props => <Term showToast={this.showToast} {...props}/>} />
            <Route path="/privacy" exact render={props => <Privacy showToast={this.showToast} {...props}/>} />
            <Route path="/test" exact render={props => <Test showToast={this.showToast} {...props}/>} />
            <Route component={Error}></Route>
            {/* <Route component={Footer}></Route> */}
          </Switch>
        </div>
      </Router>
    );
  }
}
export default Root;
