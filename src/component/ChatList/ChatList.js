import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";
class ChatListComponent extends React.Component {
  chatStatus = (classes, status) => {
      if ('online' === status) {
        return (
          <ListItemIcon className={classes.statusContainer}>
            <span className={classes.status}></span>
          </ListItemIcon>
        );
      } 
    return <></>;
  };
  chatContent = (_chat) => {
    if (
      _chat.messages !== undefined &&
      _chat.messages !== null &&
      _chat.messages.length > 0
    ) {
      return (
        (this.userIsSender(_chat) ? "You: " : "") +
        (_chat.messages[_chat.messages.length - 1].type === 0
          ? _chat.messages[_chat.messages.length - 1].message.substring(0, 15) +
            (_chat.messages[_chat.messages.length - 1].message.length > 10
              ? " ..."
              : ".")
          : (this.userIsSender(_chat)
              ? ""
              : _chat.peerUser.displayName + ": ") + "sent an attachment.")
      );
    } else {
      return "Say hello to new friend";
    }
  };
  chatList = (classes) => {
    if (
      this.props.chats === undefined ||
      this.props.chats === null ||
      this.props.chats.length === 0
    ) {
      return <List></List>;
    } else
      return (
        <List>
          {this.props.chats.map((_chat, _index) => {
            let itsMe = _chat.hostId === this.props.userId;
            return (
              <div key={_index}>
                <ListItem
                  onClick={() => this.selectChat(_index)}
                  className={classes.listItem}
                  selected={this.props.selectedChatIndex === _index}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="User Name"
                      src={_chat.peerUser.photoURL}
                      className={classes.orange}
                    >
                      {
                        (itsMe ? _chat.clientAlias : _chat.hostAlias).split(
                          ""
                        )[0]
                      }
                    </Avatar>
                  </ListItemAvatar>
                  {this.chatStatus(
                    classes, _chat.peerUser.status
                  )}
                  <ListItemText
                    primary={itsMe ? _chat.clientAlias : _chat.hostAlias}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" color="textPrimary">
                          {this.chatContent(_chat)}
                        </Typography>
                      </React.Fragment>
                    }
                  />

                  {_chat.receiverHasRead === false &&
                  !this.userIsSender(_chat) ? (
                    <ListItemIcon>
                      <NotificationImportant
                        className={classes.unreadMessage}
                      ></NotificationImportant>
                    </ListItemIcon>
                  ) : null}
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      );
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={this.newChat}
          className={classes.newChatBtn}
        >
          Start New Chat
        </Button>
        {this.chatList(classes)}
      </div>
    );
  }
  userIsSender = (chat) =>
    chat.messages !== undefined &&
    chat.messages !== null &&
    chat.messages.length > 0 &&
    chat.messages[chat.messages.length - 1].sender === this.props.userId;
  newChat = () => this.props.newChatBtnFn();
  selectChat = (index) => this.props.selectChatFn(index);
}

export default withStyles(styles)(ChatListComponent);
