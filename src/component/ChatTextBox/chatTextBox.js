import React from "react";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import images from "../Themes/Images";
import {AppString} from "../../Config/AppString";
class ChatTextBoxComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      chatText: "",
      isShowSticker: false,
    };
    this.currentPhotoFile = null;
  }
  // IMAGE ---------------------------->

  onChoosePhoto = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.props.setLoading(true);
      this.currentPhotoFile = event.target.files[0];
      // Check this file is an image?
      const prefixFiletype = event.target.files[0].type.toString();
      if (prefixFiletype.indexOf(AppString.PREFIX_IMAGE) === 0) {
        this.uploadPhoto();
      } else {
        this.props.setLoading(false);
        this.props.showToast(0, "This file is not an image");
      }
    } else {
      this.props.setLoading(false);
    }
  };

  uploadPhoto = () => {
    if (this.currentPhotoFile) {
      var file = this.currentPhotoFile;
      this.props.uploadPhotoFn(file);
     // this.currentPhotoFile = null;
    } else {
      this.props.setLoading(false);
      this.props.showToast(0, "File is null");
    }
  };

  // STICKER ----------------------->
  openListSticker = () => {
    this.setState({ isShowSticker: !this.state.isShowSticker });
  };
  renderStickers = () => {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <div className={this.props.classes.viewStickers}>
        {arr.map((val, i) => {
          return (
            <img
              key={i}
              className={this.props.classes.imgSticker}
              src={images["mimi" + val]}
              alt="sticker"
              onClick={() => this.submitMessage("mimi" + val, 2)}
            />
          );
        })}
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        {/* // Stickers */}
        {this.state.isShowSticker ? this.renderStickers() : null}

        <div className={classes.viewBottom}>
          <img
            className={classes.icOpenGallery}
            src={images.ic_photo}
            alt="icon open gallery"
            onClick={() => this.refInput.click()}
          />
          <input
            ref={(el) => {
              this.refInput = el;
            }}
            accept="image/*"
            className={classes.viewInputGallery}
            type="file"
            onChange={this.onChoosePhoto}
          />

          <img
            className={classes.icOpenSticker}
            src={images.ic_sticker}
            alt="icon open sticker"
            onClick={this.openListSticker}
          />
          <TextField autoFocus="true" multiline="true"  rowsMax="4"
            autoComplete="off"
            className={classes.viewInput}
            placeholder="Type your message.."
            onKeyUp={(e) => this.userTyping(e)}
            id="chattextbox"
            onFocus={this.userClickedInput}
          ></TextField>
          <Send
            onClick={() => this.submitMessage(this.state.chatText, 0)}
            className={classes.sendBtn}
          ></Send>
        </div>
      </>
    );
  }
  userTyping = (e) => {
    if (e.keyCode === 13) {
      this.submitMessage(this.state.chatText, 0);
    } else this.setState({ chatText: e.target.value });
  };
  messageValid = (txt) => txt && txt.replace(/\s/g, "").length;
  userClickedInput = () => this.props.userClickedInputFn();
  submitMessage = (content, type) => {
    if (this.state.isShowSticker && type === 2) {
      this.setState({ isShowSticker: false });
    }
    if (this.messageValid(content) || ((type=== 0) && String(content).length < 500)) {
      this.props.submitMessageFn(content, type);
      if (type === 0) document.getElementById("chattextbox").value = "";
    }else
    {
      alert("We can't able to send your message. Please check it may too long.");
    }
  };
}

export default withStyles(styles)(ChatTextBoxComponent);
