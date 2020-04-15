import React from "react";
import ChatListComponent from "../ChatList/ChatList";
import ChatViewComponent from "../ChatView/chatView";
import ChatTextBoxComponent from "../ChatTextBox/chatTextBox";
import "./styles.css";
import { withStyles } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { AppString } from "../../Config/AppString";
import { myFirestore, myFirebase, myStorage } from "../../Config/MyFirebase";
import DashboardHeader from "../DashHeader/DashboardHeader";

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
   async componentDidMount(){
    console.log("Login -> statusChanged")
    this.props.setLoading(true);
    await myFirebase.auth().onAuthStateChanged(async (_usr) => {
      if (!_usr) this.props.history.push("/");
      else {
        // GET Profile data
        if (!localStorage.getItem(AppString.ID)) {
          //myFirebase.auth().signOut();
          await this.downloadUserData(_usr.uid);
          //this.props.showToast(1, 'Login success')
        }
        // Get Chat List ###########################
        this.downloadUserChatList(_usr.uid);
      }
      // this.props.setLoading(false);
      this.props.setLoading(false);
    });
    // this.props.statusChanged(localStorage.getItem(AppString.ID));
   }
   componentWillUnmount(){
    // this.props.statusChanged(localStorage.getItem(AppString.ID));
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
          <DashboardHeader  statusChanged = {this.props.statusChanged} 
            userId={this.state.userId}
            toggleSideBar={this.toggleSideMenu}
            setLoading={this.props.setLoading}
            showToast={this.props.showToast}
            {...this.props}
          ></DashboardHeader>
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
                    submitMessageFn={this.submitMessage}
                    userId={this.state.userId}
                    setLoading={this.props.setLoading}
                    chat={this.state.chats[this.state.selectedChat]}
                  ></ChatViewComponent>
                </div>
              )}
              {this.state.selectedChat !== null &&
              !this.state.newChatFormVisible ? (
                <div className="chatText-container">
                  <ChatTextBoxComponent
                    uploadPhotoFn={this.uploadPhoto}
                    userId={this.state.userId}
                    setLoading={this.props.setLoading}
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
  uploadPhoto = async (currentPhotoFile) => {
    const timestamp = Date.now().toString();
    let chatId = this.state.chats[this.state.selectedChat].chatId;
    console.log(
      "DashboardComponent -> uploadPhoto -> this.state.userId",
      this.state.userId
    );
    const uploadTask = myStorage
      .ref()
      .child("chatImages/")
      .child(this.state.userId + "/")
      .child(chatId + "/")
      .child(timestamp)
      .put(currentPhotoFile);

    uploadTask.on(
      AppString.UPLOAD_CHANGED,
      null,
      (err) => {
        this.props.setLoading(false);
        this.props.showToast(0, err.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
          this.props.setLoading(false);
          await this.submitMessage(downloadURL, 1);
        });
      }
    );
  };

  newChatBtnClicked = () => this.newChatSubmit();

  newChatSubmit = async (chatObj) => {
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
                    // {
                    //   message:
                    //     "Welcome to Mango chat!. Your chat has started. Enjoy!",
                    //   sender: this.state.userId,
                    //   type: 0,
                    //   timestamp: tempId,
                    // },
                  ],
                  hostId: this.state.userId,
                  hostAlias: "User-" + tempUserId,
                  clientId: winner.id,
                  clientAlias: "User-" + tempUserId,
                  users: [this.state.userId, winner.id],
                  receiverHasRead: true,
                  isActive: true,
                  createdDate: new Date(),
                })
                .then(async (r) => {
                  await this.selectChat(this.state.chats.length - 1);
                })
                .catch((e) => {});
            } else {
              alert("Sorry! We are not able to create chat. duplicate_user");
            }
          } else
            alert(
              "Sorry! This time we are not able to create chat. Please try again later. Thank you for understanding."
            );
        });
    } else {
      alert("Sorry, Your chat limit has reached.");
    }
    this.setState({ newChatFormVisible: false });
  };

  selectChat = async (chatIndex) => {
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
    }
  };

  clickedMessageWhereNotSender = (chatIndex) =>
    this.state.chats[chatIndex].messages.length > 0 &&
    this.state.chats[chatIndex].messages[
      this.state.chats[chatIndex].messages.length - 1
    ].sender !== this.state.userId;
  getUserById = async (uid) => {
    await new Promise((r) => {
      let ref = myFirestore.collection("users").doc(uid);
      ref.get().then((snapshot) => {
        //DocSnapshot
        if (snapshot.exists) {
          r(snapshot.data());
          //return snapshot.data();
        } else {
          // snapshot.data() will be undefined in this case
          //return null;
        }
      });
    });
  };

  downloadUserData = async (uid) => {
    let ref = await myFirestore.collection("users").doc(uid);
    ref.get().then((snapshot) => {
      //DocSnapshot
      if (snapshot.exists) {
        const userExist = snapshot.data();
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
    });
  };
  downloadUserChatList = async (uid) => {
    try {
      var listChat = [];
      var chats = [];
      myFirestore
        .collection("chats")
        .where("isActive", "==", true)
        .where("users", "array-contains", uid)
        .onSnapshot(async (res) => {
          listChat = res.docs;
          if (listChat.length > 0) {
            await new Promise((gf) => {
              chats = [];
              listChat.forEach(async (_doc, index) => {
                var peerId = _doc.data().users.filter((ids) => ids !== uid)[0];

                await new Promise((resolve, reject) => {
                  let ref = myFirestore.collection("users").doc(peerId);
                  ref.get().then((snapshot) => {
                    //DocSnapshot
                    if (snapshot.exists) {
                      resolve(snapshot.data());
                    } else {
                      // snapshot.data() will be undefined in this case
                      resolve();
                    }
                  });
                }).then((values) => {
                  let peerUser = values;
                  chats.push({
                    ..._doc.data(),
                    chatId: _doc.id,
                    peerUser: peerUser,
                  });
                });
                if (index === listChat.length - 1) gf();
              });
            }).then((e) => {
              this.setState({
                userId: uid,
                chats: chats,
              });
            });
          }
        });
      await this.setState({
        userId: uid,
        chats: chats,
      });
    } catch (e) {
      console.error("Problem", e);
    }
  };

  UNSAFE_componentWillMount() {
   
  }

  random = (mn, mx) => {
    var num = Math.round(Math.random() * (mx - mn) + mn) - 1;
    return num < 0 ? 0 : num;
  };
}
export default withStyles(styles)(DashboardComponent);
