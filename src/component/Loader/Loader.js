import React, { Component } from "react";
import "./style.css";
import ReactLoading from "react-loading";
export default class Loader extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <div className="viewLoading">
          <ReactLoading
            type={"spin"}
            color={"#203152"}
            height={"3%"}
            width={"3%"}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}
