import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import "./CustomDialog.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class CustomDialog extends Component {
  handleCloseYes = () => {
    this.props.handleCloseYes();
  };

  handleCloseNo = () => {
    this.props.handleCloseNo();
  };
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          onClose={this.handleCloseNo}
          keepMounted
          fullWidth={this.props.width}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <div className="viewWrapTextDialogConfirmLogout">
            <span className="titleDialogConfirmLogout">
              {this.props.title ?? "Confirm dialog"}
            </span>
          </div>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {this.props.content}
            </DialogContentText>
          </DialogContent>
          <div className="viewWrapButtonDialogConfirmLogout">
            <button className="btnYes" onClick={this.handleCloseYes}>
              YES
            </button>
            <button className="btnNo" onClick={this.handleCloseNo}>
              CANCEL
            </button>
          </div>
        </Dialog>
      </div>
    );
  }
}
