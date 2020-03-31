import React from 'react';
import NewChatComponent from '../NewChat/newChat';
import ChatListComponent from '../ChatList/ChatList';
import ChatViewComponent from '../ChatView/chatView';
import ChatTextBoxComponent from '../ChatTextBox/chatTextBox';
import styles from './styles';
import { Button, withStyles } from '@material-ui/core';

import {myFirestore,  myFirebase} from '../../Config/MyFirebase'

// I need to investigate why sometimes
// two messages will send instead of just
// one. I dont know if there are two instances
// of the chat box component or what...

// I will be using both .then and async/await
// in this tutorial to give a feel of both.

class DashboardComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      email: null,
      friends: [],
      chats: []
    };
  }

  render() {

    const { classes } = this.props;

    if(this.state.email) {
      return(
        <div className='dashboard-container' id='dashboard-container'>
          <ChatListComponent history={this.props.history} 
            userEmail={this.state.email} 
            selectChatFn={this.selectChat} 
            chats={this.state.chats} 
            selectedChatIndex={this.state.selectedChat}
            newChatBtnFn={this.newChatBtnClicked}>
          </ChatListComponent>
          {
            this.state.newChatFormVisible ? null : <ChatViewComponent 
              user={this.state.email} 
              chat={this.state.chats[this.state.selectedChat]}>
            </ChatViewComponent>
          }
          { 
            this.state.selectedChat !== null && !this.state.newChatFormVisible ? <ChatTextBoxComponent userClickedInputFn={this.messageRead} submitMessageFn={this.submitMessage}></ChatTextBoxComponent> : null 
          }
          {
            this.state.newChatFormVisible ? <NewChatComponent goToChatFn={this.goToChat} newChatSubmitFn={this.newChatSubmit}></NewChatComponent> : null
          }
          <Button onClick={this.signOut} className={classes.signOutBtn}>Sign Out</Button>
        </div>
      );
    } else {
      return(<div>LOADING....</div>);
    }
  }

  signOut = () => myFirebase.auth().signOut();

  submitMessage = (msg) => {
    const docKey = this.state.chats[this.state.selectedChat].chatId;
    
      myFirestore
      .collection('chats')
      .doc(docKey)
      .update({
        messages: myFirebase.firestore.FieldValue.arrayUnion({
          sender: this.state.email,
          message: msg,
          timestamp: Date.now()
        }),
        receiverHasRead: false
      });
  }

  newChatBtnClicked = () => this.setState({ newChatFormVisible: true, selectedChat: null });

  newChatSubmit = async (chatObj) => {
    await 
      myFirestore
        .collection('chats')
        .doc()
        .set({
          messages: [{
            message: chatObj.message,
            sender: this.state.email
          }],
          users: [this.state.email, chatObj.sendTo],
          receiverHasRead: false
        })
    this.setState({ newChatFormVisible: false });
    this.selectChat(this.state.chats.length - 1);
  }

  selectChat = async (chatIndex) => {
    await this.setState({ selectedChat: chatIndex, newChatFormVisible: false });
    this.messageRead();
  }

  goToChat = async (docKey, msg) => {
    const chat = this.state.chats.find(_chat => _chat.chatId === docKey);
    this.setState({ newChatFormVisible: false });
    await this.selectChat(this.state.chats.indexOf(chat));
    this.submitMessage(msg);
  }

  // Chat index could be different than the one we are currently on in the case
  // that we are calling this function from within a loop such as the chatList.
  // So we will set a default value and can overwrite it when necessary.
  messageRead = () => {
    const chatIndex = this.state.selectedChat;
    const docKey = this.state.chats[chatIndex].chatId;
    if(this.clickedMessageWhereNotSender(chatIndex)) {
      myFirestore
        .collection('chats')
        .doc(docKey)
        .update({ receiverHasRead: true });
    } else {
      console.log('Clicked message where the user was the sender');
    }
  }

  clickedMessageWhereNotSender = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length - 1].sender !== this.state.email;

  componentWillMount = () => {
      myFirebase.auth().onAuthStateChanged(async _usr => {
        if(!_usr)
          this.props.history.push('/');
        else {
          await myFirestore
            .collection('chats')
            .where('users', 'array-contains', _usr.email)
            .onSnapshot(async res => {
              const chats = res.docs.map(_doc => ({..._doc.data(), chatId: _doc.id}));
              console.log('cahts', chats)
              await this.setState({
                email: _usr.email,
                chats: chats,
                friends: []
              });
            })
        }
    });
  }
}

export default withStyles(styles)(DashboardComponent);