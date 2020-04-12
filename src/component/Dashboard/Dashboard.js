import React from "react";
import NewChatComponent from "../NewChat/newChat";
import ChatListComponent from "../ChatList/ChatList";
import ChatViewComponent from "../ChatView/chatView";
import ChatTextBoxComponent from "../ChatTextBox/chatTextBox";
import "./styles.css";
import { withStyles } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { AppString } from "../../Config/AppString";
import { myFirestore, myFirebase } from "../../Config/MyFirebase";
import Header from "../DashHeader/Header";
import moment from 'moment';

// I need to investigate why sometimes
// two messages will send instead of just
// one. I dont know if there are two instances
// of the chat box component or what...

// I will be using both .then and async/await
// in this tutorial to give a feel of both.
const styles = (theme) => ({
  chatViewEnable: {
    display: "block",
  },
  chatViewDisable: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
});

class DashboardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null, // logged user7
      currentPeerUser: null, // current selected chat User
      selectedChat: null,
      newChatFormVisible: false,
      isSideBarIsOpen: true,
      userId: null,
      friends: [],
      chats: [],
    };
    this.props.setLoading(true);
  }
  toggleSideMenu = () => {
    if (this.state.isSideBarIsOpen) {
      this.setState({ isSideBarIsOpen: false });
    } else {
      this.setState({ isSideBarIsOpen: true });
    }
  };
  render() {
    const { classes } = this.props;
    if (this.state.userId) {
      return (
        <div className="dashboard-container" id="dashboard-container">
          <Header
            toggleSideBar={this.toggleSideMenu}
            setLoading={this.props.setLoading}
            showToast={this.props.showToast}
            {...this.props}
          ></Header>
          <div className="dashboard-content">
            <div
              className={
                this.state.isSideBarIsOpen
                  ? "chatList-container enable"
                  : "chatList-container disable"
              }
            >
              <ChatListComponent
                history={this.props.history}
                userId={this.state.userId}
                selectChatFn={this.selectChat}
                chats={this.state.chats}
                selectedChatIndex={this.state.selectedChat}
                newChatBtnFn={this.newChatBtnClicked}
              ></ChatListComponent>
            </div>
            <div
              className={
                this.state.isSideBarIsOpen
                  ? classes.chatViewDisable
                  : classes.chatViewEnable
              }
            >
              {this.state.newChatFormVisible ? null : (
                <div className="chatView-container">
                  <ChatViewComponent
                    userId={this.state.userId}
                    setLoading={this.props.setLoading}
                    chat={this.state.chats[this.state.selectedChat]}
                  ></ChatViewComponent>
                </div>
              )}
              {this.state.selectedChat !== null &&
              !this.state.newChatFormVisible ? (
                <div className="chatText-container">
                  <ChatTextBoxComponent   userId={this.state.userId} 
                   setLoading={this.props.setLoading}
                   chatId={this.state.chats[this.state.selectedChat].chatId}
                    userClickedInputFn={this.messageRead}
                    submitMessageFn={this.submitMessage}
                  ></ChatTextBoxComponent>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  signOut = () => myFirebase.auth().signOut();

  submitMessage = (msg, type) => {
    const docKey = this.state.chats[this.state.selectedChat].chatId;
    const timestamp = Date.now();
    myFirestore
      .collection("chats")
      .doc(docKey)
      .update({
        messages: myFirebase.firestore.FieldValue.arrayUnion({
          type: type,
          sender: this.state.userId,
          message: msg,
          timestamp: timestamp,
        }),
        receiverHasRead: false,
      });
  };

  newChatBtnClicked = () => this.newChatSubmit();

  newChatSubmit = async (chatObj) => {
    console.log("email", this.state.userId);
    if (this.state.chats.length < 3) {
      await myFirestore
        .collection("users")
        //.where('email', '>=', this.state.email)
        .onSnapshot(async (res) => {
          const friends = res.docs
            .filter((doc) => doc.data().id !== this.state.userId)
            .map((_doc) => _doc.data());
          await this.setState({
            userId: this.state.userId,
            friends: friends,
          });
          if (this.state.friends.length > 0) {
            console.log("friends", this.state.friends);
            var winner = this.state.friends[
              this.random(0, this.state.friends.length)
            ];
            if (winner.id && this.state.userId !== winner.id) {
              let tempId = Date.now();
              let tempUserId = String(tempId).substr(-8);
              await myFirestore
                .collection("chats")
                .doc()
                .set({
                  chatName: "Room-" + tempId,
                  messages: [
                    {
                      message:
                        "Welcome to Mango chat!. Your chat has started. Enjoy!",
                      sender: this.state.userId,
                      type: 0,
                      timestamp: tempId,
                    },
                  ],
                  hostId: this.state.userId,
                  hostAlias: "User-" + tempUserId,
                  clientId: winner.id,
                  clientAlias: "User-" + tempUserId,
                  users: [this.state.userId, winner.id],
                  receiverHasRead: false,
                  isActive: true,
                  createdDate: new Date(),
                })
                .then(async (r) => {
                  await this.selectChat(this.state.chats.length - 1);
                })
                .catch((e) => {
                  console.log("error add chat", e);
                });
            } else {
              alert("Sorry! We are not able to create chat. duplicate_user");
            }
          }
        });
    } else {
      alert("Sorry, Your chat limit has reached.");
    }
    this.setState({ newChatFormVisible: false });
  };

  selectChat = async (chatIndex) => {
    console.log("chatIndex:", chatIndex);
    this.toggleSideMenu();
    if (this.state.chats.length > 0 && chatIndex >= 0) {
      await this.setState({
        selectedChat: chatIndex,
        newChatFormVisible: false,
      });
      this.messageRead();
    }
  };

  goToChat = async (docKey, msg) => {
    const chat = this.state.chats.find((_chat) => _chat.chatId === docKey);
    this.setState({ newChatFormVisible: false });
    await this.selectChat(this.state.chats.indexOf(chat));
    this.submitMessage(msg);
  };

  // Chat index could be different than the one we are currently on in the case
  // that we are calling this function from within a loop such as the chatList.
  // So we will set a default value and can overwrite it when necessary.
  messageRead = () => {
    const chatIndex = this.state.selectedChat;
    const docKey = this.state.chats[chatIndex].chatId;
    if (this.clickedMessageWhereNotSender(chatIndex)) {
      myFirestore
        .collection("chats")
        .doc(docKey)
        .update({ receiverHasRead: true });
    } else {
      console.log("Clicked message where the user was the sender");
    }
  };

  clickedMessageWhereNotSender = (chatIndex) =>
    this.state.chats[chatIndex].messages[
      this.state.chats[chatIndex].messages.length - 1
    ].sender !== this.state.userId;

  getUserById = (uid) => {
    const result = myFirestore
      .collection("users")
      .where(AppString.ID, "==", uid)
      .get();
    return result;
  };
  downloadUserData = async (uid) => {
    const result = await this.getUserById(uid);
    // console.log("DashboardComponent -> downloadUserData -> result", result)
    if (result.docs.length > 0) {
      // Write user info to local
      const userExist = result.docs[0].data();
      this.setState({ currentUser: userExist });
      localStorage.setItem(AppString.ID, uid);
      localStorage.setItem(AppString.DISPLAYNAME, userExist.displayName);
      localStorage.setItem(AppString.PHOTO_URL, userExist.photoURL);
      localStorage.setItem(AppString.ABOUT_ME, userExist.aboutMe);
      localStorage.setItem(AppString.GENDER, userExist.gender);
      localStorage.setItem(AppString.BIRTHDAY, userExist.birthday);
      localStorage.setItem(
        AppString.SHOW_DISPLAYNAME,
        userExist.showDisplayName
      );
      localStorage.setItem(AppString.SHOW_PROPHOTO, userExist.showProPhoto);
      localStorage.setItem(AppString.SHOW_GENDER, userExist.showGender);
      localStorage.setItem(AppString.INTERESTEDIN, userExist.interestedIn);
      localStorage.setItem(AppString.AGE_RANGE, userExist.ageRange);
    }
  };
  downloadUserChatList = async (uid) => {
    
    myFirestore
      .collection("chats")
      .where("isActive", "==", true)
      .where("users", "array-contains", uid)
      .onSnapshot(async (res) => {
        var chats = [];
        res.docs.forEach(async (_doc) => {
          var peerId = await _doc.data().users.filter((ids) => ids !== uid)[0];
          let peerUser = await this.getUserById(peerId);
          chats.push({
            ..._doc.data(),
            chatId: _doc.id,
            peerUser: peerUser.docs[0].data(),
          });
          this.props.setLoading(false);

          console.log(
            "DashboardComponent -> downloadUserChatList -> chats",
            chats
          );
          await this.setState({
            userId: uid,
            chats: chats,
            friends: [],
          });
        });
      });
  };
  componentWillMount = () => {
    document.getElementsByTagName("BODY")[0].classList.remove("home-page");
    this.props.setLoading(true);
    myFirebase.auth().onAuthStateChanged(async (_usr) => {
      if (!_usr) this.props.history.push("/");
      else {
        // GET Profile data
        if (!localStorage.getItem(AppString.ID)) {
          this.downloadUserData(_usr.uid);
          //this.props.showToast(1, 'Login success')
        }
        // Get Chat List ###########################
        this.downloadUserChatList(_usr.uid);
      }
    });
  };
  random = (mn, mx) => {
    var num = Math.round(Math.random() * (mx - mn) + mn) - 1;
    return num < 0 ? 0 : num;
  };
}
export default withStyles(styles)(DashboardComponent);
