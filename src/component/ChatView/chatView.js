import React from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import WelcomeBoard from "../WelcomeBoard/WelcomeBoard";
import Avatar from '@material-ui/core/Avatar';
import ChatLeave from './ChatLeave';
import ChatMessage from './ChatMessage/ChatMessage'
import moment from 'moment'
import images from '../Themes/Images'
class ChatViewComponent extends React.Component {
  componentDidMount = () => {
    const container = document.getElementById("chatview-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  };
  componentDidUpdate = () => {
    const container = document.getElementById("chatview-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  };
  messageList = (classes) =>{
    if(this.props.chat.messages === undefined || this.props.chat.messages.length === 0){
       return(
        <div className={classes.viewWrapSayHi}>
              <span className={classes.textSayHi}>Say hi to new friend</span>
              <img onClick= {() => this.props.submitMessageFn("ic_wave_hand", 2)}
                  className={classes.imgWaveHand}
                  src={images.ic_wave_hand}
                  alt="wave hand"
              />
          </div>
    );
    }
    else{
      return (
        this.props.chat.messages.map((_msg, _index) => {
          let showTimeStamp = false;
          let chatTime = moment(_msg.timestamp);
          if(moment().diff(chatTime, 'minutes') >= 5){
            if(this.props.chat.messages.length-1 === _index){
              if(_msg.sender !== this.props.userId)
                  showTimeStamp = true;
            } else{
              if(_msg.sender !== this.props.chat.messages[_index +1].sender){
                showTimeStamp = true;
              }
            }
          }
          return (
            <ChatMessage key={_index} peerUser ={this.props.chat.peerUser} showTimeStamp ={showTimeStamp} message={_msg} isMyMessage={_msg.sender === this.props.userId}/>
          );
        })
      )
    }
   
  }
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
          <Avatar alt="User Name" src={this.props.chat.peerUser.photoURL} className={classes.orange}>{(this.props.chat.hostId === this.props.userId ? this.props.chat.clientAlias : this.props.chat.hostAlias).split('')[0] }</Avatar>
           <span className={classes.textHeaderChatBoard}>
            {this.props.chat.hostId === this.props.userId
              ? this.props.chat.clientAlias
              : this.props.chat.hostAlias}
              </span>
              <div className={classes.chatHeaderMore}>
                 <ChatLeave selectedChat = {this.props.chat} currentUserId= {this.props.userId}/>
              </div>
          </div>
          <main id="chatview-container" className={classes.content}>
            {this.messageList(classes)}
          </main>
        </div>
      );
    } else {
      return <div className="chatview-container">Loading...</div>;
    }
  }
}

export default withStyles(styles)(ChatViewComponent);
