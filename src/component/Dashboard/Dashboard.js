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
      userId: null,
      friends: [],
      chats: []
    };
  }

  render() {

    const { classes } = this.props;

    if(this.state.userId) {
      return(
        <div className='dashboard-container' id='dashboard-container'>
          <ChatListComponent history={this.props.history} 
            userId={this.state.userId} 
            selectChatFn={this.selectChat} 
            chats={this.state.chats} 
            selectedChatIndex={this.state.selectedChat}
            newChatBtnFn={this.newChatBtnClicked}>
          </ChatListComponent>
          {
            this.state.newChatFormVisible ? null : <ChatViewComponent 
              userId={this.state.userId} 
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
          sender: this.state.userId,
          message: msg,
          timestamp: Date.now()
        }),
        receiverHasRead: false
      });
  }

  newChatBtnClicked = () => this.newChatSubmit();

  newChatSubmit = async (chatObj) => {
    console.log('email', this.state.userId);
    if(this.state.chats.length < 3){
      await myFirestore
      .collection('users')
      //.where('email', '>=', this.state.email)
      .onSnapshot(async res => {
        const friends = res.docs.filter(doc => doc.data().userId !== this.state.userId).map(_doc => _doc.data());
        await this.setState({
          userId: this.state.userId,
          friends: friends
        });
        if(this.state.friends.length > 0){
          console.log('friends', this.state.friends)
          var winner = this.state.friends[this.random(0, this.state.friends.length)];
          if(winner.userId && this.state.userId !== winner.userId){
            let tempId = Date.now();
            let tempUserId = String(tempId).substr(-8)
            await 
          myFirestore
          .collection('chats')
          .doc()
          .set({
            chatName: 'Room-' + tempId,
            messages: [{
              message: 'Welcome to Mango chat!. Your chat has started. Enjoy!',
              sender: this.state.userId,
              timestamp: tempId
            }],
            hostId: this.state.userId,
            hostAlias: "Host-" + tempUserId,
            clientId: winner.userId,
            clientAlias: "Client-" + tempUserId,
            users: [this.state.userId, winner.userId],
            receiverHasRead: false,
            isActive: true,
            createdDate: new Date()
          }).then(async r => {
            await this.selectChat(this.state.chats.length - 1);
          }).catch((e) =>{
            console.log('error add chat', e);
          })
          }
          else {
            alert('Sorry! We are not able to create chat. duplicate_user');
          }
        }
      })
    }else {
      alert('Sorry, Your chat limit has reached.')
    }
    this.setState({ newChatFormVisible: false });
  }

  selectChat = async (chatIndex) => {
    console.log('chatIndex:', chatIndex)
    if(this.state.chats.length > 0 && chatIndex >= 0) {
      await this.setState({ selectedChat: chatIndex, newChatFormVisible: false });
      this.messageRead();
    }
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

  clickedMessageWhereNotSender = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length - 1].sender !== this.state.userId;

  componentWillMount = () => {
      myFirebase.auth().onAuthStateChanged(async _usr => {
        if(!_usr)
          this.props.history.push('/');
        else {
          await myFirestore
            .collection('chats')
            .where('isActive', '==', true)
            .where('users', 'array-contains', _usr.uid)
            .onSnapshot(async res => {
              const chats = res.docs.map(_doc => ({..._doc.data(), chatId: _doc.id})).sort((a, b) => new Date(b.createdDate)- new Date(a.createdDate));
              console.log('chats', chats)
              await this.setState({
                userId: _usr.uid,
                chats: chats,
                friends: []
              });
            })
        }
    });
  }
  random = (mn, mx) => {
    var num = Math.round(Math.random() * (mx - mn) + mn) -1;  
   return  num < 0 ? 0 : num;  
 } 
}
export default withStyles(styles)(DashboardComponent);