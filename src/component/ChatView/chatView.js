import React from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import WelcomeBoard from "../WelcomeBoard/WelcomeBoard";

class ChatViewComponent extends React.Component {
  componentDidMount = () => {
    const container = document.getElementById("chatview-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  };
  componentDidUpdate = () => {
    const container = document.getElementById("chatview-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  };

  render() {
    const { classes } = this.props;
    if (this.props.chat === undefined) {
      return (
        <main id="chatview-container" className={classes.content}>
          <WelcomeBoard/>
        </main>
      );
    } else if (this.props.chat !== undefined) {
      return (
        <div className={classes.root}>
          <div className={classes.chatHeader}>
            Your conversation with{" "}
            {this.props.chat.hostId === this.props.userId
              ? this.props.chat.clientAlias
              : this.props.chat.hostAlias}
          </div>
          <main id="chatview-container" className={classes.content}>
            {this.props.chat.messages.map((_msg, _index) => {
              return (
                <div
                  key={_index}
                  className={
                    _msg.sender === this.props.userId
                      ? classes.friendSent
                      : classes.userSent
                  }
                >
                  {_msg.message}
                </div>
              );
            })}
          </main>
        </div>
      );
    } else {
      return <div className="chatview-container">Loading...</div>;
    }
  }
}

export default withStyles(styles)(ChatViewComponent);
