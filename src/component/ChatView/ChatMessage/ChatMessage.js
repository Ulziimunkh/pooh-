import React from "react";
import classNames from "classnames";
import { ChatMessageTime } from "../../../Utils/Utils";
import "./ChatMessage.css";
import images from "../../Themes/Images";
import LazyImages from './LazyImage'
export default function ChatMessage(props) {
  const messageClass = classNames("message-row", {
    "you-message": props.isMyMessage,
    "other-message": !props.isMyMessage,
  });
  const imageThumbnail = props.isMyMessage ? null : (
    <img src={props.peerUser.photoURL} className="profile-img" alt={props.peerUser.displayName} />
  );
  const message = () => {
    if (props.message.type === 0) {
      return <div className="message-text">{props.message.message}</div>;
    } else if (props.message.type === 1) {
      return (
        <LazyImages alt="content img" src={props.message.message} className="imgItemRight"/>
      )
    } else if (props.message.type === 2) {
      return (
        <img
          className="imgItemRight"
          src={images[props.message.message]}
          alt="content emoji"
        />
      );
    }
  };

  return (
    <div className={messageClass}>
      <div className="message-content">
        {props.showTimeStamp ? (
          imageThumbnail
        ) : (
          <span style={{ width: "24px" }}></span>
        )}
        {message()}
        <div
          className="message-time"
          style={{ display: props.showTimeStamp && !props.isMyMessage ? "block" : "none" }}
        >
          {ChatMessageTime(props.message.timestamp)}
        </div>
      </div>
    </div>
  );
}
