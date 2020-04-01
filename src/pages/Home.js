import React, { Component } from "react";
import AuthProvider from "../component/Login/AuthProvider";
import "../App.css";
import {AppString} from '../Config/AppString';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.props.setLoading(true);
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = () => {
    if (localStorage.getItem(AppString.ID)) {
      this.props.setLoading(false);
      this.setState(() => {
        this.setState({ isLoading: false });
        this.props.showToast(1, "Login success");
        this.props.history.push("/main");
      });
    } else {
      this.props.setLoading(false);
    }
  };
  render() {
    return (
      <>
        <AuthProvider
          setLoading={this.props.setLoading}
          showToast={this.props.showToast}
        />
      </>
    );
  }
}
