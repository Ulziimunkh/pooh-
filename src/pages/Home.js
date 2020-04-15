import React, { Component } from "react";
import Login from "../component/Login/Login";
import "../App.css";
import NavBar from "../component/NavBar/NavBar";
export default class Home extends Component {
  render() {
    return (
      <>
        <div className="home-page">
          <NavBar></NavBar>
          <Login statusChanged={this.props.statusChanged}
            setLoading={this.props.setLoading}
            showToast={this.props.showToast}
          />
        </div>
      </>
    );
  }
}
